import { useState } from "react"

export function GamesTable({homeTeam = 'A confirmar', awayTeam = 'A confirmar'}){

    return(
            <div className="game-row">
                <input type="checkbox" name={homeTeam} id={homeTeam} />
                <label htmlFor={homeTeam}>{homeTeam}</label>
                <input type="checkbox" name="Draw" id="Draw" />
                <label htmlFor="Draw">Empate</label>
                <input type="checkbox" name={awayTeam} id={awayTeam} />
                <label htmlFor={awayTeam}>{awayTeam}</label>
            </div>
    )
}