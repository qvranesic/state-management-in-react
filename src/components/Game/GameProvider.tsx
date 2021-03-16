import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {calculateNext} from "../../helpers/calculateNext";
import {calculateWinner} from "../../helpers/calculateWinner";
import {SquareValue} from "../Square";

interface GameProviderProps {
  oIsFirst?: boolean;
}

interface IGameContext {
  history: {squares: SquareValue[]}[];
  stepNumber: number;
  nextSquareValue: SquareValue;
  jumpTo: (move: number) => void;
  squareClick: (index: number) => void;
}

export const GameContext = createContext<IGameContext>({} as any);

export const GameProvider = ({
  children,
  oIsFirst,
}: PropsWithChildren<GameProviderProps>) => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsFirst] = useState(!oIsFirst);

  const getNextSquareValue = useCallback(() => {
    return calculateNext(stepNumber, xIsFirst);
  }, [stepNumber, xIsFirst]);

  useEffect(() => {
    setStepNumber(history.length - 1);
  }, [history]);

  const jumpTo = (move: number) => setStepNumber(move);

  const squareClick = (index: number) => {
    const tempHistory = history.slice(0, stepNumber + 1);
    const current = tempHistory[tempHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = getNextSquareValue();
    setHistory([...tempHistory, {squares}]);
  };

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
