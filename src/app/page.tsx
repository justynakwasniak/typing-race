"use client";

import JoinModal from "../components/join-modal";
import Timer from "../components/timer";
import TypingBox from "../components/typing-box";
import Leaderboard from "../components/leaderboard";
import { calculateWPM } from "../lib/wpm";
import { calculateAccuracy } from "../lib/accuracy";
import { GameProvider, useGame } from "../context/GameContext";
import { useState } from "react";

function Home() {
  const {
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
  } = useGame();

  const [joined, setJoined] = useState(false);
  const roundDuration = 60;

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

          <Leaderboard players={players} currentPlayer={playerName} />
        </>
      )}
    </main>
  );
}

export default function HomePage() {
  return (
    <GameProvider>
      <Home />
    </GameProvider>
  );
}
