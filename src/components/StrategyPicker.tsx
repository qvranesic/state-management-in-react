import {ChangeEvent} from "react";
import {ActiveStrategy} from "../App";
import {
  allNextSquareValueStrategies,
  NextSquareValueStrategy,
} from "../helpers/getGameStartingSquareValue";

interface StrategySelectProps extends ActiveStrategy {
  onSelect: (strategy: NextSquareValueStrategy) => void;
}

export const StrategySelect = ({
  strategy,
  sinceGameIndex,
  onSelect,
}: StrategySelectProps) => (
  <div>
    <span>Next game starting square value strategy: </span>
    <select
      value={strategy}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        const strategy = e.target.value as NextSquareValueStrategy;
        onSelect(strategy);
      }}
    >
      {allNextSquareValueStrategies.map((allNextSquareValueStrategy) => (
        <option
          key={allNextSquareValueStrategy}
          value={allNextSquareValueStrategy}
        >
          {allNextSquareValueStrategy}
        </option>
      ))}
    </select>
    <span> since {sinceGameIndex + 1}. game</span>
  </div>
);
