'use server';

// Utils
import { promises as fs } from 'fs';

// Components
import WNBATeamSchedule from '/components/pages/schedule/WNBATeamSchedule';

const getSchedule = async ({ schedule, teamName }) => {
  const teamSlug = teamName.split('-').pop();

  const teamSchedule = schedule.gameDates
    .map((gameDate) => {
      const date = gameDate.gameDate;
      const games = gameDate.games
        .map((game) => {
          if (
            game.homeTeam.teamSlug === teamSlug ||
            game.awayTeam.teamSlug === teamSlug
          ) {
            return game;
          }
        })
        .filter((game) => game);

      if (games.length === 0) {
        return null;
      }

      return { gameDate: date, games };
    })
    .filter((gameDate) => gameDate);

  return teamSchedule;
};

const PostContainer = async ({ title, teamName }) => {
  // Data
  const root = process.env.ENV === 'production' ? '' : process.cwd();
  const file = await fs.readFile(
    `${root}/public/static/2024schedule.json`,
    'utf8'
  );
  const fullSchedule2024 = JSON.parse(file);

  const teamSchedule = await getSchedule({
    schedule: fullSchedule2024,
    teamName,
  });

  return (
    <WNBATeamSchedule
      title={title}
      teamSchedule={teamSchedule}
      className="content"
    />
  );
};

export default PostContainer;
