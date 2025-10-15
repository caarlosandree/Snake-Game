import React from 'react';

interface GameInfoProps {
  score: number;
  gameStarted: boolean;
  gamePaused: boolean;
  gameOver: boolean;
}

const GameInfo: React.FC<GameInfoProps> = ({ 
  score, 
  gameStarted, 
  gamePaused, 
  gameOver 
}) => {
  const getStatusMessage = () => {
    if (gameOver) return 'Game Over!';
    if (!gameStarted) return 'Pressione "Iniciar Jogo" para começar';
    if (gamePaused) return 'Jogo Pausado';
    return 'Jogando...';
  };

  return (
    <div className="game-info">
      <div className="score">
        <h2>Pontuação: {score}</h2>
      </div>
      
      <div className="status">
        <h3 className={`status-message ${gameOver ? 'game-over' : ''}`}>
          {getStatusMessage()}
        </h3>
      </div>

      {gameOver && (
        <div className="game-over-message">
          <p>Você perdeu! Sua pontuação final foi: <strong>{score}</strong></p>
          <p>Pressione "Reiniciar" para jogar novamente.</p>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
