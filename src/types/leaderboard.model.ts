import type { Player } from "./leaderboard.model";

export type LeaderboardProps = {
  players?: Player[];
  currentPlayer?: string;
};

export type Player = {
  name: string;
  progress: string;
  wpm: number;
  accuracy: number;
  id: string;
};

