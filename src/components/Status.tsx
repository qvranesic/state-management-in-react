import {calculateWinner} from "../helpers/calculateWinner";
import {SquareValue} from "./Square";

interface StatusProps {
  squares: SquareValue[];
  next: SquareValue;
}

export const Status = ({squares, next}: StatusProps) => {
  const winner = calculateWinner(squares);

  const status = winner ? `Winner: ${winner}` : `Next player: ${next}`;

  return <div>{status}</div>;
};
