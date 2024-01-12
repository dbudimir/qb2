// Data
const teams = require('/public/static/teams.json');

// Constants
const API_DOMAIN = 'https://queenballers.wpcomstaging.com/';

const getTagPages = async () => {
  const tags = await fetch(
    `${API_DOMAIN}wp-json/wp/v2/tags?_fields=id,slug,&per_page=100`
  );
  const posts = await fetch(
    `${API_DOMAIN}wp-json/wp/v2/posts?_fields=link,slug,tags&per_page=100`
  );

  const tagIndex = tags.reduce((o, tag) => ({ ...o, [tag.id]: tag.slug }), {});
  //
  const allPaths = posts.flatMap((post) =>
    post.tags.map((tag) => ({
      link: `https://queenballers.club/${post.link.split('/')[3]}/tag/${
        tagIndex[tag]
      }`,
    }))
  );

  const uniquePaths = _.uniqWith(allPaths, _.isEqual);

  return uniquePaths;
};

const getPages = async (origin) => {
  const oneOffPageList = [
    { link: `https://queenballers.club/schedule` },
    { link: `https://queenballers.club/wnba-draft` },
  ];

  const pageList = await fetch(
    `${API_DOMAIN}wp-json/wp/v2/pages?_fields[]=link&_fields[]=modified&per_page=100`
  ).then((res) => res.json());

  // Check for posts on every page that has them
  let postList = [];
  const fetchPosts = async (page = 1) => {
    await fetch(
      `${API_DOMAIN}wp-json/wp/v2/posts?_fields[]=link&_fields[]=modified&per_page=100&page=${page}`
    )
      .then((res) => res.json())
      .then(async (posts) => {
        if (posts.length) {
          postList = [...postList, ...posts];
          page++;
          await fetchPosts(page);
        }
      });
  };
  await fetchPosts();

  // Todo: revisit author pages
  // // const authorList = await getReturn(
  // //   `${API_DOMAIN}wp-json/wp/v2/users?_fields=slug,&per_page=100`
  // // ).then((authors) =>
  // //   authors.map((author) => ({ link: `https://queenballers.club/author/${author.slug}` }))
  // // )

  // Todo: revisit tag pages
  // // const tagList = await getTagPages()

  const teamPageList = Object.values(teams).map((team) => ({
    link: `https://queenballers.club${team.scheduleUrl}`,
  }));

  const lineUpList = await fetch('https://queenballers.club/api/lineups')
    .then((res) => res.json())
    .then((lineUps) =>
      lineUps.map((lineup) => ({
        link: `https://queenballers.club${lineup.slug}`,
      }))
    )
    .catch((err) => console.log(err));

  const shopPageList = [
    { link: 'https://queenballers.club/shop/shirts' },
    { link: 'https://queenballers.club/shop/shorts' },
    { link: 'https://queenballers.club/shop/hoodies' },
    { link: 'https://queenballers.club/shop/pants' },
    { link: 'https://queenballers.club/shop/shoes' },
    { link: 'https://queenballers.club/shop/basketballs' },
  ];

  const pages = [
    ...oneOffPageList,
    ...teamPageList,
    ...pageList,
    ...shopPageList,
    ...postList,
    ...lineUpList,
    // ...authorList,
    // ...tagList,
  ];

  const allPages = pages.map((page) => {
    const canonical = page.link
      .replace(API_DOMAIN, 'https://queenballers.club/')
      .replace('/wnba-draft-2021', '/wnba-draft/2021')
      .replace('--', '-')
      .replace(/\/$/, '');

    const lastModified = page.modified
      ? { lastModified: new Date(page.modified) }
      : {};

    return {
      url: canonical,
      ...lastModified,
    };
  });

  return allPages;
};

export default function sitemap() {
  const pages = getPages();

  return pages;
}
