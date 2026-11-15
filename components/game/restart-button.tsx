"use client";

import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RestartButton({ onClick, highlight }: { onClick: () => void; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "chamfer p-0.5 transition-[filter] duration-300 [--cut:14px]",
        "bg-linear-to-r from-neon-yellow via-neon-green to-neon-yellow",
        highlight
          ? "animate-status-flash drop-shadow-[0_0_18px_rgba(248,255,58,0.8)]"
          : "drop-shadow-[0_0_10px_rgba(93,255,143,0.45)]"
      )}
    >
      <Button
        onClick={onClick}
        variant="ghost"
        className={cn(
          "chamfer group h-auto gap-3 rounded-none px-5 py-2 [--cut:13px] sm:px-7 sm:py-2.5",
          "bg-linear-to-b from-[#1d2418] to-[#0b0f0a] hover:from-[#2a3520] hover:to-[#10160c]",
          "hover:bg-transparent active:scale-[0.98]"
        )}
        aria-label={highlight ? "Rematch: reboot match" : "Restart: reboot match"}
      >
        <span className="relative hidden size-9 items-center justify-center sm:flex sm:size-10">
          <span className="animate-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-neon-green/60" />
          <span className="absolute inset-1 rounded-full border border-neon-green/40 shadow-[0_0_10px_rgba(93,255,143,0.5)_inset]" />
          <RotateCw
            className="size-4 text-neon-green drop-shadow-[0_0_6px_#5dff8f] transition-transform duration-500 group-hover:rotate-180 sm:size-5"
            strokeWidth={2.75}
          />
        </span>
        <span className="flex flex-col items-center leading-none sm:items-start">
          <span className="neon-text-yellow text-lg font-black tracking-wider sm:text-xl">
            {highlight ? "REMATCH" : "RESTART"}
          </span>
          <span className="mt-0.5 text-[10px] font-bold tracking-[0.18em] text-neon-green drop-shadow-[0_0_6px_#5dff8f] sm:text-xs">
            REBOOT MATCH
          </span>
        </span>
      </Button>
    </div>
  );
}
