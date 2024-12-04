
import { useEffect, useState } from 'react'
import SingleProdeGame from '../components/play/SingleProdeGame'
import { getOpenRound, getUser } from '../../firebase/firebaseFunctions'
import { updateFullRound } from '../../firebase/updateRounds'
import { createShareableImg } from '../functions/createShareableImg'
import { auth } from '../../firebase/firebaseConfig'

const Prode = () => {
    const [openGame, setOpenGame] = useState(null)
    const [numWithTwoSelected, setNumWithTwoSelected] = useState(0)
    const [countSelected, setCountSelected] = useState(0)
    const [readyToPlay, setReadyToPlay] = useState(false)
    const [predictions, setPredictions] = useState([])
    const [userName, setUserName] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userCategory, setUserCategory] = useState(null)

    useEffect(() => {
        const fetchOpenGame = async () => {
            try{
                const newGame = await getOpenRound()
                if(!newGame){
                    return
                } else {
                    const actualUser = await getUser(auth.currentUser.uid)
                    setUserName(actualUser.name)
                    setUserId(actualUser.id)
                    setUserCategory(actualUser.category)
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
                }
            } catch (err) {
                console.log(err.message)
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


    // Habilita el botón Play para enviar la tarjeta
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

    // Genera la imagen de la tarjeta
    const handleGenerateImg = async () => {
        try {
            const imgData = await createShareableImg('#shareable-card')
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${userName}-prode.png`
            link.click();
        } catch (e) {
            console.error('Error al generar la imagen, error: ', e)
        }
    }

    // Actualiza la tarjeta
    const updateFixture = async (e) => {
        e.preventDefault()
        const updatedFixture = { 
            ...openGame, 
            players: [
                ...openGame.players,
                {
                    id: userId,
                    name: userName,
                    category: userCategory,
                }
            ],
            predictions: [
                ...openGame.predictions,
                {
                    name: userName,
                    predictions: [
                        ...predictions
                    ]
                }
            ],
            ranking: [
                ...openGame.ranking,
                {
                    name: userName,
                    hits: 0,
                    correctPredictions: [],
                    isWinner: false,
                    reward: null
                }
            ]
        }

        await updateFullRound(updatedFixture)
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
                        <div id='shareable-card' className='shareable-card'>
                            <h4>{userName}</h4>
                            <div className='prode-matches'>
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
                            </div>
                        </div>
                        <button
                            className='prode-send-button' 
                            disabled={!readyToPlay}
                            onClick={handleGenerateImg}
                        > Enviar tarjeta
                        </button>
                    </form>
                </div> 
            : <h3>Todavía no hay una fecha abierta</h3>
            }
        </>
    )
}

export default Prode