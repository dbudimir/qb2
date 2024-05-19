// Utils
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import getTeam from '/utils/getTeam';
// import fs from 'fs';
import { promises as fs } from 'fs';

const getSchedule = async ({ teamSchedule }) => {
  const path = `${process.cwd()}/public/static/2024schedule.json`;
  const file = await fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  const fullSchedule2024 = JSON.parse(file);
  return teamSchedule ? teamSchedule : fullSchedule2024.gameDates;
};

const Schedule = async ({ teamSchedule }) => {
  // Data
  const schedule = await getSchedule({ teamSchedule });

  return (
    schedule && (
      <div id="schedule-content" key="wnba-schedule">
        {schedule.map((gameDate, i) => {
          const date = dayjs(gameDate.gameDate).format('dddd, MMMM D');
          const games = gameDate.games;

          return (
            <>
              {date === 'Tuesday, May 14' && (
                <span className="regular-season-banner" id="regular-season">
                  Start of regular season
                </span>
              )}
              <div className="game-date" key={`game-date${i}`}>
                <div className="header">
                  <span>
                    {date}
                    <span className="game-count">
                      ({games.length} Game{games.length > 1 && 's'})
                    </span>
                  </span>
                </div>
                <div className="game labels">
                  <span className="matchup">Matchup</span>
                  <span className="time">Time (ET)</span>
                  <span className="location">Location</span>
                </div>
                {games.map((game, j) => {
                  const homeTeamName = `${game.homeTeam.teamCity} ${game.homeTeam.teamName}`;
                  const awayTeamName = `${game.awayTeam.teamCity} ${game.awayTeam.teamName}`;

                  const homeTeam = {
                    name: homeTeamName,
                    logoUrl: getTeam(homeTeamName)?.logoUrl,
                    teamPageUrl: `/basketball/tag/${homeTeamName
                      .replace(/ /g, '-')
                      .toLowerCase()}`,
                  };

                  const awayTeam = {
                    name: awayTeamName,
                    logoUrl: getTeam(awayTeamName)?.logoUrl,
                    teamPageUrl: `/basketball/tag/${awayTeamName
                      .replace(/ /g, '-')
                      .toLowerCase()}`,
                  };

                  return (
                    <div className="game" key={`game${j}`}>
                      <div className="matchup">
                        <div className="team">
                          {homeTeam.logoUrl && (
                            <Image
                              className="team-logo"
                              src={homeTeam.logoUrl}
                              width={32}
                              height={32}
                              alt={`${homeTeam.name} Logo`}
                            />
                          )}
                          <Link href={homeTeam.teamPageUrl}>
                            {homeTeam.name}
                          </Link>
                        </div>

                        <p className="at">@</p>

                        <div className="team">
                          {awayTeam.logoUrl && (
                            <Image
                              className="team-logo"
                              src={awayTeam.logoUrl}
                              width={32}
                              height={32}
                              alt={`${awayTeam.name} Logo`}
                            />
                          )}
                          <Link href={awayTeam.teamPageUrl}>
                            {awayTeam.name}
                          </Link>
                        </div>
                      </div>
                      <span className="time">{game.gameStatusText}</span>
                      <span className="location">
                        {game.arenaCity}, {game.arenaState}
                        <br />
                        <span className="arena">{game.arenaName}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    )
  );
};

export default Schedule;
