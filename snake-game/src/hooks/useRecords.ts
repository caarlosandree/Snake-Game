import { useState, useEffect } from 'react';
import type { GameRecord } from '@/types/records';

const STORAGE_KEY = 'snake-game-records';

export const useRecords = () => {
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar recordes do localStorage
  useEffect(() => {
    try {
      const storedRecords = localStorage.getItem(STORAGE_KEY);
      if (storedRecords) {
        const parsedRecords = JSON.parse(storedRecords);
        setRecords(parsedRecords.sort((a: GameRecord, b: GameRecord) => b.score - a.score));
      }
    } catch (error) {
      console.error('Erro ao carregar recordes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salvar recordes no localStorage
  const saveRecords = (newRecords: GameRecord[]) => {
    try {
      const sortedRecords = newRecords.sort((a, b) => b.score - a.score);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedRecords));
      setRecords(sortedRecords);
    } catch (error) {
      console.error('Erro ao salvar recordes:', error);
    }
  };

  // Adicionar novo recorde
  const addRecord = (record: Omit<GameRecord, 'id' | 'date'>) => {
    const newRecord: GameRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    const updatedRecords = [...records, newRecord];
    saveRecords(updatedRecords);
    return newRecord;
  };

  // Limpar todos os recordes
  const clearRecords = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecords([]);
  };

  // Obter top recordes
  const getTopRecords = (limit: number = 10) => {
    return records.slice(0, limit);
  };

  // Verificar se é um novo recorde
  const isNewRecord = (score: number) => {
    if (records.length === 0) return true;
    return score > records[records.length - 1].score || records.length < 10;
  };

  return {
    records,
    isLoading,
    addRecord,
    clearRecords,
    getTopRecords,
    isNewRecord,
  };
};
