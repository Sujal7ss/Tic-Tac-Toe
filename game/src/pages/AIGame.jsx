import { useState } from "react";
import Player from "../components/Player";
import GameBoard from "../components/GameBoard";
import WINNING_COMBINATIONS from "../components/winning";
import GameOver from "../components/GameOver";

const PLAYER = {
  'X': "Player 1",
  'O': "BOT"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function checkWinner(gameBoard, player) {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (
      gameBoard[a.row][a.column] === player &&
      gameBoard[b.row][b.column] === player &&
      gameBoard[c.row][c.column] === player
    ) {
      return true;
    }
  }
  return false;
}

const AIGame = () => {
  const [gameBoard, setGameBoard] = useState(INITIAL_GAME_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [players, setPlayers] = useState(PLAYER);

  const winner = checkWinner(gameBoard, 'X') ? players['X'] : (checkWinner(gameBoard, 'O') ? players['O'] : null);
  const hasDraw = gameBoard.flat().every(cell => cell !== null) && !winner;

  function getAvailableMoves(board) {
    const moves = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          moves.push({ row, col });
        }
      }
    }
    return moves;
  }

  function minimax(board, depth, isMaximizing) {
    if (checkWinner(board, 'O')) return 10 - depth;
    if (checkWinner(board, 'X')) return depth - 10;
    if (getAvailableMoves(board).length === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of getAvailableMoves(board)) {
        const newBoard = board.map(row => [...row]);
        newBoard[move.row][move.col] = 'O';
        const score = minimax(newBoard, depth + 1, false);
        bestScore = Math.max(bestScore, score);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const move of getAvailableMoves(board)) {
        const newBoard = board.map(row => [...row]);
        newBoard[move.row][move.col] = 'X';
        const score = minimax(newBoard, depth + 1, true);
        bestScore = Math.min(bestScore, score);
      }
      return bestScore;
    }
  }

  function findBestMove(board) {
    let bestScore = -Infinity;
    let bestMove;
    for (const move of getAvailableMoves(board)) {
      const newBoard = board.map(row => [...row]);
      newBoard[move.row][move.col] = 'O';
      const score = minimax(newBoard, 0, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  const turnHandler = (rowIndex, colIndex) => {
    if (gameBoard[rowIndex][colIndex] || winner) return;

    const newBoard = gameBoard.map(row => [...row]);
    newBoard[rowIndex][colIndex] = currentPlayer;
    setGameBoard(newBoard);
    setCurrentPlayer('O');

    if (!checkWinner(newBoard, 'X') && getAvailableMoves(newBoard).length > 0) {
      setTimeout(() => {
        const aiMove = findBestMove(newBoard);
        const aiBoard = newBoard.map(row => [...row]);
        aiBoard[aiMove.row][aiMove.col] = 'O';
        setGameBoard(aiBoard);
        setCurrentPlayer('X');
      }, 500);
    }
  };

  function restartGame() {
    setGameBoard(INITIAL_GAME_BOARD);
    setCurrentPlayer('X');
  }

  function changePlayerNameHandler(symbol, newName) {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: newName
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYER.X}
            symbol="X"
            isActive={currentPlayer === "X"}
            changeNameHandler={changePlayerNameHandler}
          />
          <Player
            initialName="BOT"
            symbol="O"
            isActive={currentPlayer === "O"}
            changeNameHandler={changePlayerNameHandler}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restartGame={restartGame} />}
        <GameBoard onSelection={turnHandler} board={gameBoard} />
      </div>
    </main>
  );
}

export default AIGame;