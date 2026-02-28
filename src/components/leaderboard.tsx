"use client";

type Player = {
  name: string;
  progress: string;
  wpm: number;
  accuracy: number;
};

type LeaderboardProps = {
  players?: Player[];
  currentPlayer?: string;
};

export default function Leaderboard({
  players = [],
  currentPlayer = "",
}: LeaderboardProps) {
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
        {players.map((p) => {
          const isMe = p.name === currentPlayer;
          return (
            <tr key={p.name} className={isMe ? "highlight-row" : ""}>
              <td className="font-mono">{p.progress}</td>
              <td>{p.name}</td>
              <td>{p.wpm}</td>
              <td>{(p.accuracy * 100).toFixed(0)}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
