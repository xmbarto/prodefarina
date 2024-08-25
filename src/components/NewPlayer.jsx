import { useState } from "react"
import { addPlayer } from "../../firebase/firebaseFunctions"

const NewPlayer = () => {
    const [name, setName] = useState("")

    const handleAddPlayer = async () => {
        addPlayer(name)
    }

    return (
        <>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleAddPlayer}>+</button>
        </>
    )
}

export default NewPlayer
