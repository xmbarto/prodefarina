
const API_KEY = 'aa0007933ae266382185d14057bf4dcf'
const A_LEAGUE_ID = 128
const CURRENT_SEASON = 2024
const TIMEZONE = "America/Buenos Aires"
const ROUND = "Round - 16"


export const searchFixtures = async () => {
    try{
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${A_LEAGUE_ID}&season=${CURRENT_SEASON}&round=${ROUND}&timezone=${TIMEZONE}`,{
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
        const currentRound = {
            roundnumber: json.response[0].league.round.split(' ').pop(),
            year: json.response[0].league.season,
            entryfee: null,
            jackpot: null,
            matches: json.response.map(match => ({
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

// rounds
//   |
//   └── round-id
//         ├── roundnumber -> round
//         ├── year -> year
//         ├── entryfee -> empty
//         ├── jackpot -> empty
//         ├── matches
//               ├── match-id-1
//                     |away -> away.name
//                     |home -> home.name
//                     |date -> date
//                     |winner -> null