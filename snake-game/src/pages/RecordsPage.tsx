import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecords } from '@/hooks/useRecords';
import './RecordsPage.css';

const RecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const { records, isLoading, clearRecords, getTopRecords } = useRecords();
  const [showAllRecords, setShowAllRecords] = useState(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClearRecords = () => {
    if (window.confirm('Tem certeza que deseja apagar todos os recordes? Esta ação não pode ser desfeita.')) {
      clearRecords();
    }
  };

  const getMedalEmoji = (index: number): string => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const displayRecords = showAllRecords ? records : getTopRecords(10);

  if (isLoading) {
    return (
      <div className="records-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando recordes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="records-page">
      <div className="records-container">
        <header className="records-header">
          <button 
            className="back-btn"
            onClick={() => navigate('/')}
            aria-label="Voltar ao menu"
          >
            ← Voltar
          </button>
          <h1>🏆 Recordes</h1>
          <p className="records-subtitle">
            {records.length === 0 
              ? 'Nenhum recorde ainda. Seja o primeiro!' 
              : `Total de ${records.length} jogos registrados`
            }
          </p>
        </header>

        {records.length > 0 && (
          <div className="records-controls">
            <button
              className={`toggle-btn ${showAllRecords ? 'active' : ''}`}
              onClick={() => setShowAllRecords(!showAllRecords)}
            >
              {showAllRecords ? 'Top 10' : 'Ver Todos'}
            </button>
            <button
              className="clear-btn"
              onClick={handleClearRecords}
            >
              🗑️ Limpar Recordes
            </button>
          </div>
        )}

        <div className="records-content">
          {records.length === 0 ? (
            <div className="empty-records">
              <div className="empty-icon">🎮</div>
              <h3>Nenhum recorde encontrado</h3>
              <p>Jogue algumas partidas para aparecer aqui!</p>
              <button 
                className="play-btn"
                onClick={() => navigate('/')}
              >
                Começar a Jogar
              </button>
            </div>
          ) : (
            <div className="records-list">
              {displayRecords.map((record, index) => (
                <div 
                  key={record.id} 
                  className={`record-item ${index < 3 ? 'podium' : ''}`}
                >
                  <div className="record-position">
                    <span className="medal">
                      {getMedalEmoji(index)}
                    </span>
                  </div>
                  
                  <div className="record-info">
                    <div className="record-player">
                      <strong>{record.playerName}</strong>
                      <span className="record-date">
                        {formatDate(record.date)}
                      </span>
                    </div>
                    
                    <div className="record-stats">
                      <div className="stat">
                        <span className="stat-label">Pontuação:</span>
                        <span className="stat-value score">{record.score}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Tempo:</span>
                        <span className="stat-value time">{formatTime(record.timeInSeconds)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="record-rank">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;
