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

          <div className="mt-8 flex justify-center">
            <div className="chamfer bg-linear-to-r from-neon-yellow via-neon-green to-neon-yellow p-0.5 [--cut:14px] drop-shadow-[0_0_18px_rgba(248,255,58,0.8)] transition-[filter] duration-300">
              <Button
                type="button"
                variant="ghost"
                onClick={onResume}
                aria-label="Play: resume match"
                title="Resume match"
                className="chamfer group h-auto gap-3 rounded-none bg-linear-to-b from-[#1d2418] to-[#0b0f0a] px-6 py-2.5 [--cut:13px] hover:bg-transparent hover:from-[#2a3520] hover:to-[#10160c] active:scale-[0.98] sm:px-8 sm:py-3"
              >
                <span className="relative flex size-9 items-center justify-center sm:size-10">
                  <span className="animate-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-neon-green/60" />
                  <span className="absolute inset-1 rounded-full border border-neon-green/40 shadow-[0_0_10px_rgba(93,255,143,0.5)_inset]" />
                  <Play
                    className="size-4 translate-x-px text-neon-green drop-shadow-[0_0_6px_#5dff8f] transition-transform duration-300 group-hover:scale-110 sm:size-5"
                    strokeWidth={2.75}
                  />
                </span>
                <span className="flex flex-col items-start leading-none">
                  <span className="neon-text-yellow text-lg font-black tracking-wider sm:text-xl">
                    PLAY
                  </span>
                  <span className="mt-0.5 text-[10px] font-bold tracking-[0.18em] text-neon-green drop-shadow-[0_0_6px_#5dff8f] sm:text-xs">
                    RESUME MATCH
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
