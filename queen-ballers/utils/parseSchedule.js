import dayjs from 'dayjs'
import _ from 'lodash'

// Utils
import getTeam from './getTeam'

const parseSchedule = (schedule, teamName) => {
  const gamesList = []
  schedule.lscd.forEach((month) => gamesList.push(...month.mscd.g))

  const cleanGamesList = gamesList.map(({ gdte, utctm, stt, h, v, ac, as, an }) => {
    const homeTeamName = `${`${h.tc} ${h.tn}`}`
    const awayTeamName = `${`${v.tc} ${v.tn}`}`

    return {
      date: dayjs(gdte).format('dddd, MMMM D'),
      utcTime: utctm,
      easternTime: stt,
      teams: [
        homeTeamName.replace(/ /g, '-').toLowerCase(),
        awayTeamName.replace(/ /g, '-').toLowerCase(),
      ],
      homeTeam: {
        city: h.tc,
        name: homeTeamName,
        logoUrl: getTeam(homeTeamName).logoUrl,
        teamPageUrl: `/basketball/tag/${homeTeamName.replace(/ /g, '-').toLowerCase()}`,
      },
      awayTeam: {
        city: v.tc,
        name: awayTeamName,
        logoUrl: getTeam(awayTeamName).logoUrl,
        teamPageUrl: `/basketball/tag/${awayTeamName.replace(/ /g, '-').toLowerCase()}`,
      },
      location: `${`${ac}, ${as}`}`,
      arena: an,
    }
  })

  const gamesByDate = _.mapValues(_.groupBy(cleanGamesList, 'date'))
  const gameDates = Object.keys(gamesByDate).map((date, i) => ({
    [date]: Object.values(gamesByDate)[i],
  }))

  return teamName
    ? gameDates
        .map((gameDate) => ({
          [Object.keys(gameDate)[0]]: Object.values(gameDate)
            .reduce(
              (acc, teamGameDates) => [
                ...acc,
                teamGameDates.filter((game) => game.teams.includes(teamName)),
              ],
              []
            )
            .flat(),
        }))
        .filter((days) => Object.values(days)[0].length > 0)
    : gameDates
}

export default parseSchedule
