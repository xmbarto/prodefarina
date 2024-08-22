import { useState } from 'react'
import './App.css'
import GamesTable from './GamesTable'

const App = () => {

    const games = [
        {
            id: 0,
            homeTeam:'Talleres',
            awayTeam: 'Boca',
        },
        {
            id: 1,
            homeTeam:'Belgrano',
            awayTeam: 'River',
        },
        {
            id: 2,
            homeTeam:'Instituto',
            awayTeam: 'Atletico Rafaela',
        }
    ]

    const [numWithTwoSelected, setNumWithTwoSelected] = useState(0)
    
    const handleDoubleChance = (hasTwo) => {
        setNumWithTwoSelected(prev => hasTwo ? prev + 1 : prev - 1)
    }

    return(
        <div>
            <h2 className='main-title'>Prodemaster</h2>
            {games.map(({id, homeTeam, awayTeam}) => (
                <GamesTable 
                    key={id}
                    homeTeam={homeTeam} 
                    awayTeam={awayTeam}
                    handleDoubleChance={handleDoubleChance}
                    numWithTwoSelected={numWithTwoSelected}
                />
            ))}
            <button disabled>Play!</button>
        </div>
    )
}

export default App