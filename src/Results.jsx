import { calculateResults } from "./calculate";

const fmt = (n) => `$${n % 1 === 0 ? n : n.toFixed(2)}`;

export default function Results({ players, numPlayers, onReset }) {
  const { totalPoolB, boostedPool, payoutPerPlayer, playerResults } =
    calculateResults(players, numPlayers);

  const topPayout = Math.max(...playerResults.map((p) => p.finalPayout));

  return (
    <div className="card results-card">
      <div className="card-eyebrow">Round Complete</div>
      <h2 className="card-title">Results</h2>

      {/* Pool Summary */}
      <div className="pool-summary">
        <div className="pool-stat">
          <span className="pool-label">Total Asset B Pool</span>
          <span className="pool-value">{fmt(totalPoolB)}</span>
        </div>
        <div className="pool-arrow">→ +50% →</div>
        <div className="pool-stat highlight">
          <span className="pool-label">Boosted Pool</span>
          <span className="pool-value">{fmt(boostedPool)}</span>
        </div>
        <div className="pool-arrow">÷ {numPlayers} →</div>
        <div className="pool-stat">
          <span className="pool-label">Each Player Gets</span>
          <span className="pool-value">{fmt(payoutPerPlayer)}</span>
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
              <th>B Payout</th>
              <th>Final Total</th>
            </tr>
          </thead>
          <tbody>
            {playerResults.map((p) => (
              <tr key={p.name} className={p.finalPayout === topPayout ? "top-row" : ""}>
                <td className="player-name-cell">
                  {p.name}
                  {p.finalPayout === topPayout && <span className="winner-badge">↑ best</span>}
                </td>
                <td>{fmt(p.assetA)}</td>
                <td>{fmt(p.assetB)}</td>
                <td className="b-payout">{fmt(p.bPayout)}</td>
                <td className="final-payout">{fmt(p.finalPayout)}</td>
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
