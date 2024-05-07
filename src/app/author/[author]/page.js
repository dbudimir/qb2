// Utils
import { getReturn, getAuthor } from '/utils/getReturn';
import { cleanPosts, cleanHead } from '/utils/cleanText';
import parseMetadata from '/utils/parseMetadata';
import buildQuery from '/utils/buildQuery';
import _ from 'lodash';

// Components
import LatestPosts from '/components/postgrid/LatestPosts';
import HeaderText from '/components/shared/HeaderText';

const getData = async ({ params }) => {
  const { author } = params;

  // Function accepts the author url slug
  const currentAuthor = await getAuthor(author);

  const posts = await getReturn(
    buildQuery({
      objectType: 'posts',
      filter: 'author',
      filterKey: currentAuthor.id,
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
    author: currentAuthor,
    posts: cleanLatestPosts,
  };
};

export async function generateMetadata({ params }) {
  const { author } = params;

  // Function accepts the author url slug
  const currentAuthor = await getAuthor(author);

  const head = await cleanHead(
    currentAuthor.yoast_head,
    `author/${author}`,
    'https://queenballers.club/static/images/qb-background.png'
  ).replace(
    /<meta name="robots".*>/,
    `<meta name="robots" content="noindex">
	`
  );

  return parseMetadata(head);
}

const AuthorPage = async ({ params }) => {
  const { author, posts } = await getData({ params });

  return (
    <div className="page-container content">
      <HeaderText
        titleContent={<h1>{author.name}</h1>}
        bodyContent={<p className="page-desc">{author.description}</p>}
      />
      <LatestPosts latestPosts={[...posts]} homePage />
    </div>
  );
};

export default AuthorPage;
