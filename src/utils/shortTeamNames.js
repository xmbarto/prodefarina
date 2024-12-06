const shortTeamNames = {
    434: 'Gimnasia',
    435: 'River',
    436: 'Racing',
    437: 'Rosario Ctral',
    438: 'Velez',
    439: 'Godoy Cruz',
    440: 'Belgrano',
    441: 'Unión',
    442: 'Def y Justicia',
    445: 'Huracán',
    446: 'Lanús',
    449: 'Banfield',
    450: 'Estudiantes',
    451: 'Boca',
    452: 'Tigre',
    453: 'Independiente',
    455: 'Atl. Tucumán',
    456: 'Talleres',
    457: 'Newells',
    458: 'Argentinos',
    460: 'San Lorenzo',
    473: 'Ind. Rivadavia',
    474: 'Sarmiento',
    476: 'Riestra',
    478: 'Instituto',
    1064: 'Platense',
    1065: 'Central Cba',
    2432: 'Barracas'
}

export const getShortTeamName = (teamId) => {
    return shortTeamNames[teamId] || "No encontrado"
  }

export default shortTeamNames


