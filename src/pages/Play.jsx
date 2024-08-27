
import { useEffect, useState } from 'react'
import rounds from '../mocks/rounds.json'
import SingleProdeGame from '../components/SingleProdeGame'


const Play = () => {
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
        const checksToPlay = currentGame.length + 1
        if(countSelected === checksToPlay){
            setReadyToPlay(prevReady => !prevReady)
        } else {
            setReadyToPlay(false)
        }
    },[countSelected, currentGame])

    return(
        <>
            <section className='pl-settings'>
                <h2>Fecha Nº: <span>30</span></h2>
                <h3>Cierre: <span>Viernes 18hs</span></h3>
            </section>
            <section className='pl-game'>
                <input type="text" placeholder='Nombre'/>
                {currentGame.map(({id, homeTeam, awayTeam}) => (
                    <SingleProdeGame
                        key={id}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        handleDoubleChance={handleDoubleChance}
                        numWithTwoSelected={numWithTwoSelected}
                        handleReadyToPlay={handleReadyToPlay}
                    />
                ))}
                <button disabled={!readyToPlay}>Play!</button>
            </section>
        </>
    )
}

export default Play