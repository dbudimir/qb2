// Utils
import { getPage } from '/utils/getReturn';
import { cleanHead } from '/utils/cleanText';
import { parseMetadata } from '/utils/parseMetadata';

// Components
import MediaKit from '/components/pages/MediaKit';

const getData = async ({}) => {
  //
  const page = await getPage(9975);

  return {
    content: page.content.rendered,
    title: page.title.rendered,
  };
};

export async function generateMetadata({}) {
  //
  const page = await getPage(9975);
  const head = await cleanHead(
    page.yoast_head,
    `media-kit`,
    'https://queenballers.club/static/images/qb-background.png'
  );
  return parseMetadata(head);
}

export default async function AdvertisePage({ params }) {
  const { content, title } = await getData({ params });

  return <MediaKit content={content} title={title} />;
}
