import React from "react";
import {Board} from "./Board";
import {GameProvider, GameProviderProps} from "./GameProvider";
import {Moves} from "./Moves";
import {Status} from "./Status";

export const Game = (props: GameProviderProps) => (
  <GameProvider {...props}>
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <Status />
        <Moves />
      </div>
    </div>
  </GameProvider>
);
