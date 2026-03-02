import type { Player } from "../components/leaderboard";
import type { Socket } from "socket.io-client";

export type GameContextType = {
  socket: Socket | null;
  players: Player[];
  playerName: string;
  setPlayerName: (name: string) => void;
  input: string;
  setInput: (text: string) => void;
  sentence: string;
  roundEnded: boolean;
  setRoundEnded: (ended: boolean) => void;
  roundId: number;
  setRoundId: (id: number) => void;
};
