export interface GameRecord {
  id: string;
  playerName: string;
  score: number;
  timeInSeconds: number;
  date: string;
  difficulty?: string;
}

export interface RecordsState {
  records: GameRecord[];
  isLoading: boolean;
}
