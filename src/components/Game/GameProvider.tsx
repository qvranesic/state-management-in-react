import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {calculateAlternateNextSquareValue} from "../../helpers/calculateAlternateNextSquareValue";
import {calculateWinner} from "../../helpers/calculateWinner";
import {NullableSquareValue, SquareValue} from "../Square";

export interface HistoryStep {
  squares: NullableSquareValue[];
}

export const defaultHistory: HistoryStep[] = [{squares: Array(9).fill(null)}];

interface IGameContext {
  history: HistoryStep[];
  stepNumber: number;
  nextSquareValue: SquareValue;
  jumpTo: (move: number) => void;
  squareClick: (index: number) => void;
}

export const GameContext = createContext<IGameContext>({} as any);

export interface GameProviderProps {
  oIsFirst?: boolean;
  initialHistory?: HistoryStep[];
  freeze?: boolean;
  onUpdate?: (history: HistoryStep[], stepNumber: number) => void;
}

export const GameProvider = ({
  children,
  oIsFirst,
  initialHistory,
  freeze,
  onUpdate,
}: PropsWithChildren<GameProviderProps>) => {
  const [history, setHistory] = useState(initialHistory ?? defaultHistory);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsFirst] = useState(!oIsFirst);

  const getNextSquareValue = useCallback(() => {
    return calculateAlternateNextSquareValue(xIsFirst ? "X" : "O", stepNumber);
  }, [stepNumber, xIsFirst]);

  useEffect(() => {
    setStepNumber(history.length - 1);
  }, [history]);

  const jumpTo = (move: number) => {
    setStepNumber(move);
  };

  const squareClick = (index: number) => {
    const tempHistory = history.slice(0, stepNumber + 1);
    const current = tempHistory[tempHistory.length - 1];
    const squares = current.squares.slice();
    if (freeze || calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = getNextSquareValue();
    setHistory([...tempHistory, {squares}]);
  };

  useEffect(() => {
    onUpdate && onUpdate(history, stepNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepNumber]);

  return (
    <GameContext.Provider
      value={{
        history,
        stepNumber,
        nextSquareValue: getNextSquareValue(),
        squareClick,
        jumpTo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
