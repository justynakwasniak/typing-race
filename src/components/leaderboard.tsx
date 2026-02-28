'use client';

type Player = {
  name: string;
  progress: string;
  wpm: number;
  accuracy: number;
};

type LeaderboardProps = {
  players: Player[];
};

export default function Leaderboard({ players }: LeaderboardProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Live progress</th>
          <th>Player name</th>
          <th>Words per minute</th>
          <th>Accuracy</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p, i) => (
          <tr key={i}>
            <td className="font-mono">{p.progress}</td>
            <td>{p.name}</td>
            <td>{p.wpm}</td>
            <td>{(p.accuracy * 100).toFixed(0)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}