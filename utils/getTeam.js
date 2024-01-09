import teams from '../public/static/teams.json'

const getTeam = (teamName) => {
  switch (teamName) {
    case 'Washington Mystics':
      return teams.mystics
    case 'Atlanta Dream':
      return teams.dream
    case 'Chicago Sky':
      return teams.sky
    case 'Connecticut Sun':
      return teams.sun
    case 'Indiana Fever':
      return teams.fever
    case 'New York Liberty':
      return teams.liberty
    case 'Dallas Wings':
      return teams.wings
    case 'Las Vegas Aces':
      return teams.aces
    case 'Los Angeles Sparks':
      return teams.sparks
    case 'Minnesota Lynx':
      return teams.lynx
    case 'Phoenix Mercury':
      return teams.mercury
    case 'Seattle Storm':
      return teams.storm
    default:
      break
  }
}

export default getTeam
