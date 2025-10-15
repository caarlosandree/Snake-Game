import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-header">
          <button 
            className="back-btn"
            onClick={() => navigate('/')}
            aria-label="Voltar ao menu"
          >
            ← Voltar
          </button>
          <h1>ℹ️ Sobre o Jogo</h1>
        </header>

        <div className="about-content">
          <section className="about-section">
            <h2>🎮 Sobre o Jogo da Cobrinha</h2>
            <p>
              O Jogo da Cobrinha é um clássico dos videogames que conquistou gerações. 
              Nossa versão moderna foi desenvolvida com React, TypeScript e tecnologias 
              web modernas para oferecer a melhor experiência possível.
            </p>
          </section>

          <section className="about-section">
            <h2>🛠️ Tecnologias Utilizadas</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <div className="tech-icon">⚛️</div>
                <h3>React</h3>
                <p>Biblioteca JavaScript para interfaces de usuário</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">📘</div>
                <h3>TypeScript</h3>
                <p>JavaScript com tipagem estática</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">🎨</div>
                <h3>React-Konva</h3>
                <p>Renderização 2D de alta performance</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">🎯</div>
                <h3>Vite</h3>
                <p>Build tool moderno e rápido</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>✨ Funcionalidades</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">🎮</span>
                <div>
                  <h4>Múltiplos Modos de Jogo</h4>
                  <p>Clássico, Avançado e com Gráficos</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏆</span>
                <div>
                  <h4>Sistema de Recordes</h4>
                  <p>Salve suas melhores pontuações</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎨</span>
                <div>
                  <h4>Gráficos Modernos</h4>
                  <p>Animações e efeitos visuais</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📱</span>
                <div>
                  <h4>Responsivo</h4>
                  <p>Funciona em qualquer dispositivo</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>🎯 Como Funciona</h2>
            <p>
              Este jogo foi desenvolvido com foco na experiência do usuário e performance. 
              Utilizamos React Hooks para gerenciar o estado do jogo, React-Konva para 
              renderização gráfica otimizada, e localStorage para persistência dos recordes.
            </p>
          </section>

          <section className="about-section">
            <h2>🚀 Desenvolvimento</h2>
            <p>
              Projeto desenvolvido como demonstração de habilidades em desenvolvimento 
              front-end moderno, utilizando as melhores práticas e ferramentas atuais 
              do ecossistema React.
            </p>
          </section>
        </div>

        <footer className="about-footer">
          <button 
            className="play-btn"
            onClick={() => navigate('/')}
          >
            🎮 Jogar Agora
          </button>
          <p className="version-info">
            Versão 1.0.0 - Desenvolvido com ❤️
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
