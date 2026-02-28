'use client';

import { useState } from "react";

type JoinModalProps = {
  onJoin: (name: string) => void;
};

export default function JoinModal({ onJoin }: JoinModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onJoin(name.trim());
  };

  return (
    <div className="join-modal-overlay">
      <form className="join-modal" onSubmit={handleSubmit}>
        <h2>Enter your nickname</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
}