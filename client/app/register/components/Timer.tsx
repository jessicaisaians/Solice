"use client";
import { calculateDuration } from "@/app/utils";
import { useEffect, useState } from "react";

const Timer = ({
  timerLimitInS,
  setTimerEnded,
  intervalInMs = 1000,
  startTheTimer = false,
}: {
  timerLimitInS: number;
  startTheTimer?: boolean;
  intervalInMs?: number;
  setTimerEnded: (hasEnded: boolean) => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(timerLimitInS);
  const duration: ReturnType<typeof calculateDuration> = calculateDuration(
    0,
    timeLeft * 1000
  );
  const zeroPad = (num: number) => String(num).padStart(2, "0");
  // Start the timer if code is sent
  // If the timer is Running and has reached 0 => stop the timer
  useEffect(() => {
    let linkCodeExpiry: string | number | NodeJS.Timeout | undefined =
      undefined;
    if (startTheTimer) {
      linkCodeExpiry = setInterval(() => {
        setTimeLeft((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
    }
    if (timeLeft === 0 && !!linkCodeExpiry) {
      clearInterval(linkCodeExpiry);
      setTimerEnded(true);
    }

    return () => clearInterval(linkCodeExpiry);

    // { minutes: 30, seconds: 7 }
  }, [startTheTimer, timeLeft, setTimerEnded]);
  return (
    <p
      className="text-stone-500 text-base"
      //   color={
      //     timeLeft < 10
      //       ? genColorVal("red-100")
      //       : timeLeft < 20
      //       ? genColorVal("yellow-100")
      //       : genColorVal("green-800")
      //   }
    >
      {`${zeroPad(duration.minutes || 0)}:${zeroPad(duration.seconds || 0)}`}
    </p>
  );
};

export default Timer;
