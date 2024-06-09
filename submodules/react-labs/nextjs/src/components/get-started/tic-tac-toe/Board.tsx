import Square from '@/components/get-started/tic-tac-toe/Square';
import BoardRow from '@/components/get-started/tic-tac-toe/BoardRow';
import { calculatePlayer, calculateStatus, calculateWinner } from '@/infrastructure/tic-tac-toe/actions';

type BoardProps = {
  squares: string[];
  playerX: boolean;
  onPlay: (squares: string[]) => void;
};

export default function Board(props: BoardProps) {
  const { squares, playerX, onPlay } = props;

  function handleClick(index: number) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = calculatePlayer(playerX);

    onPlay(newSquares);
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(
    squares,
    winner?.player || calculatePlayer(playerX),
    Boolean(winner),
  );

  const boards = [0, 1, 2].map((boardIndex) => (
    <BoardRow key={boardIndex}>
      {[0, 1, 2].map((squareIndex) => {
        const index = squareIndex + (boardIndex * 3);

        return (
          <Square
            key={index}
            value={squares[index]}
            highlight={Boolean(winner?.squares.includes(index))}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </BoardRow>
  ));

  return (
    <>
      <p className="mb-3">{status}</p>
      {boards}
    </>
  );
}
