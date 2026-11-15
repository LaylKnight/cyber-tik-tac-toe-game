"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onStart: () => void;
  onOpenRules: () => void;
};

export function StartModal({ open, onStart, onOpenRules }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="start-modal-title"
    >
      <div className="chamfer w-full max-w-md bg-linear-to-br from-neon-cyan via-neon-blue to-neon-purple p-0.5 [--cut:24px] drop-shadow-[0_0_28px_rgba(56,232,255,0.45)]">
        <div className="chamfer relative flex flex-col items-center bg-[#070d22] px-6 py-7 text-center [--cut:23px] sm:px-8 sm:py-8">
          <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-neon-pink uppercase">
            2-Player Neon Arena
          </p>

          <h2
            id="start-modal-title"
            className="neon-text-cyan animate-glitch mt-2 text-3xl font-black tracking-[0.08em] uppercase sm:text-4xl"
          >
            CYBER T-T-T
          </h2>

          <p className="mt-3 font-mono text-sm leading-relaxed text-foreground/85 sm:text-base">
            Welcome Challengers!
            <br />
            Take turns on the 3×3 neon grid before the 10-second clock hits zero!
          </p>

          <div className="mt-7 flex w-full flex-col items-center gap-3">
            <div className="chamfer bg-linear-to-r from-neon-yellow via-neon-green to-neon-yellow p-0.5 [--cut:14px] drop-shadow-[0_0_18px_rgba(248,255,58,0.8)] transition-[filter] duration-300">
              <Button
                type="button"
                variant="ghost"
                onClick={onStart}
                className="chamfer group h-auto gap-3 rounded-none bg-linear-to-b from-[#1d2418] to-[#0b0f0a] px-6 py-2.5 [--cut:13px] hover:bg-transparent hover:from-[#2a3520] hover:to-[#10160c] active:scale-[0.98] sm:px-8 sm:py-3"
                aria-label="Start game: enter arena"
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
                    START GAME
                  </span>
                  <span className="mt-0.5 text-[10px] font-bold tracking-[0.18em] text-neon-green drop-shadow-[0_0_6px_#5dff8f] sm:text-xs">
                    ENTER ARENA
                  </span>
                </span>
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={onOpenRules}
              className="chamfer h-auto gap-2 rounded-none border border-neon-cyan/45 bg-neon-cyan/5 px-5 py-2 text-xs font-bold tracking-widest text-neon-cyan uppercase [--cut:10px] hover:bg-neon-cyan/15 hover:text-neon-cyan sm:text-sm"
            >
              <svg
                viewBox="5 4 14 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.25}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span>How to Play / Rules</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
