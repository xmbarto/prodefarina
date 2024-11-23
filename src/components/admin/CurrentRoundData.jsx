
import { createCurrentRanking } from "../../functions/createCurrentRanking"
import { useState } from "react"

const CurrentRoundData = () => {
    const [isOpenRound , setIsOpenRound] = useState(false)

    const handleClick = async () => {
        try {
            const currentFixtures = await createCurrentRanking()
            console.log(currentFixtures)

            
        } catch (e) {
            console.error(e.message)
        }
    }

    return (
        <>
            <h3>Ranking de la fecha</h3>
            {
                isOpenRound ? (
                    <div>
                        <button onClick={handleClick}>Actualizar</button>
                        <h4>Posiciones</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Posición</th>
                                    <th>Jugador</th>
                                    <th>Aciertos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nombre</td>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <button onClick={handleClick}>Actualizar</button>
                        <p>Todavía no hay partidos terminados</p>
                    </div>
                )
            }
        </>
    )
}

export default CurrentRoundData
