import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClassicGame } from '@/hooks/useClassicGame';
import { useRecords } from '@/hooks/useRecords';
import GameNavbar from '@/components/GameNavbar';
import ClassicGameBoard from '@/components/ClassicGameBoard';
import './ClassicGamePage.css';

const ClassicGamePage: React.FC = () => {
  const navigate = useNavigate();
  const { gameMode } = useParams<{ gameMode: string }>();
  const { addRecord } = useRecords();
  
  const [playerName, setPlayerName] = useState<string>('');
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTime, setFinalTime] = useState(0);

  // Configuração do jogo baseada no modo
  const gameConfig = {
    boardWidth: 50, // Dobrou a largura para pixels menores
    boardHeight: 40, // Dobrou a altura para pixels menores
    cellSize: 10, // Reduziu o tamanho da célula
    initialSpeed: 250, // Velocidade mais rápida (250ms)
    speedIncrement: 10,
    foodTimeout: 12, // 12 segundos
  };

  const { gameState, startGame, pauseGame, resetGame } = useClassicGame(gameConfig);

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
    // Só mostrar o modal se o jogo realmente terminou (gameOver = true) E o jogo estava rodando
    if (gameState.gameOver && gameState.gameStarted && gameStartTime && !showGameOverModal) {
      const gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
      setFinalScore(gameState.score);
      setFinalTime(gameTime);
      setShowGameOverModal(true);
    }
  }, [gameState.gameOver, gameState.gameStarted, gameStartTime, showGameOverModal, gameState.score]);

  // Calcular tempo restante da comida
  const foodTimeLeft = gameState.food.isActive 
    ? Math.max(0, Math.floor((gameState.food.expiresAt - Date.now()) / 1000))
    : 0;

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
    setShowGameOverModal(false);
    resetGame();
    setGameStartTime(0);
  };

  // Controles de teclado adicionais
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          if (gameState.gameOver) {
            handleBackToMenu();
          } else {
            pauseGame();
          }
          break;
        case 'Enter':
          if (gameState.gameOver) {
            event.preventDefault();
            handlePlayAgain();
          } else if (!gameState.gameStarted) {
            event.preventDefault();
            startGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameOver, gameState.gameStarted, pauseGame, startGame]);

  if (!playerName) {
    return (
      <div className="classic-game-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando jogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="classic-game-page">
      <GameNavbar
        playerName={playerName}
        score={gameState.score}
        gameTime={gameState.gameTime}
        foodTimeLeft={foodTimeLeft}
        onPause={pauseGame}
        onReset={resetGame}
        gameStarted={gameState.gameStarted}
        gamePaused={gameState.gamePaused}
        gameOver={gameState.gameOver}
      />

      <ClassicGameBoard 
        gameState={gameState} 
        config={gameConfig} 
      />

      {/* Tela de início */}
      {!gameState.gameStarted && !gameState.gameOver && (
        <div className="start-screen">
          <div className="start-content">
            <h1>🐍 Jogo da Cobrinha Clássico</h1>
            <p>Use as setas ou WASD para mover</p>
            <p>Colete a comida antes que ela expire!</p>
            <button className="start-btn" onClick={startGame}>
              🎮 Começar Jogo
            </button>
            <button className="back-btn" onClick={handleBackToMenu}>
              ← Voltar ao Menu
            </button>
          </div>
        </div>
      )}

      {/* Modal de fim de jogo */}
      {showGameOverModal && (
        <div className="game-over-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>💀 Fim de Jogo</h2>
              <p>Ótima partida, {playerName}!</p>
            </div>
            
            <div className="final-stats">
              <div className="stat-item">
                <span className="stat-label">Pontuação Final:</span>
                <span className="stat-value score">{finalScore}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Tempo de Jogo:</span>
                <span className="stat-value time">
                  {Math.floor(finalTime / 60)}:{(finalTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Comidas Coletadas:</span>
                <span className="stat-value">{Math.max(0, finalScore)}</span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={handlePlayAgain}
              >
                🔄 Jogar Novamente
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSaveRecord}
              >
                💾 Salvar e Voltar
              </button>
              <button 
                className="btn btn-outline"
                onClick={handleBackToMenu}
              >
                🏠 Menu Principal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicGamePage;
