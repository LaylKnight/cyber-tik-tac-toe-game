"use client";

import { useEffect } from "react";
import { Play, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  currentPlayer: string;
  onResume: () => void;
};

export function PauseModal({ open, currentPlayer, onResume }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onResume();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onResume]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-modal-title"
    >
      <div className="chamfer w-full max-w-md bg-linear-to-br from-neon-pink via-neon-purple to-neon-cyan p-0.5 [--cut:24px] drop-shadow-[0_0_28px_rgba(255,62,165,0.45)]">
        <div className="chamfer relative flex flex-col items-center bg-[#070d22] px-6 py-7 text-center [--cut:23px] sm:px-8 sm:py-8">
          <div className="flex items-center gap-2.5 text-neon-pink">
            <ShieldAlert className="size-6 drop-shadow-[0_0_8px_#ff3ea5]" />
            <h2
              id="pause-modal-title"
              className="neon-text-pink text-xl font-black tracking-wider uppercase sm:text-2xl"
            >
              MATCH PAUSED
            </h2>
          </div>

          <p className="mt-4 font-mono text-xs font-bold tracking-[0.18em] text-neon-yellow uppercase">
            Anti-Cheat Shield Active
          </p>

          <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/90 sm:text-base">
            Grid cloaked! No peeking at the board or secret plotting while the clock is frozen.
          </p>

          <p className="mt-2 font-mono text-xs text-neon-cyan/80">
            Up next: <span className="font-bold text-neon-cyan">{currentPlayer}</span>
          </p>

          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onResume}
              aria-label="Resume match"
              title="Resume match"
              className="h-auto gap-3 rounded-full border-2 border-neon-green/80 bg-[#081b18] px-8 py-3.5 text-base font-black tracking-widest text-neon-green uppercase shadow-[0_0_18px_rgba(93,255,143,0.65)] transition-all hover:scale-105 hover:bg-neon-green/20 hover:text-neon-green hover:shadow-[0_0_26px_rgba(93,255,143,0.9)] active:scale-95 sm:text-lg"
            >
              <Play className="size-6" strokeWidth={2.5} />
              <span>Play</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
