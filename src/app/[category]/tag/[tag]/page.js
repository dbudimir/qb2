// Pages listing all all posts with a matching tag (queenballers.club/basketball/tag)

// Utils
import { getReturn, getTag } from '/utils/getReturn';
import { cleanPosts, cleanHead } from '/utils/cleanText';
import { parseMetadata } from '/utils/parseMetadata';
import buildQuery from '/utils/buildQuery';
import _ from 'lodash';

// Components
import LatestPosts from '/components/postgrid/LatestPosts';
import HeaderText from '/components/shared/HeaderText';

const getData = async ({ params }) => {
  const { tag } = params;

  // Function accepts the tag url slug
  const currentTag = await getTag(tag);

  const posts = await getReturn(
    buildQuery({
      objectType: 'posts',
      filter: 'tags',
      filterKey: currentTag.id,
      fields: [
        'link',
        'title',
        'date',
        'excerpt',
        'yoast_head',
        'jetpack_featured_media_url',
      ],
      perPage: 100,
    })
  );

  const latestPosts = _.orderBy(posts, (post) => post.date, ['desc']);
  const cleanLatestPosts = await cleanPosts(latestPosts);

  return {
    tag: currentTag,
    posts: cleanLatestPosts,
  };
};

export async function generateMetadata({ params }) {
  const { category, tag } = params;

  // Function accepts the tag url slug
  const currentTag = await getTag(tag);

  const head = await cleanHead(
    currentTag.yoast_head,
    `${category}/tag/${tag}`,
    'https://queenballers.club/static/images/qb-background.png'
  ).replace(
    /<meta name="robots".*>/,
    `<meta name="robots" content="noindex">
	`
  );

  return parseMetadata(head);
}

const TagPage = async ({ params }) => {
  const { tag, posts } = await getData({ params });

  return (
    <>
      <div className="page-container content">
        <HeaderText
          titleContent={<h1>{tag.name}</h1>}
          bodyContent={<p className="page-desc">{tag.description}</p>}
        />

        <LatestPosts latestPosts={[...posts]} homePage />
      </div>
    </>
  );
};

export default TagPage;
