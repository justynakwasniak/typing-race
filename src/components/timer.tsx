import { useEffect, useState, useRef } from "react";
import { TimerProps } from "../types/timer.model";

export default function Timer({ duration, onEnd }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          onEndRef.current?.();
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      Time left: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}