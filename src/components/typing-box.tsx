'use client'
import { useState } from "react"

type TypingBoxProps = {
  sentence: string
  onChange: (text: string) => void
  value: string
}

export default function TypingBox({ sentence, value, onChange }: TypingBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Start typing..."
      className="w-full border rounded p-2 text-lg"
    />
  )
}