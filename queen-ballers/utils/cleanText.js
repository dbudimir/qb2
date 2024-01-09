import dayjs from 'dayjs';

const cleanText = (string) =>
  string
    .replace(/(&#(\d+);)/g, (match, capture, charCode) =>
      String.fromCharCode(charCode)
    )
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(new RegExp('https://queenballers.club', 'g'), '')
    .replace(new RegExp('https://queenballers.wpcomstaging.com', 'g'), '')
    .replace(/\/$/, '');

export const cleanHead = (headString, canonicalUrlPath, featuredImage) => {
  const title = headString.split('<title>').pop().split('</title>')[0];
  const shortTitle =
    title.length > 60 ? title.replace(' | Queen Ballers Club', '') : title;

  return headString
    .replace(
      'https://queenballers.wpcomstaging.com',
      'https://queenballers.club'
    )
    .split('https://queenballers.club/"')
    .join('https://queenballers.club"')
    .replace(/<title.*>/, `<title>${shortTitle}</title>`)
    .replace(
      /<link rel="canonical".*>/,
      `<link rel="canonical" href="https://queenballers.club/${canonicalUrlPath}">`
    )
    .replace(
      /<meta property="og:url".*>/,
      `<meta property="og:url" href="https://queenballers.club/${canonicalUrlPath}"> 
			${featuredImage ? `<meta property="og:image" content="${featuredImage}">` : ''}`
    );
};

export const cleanPosts = (posts) => {
  var hasPosts = posts.filter((value) => JSON.stringify(value) !== '{}');

  return hasPosts.map((post) => ({
    date: dayjs(post.date).format('MMMM D, YYYY'),
    excerpt: post.excerpt.rendered,
    title: cleanText(post.title.rendered),
    link: cleanText(post.link),
    image: post.jetpack_featured_media_url,
  }));
};

export const cleanPostContent = (postContent) =>
  postContent
    .replace(
      'https://queenballers.wpcomstaging.com',
      'https://queenballers.club'
    )
    .replace(new RegExp('https://queenballers.club', 'g'), '')
    .replace(/(\r\n|\n|\r)/gm, '')
    .split(' ')
    .map((str) =>
      str.includes('href') &&
      (str.includes('queenballers.club') || !str.includes('//'))
        ? str.replace('https://queenballers.club', '').replace('/"', '"')
        : str
    )
    .join(' ');

module.exports = { cleanText, cleanHead, cleanPosts, cleanPostContent };
