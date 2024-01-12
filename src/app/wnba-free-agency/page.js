import _ from 'lodash';
import { cleanText, cleanHead, cleanPosts } from '/utils/cleanText';
import { getReturn, getPage } from '/utils/getReturn';

import buildQuery from '/utils/buildQuery';
import { parseMetadata } from '/utils/parseMetadata';

import WNBAFreeAgency from '/components/pages/WNBAFreeAgency';

async function getData() {
  // Getting stuff - pages, headlines, recent posts, and list of players
  const freeAgencyPage = await getPage(14152);
  const headlines = await getReturn(
    buildQuery({
      objectType: 'headlines',
      fields: ['date', 'content'],
      perPage: 20,
    })
  );
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
    freeAgencyPage.yoast_head,
    `wnba-free-agency`,
    'https://queenballers.wpcomstaging.com/wp-content/uploads/2020/07/Meganbbalportrait-04-1024x536.jpg'
  );
  const metaDesc = await cleanText(
    head
      .split('<meta property="og:description" content="')
      .pop()
      .split('" />')[0]
  );
  const title = freeAgencyPage.title.rendered;
  const content = freeAgencyPage.content.rendered;

  // Sort posts
  const latestPosts = _.orderBy(posts, (post) => post.date, ['desc']);
  const cleanLatestPosts = await cleanPosts(latestPosts);

  return {
    title,
    content,
    head,
    headlines,
    posts: cleanLatestPosts,
    metaDesc,
  };
}

export async function generateMetadata() {
  // Data fetch here should be cached
  const data = await getData();

  const head = cleanHead(
    data.head,
    `wnba-free-agency`,
    data.jetpack_featured_media_url
  );

  return parseMetadata(head);
}

export default async function WNBAFreeAgencyPage({}) {
  const { title, content, posts } = await getData();

  return <WNBAFreeAgency content={content} title={title} latestPosts={posts} />;
}
