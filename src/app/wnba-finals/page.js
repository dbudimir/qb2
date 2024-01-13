import _ from 'lodash';
import { cleanText, cleanHead, cleanPosts } from '/utils/cleanText';
import { getReturn, getPage } from '/utils/getReturn';

import buildQuery from '/utils/buildQuery';
import { parseHtmlOnServer } from '/utils/parseHtmlOnServer';
import { parseMetadata } from '/utils/parseMetadata';

import WNBAFinals from '/components/pages/WNBAFinals';

async function getData() {
  // Getting stuff - pages, headlines, recent posts, and list of players
  const finalsPage = await getPage(10930);
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
    finalsPage.yoast_head,
    `wnba-finals`,
    'https://queenballers.wpcomstaging.com/wp-content/uploads/2020/07/Meganbbalportrait-04-1024x536.jpg'
  );
  const metaDesc = await cleanText(
    head
      .split('<meta property="og:description" content="')
      .pop()
      .split('" />')[0]
  );

  const title = finalsPage.title.rendered.replace('&#8217;', "'");
  const content = parseHtmlOnServer(finalsPage.content.rendered);

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
    `wnba-finals`,
    data.jetpack_featured_media_url
  );

  return parseMetadata(head);
}

export default async function WNBAFinalsPage({}) {
  const data = await getData();

  return (
    <WNBAFinals
      title={data.title}
      content={data.content}
      latestPosts={data.posts}
    />
  );
}
