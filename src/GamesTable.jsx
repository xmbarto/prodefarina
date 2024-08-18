export function GamesTable({localTeam = 'A confirmar', visitantTeam = 'A confirmar', isPlayed, formattedVs, children}){
    return(
            <div className="game-row">
                <p className='game-item'><span>{localTeam}{formattedVs}{visitantTeam}</span></p>
                <button className="game-confirm">Confirmar</button>
                {children}
            </div>
    )
}