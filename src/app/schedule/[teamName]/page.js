// Utils
import dayjs from 'dayjs';
const year = dayjs().year();

// Data
import fullSchedule2024 from '/public/static/2024schedule.json';

import WNBATeamSchedule from '/components/pages/WNBATeamSchedule';

async function getData({ params }) {
  const { teamName } = params;

  const formattedTeamName = teamName
    .replace(/-/g, ' ')
    .split(' ')
    .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' ');
  const teamSlug = teamName.split('-').pop();

  const teamSchedule = fullSchedule2024.gameDates
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

  const title = `${year} ${formattedTeamName} Game Schedule`;

  return { title, teamName, teamSchedule };
}

export async function generateMetadata({ params }) {
  const { teamName } = params;

  const formattedTeamName = teamName
    .replace(/-/g, ' ')
    .split(' ')
    .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' ');

  const title = `${year}  ${formattedTeamName} Game Schedule | Queen Ballers Club`;
  const description = `See the ${formattedTeamName} ${year} season schedule! Find WNBA games to watch today.`;

  return {
    title,
    description,
    image:
      'https://queenballers.wpcomstaging.com/wp-content/uploads/2020/12/WNBA-expansion-cities.png',
    url: `/schedule/${teamName}`,
  };
}

export default async function WNBASchedulePage({ params }) {
  const { title, teamSchedule } = await getData({ params });

  return <WNBATeamSchedule title={title} teamSchedule={teamSchedule} />;
}
