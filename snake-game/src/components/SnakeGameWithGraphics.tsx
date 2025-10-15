import React, { useState } from 'react';
import { useGame } from '@/hooks/useGame';
import GameBoard from './GameBoard';
import GameBoardKonva from './GameBoardKonva';
import GameBoardAdvanced from './GameBoardAdvanced';
import GameControls from './GameControls';
import GameInfo from './GameInfo';
import './SnakeGameWithGraphics.css';

type GraphicsMode = 'css' | 'konva' | 'advanced';

const SnakeGameWithGraphics: React.FC = () => {
  const { gameState, config, resetGame, startGame, pauseGame, changeDirection } = useGame();
  const [graphicsMode, setGraphicsMode] = useState<GraphicsMode>('advanced');

  const renderGameBoard = () => {
    const commonProps = {
      snake: gameState.snake,
      food: gameState.food.position,
      boardWidth: config.boardWidth,
      boardHeight: config.boardHeight,
      cellSize: config.cellSize
    };

    switch (graphicsMode) {
      case 'konva':
        return <GameBoardKonva {...commonProps} />;
      case 'advanced':
        return <GameBoardAdvanced {...commonProps} />;
      default:
        return <GameBoard {...commonProps} />;
    }
  };

  return (
    <div className="snake-game">
      <header className="game-header">
        <h1>🐍 Jogo da Cobrinha com Gráficos</h1>
        
        <div className="graphics-selector">
          <label>Modo Gráfico:</label>
          <select 
            value={graphicsMode} 
            onChange={(e) => setGraphicsMode(e.target.value as GraphicsMode)}
            title="Selecionar modo gráfico do jogo"
          >
            <option value="css">CSS Básico</option>
            <option value="konva">Konva.js</option>
            <option value="advanced">Avançado com Animações</option>
          </select>
        </div>
      </header>
      
      <main className="game-main">
        <div className="game-left">
          <GameInfo
            score={gameState.score}
            gameStarted={gameState.gameStarted}
            gamePaused={gameState.gamePaused}
            gameOver={gameState.gameOver}
          />
          
          {renderGameBoard()}
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

export default SnakeGameWithGraphics;
