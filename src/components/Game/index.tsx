import React from "react";
import {Board} from "../Board";
import {Moves} from "../Moves";
import {Status} from "../Status";
import {GameProvider} from "./GameProvider";

interface GameProps {
  oIsFirst?: boolean;
}

export const Game = ({oIsFirst}: GameProps) => (
  <GameProvider oIsFirst={oIsFirst}>
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
