
import { useEffect, useState } from 'react'
import SingleProdeGame from '../components/SingleProdeGame'

const Prode = () => {
    const currentGame = actualFixture?.matches
    console.log(currentGame)

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
            {
            actualFixture ? 
                <div>
                    <section className='pl-settings'>
                        <h2>Fecha <span>{actualFixture.roundnumber}</span></h2>
                        <h3>Cierre: <span>Viernes 18hs</span></h3>
                    </section>
                    <section className='pl-game'>
                        <input type="text" placeholder='Nombre'/>
                        {currentGame.map(({id, home, away}) => (
                            <SingleProdeGame
                                key={id}
                                home={home.name}
                                away={away.name}
                                handleDoubleChance={handleDoubleChance}
                                numWithTwoSelected={numWithTwoSelected}
                                handleReadyToPlay={handleReadyToPlay}
                            />
                        ))}
                        <button disabled={!readyToPlay}>Play!</button>
                    </section>
                </div> 
            : <h3>No hay ninguna fecha disponible...</h3>
            }
        </>
    )
}

export default Prode