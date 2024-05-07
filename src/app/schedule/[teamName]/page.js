// Utils
import dayjs from 'dayjs';
const year = dayjs().year();

// Data

import WNBATeamScheduleContainer from '/components/pages/schedule/WNBATeamScheduleContainer';

async function getData({ params }) {
  const { teamName } = params;

  const formattedTeamName = teamName
    .replace(/-/g, ' ')
    .split(' ')
    .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' ');

  const title = `${year} ${formattedTeamName} Game Schedule`;

  return { title, teamName };
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
  const { title, teamName } = await getData({ params });

  return <WNBATeamScheduleContainer title={title} teamName={teamName} />;
}
