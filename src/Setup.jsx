import {useState} from 'react';

export default function Setup({onComplete}) {
    const [numPlayers, setNumPlayers] = useState(2);
    const [names, setNames] = useState(['', '']);
    const [errors,setErrors] = useState([]);

    const handleNumChange = (e) => {
        const count = parseInt(e);
        setNumPlayers(count);
        setNames((prev) => {
            const updates = [...prev];
            while (updates.length < count) {
                updates.push('');
            }
            return updates.slice(0, count);
        });
        setErrors([]);
    };

    const handleNameChange = (index, value) => {
        setNames((prev) => prev.map((n, idx) => (idx === index ? value : n)));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = names.map((n) => (n.trim() === "" ? "Name is required" : ""));
        const dupes = names.map((n, i) =>
            names.some((other, j) => j !== i && other.trim().toLowerCase() === n.trim().toLowerCase() && n.trim() !== "")
                ? "Names must be unique"
                : ""
        );
        const combined = errs.map((e, i) => e || dupes[i]);
        setErrors(combined);
        if (combined.some(Boolean)) return;
        onComplete({ numPlayers, playerNames: names.map((n) => n.trim()) });
    };

    return (
        <div className="setup-card">
            <div> Game Setup </div>
            <h2>Configure Your Session</h2>
            <p className="card-description">
                Each player starts with <strong>$100</strong> to allocate between two assets. Choose wisely — your decisions affect everyone.
            </p>

        <form onSubmit={handleSubmit} className="setup-form">
            <div>
                <label className="field-label">Number of Players</label>
                <div className="player-count-row">
                    {[2, 3, 4].map((n) => (
                    <button
                        key={n}
                        type="button"
                        className={`count-btn ${numPlayers === n ? "active" : ""}`}
                        onClick={() => handleNumChange(n)}
                    >
                        {n}
                    </button>
                    ))}
                </div>
            </div>

            <div className="names-grid">
                {names.map((name, i) => (
                    <div key={i} className="field-group">
                        <label className="field-label">Player {i + 1}</label>
                        <input
                            className={`text-input ${errors[i] ? "input-error" : ""}`}
                            type="text"
                            placeholder={`e.g. Player ${i + 1}`}
                            value={name}
                            maxLength={20}
                            onChange={(e) => handleNameChange(i, e.target.value)}
                        />
                        {errors[i] && <span className="error-msg">{errors[i]}</span>}
                    </div>
                ))}
            </div>

            <button className="btn-primary" type="submit">
            Start Game →
            </button>
        </form>

        <div className="rules-box">
            <div className="rules-title">How it works</div>
            <div className="rule-item">
                <span className="rule-badge safe">Asset A</span>
                <span>Riskless — your investment is returned in full.</span>
            </div>
            <div className="rule-item">
                <span className="rule-badge pool">Asset B</span>
                <span>Pooled — all contributions grow by 50%, split equally among all players.</span>
            </div>
        </div>
    </div>
  );

}
