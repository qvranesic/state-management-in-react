import {defaultHistory} from "../components/Game/GameProvider";
import {
  getGameStartingSquareValue,
  NextGameOptions,
} from "./getGameStartingSquareValue";

export const createGame = (index: number, options: NextGameOptions) => {
  return {
    id: index.toString(),
    history: defaultHistory,
    stepNumber: 0,
    gameStartingSquareValue: getGameStartingSquareValue(index, options),
  };
};
