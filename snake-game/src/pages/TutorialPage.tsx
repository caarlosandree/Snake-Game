import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TutorialPage.css';

const TutorialPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tutorial-page">
      <div className="tutorial-container">
        <header className="tutorial-header">
          <button 
            className="back-btn"
            onClick={() => navigate('/')}
            aria-label="Voltar ao menu"
          >
            ← Voltar
          </button>
          <h1>📖 Tutorial</h1>
          <p className="tutorial-subtitle">
            Aprenda como jogar o Jogo da Cobrinha
          </p>
        </header>

        <div className="tutorial-content">
          <section className="tutorial-section">
            <h2>🎯 Objetivo do Jogo</h2>
            <p>
              O objetivo é simples: faça a cobrinha crescer o máximo possível 
              coletando a comida vermelha, sem colidir com as paredes ou com 
              o próprio corpo.
            </p>
          </section>

          <section className="tutorial-section">
            <h2>🎮 Como Jogar</h2>
            <div className="controls-grid">
              <div className="control-item">
                <div className="control-icon">⌨️</div>
                <h3>Teclado</h3>
                <ul>
                  <li><kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> - Mover a cobra</li>
                  <li><kbd>Espaço</kbd> - Pausar/Retomar</li>
                  <li><kbd>R</kbd> - Reiniciar jogo</li>
                </ul>
              </div>
              
              <div className="control-item">
                <div className="control-icon">🖱️</div>
                <h3>Mouse</h3>
                <ul>
                  <li>Clique nos botões de direção</li>
                  <li>Botão "Pausar" para pausar</li>
                  <li>Botão "Reiniciar" para novo jogo</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="tutorial-section">
            <h2>🍎 Sistema de Pontuação</h2>
            <div className="scoring-info">
              <div className="score-item">
                <span className="score-emoji">🍎</span>
                <div>
                  <h4>Comida</h4>
                  <p>+10 pontos por comida coletada</p>
                </div>
              </div>
              <div className="score-item">
                <span className="score-emoji">⏱️</span>
                <div>
                  <h4>Tempo de Jogo</h4>
                  <p>Registrado para os recordes</p>
                </div>
              </div>
              <div className="score-item">
                <span className="score-emoji">📈</span>
                <div>
                  <h4>Velocidade</h4>
                  <p>Aumenta conforme você pontua</p>
                </div>
              </div>
            </div>
          </section>

          <section className="tutorial-section">
            <h2>🏆 Sistema de Recordes</h2>
            <p>
              Seus recordes são salvos automaticamente com:
            </p>
            <ul className="records-list">
              <li>Nome do jogador</li>
              <li>Pontuação final</li>
              <li>Tempo total de jogo</li>
              <li>Data e hora da partida</li>
            </ul>
          </section>

          <section className="tutorial-section">
            <h2>💡 Dicas para Jogar</h2>
            <div className="tips-grid">
              <div className="tip-item">
                <span className="tip-number">1</span>
                <p>Mantenha a cabeça da cobra longe das paredes</p>
              </div>
              <div className="tip-item">
                <span className="tip-number">2</span>
                <p>Planeje seus movimentos com antecedência</p>
              </div>
              <div className="tip-item">
                <span className="tip-number">3</span>
                <p>Use as paredes para fazer curvas fechadas</p>
              </div>
              <div className="tip-item">
                <span className="tip-number">4</span>
                <p>Quando a cobra ficar grande, vá devagar</p>
              </div>
              <div className="tip-item">
                <span className="tip-number">5</span>
                <p>Pratique regularmente para melhorar</p>
              </div>
              <div className="tip-item">
                <span className="tip-number">6</span>
                <p>Mantenha a calma e não se apresse</p>
              </div>
            </div>
          </section>

          <section className="tutorial-section">
            <h2>🎨 Modos de Jogo</h2>
            <div className="game-modes">
              <div className="mode-item">
                <h3>🎮 Clássico</h3>
                <p>O modo tradicional do jogo da cobrinha</p>
              </div>
              <div className="mode-item">
                <h3>⚡ Avançado</h3>
                <p>Com animações e efeitos visuais</p>
              </div>
              <div className="mode-item">
                <h3>🎨 Gráficos</h3>
                <p>Renderização avançada com Konva.js</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="tutorial-footer">
          <button 
            className="play-btn"
            onClick={() => navigate('/')}
          >
            🎮 Começar a Jogar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TutorialPage;
