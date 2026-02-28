"use client";

import JoinModal from "../components/join-modal";
import Timer from "../components/timer";
import TypingBox from "../components/typing-box";
import Leaderboard from "../components/leaderboard";
import { calculateWPM } from "../lib/wpm";
import { calculateAccuracy } from "../lib/accuracy";
import { initSocket } from "../lib/socket";
import { useEffect, useState } from "react";
import type { Player } from "../components/leaderboard";
import { Socket } from "socket.io-client";

export default function HomePage() {
  const [joined, setJoined] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [input, setInput] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roundEnded, setRoundEnded] = useState(false);
  const [sentence, setSentence] = useState("");
  const [roundId, setRoundId] = useState(0);

  const roundDuration = 60;

  useEffect(() => {
    fetch("/api/socket").then(() => {
      const s = initSocket();
      setSocket(s);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleInit = (data: any) => {
      console.log("INIT DATA:", data);
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

  const handleJoin = (name: string): void => {
    if (!socket) return;
    setPlayerName(name);
    setJoined(true);
    socket.emit("join", name);
  };

  const handleInputChange = (text: string): void => {
    if (!socket) return;

    setInput(text);

    const wpm = calculateWPM(text, sentence);
    const accuracy = calculateAccuracy(text, sentence);

    socket.emit("progress", { name: playerName, text, wpm, accuracy });
  };

  const handleRoundEnd = (): void => {
    if (!socket) return;
    setRoundEnded(true);
    socket.emit("end-round");
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

          <Timer
            key={roundId}
            duration={roundDuration}
            onEnd={handleRoundEnd}
          />
          <div
            style={{
              marginBottom: "1rem",
              fontFamily: "Roboto Mono",
              fontSize: "1.1rem",
            }}
          >
            {sentence}
          </div>

          <TypingBox
            sentence={sentence}
            value={input}
            onChange={handleInputChange}
          />

          <Leaderboard players={players} />
        </>
      )}
    </main>
  );
}
