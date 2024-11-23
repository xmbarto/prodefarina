
const API_KEY = 'aa0007933ae266382185d14057bf4dcf'
const A_LEAGUE_ID = 128
const CURRENT_SEASON = new Date().getFullYear()
const TIMEZONE = "America/Buenos Aires"


export const fetchFixtures = async () => {
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

        return json.response

    } catch (e) {
        console.log('Acá algo se cagó, saltó este error: ', e)
        throw new Error('Error del servicio')
    }
}
