import { useEffect, useState } from "react"
import { getRounds } from "../functions/fixtures.js"

export function NewProdeForm() {
    const [rounds, setRounds] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRounds()
                const filteredRounds = data.response.filter((i) => i.league.round.includes('13'))
                setRounds(filteredRounds)
            } catch (error) {
                console.log('mmm saltó este error: ', error)
                throw new Error('mmm... hay quilombo en el servicio que muestra los partidos. Tamo chau.')
            }
        }
        fetchData()
    },[])

    return(
        <>
        <h3>Crear Tarjeta</h3>
        <ul>
            {rounds.map(team => (
                <div key={team.teams.home.id}>
                    <li key={team.teams.away.id}>
                        <span>{team.teams.home.name}</span>
                        <span> vs </span>
                        <span>{team.teams.away.name}</span>
                    </li>
                </div>
            ))}
        </ul>
        </>
    )
}