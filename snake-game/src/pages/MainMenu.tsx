import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerNameModal from '@/components/PlayerNameModal';
import './MainMenu.css';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState<string>('');

  const handleStartGame = (gameMode: string) => {
    setSelectedGameMode(gameMode);
    setIsPlayerModalOpen(true);
  };

  const handlePlayerConfirm = (playerName: string) => {
    setIsPlayerModalOpen(false);
    // Navegar para o jogo com o nome do jogador
    if (selectedGameMode === 'classic') {
      navigate('/classic', { 
        state: { playerName } 
      });
    } else {
      navigate(`/game/${selectedGameMode}`, { 
        state: { playerName } 
      });
    }
  };

  const handleCloseModal = () => {
    setIsPlayerModalOpen(false);
    setSelectedGameMode('');
  };

  return (
    <div className="main-menu">
      <div className="menu-container">
        <header className="menu-header">
          <h1 className="game-title">
            🐍 Jogo da Cobrinha Online
          </h1>
          <p className="game-subtitle">
            Teste suas habilidades neste clássico jogo!
          </p>
        </header>

        <nav className="menu-navigation">
          <div className="menu-section">
            <h2>Jogar</h2>
            <div className="menu-buttons">
              <button 
                className="menu-btn primary"
                onClick={() => handleStartGame('classic')}
              >
                🎮 Jogo Clássico
              </button>
              <button 
                className="menu-btn primary"
                onClick={() => handleStartGame('advanced')}
              >
                ⚡ Jogo Avançado
              </button>
              <button 
                className="menu-btn primary"
                onClick={() => handleStartGame('graphics')}
              >
                🎨 Com Gráficos
              </button>
            </div>
          </div>

          <div className="menu-section">
            <h2>Informações</h2>
            <div className="menu-buttons">
              <button 
                className="menu-btn secondary"
                onClick={() => navigate('/tutorial')}
              >
                📖 Tutorial
              </button>
              <button 
                className="menu-btn secondary"
                onClick={() => navigate('/records')}
              >
                🏆 Recordes
              </button>
              <button 
                className="menu-btn secondary"
                onClick={() => navigate('/about')}
              >
                ℹ️ Sobre
              </button>
            </div>
          </div>
        </nav>

        <footer className="menu-footer">
          <p>Desenvolvido com ❤️ em React + TypeScript</p>
        </footer>
      </div>

      <PlayerNameModal
        isOpen={isPlayerModalOpen}
        onClose={handleCloseModal}
        onConfirm={handlePlayerConfirm}
        title="Vamos começar a jogar!"
      />
    </div>
  );
};

export default MainMenu;
