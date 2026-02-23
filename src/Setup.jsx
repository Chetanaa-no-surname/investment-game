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

}
