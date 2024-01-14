// Utils
import getUniquePlayers from 'utils/data/parsePlayers.js';

// Components
import CreateTeam from '/components/pages/CreateTeam';

export async function generateMetadata({}) {
  const title = 'Make Your Own WNBA Team of 5 Starters | Queen Ballers Club';
  const description =
    'Create a custom WNBA team. Make the top 5 guards of all time or top 5 UConn players of all time. & Show it off!';

  return {
    title,
    description,
    image: 'https://queenballers.club/static/images/qb-background.png',
    url: `/create-team`,
  };
}

const CreateTeamPage = ({}) => {
  const playerRef = getUniquePlayers();

  return <CreateTeam playerRef={playerRef} />;
};

export default CreateTeamPage;
