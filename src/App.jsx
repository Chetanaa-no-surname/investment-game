import { useState } from "react";
import Setup from "./Setup";
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

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">The Investment Game</h1>
      </header>

      <main className="app-main">
        {game.phase === "setup" && (
          <Setup onComplete={handleSetupComplete} />
        )}
      </main>
    </div>
  );
}
