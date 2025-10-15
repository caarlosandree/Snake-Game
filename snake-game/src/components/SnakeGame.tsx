import React from 'react';
import { useGame } from '../hooks/useGame';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameInfo from './GameInfo';

const SnakeGame: React.FC = () => {
  const { gameState, config, resetGame, startGame, pauseGame, changeDirection } = useGame();

  return (
    <div className="snake-game">
      <header className="game-header">
        <h1>🐍 Jogo da Cobrinha</h1>
      </header>
      
      <main className="game-main">
        <div className="game-left">
          <GameInfo
            score={gameState.score}
            gameStarted={gameState.gameStarted}
            gamePaused={gameState.gamePaused}
            gameOver={gameState.gameOver}
          />
          
          <GameBoard
            snake={gameState.snake}
            food={gameState.food}
            boardWidth={config.boardWidth}
            boardHeight={config.boardHeight}
            cellSize={config.cellSize}
          />
        </div>

        <div className="game-right">
          <GameControls
            onDirectionChange={changeDirection}
            onStart={startGame}
            onPause={pauseGame}
            onReset={resetGame}
            gameStarted={gameState.gameStarted}
            gamePaused={gameState.gamePaused}
            gameOver={gameState.gameOver}
          />
        </div>
      </main>
    </div>
  );
};

export default SnakeGame;
