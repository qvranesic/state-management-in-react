import React, {useEffect, useMemo, useState} from "react";
import "./App.css";
import {Game} from "./components/Game";
import {HistoryStep} from "./components/Game/GameProvider";
import {PlayedGameList} from "./components/GameResults";
import {SquareValue} from "./components/Square";
import {StrategySelect} from "./components/StrategyPicker";
import {calculateWinner} from "./helpers/calculateWinner";
import {createGame} from "./helpers/createGame";
import {NextSquareValueStrategy} from "./helpers/getGameStartingSquareValue";

export interface ActiveStrategy {
  strategy: NextSquareValueStrategy;
  sinceGameIndex: number;
}

export interface GameDetails {
  id: string;
  gameStartingSquareValue: SquareValue;
  history: HistoryStep[];
  stepNumber: number;
}

interface AppProps {
  firstSquareValue: SquareValue;
}

const App = ({firstSquareValue}: AppProps) => {
  const [activeStrategy, setActiveStrategy] = useState<ActiveStrategy>({
    strategy: "same",
    sinceGameIndex: 0,
  });

  const [activeGame, setActiveGame] = useState<GameDetails>(
    createGame(0, {
      previousWinner: null,
      firstSquareValue,
      nextSquareValueStrategy: activeStrategy.strategy,
    })
  );

  const [playedGames, setPlayedGames] = useState<GameDetails[]>([]);

  const onGameUpdate = (history: HistoryStep[], stepNumber: number) => {
    setActiveGame({
      ...activeGame,
      history,
      stepNumber,
    });
  };

  const activeGameWinner = useMemo(
    () => calculateWinner(activeGame.history[activeGame.stepNumber].squares),
    [activeGame.history, activeGame.stepNumber]
  );

  const startNewGame = () => {
    setPlayedGames([...playedGames, activeGame]);
  };

  useEffect(() => {
    if (!playedGames.length) {
      return;
    }

    setActiveGame(
      createGame(playedGames.length, {
        previousWinner: activeGameWinner,
        firstSquareValue:
          playedGames[activeStrategy.sinceGameIndex]?.gameStartingSquareValue ??
          firstSquareValue,
        nextSquareValueStrategy: activeStrategy.strategy,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playedGames]);

  const renderGame = ({id, history, gameStartingSquareValue}: GameDetails) => {
    return (
      <Game
        key={id}
        oIsFirst={gameStartingSquareValue === "O"}
        initialHistory={history}
        onUpdate={onGameUpdate}
      />
    );
  };

  return (
    <>
      <StrategySelect
        {...activeStrategy}
        onSelect={(strategy) =>
          setActiveStrategy({strategy, sinceGameIndex: playedGames.length})
        }
      />

      <br />

      {renderGame(activeGame)}

      {activeGameWinner && (
        <button onClick={startNewGame}>START NEW GAME</button>
      )}

      <PlayedGameList games={playedGames} />
    </>
  );
};

export default App;
