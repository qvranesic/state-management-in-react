import {useContext} from "react";
import {calculateWinner} from "../helpers/calculateWinner";
import {GameContext} from "./Game/GameProvider";

export const Status = () => {
  const {history, stepNumber, nextSquareValue} = useContext(GameContext);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${nextSquareValue}`;

  return <div>{status}</div>;
};
