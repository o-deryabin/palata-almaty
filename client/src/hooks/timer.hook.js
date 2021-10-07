import { useState, useEffect } from "react";

export const useTimer = () => {
  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(59);
  const [final, setFinal] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(60);
    } else {
      setFinal(true);
      return;
    }
  }, [seconds, minutes]);

  return { seconds, minutes, final, setFinal };
};
