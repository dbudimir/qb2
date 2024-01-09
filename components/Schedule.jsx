// Utils
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import getTeam from '/utils/getTeam';

// Data
import fullSchedule2024 from '/public/static/2024schedule.json';

const Schedule = ({ teamSchedule }) => {
  const gameDates = teamSchedule
    ? teamSchedule.gameDates
    : fullSchedule2024.gameDates;

  // TODO: We need to be able to filter the game dates by team name

  return (
    <div id="schedule-content" key="wnba-schedule">
      {gameDates.map((gameDate, i) => {
        const date = dayjs(gameDate.gameDate).format('dddd, MMMM D');
        const games = gameDate.games;

        return (
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
                logoUrl: getTeam(homeTeamName).logoUrl,
                teamPageUrl: `/basketball/tag/${homeTeamName .replace(/ /g, '-') .toLowerCase()}`, // prettier-ignore
              };

              const awayTeam = {
                name: awayTeamName,
                logoUrl: getTeam(awayTeamName).logoUrl,
                teamPageUrl: `/basketball/tag/${awayTeamName .replace(/ /g, '-') .toLowerCase()}`, // prettier-ignore
              };

              return (
                <div className="game" key={`game${j}`}>
                  <div className="matchup">
                    {/* prettier-ignore */}
                    <div className="team">
                      <Image className="team-logo" src={homeTeam.logoUrl} width={32} height={32} alt={`${homeTeam.name} Logo`} />
                      <Link href={homeTeam.teamPageUrl}>{homeTeam.name}</Link>
                    </div>
                    {/* prettier-ignore */}
                    <p className="at">@</p>
                    {/* prettier-ignore */}
                    <div className="team">
                      <Image className="team-logo" src={awayTeam.logoUrl} width={32} height={32} alt={`${awayTeam.name} Logo`} />
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
