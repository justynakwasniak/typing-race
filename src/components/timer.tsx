'use client'
import { useEffect, useState } from "react"

type TimerProps = {
  duration: number
  onEnd?: () => void
}

export default function Timer({ duration, onEnd }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd?.()
      return
    }
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft, onEnd])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-lg font-mono">
      Time left: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  )
}