import { useState } from "react"

const SingleProdeGame = ({home, away, handleDoubleChance, numWithTwoSelected, handleReadyToPlay}) => {
    
    const [selected, setSelected] = useState({
        home: false,
        draw: false,
        away: false,
    })

    const handleChange = (e) => {
        const {name, checked} = e.target

        const newSelected = {
            ...selected,
            [name]: checked,
        }

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
            <div className="game-row">
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

export default SingleProdeGame