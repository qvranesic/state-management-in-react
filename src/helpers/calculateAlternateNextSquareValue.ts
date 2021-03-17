import {SquareValue} from "../components/Square";
import {getOtherSquareValue} from "./getOtherSquareValue";

export const calculateAlternateNextSquareValue = (
  firstSquareValue: SquareValue,
  index: number
) => {
  return index % 2 === 0
    ? firstSquareValue
    : getOtherSquareValue(firstSquareValue);
};
