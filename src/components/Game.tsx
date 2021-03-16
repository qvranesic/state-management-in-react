import React, {useCallback, useState} from "react";
import {calculateWinner} from "../helpers/calculateWinner";
import {Board} from "./Board";

interface GameProps {
  oIsFirst?: boolean;
}

export const Game = ({oIsFirst}: GameProps) => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsFirst] = useState(!oIsFirst);

  const getNextSquareValue = useCallback(() => {
    return stepNumber % 2 === (xIsFirst ? 0 : 1) ? "X" : "O";
  }, [stepNumber, xIsFirst]);

  const handleClick = useCallback(
    (i: number) => {
      const tempHistory = history.slice(0, stepNumber + 1);
      const current = tempHistory[tempHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = getNextSquareValue();
      setHistory([...tempHistory, {squares}]);
      setStepNumber(tempHistory.length);
    },
    [getNextSquareValue, history, stepNumber]
  );

  const jumpTo = (move: number) => {
    setStepNumber(move);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((_step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${getNextSquareValue()}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
