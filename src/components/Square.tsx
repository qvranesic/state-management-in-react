import React from "react";

export type SquareValue = "X" | "O";
export type NullableSquareValue = SquareValue | null;

interface SquareProps {
  value: NullableSquareValue;
  onClick: () => void;
}

export const Square = ({value, onClick}: SquareProps) => (
  <button className="square" onClick={() => onClick()}>
    {value}
  </button>
);
