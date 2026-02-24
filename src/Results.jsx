import { calculateResults } from "./calculate";

const fmt = (n) => `$${n % 1 === 0 ? n : n.toFixed(2)}`;

export default function Results({ players, numPlayers, onReset }) {
  const { totalPoolB, boostedPool, payoutPerPlayer, playerResults } =
    calculateResults(players, numPlayers);

  const topPayout = Math.max(...playerResults.map((p) => p.finalPayout));

  return (
    <div className="card results-card">
      <h2>Results</h2>

      {/* Pool Summary */}
      <div className="pool-summary">
        <div className="pool-stat">
          <strong>Total Asset B Pool: {fmt(totalPoolB)} </strong>
        </div>
        

        <div> +50% </div>

        <div className="pool-stat highlight">
          <strong>Boosted Asset B Pool: {fmt(boostedPool)}</strong>
        </div>

        <p> Split by {numPlayers} Players</p>

        <div className="pool-stat">
          <strong><i>Each Player Gets: {fmt(payoutPerPlayer)}</i></strong>
        </div>

      </div>

      {/* Player Breakdown Table */}
      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Asset A</th>
              <th>Asset B Invested</th>
              <th>Asset B Payout</th>
              <th>Final Total</th>
            </tr>
          </thead>
          <tbody>
            {playerResults.map((p) => (
              <tr key={p.name} className={p.finalPayout === topPayout ? "top-row" : ""}>
                <td className="player-name-cell">
                  {p.name}
                </td>
                <td>{fmt(p.assetA)}</td>
                <td>{fmt(p.assetB)}</td>
                <td>{fmt(p.bPayout)}</td>
                <td>{fmt(p.finalPayout)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn-secondary" onClick={onReset}>
        ← Play Again
      </button>
    </div>
  );
}
