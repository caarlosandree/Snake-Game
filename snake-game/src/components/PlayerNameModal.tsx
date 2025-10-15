import React, { useState, useEffect } from 'react';
import './PlayerNameModal.css';

interface PlayerNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (playerName: string) => void;
  title?: string;
}

const PlayerNameModal: React.FC<PlayerNameModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Digite seu nome'
}) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Focar no input quando o modal abrir
      const input = document.getElementById('player-name-input') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    } else {
      // Limpar o estado quando fechar
      setPlayerName('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = playerName.trim();
    
    if (!trimmedName) {
      setError('Por favor, digite seu nome');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('O nome deve ter pelo menos 2 caracteres');
      return;
    }
    
    if (trimmedName.length > 20) {
      setError('O nome deve ter no máximo 20 caracteres');
      return;
    }

    onConfirm(trimmedName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label htmlFor="player-name-input">
              Nome do Jogador:
            </label>
            <input
              id="player-name-input"
              type="text"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Digite seu nome aqui..."
              maxLength={20}
              className={error ? 'error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!playerName.trim()}
            >
              Jogar!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerNameModal;
