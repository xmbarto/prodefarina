import { useEffect, useState } from 'react'
import './App.css'
import GamesTable from './components/GamesTable'
import rounds from './mocks/rounds.json'

const App = () => {

    const currentGame = rounds.rounds

    const [numWithTwoSelected, setNumWithTwoSelected] = useState(0)
    const [countSelected, setCountSelected] = useState(0)
    const [readyToPlay, setReadyToPlay] = useState(false)
    
    const handleDoubleChance = (hasTwo) => {
        setNumWithTwoSelected(prev => hasTwo ? prev + 1 : prev - 1)
    }

    const handleReadyToPlay = (ready) =>{
        setCountSelected(prev => ready ? prev + 1 : prev - 1)
    }

    useEffect(() => {
        const roundsCount = currentGame.length
        if(countSelected === roundsCount + 1){
            setReadyToPlay(prevReady => !prevReady)
        }
    },[countSelected, currentGame])

    return(
        <div>
            <h2 className='main-title'>Prodemaster</h2>
            {currentGame.map(({id, homeTeam, awayTeam}) => (
                <GamesTable
                    key={id}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    handleDoubleChance={handleDoubleChance}
                    numWithTwoSelected={numWithTwoSelected}
                    handleReadyToPlay={handleReadyToPlay}
                />
            ))}
            <button disabled={!readyToPlay}>Play!</button>
        </div>
    )
}

export default App