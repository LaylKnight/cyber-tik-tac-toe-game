"use client";

import { useEffect, useReducer, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PLAYERS, TURN_MS, gameReducer, initialState } from "@/lib/game";
import { GameBoard } from "./game-board";
import { PlayerPanel } from "./player-panel";
import { PauseModal } from "./pause-modal";
import { RestartButton } from "./restart-button";
import { RestartModal } from "./restart-modal";
import { RulesModal } from "./rules-modal";
import { StartModal } from "./start-modal";

const TICK_MS = 100;
const GITHUB_REPO_URL = "https://github.com/LaylKnight/cyber-tik-tak-toe-game";

export function CyberTicTacToe() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [started, setStarted] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [restartOpen, setRestartOpen] = useState(false);
  const { board, current, winner, winLine, isDraw, timeLeft, timedOut, paused, scores, draws } = state;
  const gameOver = winner !== null || isDraw;

  // Turn timer — counts down only while the match is started, active, and unpaused.
  useEffect(() => {
    if (!started || gameOver || paused || rulesOpen || restartOpen) return;
    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      dispatch({ type: "tick", delta: now - last, random: Math.random() });
      last = now;
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [started, gameOver, paused, rulesOpen, restartOpen]);

  let headline: string;
  let subline: string;
  if (winner) {
    headline = `${PLAYERS[winner].name} wins!`;
    subline = timedOut ? `${PLAYERS[timedOut].name} auto-placed & won` : "Match terminated";
  } else if (isDraw) {
    headline = "It's a draw!";
    subline = "System deadlock";
  } else if (paused) {
    headline = "Match paused";
    subline = `${PLAYERS[current].name} on hold`;
  } else {
    headline = `${PLAYERS[current].name} turn`;
    subline = timedOut ? `${PLAYERS[timedOut].name} timed out — auto-placed` : "Match active";
  }

  return (
    <main className="cyber-bg relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-3 py-3 sm:px-6 sm:py-4">
      {/* Atmosphere layers */}
      <div className="cyber-grid pointer-events-none absolute inset-0" />
      <div className="cyber-stars pointer-events-none absolute inset-0 opacity-70" />
      <div className="scanlines pointer-events-none absolute inset-0 z-50" />

      {/* Main HUD frame */}
      <section
        className={cn(
          "chamfer relative w-full max-w-4xl p-[1.5px] [--cut:28px]",
          "bg-linear-to-br from-neon-cyan/80 via-neon-blue/40 to-neon-purple/70"
        )}
      >
        <div className="chamfer relative flex flex-col items-center gap-3 bg-[#060b1d]/92 px-3 pt-4 pb-5 backdrop-blur-sm [--cut:27px] sm:gap-4 sm:px-8 sm:pt-5 sm:pb-6">
          <div className="cyber-grid pointer-events-none absolute inset-0 opacity-60" />

          {/* Title */}
          <header className="relative">
            <div className="chamfer bg-neon-cyan/70 p-0.5 [--cut:14px] drop-shadow-[0_0_14px_rgba(56,232,255,0.5)]">
              <div className="chamfer bg-linear-to-b from-[#0d2236] to-[#06101d] px-5 py-1.5 [--cut:13px] sm:px-9 sm:py-2">
                <h1 className="neon-text-cyan animate-glitch text-2xl font-black tracking-[0.08em] sm:text-4xl">
                  CYBER T-T-T
                </h1>
              </div>
            </div>
          </header>

          {/* Announcement board */}
          <div className="relative flex flex-col items-center text-center" aria-live="polite">
            <p
              className={cn(
                "neon-text-yellow text-lg leading-tight font-black tracking-wide uppercase sm:text-2xl md:text-3xl",
                (winner || isDraw) && "animate-status-flash"
              )}
            >
              {headline}
            </p>
            <p
              className={cn(
                "mt-1 text-xs font-bold tracking-[0.15em] uppercase sm:text-sm",
                timedOut && !gameOver ? "neon-text-pink" : "text-neon-yellow/70"
              )}
            >
              {subline}
            </p>
          </div>

          {/* Scoreboard: Player 1 | Draw | Player 2 */}
          <div className="relative grid w-full grid-cols-[1fr_auto_1fr] items-start gap-2 sm:gap-6">
            <PlayerPanel
              label={PLAYERS.X.label}
              score={scores.X}
              timeLeft={current === "X" && !gameOver ? timeLeft : TURN_MS}
              active={!gameOver ? current === "X" : winner === "X"}
              lost={winner === "O"}
              tone="pink"
              align="left"
            />

            <div
              className={cn(
                "flex flex-col items-center justify-center px-2 text-center transition-opacity duration-300",
                gameOver && !isDraw ? "opacity-35" : "opacity-100"
              )}
              aria-label={`Draw score ${draws}`}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-neon-cyan/75 uppercase sm:text-xs">
                DRAW
              </span>
              <span
                className={cn(
                  "neon-text-cyan font-mono text-lg font-bold tabular-nums sm:text-2xl",
                  isDraw && "animate-status-flash"
                )}
              >
                {String(draws).padStart(2, "0")}
              </span>
            </div>

            <PlayerPanel
              label={PLAYERS.O.label}
              score={scores.O}
              timeLeft={current === "O" && !gameOver ? timeLeft : TURN_MS}
              active={!gameOver ? current === "O" : winner === "O"}
              lost={winner === "X"}
              tone="green"
              align="right"
            />
          </div>

          {/* Board */}
          <div className="relative">
            <GameBoard
              board={board}
              current={current}
              winLine={winLine}
              gameOver={gameOver}
              isDraw={isDraw}
              paused={paused}
              onPlay={(index) => dispatch({ type: "play", index })}
            />
          </div>

          {/* Controls: Rules (?) | Restart | Pause/Play */}
          <div className="relative flex items-center justify-center gap-3 sm:gap-5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setRulesOpen(true)}
              aria-label="Game rules"
              title="Game rules"
              className={cn(
                "size-10 rounded-full border-2 border-neon-cyan/70 bg-[#081326]/90 text-neon-cyan sm:size-12",
                "shadow-[0_0_12px_rgba(56,232,255,0.45)] transition-all",
                "hover:scale-105 hover:border-neon-cyan hover:bg-neon-cyan/15 hover:text-neon-cyan hover:shadow-[0_0_18px_rgba(56,232,255,0.75)]",
                "active:scale-95"
              )}
            >
              <svg
                viewBox="5 4 14 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.25}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 sm:size-6"
                aria-hidden="true"
              >
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </Button>

            <RestartButton
              onClick={() => {
                if (gameOver) {
                  dispatch({ type: "restart" });
                } else {
                  setRestartOpen(true);
                }
              }}
              highlight={gameOver}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={gameOver}
              onClick={() => dispatch({ type: "togglePause" })}
              aria-label={paused ? "Resume match" : "Pause match"}
              title={paused ? "Resume match" : "Pause match"}
              className={cn(
                "size-10 rounded-full border-2 bg-[#081326]/90 sm:size-12",
                "transition-all hover:scale-105 active:scale-95",
                paused
                  ? "border-neon-green/80 text-neon-green shadow-[0_0_14px_rgba(93,255,143,0.6)] hover:bg-neon-green/15 hover:text-neon-green"
                  : "border-neon-pink/70 text-neon-pink shadow-[0_0_12px_rgba(255,62,165,0.45)] hover:border-neon-pink hover:bg-neon-pink/15 hover:text-neon-pink hover:shadow-[0_0_18px_rgba(255,62,165,0.75)]"
              )}
            >
              {paused ? (
                <Play className="size-5 translate-x-px sm:size-6" strokeWidth={2.25} />
              ) : (
                <Pause className="size-5 sm:size-6" strokeWidth={2.25} />
              )}
            </Button>
          </div>

          <StartModal
            open={!started && !rulesOpen}
            onStart={() => setStarted(true)}
            onOpenRules={() => setRulesOpen(true)}
          />
          <RulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />
          <PauseModal
            open={paused && !gameOver}
            currentPlayer={PLAYERS[current].label}
            onResume={() => dispatch({ type: "togglePause" })}
          />
          <RestartModal
            open={restartOpen}
            onConfirm={() => {
              dispatch({ type: "restart" });
              setRestartOpen(false);
            }}
            onCancel={() => setRestartOpen(false)}
          />

          {/* Footer HUD details */}
          <footer className="relative flex w-full flex-col items-center justify-between gap-2 pt-2 text-center font-mono text-[10px] tracking-wider sm:flex-row sm:items-end sm:text-left sm:text-[11px]">
            <p className="leading-snug text-neon-red/75">
              Built with React 19, Next.js,
              <br />
              Tailwind CSS, ShadCN/UI
            </p>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-neon-cyan/75 underline decoration-neon-cyan/40 underline-offset-4 transition-colors hover:text-neon-cyan hover:decoration-neon-cyan"
            >
              See Code on GitHub
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}
