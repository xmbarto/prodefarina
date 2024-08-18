import './App.css'
import { GamesTable } from './GamesTable'

export function App(){
    const formattedVs = <span> vs </span>

    return(
        <div>
            <h2 className='main-title'>Prodemaster</h2>
            <GamesTable formattedVs={formattedVs} isPlayed={false} localTeam='Talleres' visitantTeam='Boca'/>
            <GamesTable formattedVs={formattedVs} isPlayed={false} localTeam='Belgrano' visitantTeam='River'/>
            <GamesTable formattedVs={formattedVs} isPlayed localTeam='Atlético' visitantTeam='Atlético de Rafaela'/>
        </div>
    )
}