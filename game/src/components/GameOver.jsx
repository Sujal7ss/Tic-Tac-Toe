export default function GameOver({winner, restartGame}){
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>You Won {winner}</p>}
            {!winner && <p>Its a Draw</p>}
            
            <button onClick={restartGame}>Restart</button>
        </div>
    )
}