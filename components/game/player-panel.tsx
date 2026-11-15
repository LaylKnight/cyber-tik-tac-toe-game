"use client";

import { cn } from "@/lib/utils";
import { TURN_MS } from "@/lib/game";

const SEGMENTS = 20;

type Props = {
  label: string;
  score: number;
  timeLeft: number;
  active: boolean;
  lost?: boolean;
  tone: "pink" | "green";
  align?: "left" | "right";
};

export function PlayerPanel({ label, score, timeLeft, active, lost = false, tone, align = "left" }: Props) {
  const ratio = Math.max(0, Math.min(1, timeLeft / TURN_MS));
  const filled = Math.ceil(ratio * SEGMENTS);
  const seconds = Math.ceil(timeLeft / 1000);
  const danger = active && seconds <= 3;

  const toneText = tone === "pink" ? "neon-text-pink" : "neon-text-green";
  const segOn = tone === "pink" ? "bg-neon-red shadow-[0_0_6px_#ff4d5e]" : "bg-[#2ee6c9] shadow-[0_0_6px_#2ee6c9]";

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-2 transition-opacity duration-300",
        align === "right" ? "items-end text-right" : "items-start text-left",
        lost ? "opacity-20" : active ? "opacity-100" : "opacity-45"
      )}
      aria-label={`${label} score ${score}, ${seconds} seconds left`}
    >
      <p className={cn("text-[11px] font-bold tracking-wider sm:text-base md:text-lg", toneText)}>
        {label} : {String(score).padStart(2, "0")}
      </p>

      <div className={cn("flex w-full max-w-55 items-center gap-2", align === "right" ? "justify-end" : "justify-start")}>
        {align === "right" && (
          <TimerReadout seconds={seconds} danger={danger} toneText={toneText} />
        )}
        <div
          className={cn(
            "hidden h-3 flex-1 gap-0.5 rounded-sm border border-neon-cyan/50 bg-black/40 p-0.5 sm:flex sm:h-4",
            danger && "animate-status-flash"
          )}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TURN_MS / 1000}
          aria-valuenow={seconds}
        >
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-full flex-1 rounded-[1px] transition-colors duration-150",
                i < filled ? (danger ? "bg-neon-yellow shadow-[0_0_6px_#f8ff3a]" : segOn) : "bg-neon-cyan/10"
              )}
            />
          ))}
        </div>
        {align === "left" && (
          <TimerReadout seconds={seconds} danger={danger} toneText={toneText} />
        )}
      </div>
    </div>
  );
}

function TimerReadout({ seconds, danger, toneText }: { seconds: number; danger: boolean; toneText: string }) {
  return (
    <span
      className={cn(
        "font-mono text-sm tabular-nums sm:text-lg",
        danger ? "neon-text-yellow animate-status-flash" : toneText
      )}
    >
      00:{String(seconds).padStart(2, "0")}
    </span>
  );
}
