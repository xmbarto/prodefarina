
const API_KEY = 'aa0007933ae266382185d14057bf4dcf'
const A_LEAGUE_ID = 128
const CURRENT_SEASON = 2024

export const getRounds = async () => {

    try{
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${A_LEAGUE_ID}&season=${CURRENT_SEASON}`,{
            method: 'GET',
            headers:{
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": `${API_KEY}`
            }
        })
        const json = await response.json()
        return json
    } catch (e) {
        throw new Error('Error del servicio')
    }
}

