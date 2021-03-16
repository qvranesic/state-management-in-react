import React, {useState} from "react";
import "./App.css";
import {Game} from "./components/Game";
import {SquareValue} from "./components/Square";
import {calculateNext} from "./helpers/calculateNext";

const App = () => {
  const [games, setGames] = useState<SquareValue[]>([null]);

  const onGameFinish = (winner: SquareValue) => {
    setGames([...games.slice(0, -1), winner, null]);
  };

  return (
    <>
      {games.map((winner, index) => (
        <Game
          key={index}
          oIsFirst={calculateNext(index) === "O"}
          onFinish={onGameFinish}
          freeze={winner !== null}
        />
      ))}
    </>
  );
};

export default App;
