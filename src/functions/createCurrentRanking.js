import { createCurrentFixture } from "./createCurrentFixture";
import { updateRoundStatus } from "../../firebase/updateRounds";
import { getOngoingRound } from "../../firebase/firebaseFunctions";

export const createCurrentRanking = async () => {
    try {
        const currentFixtures = await createCurrentFixture()
        
        //Evaluar si hay partidos terminados
        const areFinishedMatches = currentFixtures.map(match => {
            if (match.fixture.status.short === 'FT' || match.fixture.status.short === 'AET' || match.fixture.status.short === 'PEN') {
                return match
            } else {
                return null
            }
        })

        if (areFinishedMatches.some(match => match !== null)) {
            
            //Actualizar el status del round
            const roundNumber = areFinishedMatches[0].league.round.split(' ').pop()
            await updateRoundStatus(roundNumber, 'OP', 'OG')
            
            //Devolver un array con los resultados de los partidos terminados
            const results = areFinishedMatches.map(match => {
                const findWinner = Object.entries(match).find(([key, value]) => value === true)?.[0]
                return findWinner ? 
                {
                    [findWinner]: true,
                    id: match.fixture.id
                } : 
                {
                    draw: true,
                    id: match.fixture.id
                } 
            })
            console.log(results)
            
            //Traer el round ongoing
            const ongoingGame = await getOngoingRound()

            //Devolver el ranking
            const ranking = ongoingGame.predictions.map(player => {
                let hits = 0
                let correctPredictions = []

                // Iterar sobre las predicciones del jugador
                player.predictions.forEach(prediction => {
                    // Buscar el resultado correspondiente por id
                    const result = results.find(r => r.id === prediction.matchId)

                    if (result) {
                        // Comparar la predicción con el resultado
                        if (
                            (result.home && prediction.home) ||
                            (result.away && prediction.away) ||
                            (result.draw && prediction.draw)
                        ) {
                            hits += 1;
                            correctPredictions.push(prediction.matchId)
                        }
                    }
                })

                return {
                    name: player.name,
                    hits: hits,
                    correctPredictions: correctPredictions,
                    isWinner: false, 
                    reward: null
                }
            })

            console.log(ranking)
            
        } else {
            console.log('no hay partidos terminados')
        }

    } catch (e) {
            console.error(e.message)
    }
}