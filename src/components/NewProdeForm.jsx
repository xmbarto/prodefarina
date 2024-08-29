import { useState } from "react"
import { searchFixtures } from "../functions/fixtures"

export function NewProdeForm() {
const [fixture, setFixture] = useState([])
const [showDetails, setShowDetails] = useState(false)

const handleClick = async () => {
    try {
        const fixtures = await searchFixtures()
        const lastFixture = fixtures.filter(i => i.round.includes('13'))
        setFixture(lastFixture)
        setShowDetails(true)
    } catch (e) {
        console.error(e.message)
    }
}

    return(
        <>
        <h3>Crear Tarjeta</h3>
        <div>
            <form>
                <input type="text" name="start" placeholder="Día de inicio"/>
                <input type="text" name="end" placeholder="Día de finalización"/>
                <label htmlFor="prize"> Valor de tarjeta
                    <input type="number" name="card-prize" id="prize"/>
                </label>
            </form>
            <button onClick={handleClick}>Crear</button>
            <div>
                {showDetails && (
                    <>
                        <p>Fecha número {fixture[0].round.slice(-2)}</p>
                        <button>Generar Prode</button>
                        <h4>Partidos</h4>
                    </>
                )}
                { fixture && fixture.length > 0 ? (
                    fixture.map((fix) => (
                        <div key={fix.teams.home.id}>
                            <p>{fix.teams.home.name} vs {fix.teams.away.name}</p>
                        </div>
                    ))
                    ) : null
                }
            </div>
        </div>
        
        </>
    )
}