// Utils
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import getTeam from '/utils/getTeam';
import { promises as fs } from 'fs';

const Schedule = async ({ teamSchedule }) => {
  console.log('process cwd', process.cwd());
  console.log('___dirname', __dirname);
  console.log('process env', process.env);
  // Data
  const root =
    process.env.ENV === 'production' ? '' : `${process.cwd()}/public`;
  const file = await fs.readFile(`${root}/static/2024schedule.json`, 'utf8');
  const fullSchedule2024 = JSON.parse(file);
  const gameDates = teamSchedule ? teamSchedule : fullSchedule2024.gameDates;

  return (
    <div id="schedule-content" key="wnba-schedule">
      {gameDates.map((gameDate, i) => {
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
                        <Link href={homeTeam.teamPageUrl}>{homeTeam.name}</Link>
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
                        <Link href={awayTeam.teamPageUrl}>{awayTeam.name}</Link>
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

      {/* Old Schedule */}
      {/* {Object.values(games).map((gameDate, i) => {
        const date = Object.keys(gameDate)[0];
        const gamesList = Object.values(gameDate)[0];

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
                  {[game.awayTeam, 'at', game.homeTeam].map(
                    ({ name, teamPageUrl, logoUrl }, k) =>
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
        );
      })} */}
    </div>
  );
};

export default Schedule;
