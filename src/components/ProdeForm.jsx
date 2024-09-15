import { useRef, useState } from "react"
import { searchFixtures } from "../functions/fixtures"
import { addRoundFromFixture } from "../../firebase/firebaseFunctions"

export function ProdeForm() {
    const [fixture, setFixture] = useState([])
    const [loading, setLoading] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const prizeRef = useRef(null)


    const handleClick = async () => {
        setLoading(true)
        try {
            const lastFixture = await searchFixtures()
            setFixture(lastFixture)
            setShowDetails(true)

        } catch (e) {
            console.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    const updateFixture = (e) => {
        e.preventDefault()
        const latestFixture = { ...fixture, entryfee: Number(prizeRef.current.value) }
        setFixture(latestFixture)
        addRoundFromFixture(latestFixture)
    }

    return(
        <>
            <div>
                <h3>Este botón es para crear la tarjeta</h3>
                <button onClick={handleClick}>Generar próxima fecha</button>
                <form onSubmit={updateFixture}>
                    <label htmlFor="prize"> Precio de la tarjeta pero sin el $
                        <input type="number" ref={prizeRef} name="card-prize" id="prize"/>
                    </label>
                    <div>
                        {showDetails && (
                            <>
                                <p>Fecha número {fixture.roundnumber}</p>
                                <button type="submit">Generar Prode</button>
                                <h4>Partidos</h4>
                            </>
                        )}
                        {loading 
                            ? (<p>Cargando partidos...</p>)
                            : fixture?.matches?.length > 0 ? (
                                fixture.matches.map((fix) => (
                                    <div key={fix.id}>
                                        <p>{fix.home.name} vs {fix.away.name}</p>
                                    </div>
                                ))) 
                            : null
                        }
                    </div>
                </form>
            </div>
            <div>

            </div>
        </>
    )
}