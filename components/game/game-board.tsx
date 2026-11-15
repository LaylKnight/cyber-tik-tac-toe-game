"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { PLAYERS, type Cell, type Mark } from "@/lib/game";

type Props = {
  board: Cell[];
  current: Mark;
  winLine: number[];
  gameOver: boolean;
  isDraw?: boolean;
  paused?: boolean;
  onPlay: (index: number) => void;
};

const MARK_SRC: Record<Mark, string> = { X: "/img/x.png", O: "/img/o.png" };

export function GameBoard({ board, current, winLine, gameOver, isDraw = false, paused = false, onPlay }: Props) {
  const hasWinner = winLine.length > 0;
  const locked = gameOver || paused;

  return (
    <div
      className="relative mx-auto aspect-square w-[min(84vw,47dvh,420px)]"
      role="grid"
      aria-label="Tic-tac-toe board"
    >
      {/* Neon grid lines */}
      <div className={cn("neon-line neon-line-v pointer-events-none absolute top-[2%] bottom-[2%] left-1/3 w-0.75 -translate-x-1/2", paused && "neon-line-paused")} />
      <div className={cn("neon-line neon-line-v neon-line-delay pointer-events-none absolute top-[2%] bottom-[2%] left-2/3 w-0.75 -translate-x-1/2", paused && "neon-line-paused")} />
      <div className={cn("neon-line pointer-events-none absolute top-1/3 right-[2%] left-[2%] h-0.75 -translate-y-1/2", paused && "neon-line-paused")} />
      <div className={cn("neon-line neon-line-delay pointer-events-none absolute top-2/3 right-[2%] left-[2%] h-0.75 -translate-y-1/2", paused && "neon-line-paused")} />

      <div className="grid h-full w-full grid-cols-3 grid-rows-3">
        {board.map((cell, i) => {
          const isWinCell = winLine.includes(i);
          const disabled = locked || cell !== null;
          const pos = `Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}`;
          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              onClick={() => onPlay(i)}
              disabled={disabled}
              aria-label={
                cell
                  ? `${pos}: ${cell}`
                  : locked
                    ? `${pos}: empty`
                    : `Place ${current} at ${pos.toLowerCase()}`
              }
              className={cn(
                "group relative flex items-center justify-center p-[12%] outline-none",
                "focus-visible:bg-neon-cyan/10",
                !disabled && "cursor-pointer"
              )}
            >
              {cell ? (
                <div
                  key={cell}
                  className={cn(
                    "relative h-full w-full transition-opacity duration-300",
                    hasWinner && !isWinCell && "opacity-15",
                    (isWinCell || isDraw) && "animate-win-blink"
                  )}
                >
                  <div className="animate-mark-in relative h-full w-full">
                    <Image
                      src={MARK_SRC[cell]}
                      alt={cell === "X" ? `${PLAYERS.X.name} mark (X)` : `${PLAYERS.O.name} mark (O)`}
                      fill
                      sizes="150px"
                      priority
                      className={cn(
                        "object-contain select-none",
                        cell === "X"
                          ? "drop-shadow-[0_0_14px_rgba(255,62,165,0.85)]"
                          : "drop-shadow-[0_0_14px_rgba(93,255,143,0.85)]"
                      )}
                      draggable={false}
                    />
                  </div>
                </div>
              ) : (
                !locked && (
                  <div className="relative h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-25 group-focus-visible:opacity-25">
                    <Image
                      src={MARK_SRC[current]}
                      alt=""
                      fill
                      sizes="150px"
                      className="object-contain select-none"
                      draggable={false}
                    />
                  </div>
                )
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
