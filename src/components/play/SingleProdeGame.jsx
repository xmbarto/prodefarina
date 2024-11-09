import { useState, useEffect } from "react"
import PropTypes from "prop-types"


const SingleProdeGame = ({id, home, away, handleDoubleChance, numWithTwoSelected, handleReadyToPlay, handlePredictions, predictions}) => {
    
    const [selected, setSelected] = useState( { home: false, draw: false, away: false } )
    const [localPrediction, setLocalPrediction] = useState(predictions)

    useEffect(() => {
        setLocalPrediction(predictions)
        setSelected({
            home: predictions.find(p => p.matchId === id)?.home || false,
            draw: predictions.find(p => p.matchId === id)?.draw || false,
            away: predictions.find(p => p.matchId === id)?.away || false
        })
    }, [predictions, id])

    const handleChange = (e) => {
        const { name, checked } = e.target
        const gameId = e.target.parentElement.id

        const newSelected = {
            ...selected,
            [name]: checked,
        }

        // Actualizar predictions
        const updatedPrediction = localPrediction.map(pre => {
            if (pre.matchId == gameId){
                return {
                    ...pre,
                    [name]: checked,
                }
            }
            return pre
        })
        setLocalPrediction(updatedPrediction)
        handlePredictions(updatedPrediction)


        // Controlar doble chance
        e.target.checked ? handleReadyToPlay(true) : handleReadyToPlay(false)

        const countSelected = Object.values(newSelected).filter(val => val).length
        if(countSelected === 2){
            handleDoubleChance(true)
        } else if(countSelected < 2 && Object.values(selected).filter(val => val).length == 2){
            handleDoubleChance(false)
        }

        setSelected(newSelected)
    }

    return(
            <div id={id}>
                <input 
                    type="checkbox"
                    name="home"
                    id={home}
                    onChange={handleChange}
                    checked={selected.home}
                    disabled={selected.home ? false : numWithTwoSelected > 0 && Object.values(selected).filter(val => val).length === 1 || selected.draw && selected.away}
                />
                <label htmlFor={home}>{home}</label>
                
                <input 
                    type="checkbox"
                    name="draw"
                    id={"D"+home}
                    onChange={handleChange}
                    checked={selected.draw}
                    disabled={selected.draw ? false : numWithTwoSelected > 0 && Object.values(selected).filter(val => val).length === 1 || selected.home && selected.away}
                />
                <label htmlFor={"D"+home}>Empate</label>
                
                <input 
                    type="checkbox"
                    name="away"
                    id={away}
                    onChange={handleChange}
                    checked={selected.away}
                    disabled={selected.away ? false : numWithTwoSelected > 0 && Object.values(selected).filter(val => val).length === 1 || selected.draw && selected.home}
                />
                <label htmlFor={away}>{away}</label>
            </div>
    )
}

SingleProdeGame.propTypes = {
    id: PropTypes.number.isRequired,
    home: PropTypes.string.isRequired,
    away: PropTypes.string.isRequired,
    handleDoubleChance: PropTypes.func.isRequired,
    numWithTwoSelected: PropTypes.number.isRequired,
    handleReadyToPlay: PropTypes.func.isRequired,
    handlePredictions: PropTypes.func.isRequired,
    predictions: PropTypes.arrayOf(
      PropTypes.shape({
        matchId: PropTypes.number.isRequired,
        home: PropTypes.bool,
        draw: PropTypes.bool,
        away: PropTypes.bool,
      })
    ).isRequired,
  }

export default SingleProdeGame