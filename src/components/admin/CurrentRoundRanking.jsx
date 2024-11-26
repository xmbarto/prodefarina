import { createCurrentRanking } from '../../functions/createCurrentRanking'
import { useEffect, useState } from 'react'

const CurrentRoundRanking = () => {
    const [ranking, setRanking] = useState([])
    const [message, setMessage] = useState('')
    
    const updateRanking = async () => {
        const rankingData = await createCurrentRanking()
        if (rankingData.length > 0) {
            const sortedRanking = rankingData.sort((a, b) => b.hits - a.hits)
            console.log(sortedRanking)
            setRanking(sortedRanking)
            setMessage('')
        } else {
            setRanking([])
            setMessage('No hay partidos terminados')
        }
    }

    useEffect(() => {
        updateRanking()
    }, [])
    
    return (
        <>
            <h3>Ranking de la fecha</h3>
            { message ? (
                <div>
                    <button onClick={updateRanking}>Actualizar</button>
                    <p>Todavía no hay partidos terminados</p>
                </div>
                ) : (
                <div>
                    <button onClick={updateRanking}>Actualizar</button>
                    <h4>Posiciones</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Jugador</th>
                                <th>Aciertos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map(({ name, hits }) => (
                                <tr key={name}>
                                    <td>{name}</td>
                                    <td>{hits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default CurrentRoundRanking
