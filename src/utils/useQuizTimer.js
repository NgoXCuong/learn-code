import { useState, useEffect, useRef } from "react";

export function useQuizTimer(isActive, onTick) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleStopTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleResetTimer = () => {
      setTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Listen for timer events
    window.addEventListener("stopTimer", handleStopTimer);
    window.addEventListener("resetTimer", handleResetTimer);

    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTick(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      window.removeEventListener("stopTimer", handleStopTimer);
      window.removeEventListener("resetTimer", handleResetTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, onTick]);

  return time;
}
