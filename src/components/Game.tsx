import React, {useCallback, useEffect, useState} from "react";
import {calculateNext} from "../helpers/calculateNext";
import {calculateWinner} from "../helpers/calculateWinner";
import {Board} from "./Board";
import {Moves} from "./Moves";
import {Status} from "./Status";

interface GameProps {
  oIsFirst?: boolean;
}

export const Game = ({oIsFirst}: GameProps) => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsFirst] = useState(!oIsFirst);

  const getNextSquareValue = useCallback(() => {
    return calculateNext(stepNumber, xIsFirst);
  }, [stepNumber, xIsFirst]);

  useEffect(() => {
    setStepNumber(history.length - 1);
  }, [history]);

  const jumpTo = (move: number) => setStepNumber(move);

  const handleClick = (i: number) => {
    const tempHistory = history.slice(0, stepNumber + 1);
    const current = tempHistory[tempHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = getNextSquareValue();
    setHistory([...tempHistory, {squares}]);
  };

  const currentStep = history[stepNumber];

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentStep.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <Status squares={currentStep.squares} next={getNextSquareValue()} />
        <Moves history={history} jumpTo={jumpTo} />
      </div>
    </div>
  );
};
