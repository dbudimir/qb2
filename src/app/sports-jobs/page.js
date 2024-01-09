import { getPage } from '../../../utils/getReturn';
import { cleanHead } from '../../../utils/cleanText';
import { parseMetadata } from '/utils/parseMetadata';

import SportsJobs from '../../../components/pages/SportsJobs';

async function getData() {
  const welcomePage = await getPage(9135);

  const head = await cleanHead(
    welcomePage.yoast_head,
    'sports-jobs',
    'https://queenballers.club/static/images/qb-background.png'
  );

  return {
    head,
    content: welcomePage.content.rendered,
  };
}

export async function generateMetadata() {
  // Data fetch here should be cached
  const data = await getData();

  const head = cleanHead(
    data.head,
    `sports-jobs`,
    data.jetpack_featured_media_url
  );

  return parseMetadata(head);
}

export default async function SportsJobsPage({}) {
  const data = await getData();

  return <SportsJobs content={data.content} />;
}
