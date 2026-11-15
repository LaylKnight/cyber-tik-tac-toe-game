"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function RestartModal({ open, onConfirm, onCancel }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="restart-modal-title"
    >
      <div
        className="chamfer w-full max-w-md bg-linear-to-br from-neon-yellow via-neon-green to-neon-cyan p-0.5 [--cut:22px] drop-shadow-[0_0_24px_rgba(248,255,58,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="chamfer relative bg-[#070d22] p-6 [--cut:21px] sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-neon-yellow/30 pb-3">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="size-5 text-neon-yellow" />
              <h2
                id="restart-modal-title"
                className="neon-text-yellow text-lg font-black tracking-wider uppercase sm:text-xl"
              >
                REBOOT MATCH
              </h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onCancel}
              aria-label="Close confirmation"
              className="rounded-full border border-neon-yellow/40 text-neon-yellow hover:bg-neon-yellow/15 hover:text-neon-yellow"
            >
              <X className="size-5" />
            </Button>
          </div>

          <p className="mt-4 font-mono text-sm leading-relaxed text-foreground/90 sm:text-base">
            Are you sure you want to restart the game?
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="chamfer rounded-none border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-2 font-bold tracking-wider text-neon-cyan uppercase [--cut:10px] hover:bg-neon-cyan/25 hover:text-neon-cyan"
            >
              No
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="chamfer rounded-none border border-neon-yellow/70 bg-neon-yellow/20 px-6 py-2 font-bold tracking-wider text-neon-yellow uppercase [--cut:10px] hover:bg-neon-yellow/35"
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
