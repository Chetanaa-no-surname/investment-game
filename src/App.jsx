import { useState } from "react";
import Setup from "./Setup";
import PlayerInput from "./PlayerInput";
import Results from "./Results";
import "./App.css";

const initialState = {
  phase: "setup",
  numPlayers: 2,
  players: [],
  currentPlayerIndex: 0,
};


export default function App() {
  const [game, setGame] = useState(initialState);

  const handleSetupComplete = ({ numPlayers, playerNames }) => {
    const players = playerNames.map((name) => ({
      name,
      assetA: null,
      assetB: null,
      submitted: false,
    }));
    setGame({ phase: "input", numPlayers, players, currentPlayerIndex: 0 });
  };

  const handleReset = () => setGame(initialState);

  const handlePlayerSubmit = ({ assetA, assetB }) => {
    setGame((prev) => {
      const updatedPlayers = prev.players.map((p, i) =>
        i === prev.currentPlayerIndex
          ? { ...p, assetA, assetB, submitted: true }
          : p
      );
      const nextIndex = prev.currentPlayerIndex + 1;
      const allDone = nextIndex >= prev.numPlayers;
      return {
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: nextIndex,
        phase: allDone ? "results" : "input",
      };
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">The Investment Game</h1>
      </header>

      <main className="app-main">
        {game.phase === "setup" && (
          <Setup onComplete={handleSetupComplete} />
        )}
        {game.phase === "input" && (
          <PlayerInput
            key = {game.currentPlayerIndex} // reset form for each player
            player={game.players[game.currentPlayerIndex]}
            playerIndex={game.currentPlayerIndex}
            totalPlayers={game.numPlayers}
            onSubmit={handlePlayerSubmit}
          />
        )}
        {game.phase === "results" && (
          <Results players={game.players} numPlayers={game.numPlayers} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
