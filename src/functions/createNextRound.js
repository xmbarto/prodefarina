
import { fetchFixtures } from "./fetchFixtures"

export const createNextRound = async () => {
    
    const apiresponse = await fetchFixtures()

    function getRoundNumber(round) {
        const roundMatch = round.match(/(\d+)\s*$/)
        return roundMatch ? parseInt(roundMatch[1], 10) : null
    }

    //filtrar y traer solo los partidos que ya terminaron
    const finishedMatches = apiresponse.filter(match => match.fixture.status.short == 'FT')
    
    // de los partidos que ya terminaron, encontrar el que tenga fixture.date mas reciente
    const lastFinished = finishedMatches.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))[0]

    //obtenr el round del partido más reciente
    const lastRoundNumber = getRoundNumber(lastFinished.league.round)

    //obtener los partidos de la próxima fecha
    const nextRound = apiresponse.filter(match => {
        const roundNumber = getRoundNumber(match.league.round)
        return roundNumber === lastRoundNumber + 1
    })
    
    const currentRound = {
        roundnumber: nextRound[0].league.round.split(' ').pop(),
        year: nextRound[0].league.season,
        entryfee: null,
        jackpot: null,
        status: 'OP',
        players:[],
        matches: nextRound.map(match => ({
            id: match.fixture.id,
            home: {
                id: match.teams.home.id,
                name: match.teams.home.name,
                winner: match.teams.home.winner,
                logo: match.teams.home.logo
            },
            away: {
                id: match.teams.away.id,
                name: match.teams.away.name,
                winner: match.teams.away.winner,
                logo: match.teams.away.logo
            }
        })),
        
        predictions: [],
        ranking: []
    }
    
    return currentRound
}