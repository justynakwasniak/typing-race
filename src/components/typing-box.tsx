'use client';

type TypingBoxProps = {
  sentence: string;
  onChange: (text: string) => void;
  value: string;
};

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