import _ from 'lodash';
import dayjs from 'dayjs';
import { cleanText, cleanHead, cleanPosts } from '/utils/cleanText';
import { getReturn, getPage } from '/utils/getReturn';

import buildQuery from '/utils/buildQuery';
import parseHtmlOnServer from '/utils/parseHtmlOnServer';
import parseMetadata from '/utils/parseMetadata';

import WNBASchedule from '/components/pages/WNBASchedule';

const year = dayjs().year();
const tags = [
  { name: `${year} Schedule`, id: 'schedule-content' },
  { name: 'Season Info', id: 'season-info' },
];

async function getData() {
  // Getting stuff - pages, headlines, recent posts, and list of players
  const schedulePage = await getPage(15974);

  const posts = await getReturn(
    buildQuery({
      objectType: 'posts',
      fields: [
        'link',
        'title',
        'date',
        'excerpt',
        'yoast_head',
        'jetpack_featured_media_url',
      ],
      perPage: 5,
    })
  );

  // Cleanup strings - head and page content
  const head = await cleanHead(
    schedulePage.yoast_head,
    `schedule`,
    'https://queenballers.wpcomstaging.com/wp-content/uploads/2020/07/Meganbbalportrait-04-1024x536.jpg'
  );

  const title = schedulePage.title.rendered;
  const content = parseHtmlOnServer(schedulePage.content.rendered);

  // Sort posts
  const latestPosts = _.orderBy(posts, (post) => post.date, ['desc']);
  const cleanLatestPosts = await cleanPosts(latestPosts);

  return {
    title,
    content,
    head,
    posts: cleanLatestPosts,
  };
}

export async function generateMetadata() {
  // Data fetch here should be cached
  const data = await getData();

  const head = cleanHead(
    data.head,
    `schedule`,
    data.jetpack_featured_media_url
  );

  return parseMetadata(head);
}

export default async function WNBASchedulePage({}) {
  const data = await getData();

  return (
    <WNBASchedule tags={tags} content={data.content} latestPosts={data.posts} />
  );
}
