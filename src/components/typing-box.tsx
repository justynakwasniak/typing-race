'use client';

import { TypingBoxProps } from "../types/typing-box.model";

export default function TypingBox({ sentence, value, onChange }: TypingBoxProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing..."
      className="typing-box"
    />
  );
}