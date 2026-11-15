"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TURN_MS } from "@/lib/game";

const RULES = [
  {
    title: "2-Player Grid",
    detail: "Player 1 places X and Player 2 places O on a 3×3 neon board.",
  },
  {
    title: "Take Turns",
    detail: "Players alternate placing one mark per turn in any empty slot.",
  },
  {
    title: `${TURN_MS / 1000}-Second Turn Timer`,
    detail: `Each player has ${TURN_MS / 1000} seconds to make a move before their timer runs out.`,
  },
  {
    title: "Auto-Move on Timeout",
    detail:
      "If a player's time expires, the system automatically places their X or O in a random empty slot and passes the turn.",
  },
  {
    title: "Win or Draw",
    detail:
      "Align 3 of your marks horizontally, vertically, or diagonally to win. Filling all 9 slots with no winner ends in a draw.",
  },
  {
    title: "Pause & Restart",
    detail:
      "Use Pause/Play to freeze or resume the match timer, and Restart to clear the board while keeping your scores.",
  },
];

export function RulesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-modal-title"
    >
      <div
        className="chamfer w-full max-w-lg bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-purple p-[2px] [--cut:22px] drop-shadow-[0_0_24px_rgba(56,232,255,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="chamfer relative bg-[#070d22] p-6 [--cut:21px] sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-neon-cyan/30 pb-3">
            <h2
              id="rules-modal-title"
              className="neon-text-cyan text-xl font-black tracking-wider uppercase sm:text-2xl"
            >
              GAME RULES
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close rules"
              className="rounded-full border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/15 hover:text-neon-cyan"
            >
              <X className="size-5" />
            </Button>
          </div>

          <ol className="mt-4 space-y-3 text-sm sm:text-base">
            {RULES.map((rule, index) => (
              <li key={rule.title} className="flex gap-3">
                <span className="font-mono text-xs font-bold text-neon-yellow sm:text-sm">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <div>
                  <p className="font-bold tracking-wide text-neon-cyan">{rule.title}</p>
                  <p className="mt-0.5 font-mono text-xs leading-relaxed text-foreground/80 sm:text-sm">
                    {rule.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              onClick={onClose}
              className="chamfer rounded-none bg-neon-cyan/20 px-6 py-2 font-bold tracking-wider text-neon-cyan uppercase [--cut:10px] hover:bg-neon-cyan/30 border border-neon-cyan/60"
            >
              GOT IT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
