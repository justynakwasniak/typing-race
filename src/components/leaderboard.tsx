'use client'

type Player = {
  name: string
  progress: string
  wpm: number
  accuracy: number
}

type LeaderboardProps = {
  players: Player[]
}

export default function Leaderboard({ players }: LeaderboardProps) {
  return (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2 text-left">Live progress</th>
          <th className="border p-2 text-left">Player name</th>
          <th className="border p-2 text-left">Words per minute</th>
          <th className="border p-2 text-left">Accuracy</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p, i) => (
          <tr key={i} className="border-b">
            <td className="border p-2 font-mono">{p.progress}</td>
            <td className="border p-2">{p.name}</td>
            <td className="border p-2">{p.wpm}</td>
            <td className="border p-2">{(p.accuracy * 100).toFixed(0)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}