import buildQuery from '/utils/buildQuery';

export const getReturn = async (url) => {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });

    return res.json();
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
};

export const getPage = async (pageId) => {
  try {
    const res = await fetch(
      `https://queenballers.wpcomstaging.com/wp-json/wp/v2/pages/${pageId}`,
      { next: { revalidate: 3600 } }
    );
    return res.json();
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
};

export const getPost = async (postSlug) => {
  try {
    const res = await fetch(
      `https://queenballers.wpcomstaging.com/wp-json/wp/v2/posts?slug=${postSlug}`,
      { next: { revalidate: 3600 } }
    );
    return res.json();
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
};

export const getTag = async (tagSlug) => {
  const tag = await getReturn(
    buildQuery({
      objectType: 'tags',
      filter: 'slug',
      filterKey: tagSlug,
      fields: ['id', 'slug', 'name', 'description', 'yoast_head', 'count'],
      perPage: 1,
    })
  );

  return tag[0];
};

export const getAuthor = async (authorSlug) => {
  const author = await getReturn(
    ` ${process.env.WP_API}/users?slug=${authorSlug}`
  );

  return author[0];
};
