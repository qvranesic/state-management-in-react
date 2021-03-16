import React, {useContext} from "react";
import {Square} from "../Square";
import {GameContext} from "./GameProvider";

export const Board = () => {
  const {history, stepNumber, squareClick} = useContext(GameContext);

  const renderSquare = (i: number) => {
    const current = history[stepNumber];
    return <Square value={current.squares[i]} onClick={() => squareClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
