import {SquareValue} from "./Square";

interface MovesProps {
  history: {
    squares: SquareValue[];
  }[];
  jumpTo: (move: number) => void;
}

export const Moves = ({history, jumpTo}: MovesProps) => {
  const moves = history.map((_step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return <ol>{moves}</ol>;
};
