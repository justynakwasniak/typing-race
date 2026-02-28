'use client';

import JoinModal from "../components/join-modal";
import Timer from "../components/timer";
import TypingBox from "../components/typing-box";
import Leaderboard from "../components/leaderboard";
import { calculateWPM } from "../lib/wpm";
import { calculateAccuracy } from "../lib/accuracy";
import { initSocket } from "../lib/socket";
import { useEffect, useState } from "react";
import type { Player } from "../types/player";

export default function HomePage() {
  const [joined, setJoined] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [input, setInput] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [roundEnded, setRoundEnded] = useState(false);

  const sentence = "The quick brown fox jumps over the lazy dog";
  const roundDuration = 60;

  useEffect(() => {
    fetch("/api/socket").then(() => {
      const s = initSocket();
      setSocket(s);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handlePlayers = (players: any[]) => setPlayers(players);
    const handleInit = (data: any[]) => setPlayers(data);

    socket.on("players-update", handlePlayers);
    socket.on("init", handleInit);

    return () => {
      socket.off("players-update", handlePlayers);
      socket.off("init", handleInit);
    };
  }, [socket]);

  const handleJoin = (name: string) => {
    if (!socket) return;
    setPlayerName(name);
    setJoined(true);
    socket.emit("join", name);
  };

  const handleInputChange = (text: string) => {
    if (!socket) return;
    setInput(text);
    const wpm = calculateWPM(text, sentence);
    const accuracy = calculateAccuracy(text, sentence);

    socket.emit("progress", { name: playerName, text, wpm, accuracy });
  };

  const handleRoundEnd = () => {
    setInput("");
    setRoundEnded(true);
    setTimeout(() => setRoundEnded(false), 2000);
  };

  return (
    <main>
      {!joined && <JoinModal onJoin={handleJoin} />}

      {joined && (
        <>
          {roundEnded && (
            <div className="round-ended">
              Round ended! New round starting...
            </div>
          )}

          <Timer duration={roundDuration} onEnd={handleRoundEnd} />

          <div style={{ marginBottom: '1rem', fontFamily: 'Roboto Mono', fontSize: '1.1rem' }}>
            {sentence}
          </div>

          <TypingBox sentence={sentence} value={input} onChange={handleInputChange} />

          <Leaderboard players={players} />
        </>
      )}
    </main>
  );
}