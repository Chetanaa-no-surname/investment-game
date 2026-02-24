/**
 * calculateResults
 * Pure function — no side effects, easy to unit test.
 *
 * @param {Array<{name, assetA, assetB}>} players
 * @param {number} numPlayers
 * @returns {Object} full results breakdown
 */
export function calculateResults(players, numPlayers) {
  const totalPoolB = players.reduce((sum, p) => sum + p.assetB, 0);
  const boostedPool = totalPoolB * 1.5;
  const payoutPerPlayer = boostedPool / numPlayers;

  const playerResults = players.map((p) => ({
    name: p.name,
    assetA: p.assetA,
    assetB: p.assetB,
    bPayout: payoutPerPlayer,
    finalPayout: p.assetA + payoutPerPlayer,
  }));

  return {
    totalPoolB,
    boostedPool,
    payoutPerPlayer,
    playerResults,
  };
}
