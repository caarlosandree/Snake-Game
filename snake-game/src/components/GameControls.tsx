import React from 'react';
import { Direction } from '@/types/game';

interface GameControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  gameStarted: boolean;
  gamePaused: boolean;
  gameOver: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onDirectionChange,
  onStart,
  onPause,
  onReset,
  gameStarted,
  gamePaused,
  gameOver
}) => {
  return (
    <div className="game-controls">
      <div className="control-buttons">
        {!gameStarted ? (
          <button className="control-btn start-btn" onClick={onStart}>
            Iniciar Jogo
          </button>
        ) : (
          <>
            <button className="control-btn pause-btn" onClick={onPause}>
              {gamePaused ? 'Continuar' : 'Pausar'}
            </button>
            <button className="control-btn reset-btn" onClick={onReset}>
              Reiniciar
            </button>
          </>
        )}
      </div>

      <div className="direction-controls">
        <div className="direction-row">
          <button 
            className="direction-btn"
            onClick={() => onDirectionChange(Direction.UP)}
            disabled={!gameStarted || gamePaused || gameOver}
          >
            ↑
          </button>
        </div>
        <div className="direction-row">
          <button 
            className="direction-btn"
            onClick={() => onDirectionChange(Direction.LEFT)}
            disabled={!gameStarted || gamePaused || gameOver}
          >
            ←
          </button>
          <button 
            className="direction-btn"
            onClick={() => onDirectionChange(Direction.DOWN)}
            disabled={!gameStarted || gamePaused || gameOver}
          >
            ↓
          </button>
          <button 
            className="direction-btn"
            onClick={() => onDirectionChange(Direction.RIGHT)}
            disabled={!gameStarted || gamePaused || gameOver}
          >
            →
          </button>
        </div>
      </div>

      <div className="instructions">
        <h3>Controles:</h3>
        <p>• Use as setas do teclado ou WASD para mover</p>
        <p>• Barra de espaço para pausar/continuar</p>
        <p>• Evite bater nas paredes e no próprio corpo!</p>
      </div>
    </div>
  );
};

export default GameControls;
