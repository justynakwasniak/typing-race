'use client';

import { useEffect, useState } from "react";

type TimerProps = {
  duration: number;
  onEnd?: () => void;
};

export default function Timer({ duration, onEnd }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(t => {
      if (t <= 1) {
        onEnd?.();
        clearInterval(interval);
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [onEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      Time left: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}