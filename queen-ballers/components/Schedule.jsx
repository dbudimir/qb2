import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

// Data
import parseSchedule from '../utils/parseSchedule'

// Data
import fullSchedule from '../public/static/2023schedule.json'

const ScheduleContainer = styled.div`
  margin-top: 32px;
`

const Schedule = () => {
  const games = parseSchedule(fullSchedule)

  return (
    <ScheduleContainer id="schedule-content">
      {Object.values(games).map((gameDate, i) => {
        const date = Object.keys(gameDate)[0]
        const gamesList = Object.values(gameDate)[0]

        return (
          <div className="game-date" key={`game-date${i}`}>
            <div className="header">
              <span>
                {date}
                <span className="game-count">
                  ({gamesList.length} Game{gamesList.length > 1 && 's'})
                </span>
              </span>
            </div>
            <div className="game labels">
              <span className="matchup">Matchup</span>
              <span className="time">Time (ET)</span>
              <span className="location">Location</span>
            </div>
            {gamesList.map((game, j) => (
              <div className="game" key={`game${j}`}>
                <div className="matchup">
                  {[game.awayTeam, 'at', game.homeTeam].map(({ name, teamPageUrl, logoUrl }, k) =>
                    name ? (
                      <div className="team" key={`team${k}`}>
                        <Image
                          className="team-logo"
                          src={logoUrl}
                          width={32}
                          height={32}
                          alt={`${name} Logo`}
                        />
                        <Link href={teamPageUrl}>{name}</Link>
                      </div>
                    ) : (
                      <p className="at" key={`team${k}`}>
                        @
                      </p>
                    )
                  )}
                </div>
                <span className="time">{game.easternTime}</span>
                <span className="location">
                  {game.location}
                  <br />
                  <span className="arena">{game.arena}</span>
                </span>
              </div>
            ))}
          </div>
        )
      })}
    </ScheduleContainer>
  )
}

export default Schedule
