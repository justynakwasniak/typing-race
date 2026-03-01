'use client';

import { useState } from "react";
import type { JoinModalProps } from "@/types/join-modal.model";


export default function JoinModal({ onJoin }: JoinModalProps) {
const [name, setName] = useState<string>("");
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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