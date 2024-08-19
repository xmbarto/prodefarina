import './App.css'
import GamesTable from './GamesTable'

const App = () => {

    const games = [
        {
            homeTeam:'Talleres',
            awayTeam: 'Boca',
        },
        {
            homeTeam:'Belgrano',
            awayTeam: 'River',
        },
        {
            homeTeam:'Instituto',
            awayTeam: 'Atletico Rafaela',
        }
    ]

    return(
        <div>
            <h2 className='main-title'>Prodemaster</h2>
            {games.map(({homeTeam, awayTeam}) =>(
                <GamesTable homeTeam={homeTeam} awayTeam={awayTeam}/>
            ))}
            <button disabled>Play!</button>
        </div>
    )
}

export default App