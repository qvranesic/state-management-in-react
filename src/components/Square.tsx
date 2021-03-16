import React from "react";

export type SquareValue = "X" | "O" | null;

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

export const Square = ({value, onClick}: SquareProps) => (
  <button className="square" onClick={() => onClick()}>
    {value}
  </button>
);
