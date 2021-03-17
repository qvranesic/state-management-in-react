import {NullableSquareValue, SquareValue} from "../components/Square";
import {calculateAlternateNextSquareValue} from "./calculateAlternateNextSquareValue";
import {getOtherSquareValue} from "./getOtherSquareValue";
import {getRandomSquareValue} from "./getRandomSquareValue";

export const allNextSquareValueStrategies = [
  "alternate",
  "loser",
  "winner",
  "random",
  "same",
] as const;
type NextSquareValueStrategyTuple = typeof allNextSquareValueStrategies;
export type NextSquareValueStrategy = NextSquareValueStrategyTuple[number];

export interface NextGameOptions {
  previousWinner: NullableSquareValue;
  nextSquareValueStrategy: NextSquareValueStrategy;
  firstSquareValue: SquareValue;
}

export const getGameStartingSquareValue = (
  index: number,
  {nextSquareValueStrategy, firstSquareValue, previousWinner}: NextGameOptions
): SquareValue => {
  switch (nextSquareValueStrategy) {
    case "alternate":
      return calculateAlternateNextSquareValue(firstSquareValue, index);
    case "loser":
      return previousWinner
        ? getOtherSquareValue(previousWinner)
        : getRandomSquareValue();
    case "winner":
      return previousWinner ?? getRandomSquareValue();
    case "random":
      return getRandomSquareValue();
    case "same":
      return firstSquareValue;
  }
};
