import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '@/hooks/useGame';
import { useRecords } from '@/hooks/useRecords';
import SnakeGameWithGraphics from '@/components/SnakeGameWithGraphics';
import SnakeGame from '@/components/SnakeGame';
import './GamePage.css';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { gameMode } = useParams<{ gameMode: string }>();
  const { gameState, resetGame } = useGame();
  const { addRecord, isNewRecord } = useRecords();
  
  const [playerName, setPlayerName] = useState<string>('');
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTime, setFinalTime] = useState(0);

  // Capturar nome do jogador da navegação
  useEffect(() => {
    const state = history.state?.usr;
    if (state?.playerName) {
      setPlayerName(state.playerName);
    } else {
      // Se não tem nome, voltar para o menu
      navigate('/');
    }
  }, [navigate]);

  // Iniciar cronômetro quando o jogo começar
  useEffect(() => {
    if (gameState.gameStarted && !gameStartTime) {
      setGameStartTime(Date.now());
    }
  }, [gameState.gameStarted, gameStartTime]);

  // Detectar fim de jogo
  useEffect(() => {
    if (gameState.gameOver && gameStartTime && !showGameOverModal) {
      const gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
      setFinalScore(gameState.score);
      setFinalTime(gameTime);
      setShowGameOverModal(true);
    }
  }, [gameState.gameOver, gameStartTime, showGameOverModal, gameState.score]);

  const handleBackToMenu = () => {
    resetGame();
    setGameStartTime(0);
    navigate('/');
  };

  const handleSaveRecord = () => {
    if (playerName && finalScore > 0) {
      addRecord({
        playerName,
        score: finalScore,
        timeInSeconds: finalTime,
        difficulty: gameMode || 'classic'
      });
    }
    handleBackToMenu();
  };

  const handlePlayAgain = () => {
    resetGame();
    setGameStartTime(0);
    setShowGameOverModal(false);
  };

  const renderGameComponent = () => {
    switch (gameMode) {
      case 'graphics':
        return <SnakeGameWithGraphics />;
      default:
        return <SnakeGame />;
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!playerName) {
    return (
      <div className="game-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando jogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <button 
          className="back-btn"
          onClick={handleBackToMenu}
          aria-label="Voltar ao menu"
        >
          ← Menu
        </button>
        <div className="player-info">
          <span className="player-name">Jogador: {playerName}</span>
          <span className="game-mode">Modo: {gameMode || 'clássico'}</span>
        </div>
      </div>

      <div className="game-container">
        {renderGameComponent()}
      </div>

      {showGameOverModal && (
        <div className="modal-overlay">
          <div className="game-over-modal">
            <div className="modal-header">
              <h2>🎮 Fim de Jogo</h2>
              <p>Ótima partida, {playerName}!</p>
            </div>
            
            <div className="modal-content">
              <div className="final-stats">
                <div className="stat-item">
                  <span className="stat-label">Pontuação Final:</span>
                  <span className="stat-value score">{finalScore}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Tempo de Jogo:</span>
                  <span className="stat-value time">{formatTime(finalTime)}</span>
                </div>
                {isNewRecord(finalScore) && (
                  <div className="new-record">
                    🏆 Novo Recorde!
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={handlePlayAgain}
              >
                Jogar Novamente
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSaveRecord}
              >
                Salvar e Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
