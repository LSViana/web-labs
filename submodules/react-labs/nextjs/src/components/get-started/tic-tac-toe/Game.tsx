import { useState } from 'react';
import Board from '@/components/get-started/tic-tac-toe/Board';
import { calculateLastMovement } from '@/infrastructure/tic-tac-toe/actions';

export default function Game() {
  const [history, setHistory] = useState<string[][]>([
    new Array<string>(9).fill(''),
  ]);
  const [index, setIndex] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);

  function goToHistory(newIndex: number) {
    setIndex(newIndex);
  }

  function toggleSorting() {
    setSortAscending(!sortAscending);
  }

  function handlePlay(newSquares: string[]) {
    // In the next line, it's `index + 1` because it's an exclusive index.
    const newHistory = [...history.slice(0, index + 1), newSquares];

    setHistory(newHistory);
    setIndex(index + 1);
  }

  const buttonClasses = 'w-48 text-center px-3 py-1 rounded bg-gray-400/50';
  const playerX = index % 2 === 0;
  const squares = history[index];
  const moves = history.map((x, i) => {
    const sortedIndex = sortAscending ? i : history.length - i - 1;

    let content;

    if (sortedIndex === index) {
      content = (
        <div className="w-48 text-center inline-block px-3 py-1 rounded border border-gray-400">
          {`You are at move #${sortedIndex}.`}
        </div>
      );
    } else if (sortedIndex === 0) {
      content = (
        <button type="button" onClick={() => goToHistory(sortedIndex)} className={buttonClasses}>
          Go to start
        </button>
      );
    } else {
      const lastMovement = calculateLastMovement(history[sortedIndex - 1], history[sortedIndex]);

      content = (
        <button type="button" onClick={() => goToHistory(sortedIndex)} className={buttonClasses}>
          {`Go to move #${sortedIndex} (R${lastMovement.row}C${lastMovement.column})`}
        </button>
      );
    }

    return (
      // Disable because the `history` is never reordered.
      // eslint-disable-next-line react/no-array-index-key
      <li key={i} className="mt-1">{content}</li>
    );
  });

  return (
    <div>
      <Board squares={squares} playerX={playerX} onPlay={handlePlay} />
      <p className="mt-4 mb-2">
        History
        (
        <button type="button" className="text-blue-400 underline" onClick={toggleSorting}>
          {sortAscending ? 'sort descending' : 'sort ascending'}
        </button>
        )
      </p>
      <ul className="list-disc">
        {moves}
      </ul>
    </div>
  );
}
