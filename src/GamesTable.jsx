import { useState } from "react"

export function GamesTable({ homeTeam, awayTeam }){
    const [selected, setSelected] = useState({
        home: false,
        draw: false,
        away: false,
    })

    const handleChange = (e) => {
        const { name, checked } = e.target;
        const countSelected = Object.values(selected).filter(val => val).length;

        if (checked && countSelected >= 2) {
            return;
        }

        setSelected((prevState) => ({
            ...prevState,
            [name]: checked,
        }))
    }

    return (
        <div className="game-row">
            <input
                type="checkbox"
                name="home"
                id={homeTeam}
                checked={selected.home}
                onChange={handleChange}
                disabled={selected.draw && selected.away}
            />
            <label htmlFor={homeTeam}>{homeTeam}</label>

            <input
                type="checkbox"
                name="draw"
                id={`D${homeTeam}`}
                checked={selected.draw}
                onChange={handleChange}
                disabled={selected.home && selected.away}
            />
            <label htmlFor={`D${homeTeam}`}>Empate</label>

            <input
                type="checkbox"
                name="away"
                id={awayTeam}
                checked={selected.away}
                onChange={handleChange}
                disabled={selected.home && selected.draw}
            />
            <label htmlFor={awayTeam}>{awayTeam}</label>
        </div>
    )
}