import { fetchCurrentRound } from "./fetchCurrentRound"
import { fetchFixtures } from "./fetchFixtures"

export const createCurrentRanking = async () => {

    try{
        const currentRound = await fetchCurrentRound()
        const apiresponse = await fetchFixtures()

        if(!currentRound || !Array.isArray(apiresponse)){
            throw new Error('Data inválida al llamar a la API')
        }

        const currentFixture = apiresponse.filter(match => match.league.round === currentRound[0])
 
        return currentFixture

    } catch (e) {
        console.log('Acá algo se cagó. ', e)
        return []
    }   
}