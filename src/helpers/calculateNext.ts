import {SquareValue} from "../components/Square";

export function calculateNext(
  stepNumber: number,
  xIsFirst: boolean = true
): SquareValue {
  return stepNumber % 2 === (xIsFirst ? 0 : 1) ? "X" : "O";
}
