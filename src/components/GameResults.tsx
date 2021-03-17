import {useState} from "react";
import {GameDetails} from "../App";
import {calculateWinner} from "../helpers/calculateWinner";
import {Game} from "./Game";

interface PlayedGameListProps {
  games: GameDetails[];
}

export const PlayedGameList = ({games}: PlayedGameListProps) => {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const renderPreview = ({
    id,
    history,
    gameStartingSquareValue,
  }: GameDetails) => {
    return (
      <Game
        key={id}
        oIsFirst={gameStartingSquareValue === "O"}
        initialHistory={history}
        freeze={true}
      />
    );
  };

  return (
    <>
      <ol>
        {games.map(({history, gameStartingSquareValue}, index) => {
          const current = history[history.length - 1];
          const winner = calculateWinner(current.squares);

          return (
            <li key={index}>
              <span>Starter: {gameStartingSquareValue}</span>
              <span>, Winner: {winner ?? "-"} </span>
              <button
                disabled={previewIndex === index}
                onClick={() => setPreviewIndex(index)}
              >
                Preview
              </button>
            </li>
          );
        })}
      </ol>
      {previewIndex !== null && (
        <div>
          <p>
            <button title="Close preview" onClick={() => setPreviewIndex(null)}>
              X
            </button>{" "}
            Previewing {previewIndex + 1}. game:{" "}
          </p>
          <>
            {games
              .filter((_game, index) => index === previewIndex)
              .map(renderPreview)}
          </>
        </div>
      )}
    </>
  );
};
