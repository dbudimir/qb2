import { getPage } from '../../../utils/getReturn';
import { cleanHead } from '../../../utils/cleanText';
import { parseMetadata } from '/utils/parseMetadata';

import BasketballAnalysis from '../../../components/pages/BasketballAnalysis';

async function getData() {
  const welcomePage = await getPage(277);

  const head = await cleanHead(
    welcomePage.yoast_head,
    'basketball-analysis',
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
    `basketball-analysis`,
    data.jetpack_featured_media_url
  );

  return parseMetadata(head);
}

export default async function BasketballAnalysisPage({}) {
  const data = await getData();

  return <BasketballAnalysis content={data.content} />;
}
