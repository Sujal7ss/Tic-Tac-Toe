import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import WINNING_COMBINATIONS from "../components/winning";
import GameOver from "../components/GameOver";
import { socket } from "../socket";

const PLAYER = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((Array) => [...Array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(player, gameBoard) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      secondSquare === thirdSquare
    ) {
      winner = player[firstSquare];
    }
  }
  return winner;
}
//Online game
const OnlineGameBoard = ({ myTurn, changeTurn, roomId }) => {
  const [gameTurns, updateTurns] = useState([]);
  const [player, changePlayerName] = useState(PLAYER);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(player, gameBoard);
  let hasDraw = false;
  if (gameTurns.length === 9 && !winner) {
    hasDraw = true;
  }

  useEffect(() => {
    socket.on("turn", (data) => {
      console.log(data);
      updateTurns((prevTurns) => {
        const currPlayer = deriveActivePlayer(prevTurns);
        const currTurn = [
          {
            square: { row: data.rowIndex, col: data.colIndex },
            player: currPlayer,
          },
          ...prevTurns,
        ];
        return currTurn;
      });
      changeTurn((prevTurn) => !prevTurn);
    });

    socket.on('restart', (data) => {
        updateTurns([]);
    })
  }, []);

  function turnHandler(rowIndex, colIndex) {
    socket.emit("turn", { rowIndex, colIndex, roomId: roomId });
    updateTurns((prevTurns) => {
      const currPlayer = deriveActivePlayer(prevTurns);
      const currTurn = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currPlayer,
        },
        ...prevTurns,
      ];
      return currTurn;
    });

    changeTurn(!myTurn);
    // console.log(gameTurns);
    if (myTurn) {
      //   socket.emit("turn", {"turns": gameTurns, roomId: socket.roomId});
      //   changeTurn(false);
    }
  }
  function restartGame() {
    socket.emit("restart", { roomId: roomId });
    updateTurns([]);
  }

  function changePlayerNamehandler(symbol, newName) {
    changePlayerName((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <>
      {/* <ToggleButton /> */}
      <main>
        {!winner && !hasDraw && !myTurn && (
          <div className="w-full h-full bg- fixed top-32 z-10"> </div>
        )}

        <div id="game-container">
          <div className="h-20 flex items-center  align-middle justify-stretch">
            {!winner && !hasDraw && myTurn && <h1 className="text-gray-900">Your Turn</h1>}
          </div>
          {(winner || hasDraw) && (
            <GameOver winner={winner} restartGame={restartGame} />
          )}
          <GameBoard onSelection={turnHandler} board={gameBoard} />
        </div>
        {/* <Log turns={gameTurns} /> */}
      </main>
    </>
  );
};

export default OnlineGameBoard;
