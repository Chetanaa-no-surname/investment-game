import {useState} from 'react';

export default function PlayerInput({ player, onSubmit }) {
  const [assetA, setAssetA] = useState('');
  const [assetB, setAssetB] = useState('');
  const [error, setError] = useState('');

  const remainingBudget = 100 - (parseInt(assetA) || 0) - (parseInt(assetB) || 0);

  const handleAChange = (val) => {
    setAssetA(val);
    setError('');
    const a = parseInt(val) || 0;
    const b = parseInt(assetB) || 0;
    if (a >= 0 && a <= 100) {
        setAssetB(String(100 - a - b >= 0 ? assetB : ""));
    }

    };

    const handleBChange = (val) => {
        setAssetB(val);
        setError('');
    };

    const validate = () => {
        const a = parseInt(assetA);
        const b = parseInt(assetB);
        if (isNaN(a) || isNaN(b)) return "Please enter valid numbers for both assets.";
        if (a < 0 || a > 100 || b < 0 || b > 100) return "Values must be between 0 and 100.";
        if (a + b > 100) return "Total allocation cannot exceed 100.";
        if (!Number.isInteger(a) || !Number.isInteger(b)) return "Values must be integers.";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        onSubmit({ assetA: parseInt(assetA), assetB: parseInt(assetB) });
    };
    
    const remainingColor = remaining === 0 ? "#22c55e" : remaining < 0 ? "#ef4444" : "#f59e0b";


    return (
        <div className="card input-card">
            <div className="progress-bar-wrap">
                {Array.from({ length: totalPlayers }).map((_, i) => (
                <div
                    key={i}
                    className={`progress-segment ${i < playerIndex ? "done" : i === playerIndex ? "active" : ""}`}
                />
                ))}
            </div>

            <div className="players-info">
                Player {playerIndex + 1} of {totalPlayers}
            </div>
            <h2 className="card-title">{player.name}'s Turn</h2>
            <p className="card-desc">
                Allocate your <strong>$100</strong> between the two assets. Pass the device when done.
            </p>

            <form onSubmit={handleSubmit} className="input-form">
                <div className="asset-inputs">
                    <div className="asset-field">
                        <label className="asset-label">
                            <span className="asset-badge safe">Asset A</span>
                            <span className="asset-hint">Riskless — returned in full</span>
                        </label>
                        <div className="dollar-input">
                            <span className="dollar-sign">$</span>
                            <input
                                className={`number-input ${error ? "input-error" : ""}`}
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                placeholder="0"
                                value={assetA}
                                onChange={(e) => handleAChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="asset-divider">+</div>

                    <div className="asset-field">
                        <label className="asset-label">
                            <span className="asset-badge pool">Asset B</span>
                            <span className="asset-hint">Pooled — grows 50%, split equally</span>
                        </label>
                        <div className="dollar-input">
                            <span className="dollar-sign">$</span>
                            <input
                                className={`number-input ${error ? "input-error" : ""}`}
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                placeholder="0"
                                value={assetB}
                                onChange={(e) => handleBChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="remaining-indicator" style={{ borderColor: remainingColor }}>
                    <span>Remaining to allocate:</span>
                    <strong style={{ color: remainingColor }}>${remaining}</strong>
                </div>

                {error && <div className="error-banner">{error}</div>}

                <button className="btn-primary" type="submit" disabled={remaining !== 0}>
                    {playerIndex + 1 < totalPlayers ? `Submit & Pass to ${""} →` : "Submit & View Results →"}
                </button>
            </form>
        </div>
    
    );
};

