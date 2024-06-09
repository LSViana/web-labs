export function calculatePlayer(playerX: boolean): string {
  return playerX ? 'X' : 'O';
}

export function calculateStatus(squares: string[], player: string, winner: boolean): string {
  if (squares.every(Boolean)) {
    return 'Draw';
  }

  if (winner) {
    return `Winner: ${player}`;
  }

  return `Next player: ${player}`;
}

type WinnerResult = {
  player: string;
  squares: number[];
};

export function calculateWinner(squares: string[]): WinnerResult | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        squares: lines[i],
      };
    }
  }

  return null;
}

type LastMovementResult = {
  row: number;
  column: number;
};

export function calculateLastMovement(
  previousHistory: string[],
  newHistory: string[],
): LastMovementResult {
  for (let x = 0; x < 3; x += 1) {
    for (let y = 0; y < 3; y += 1) {
      const index = x + y * 3;

      if (!previousHistory[index] && Boolean(newHistory[index])) {
        const row = y + 1;
        const column = x + 1;

        return {
          row,
          column,
        };
      }
    }
  }

  throw Error('Last movement was not found.');
}
