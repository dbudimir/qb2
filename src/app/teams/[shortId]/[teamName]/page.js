// Utils
import { getReturn } from '/utils/getReturn';
import { cleanPosts } from '/utils/cleanText';

// Components
import LatestPosts from '/components/postgrid/LatestPosts';
import Lineup from '/components/pages/Lineup';

async function getData({ params }) {
  const { shortId, teamName } = params;

  const lineUp = await fetch(
    `${process.env.DOMAIN}/api/lineups/${shortId}`
  ).then((res) => res.json());

  const slug = `/teams/${shortId}/${teamName}`;
  const metaDesc = `Check ${lineUp.name} featuring WNBA players ${lineUp.players[0].name} and ${lineUp.players[1].name}. Find out their stats & discover who else made the team!`;

  // Generate recent posts
  const latestPosts = await getReturn(
    `${process.env.WP_API}/posts/?per_page=3&_fields=link,excerpt,title,date,jetpack_featured_media_url`
  );

  return {
    ...lineUp,
    slug,
    metaDesc,
    posts: cleanPosts(latestPosts),
  };
}

export async function generateMetadata({ params }) {
  const data = await getData({ params });
  const { shortId, teamName } = params;

  const titleCaseTeamName = data.name
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  const title = `${titleCaseTeamName} | Queen Ballers Club`;
  const description = data.metaDesc;

  return {
    title,
    description,
    image: 'https://queenballers.club/static/images/qb-background.png',
    url: `/teams/${shortId}/${teamName}}`,
  };
}

const LineupPage = async ({ params }) => {
  const data = await getData({ params });

  console.log('data', data);

  // return <Team playerRef={playerRef} />;
  return (
    <>
      <Lineup data={data} />
      <LatestPosts latestPosts={data.posts} hideHeader />
    </>
  );
};

export default LineupPage;
