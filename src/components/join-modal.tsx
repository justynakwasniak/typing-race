'use client'
import { useState } from "react"

type JoinModalProps = {
  onJoin: (name: string) => void
}

export default function JoinModal({ onJoin }: JoinModalProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) onJoin(name.trim())
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form 
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-center">Enter your nickname</h2>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Join Game
        </button>
        
      </form>
    </div>
  )
}