
const API_KEY = 'aa0007933ae266382185d14057bf4dcf'
const A_LEAGUE_ID = 128
const CURRENT_SEASON = new Date().getFullYear()
const TIMEZONE = "America/Buenos Aires"


export const searchFixtures = async () => {
    try{
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${A_LEAGUE_ID}&season=${CURRENT_SEASON}&timezone=${TIMEZONE}`,{
            method: 'GET',
            headers:{
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": `${API_KEY}`
            }
        })

        if (!response.ok) {
            throw new Error('mmm la api está cagada y no responde');
        }
        const json = await response.json()

        function getRoundNumber(round) {
            const roundMatch = round.match(/(\d+)\s*$/)
            return roundMatch ? parseInt(roundMatch[1], 10) : null
        }

        //filtrar y traer solo los partidos que ya terminaron
        const finishedMatches = json.response.filter(match => match.fixture.status.short == 'FT')
        
        // de los partidos que ya terminaron, encontrar el que tenga fixture.date mas reciente
        const lastFinished = finishedMatches.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))[0]

        //obtenr el round del partido
        const lastRoundNumber = getRoundNumber(lastFinished.league.round)

        //obtener los partidos de la próxima fecha
        const nextRound = json.response.filter(match => {
            const roundNumber = getRoundNumber(match.league.round)
            return roundNumber === lastRoundNumber + 1
        })
        
        const currentRound = {
            roundnumber: nextRound[0].league.round.split(' ').pop(),
            year: nextRound[0].league.season,
            entryfee: null,
            jackpot: null,
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
            }))
        }
        
        return currentRound

    } catch (e) {
        console.log('Acá algo se cagó, saltó este error: ', e)
        throw new Error('Error del servicio')
    }
}
