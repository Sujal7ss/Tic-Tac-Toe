import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import WINNING_COMBINATIONS from "./components/winning";
import GameOver from "./components/GameOver";

const PLAYER = {
  'X': "Player 1",
  'O': "Player 2"
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}
function deriveGameBoard(gameTurns)
{
  let gameBoard = [...INITIAL_GAME_BOARD.map(Array => [...Array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(player, gameBoard){
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && secondSquare === thirdSquare)
      {
        winner = player[firstSquare];
      }

  }
  return winner;
}
//Main App function
function App() {
  const [gameTurns, updateTurns] = useState([]);
  const [player, changePlayerName] = useState(PLAYER);

  const activePlayer = deriveActivePlayer(gameTurns);

  
  const gameBoard = deriveGameBoard(gameTurns);
  
  const winner = deriveWinner(player ,gameBoard);
  let hasDraw = false;
  if(gameTurns.length === 9 && !winner) {hasDraw = true;}

  function turnHandler(rowIndex, colIndex) {
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
  }
  function restartGame(){
    updateTurns([])
  }

  function changePlayerNamehandler(symbol, newName) 
  {
    changePlayerName(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYER.X}
            symbol="X"
            isActive={activePlayer === "X"}
            changeNameHandler = {changePlayerNamehandler}
          />
          <Player
            initialName={PLAYER.Y}
            symbol="O"
            isActive={activePlayer === "O"}
            changeNameHandler = {changePlayerNamehandler}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restartGame={restartGame}/>}
        <GameBoard onSelection={turnHandler} board = {gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
