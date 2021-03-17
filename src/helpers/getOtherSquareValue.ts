import {SquareValue} from "../components/Square";

export const getOtherSquareValue = (value: SquareValue) => {
  return value === "X" ? "O" : "X";
};
