"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { initSocket } from "../lib/socket";
import type { Player } from "../components/leaderboard";
import { Socket } from "socket.io-client";
import { GameContextType } from "../types/games.model";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [input, setInput] = useState("");
  const [sentence, setSentence] = useState("");
  const [roundEnded, setRoundEnded] = useState(false);
  const [roundId, setRoundId] = useState(0);

  useEffect(() => {
    fetch("/api/socket").then(() => {
      const s = initSocket();
      setSocket(s);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleInit = (data: any) => {
      setPlayers(data.players);
      setSentence(data.sentence);
    };

    const handlePlayers = (players: Player[]) => {
      setPlayers(players);
    };

    const handleNewRound = (data: { sentence: string }) => {
      setSentence(data.sentence);
      setInput("");
      setRoundEnded(false);
      setRoundId((prev) => prev + 1);
    };

    socket.on("init", handleInit);
    socket.on("players-update", handlePlayers);
    socket.on("new-round", handleNewRound);

    return () => {
      socket.off("init", handleInit);
      socket.off("players-update", handlePlayers);
      socket.off("new-round", handleNewRound);
    };
  }, [socket]);

  return (
    <GameContext.Provider
      value={{
        socket,
        players,
        playerName,
        setPlayerName,
        input,
        setInput,
        sentence,
        roundEnded,
        setRoundEnded,
        roundId,
        setRoundId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
