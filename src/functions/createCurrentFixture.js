import { fetchCurrentRound } from "./fetchCurrentRound"
import { fetchFixtures } from "./fetchFixtures"

export const createCurrentFixture = async () => {

    try{
        // llama a Current Round para traer el round actual, ej "Round - 23"
        const currentRound = await fetchCurrentRound()

        // llama a Fixtures para traer todos los partidos
        const apiresponse = await fetchFixtures()

        if(!currentRound || !Array.isArray(apiresponse)){
            throw new Error('Data inválida al llamar a la API')
        }

        // devuelve los fixtures del round actual
        const currentFixture = apiresponse.filter(match => match.league.round === currentRound[0])
 
        return currentFixture

    } catch (e) {
        console.log('Acá algo se cagó. ', e)
        return []
    }   
}