
import { useEffect, useState } from 'react'
import SingleProdeGame from '../components/play/SingleProdeGame'
import { getOpenRound } from '../../firebase/firebaseFunctions'

const Prode = () => {
    const [openGame, setOpenGame] = useState(null)
    const [numWithTwoSelected, setNumWithTwoSelected] = useState(0)
    const [countSelected, setCountSelected] = useState(0)
    const [readyToPlay, setReadyToPlay] = useState(false)

    useEffect(() => {
        const fetchOpenGame = async () => {
            try{
                const newGame = await getOpenRound()
                setOpenGame(newGame)
                console.log(newGame)
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchOpenGame()
    },[])
    
    const handleDoubleChance = (hasTwo) => {
        setNumWithTwoSelected(prev => hasTwo ? prev + 1 : prev - 1)
    }

    const handleReadyToPlay = (ready) =>{
        setCountSelected(prev => ready ? prev + 1 : prev - 1)
    }

    useEffect(() => {
        if(openGame && openGame.matches){
            const checksToPlay = openGame.matches.length + 1
            if(countSelected === checksToPlay){
                setReadyToPlay(true)
            } else {
                setReadyToPlay(false)
            }
        }
    },[countSelected, openGame])

    return(
        <>
            {
            openGame && openGame.matches ? 
                <div>
                    <section className='pl-settings'>
                        <h2>Fecha <span>{openGame.roundnumber}</span></h2>
                        <h3>Cierre: <span>Viernes 18hs</span></h3>
                    </section>
                    <section className='pl-game'>
                        <input type="text" placeholder='Nombre'/>
                        {openGame.matches.map(({id, home, away}) => (
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