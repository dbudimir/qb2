import _ from 'lodash';
import { cleanText, cleanHead, cleanPosts } from '/utils/cleanText';
import { getReturn, getPage } from '/utils/getReturn';

import buildQuery from '/utils/buildQuery';
import { parseHtmlOnServer } from '/utils/parseHtmlOnServer';
import { parseMetadata } from '/utils/parseMetadata';

import WNBADraft from '/components/pages/WNBADraft';

const tags = [
  { name: 'Top Picks', id: 'drafted', url: '/wnba-draft/#drafted' },
  {
    name: 'How to Watch',
    id: 'how-to-watch',
    url: '/wnba-draft/#how-to-watch',
  },
  { name: 'Draft FAQ', id: 'draft-qa', url: '/wnba-draft/#draft-qa' },
  { name: 'Mock Drafts ', id: 'mock-drafts', url: '/wnba-draft/#mock-drafts' },
  {
    name: 'Draft History',
    id: 'draft-history',
    url: '/wnba-draft/#draft-history',
  },
];

async function getData() {
  // Getting stuff - pages, headlines, recent posts, and list of players
  const draftPage = await getPage(9420);
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
    draftPage.yoast_head,
    `wnba-draft`,
    'https://queenballers.wpcomstaging.com/wp-content/uploads/2020/07/Meganbbalportrait-04-1024x536.jpg'
  );
  const metaDesc = await cleanText(
    head
      .split('<meta property="og:description" content="')
      .pop()
      .split('" />')[0]
  );
  const title = draftPage.title.rendered;
  const content = parseHtmlOnServer(draftPage.content.rendered);

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
    `wnba-draft`,
    data.jetpack_featured_media_url
  );

  return parseMetadata(head);
}

export default async function WNBADraftPage({}) {
  const data = await getData();

  return (
    <WNBADraft
      title={data.title}
      tags={tags}
      content={data.content}
      latestPosts={data.posts}
    />
  );
}
