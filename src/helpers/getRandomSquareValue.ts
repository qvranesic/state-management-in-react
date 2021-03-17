import {SquareValue} from "../components/Square";

export const getRandomSquareValue = (): SquareValue => {
  return Math.random() < 0.5 ? "X" : "O";
};
