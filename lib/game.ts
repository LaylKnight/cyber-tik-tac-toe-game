export type Mark = "X" | "O";
export type Cell = Mark | null;

export const TURN_MS = 10_000;

export const PLAYERS: Record<Mark, { name: string; label: string }> = {
  X: { name: "Player 1", label: "Player 1 [X]" },
  O: { name: "Player 2", label: "Player 2 [O]" },
};

const LINES: readonly [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function findWinner(board: Cell[]): { winner: Mark; line: number[] } | null {
  for (const [a, b, c] of LINES) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return { winner: v, line: [a, b, c] };
  }
  return null;
}

export type GameState = {
  board: Cell[];
  current: Mark;
  winner: Mark | null;
  winLine: number[];
  isDraw: boolean;
  timeLeft: number;
  timedOut: Mark | null;
  paused: boolean;
  scores: Record<Mark, number>;
  draws: number;
};

export type GameAction =
  | { type: "play"; index: number }
  | { type: "tick"; delta: number; random?: number }
  | { type: "togglePause" }
  | { type: "restart" };

export const initialState: GameState = {
  board: Array(9).fill(null),
  current: "X",
  winner: null,
  winLine: [],
  isDraw: false,
  timeLeft: TURN_MS,
  timedOut: null,
  paused: false,
  scores: { X: 0, O: 0 },
  draws: 0,
};

const other = (m: Mark): Mark => (m === "X" ? "O" : "X");

function applyMove(state: GameState, index: number, timedOut: Mark | null): GameState {
  const board = state.board.slice();
  board[index] = state.current;
  const result = findWinner(board);
  if (result) {
    return {
      ...state,
      board,
      winner: result.winner,
      winLine: result.line,
      timedOut,
      scores: { ...state.scores, [result.winner]: state.scores[result.winner] + 1 },
    };
  }
  const isDraw = board.every(Boolean);
  return {
    ...state,
    board,
    isDraw,
    current: isDraw ? state.current : other(state.current),
    timeLeft: TURN_MS,
    timedOut,
    draws: isDraw ? state.draws + 1 : state.draws,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  const over = state.winner !== null || state.isDraw;

  switch (action.type) {
    case "play": {
      if (over || state.paused || state.board[action.index]) return state;
      return applyMove(state, action.index, null);
    }
    case "tick": {
      if (over || state.paused) return state;
      const timeLeft = state.timeLeft - action.delta;
      if (timeLeft > 0) return { ...state, timeLeft };
      // Time's up: automatically place the current player's mark in a random empty slot.
      const empty = state.board.reduce<number[]>((acc, cell, i) => {
        if (cell === null) acc.push(i);
        return acc;
      }, []);
      if (empty.length === 0) return state;
      const pick = empty[Math.floor((action.random ?? Math.random()) * empty.length)];
      return applyMove(state, pick, state.current);
    }
    case "togglePause": {
      if (over) return state;
      return { ...state, paused: !state.paused };
    }
    case "restart":
      return { ...initialState, scores: state.scores, draws: state.draws, paused: false };
  }
}
