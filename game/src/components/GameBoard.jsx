import { useState } from "react";



export default function GameBoard({onSelection, board}){
    
    // const [gameBoard, updateGameBoard] = useState(initialGameBoard);

    // function buttonHandler(rowIndex, colIndex){
    //     updateGameBoard(prevBoard => {
    //         const newBoard = [...prevBoard.map(innerArray => [...innerArray])];
    //         newBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return newBoard;
    //     })
    //     onSelection();
    // }
    return(
        
        <ol id="game-board">
            {
                board.map((row, rowIndex) => <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) => <li key={colIndex}>
                            <button onClick={() => onSelection(rowIndex, colIndex)} disabled={(col !== null)}>{col}</button>
                        </li>)}
                    </ol>
                </li>)
            }
        </ol>
    );
}