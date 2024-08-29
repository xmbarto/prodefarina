
const API_KEY = 'aa0007933ae266382185d14057bf4dcf'
const A_LEAGUE_ID = 128
const CURRENT_SEASON = 2024

export const searchFixtures = async () => {
    try{
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${A_LEAGUE_ID}&season=${CURRENT_SEASON}`,{
            method: 'GET',
            headers:{
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": `${API_KEY}`
            }
        })

        if (!response.ok) {
            throw new Error('mmm el server está cagado, no responde el gil');
        }
        const json = await response.json()
        
        return json.response.map(team => ({
            round: team.league.round,

            teams:{
                home: {
                    id: team.teams.home.id,
                    name: team.teams.home.name,
                    isWinner: team.teams.home.winner
                },
                away: {
                    id: team.teams.away.id,
                    name: team.teams.away.name,
                    isWinner: team.teams.away.winner
                }
            }
            
        }))

    } catch (e) {
        console.log('Acá algo de cagó, saltó este error: ', e)
        throw new Error('Error del servicio')
    }
}

