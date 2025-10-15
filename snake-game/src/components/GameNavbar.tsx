import React from 'react';
import './GameNavbar.css';

interface GameNavbarProps {
  playerName: string;
  score: number;
  gameTime: number;
  foodTimeLeft?: number; // Tempo restante para a comida expirar
  onPause: () => void;
  onReset: () => void;
  gameStarted: boolean;
  gamePaused: boolean;
  gameOver: boolean;
}

const GameNavbar: React.FC<GameNavbarProps> = ({
  playerName,
  score,
  gameTime,
  foodTimeLeft,
  onPause,
  onReset,
  gameStarted,
  gamePaused,
  gameOver
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatFoodTime = (seconds: number): string => {
    if (seconds <= 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <nav className="game-navbar">
      <div className="navbar-content">
        <div className="player-info">
          <div className="player-avatar">👤</div>
          <div className="player-details">
            <span className="player-name">{playerName}</span>
            <span className="player-label">Jogador</span>
          </div>
        </div>

        <div className="game-stats">
          <div className="stat-item">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <span className="stat-value">{score}</span>
              <span className="stat-label">Pontos</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <span className="stat-value">{formatTime(gameTime)}</span>
              <span className="stat-label">Tempo</span>
            </div>
          </div>

          {foodTimeLeft !== undefined && foodTimeLeft > 0 && (
            <div className="stat-item food-timer">
              <div className="stat-icon">🍎</div>
              <div className="stat-content">
                <span className={`stat-value ${foodTimeLeft <= 5 ? 'warning' : ''}`}>
                  {formatFoodTime(foodTimeLeft)}
                </span>
                <span className="stat-label">Comida</span>
              </div>
            </div>
          )}
        </div>

        <div className="game-controls">
          <button 
            className={`control-btn ${gamePaused ? 'resume' : 'pause'}`}
            onClick={onPause}
            disabled={!gameStarted || gameOver}
          >
            {gamePaused ? '▶️' : '⏸️'}
            {gamePaused ? 'Continuar' : 'Pausar'}
          </button>
          
          <button 
            className="control-btn reset"
            onClick={onReset}
          >
            🔄 Reiniciar
          </button>
        </div>
      </div>

      {gamePaused && (
        <div className="pause-overlay">
          <div className="pause-message">
            <h2>⏸️ Jogo Pausado</h2>
            <p>Pressione <kbd>Espaço</kbd> ou clique em "Continuar" para retomar</p>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <h2>💀 Fim de Jogo</h2>
            <p>Pontuação Final: <strong>{score}</strong></p>
            <p>Tempo de Jogo: <strong>{formatTime(gameTime)}</strong></p>
            <button className="play-again-btn" onClick={onReset}>
              🔄 Jogar Novamente
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GameNavbar;
