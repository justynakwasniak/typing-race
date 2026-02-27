'use client'
import { useState } from "react"
import JoinModal from "../components/join-modal"
import Timer from "../components/timer"
import TypingBox from "../components/typing-box"
import Leaderboard from "../components/leaderboard"
import { calculateWPM } from "../lib/wpm"
import { calculateAccuracy } from "../lib/accuracy"

export default function HomePage() {
  const [joined, setJoined] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [input, setInput] = useState("")
  const [players, setPlayers] = useState<any[]>([])
  const sentence = "The quick brown fox jumps over the lazy dog"
  const roundDuration = 60

  const handleJoin = (name: string) => {
    setPlayerName(name)
    setJoined(true)
    setPlayers([{ name, progress: "", wpm: 0, accuracy: 0 }])
  }

  const handleInputChange = (text: string) => {
    setInput(text)
    setPlayers(p => p.map(pl => {
      if (pl.name === playerName) {
        return {
          ...pl,
          progress: text,
          wpm: calculateWPM(text),
          accuracy: calculateAccuracy(text, sentence)
        }
      }
      return pl
    }))
  }

  const handleRoundEnd = () => {
    setInput("")
    alert("Round ended! New sentence will appear...")
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      {!joined && <JoinModal onJoin={handleJoin} />}
      {joined && (
        <>
          <Timer duration={roundDuration} onEnd={handleRoundEnd} />
          <div className="my-4 font-mono">{sentence}</div>
          <TypingBox sentence={sentence} value={input} onChange={handleInputChange} />
          <Leaderboard players={players} />
        </>
      )}
    </main>
  )
}