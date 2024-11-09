
import { useEffect, useState } from 'react'
import SingleProdeGame from '../components/play/SingleProdeGame'
import { getOpenRound, updateOpenRound } from '../../firebase/firebaseFunctions'
import { createUserId } from '../functions/createUserId'


const Prode = () => {
    const [openGame, setOpenGame] = useState(null)
    const [numWithTwoSelected, setNumWithTwoSelected] = useState(0)
    const [countSelected, setCountSelected] = useState(0)
    const [readyToPlay, setReadyToPlay] = useState(false)
    const [predictions, setPredictions] = useState([])
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const fetchOpenGame = async () => {
            try{
                const newGame = await getOpenRound()
                setOpenGame(newGame)
                const populatePredictions = newGame.matches.map(pre => {
                    return {
                        matchId: pre.id,
                        home: false,
                        draw: false,
                        away: false
                    }
                })
                setPredictions(populatePredictions)
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchOpenGame()
    },[])

    // Controla la doble chance
    function handleDoubleChance(hasTwo){
        setNumWithTwoSelected(prev => hasTwo ? prev + 1 : prev - 1)
    }

    // Controla que la tarjeta este completa
    function handleReadyToPlay(ready){
        setCountSelected(prev => ready ? prev + 1 : prev - 1)
    }

    // Actualiza las predictions del jugador
    function handlePredictions(pred){
        setPredictions(pred)
    }

    // Actualiza el nombre del jugador
    function handleChange(e){
        setUserName(e.target.value)
    }

    // Habilita el botón Play para enviar la tarjeta
    useEffect(() => {
        if(openGame && openGame.matches && userName){
            const checksToPlay = openGame.matches.length + 1
            if(countSelected === checksToPlay){
                setReadyToPlay(true)
            } else {
                setReadyToPlay(false)
            }
        }
    },[countSelected, openGame, userName])

    // Actualiza la tarjeta
    const updateFixture = async (e) => {
        e.preventDefault()
        const playerExist = openGame.players.some(player => player.name === userName)
        if(playerExist) {
            alert('Ya existe un jugador con ese nombre')
            return
        }
        let newUserId = createUserId()
        const updatedFixture = { 
            ...openGame, 
            players: [
                ...openGame.players,
                {
                    id: newUserId,
                    name: e.target[0].value,
                    category: 'amateur',
                    hits: null,
                    isWinner: false,
                    reward: null
                }
            ],
            predictions: {
                ...openGame.predictions,
                [userName]:{
                    ...predictions
                }
            }
        }

        await updateOpenRound(updatedFixture)
        setPredictions([])
        setOpenGame(updatedFixture)
        setReadyToPlay(false)
    }

    return(
        <>
            {
            openGame && openGame.matches ? 
                <div>
                        <section>
                            <h2>Fecha <span>{openGame.roundnumber}</span></h2>
                            <h3>Cierre: <span>Viernes 18hs</span></h3>
                            <h3>Precio de la tarjeta: <span>${openGame.entryfee}</span></h3>
                        </section>
                    <form onSubmit={updateFixture}>
                        <input type="text" placeholder='Nombre' onChange={handleChange}/>
                        {openGame.matches.map(({id, home, away}) => (
                            <SingleProdeGame
                                key={id}
                                home={home.name}
                                away={away.name}
                                handleDoubleChance={handleDoubleChance}
                                numWithTwoSelected={numWithTwoSelected}
                                handleReadyToPlay={handleReadyToPlay}
                                handlePredictions={handlePredictions}
                                predictions={predictions}
                                id={id}
                            />
                        ))}
                        <button disabled={!readyToPlay}>Enviar tarjeta</button>
                    </form>
                </div> 
            : <h3>cargando fecha...</h3>
            }
        </>
    )
}

export default Prode