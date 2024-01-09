const axios = require('axios')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

// Data
const teams = require('../public/static/teams.json')

const getReturn = (url) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err))

const API_DOMAIN = 'https://queenballers.wpcomstaging.com/'
const DESTINATION =
  process.env.DESTINATION || path.join(__dirname, '../public', 'static', 'sitemap.xml')

let xml = ''
xml += '<?xml version="1.0" encoding="UTF-8"?>'
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

const getTagPages = async () => {
  const tags = await getReturn(`${API_DOMAIN}wp-json/wp/v2/tags?_fields=id,slug,&per_page=100`)
  const posts = await getReturn(
    `${API_DOMAIN}wp-json/wp/v2/posts?_fields=link,slug,tags&per_page=100`
  )

  const tagIndex = tags.reduce((o, tag) => ({ ...o, [tag.id]: tag.slug }), {})
  //
  const allPaths = posts.flatMap((post) =>
    post.tags.map((tag) => ({
      link: `https://queenballers.club/${post.link.split('/')[3]}/tag/${tagIndex[tag]}`,
    }))
  )

  const uniquePaths = _.uniqWith(allPaths, _.isEqual)

  return uniquePaths
}

const getPages = async (origin) => {
  const oneOffPageList = [{ link: `https://queenballers.club/schedule` }]

  const pageList = await getReturn(`${API_DOMAIN}wp-json/wp/v2/pages?_fields=link,&per_page=100`)

  const postList = await getReturn(`${API_DOMAIN}wp-json/wp/v2/posts?_fields=link,&per_page=100`)

  // const authorList = await getReturn(
  //   `${API_DOMAIN}wp-json/wp/v2/users?_fields=slug,&per_page=100`
  // ).then((authors) =>
  //   authors.map((author) => ({ link: `https://queenballers.club/author/${author.slug}` }))
  // )

  // const tagList = await getTagPages()

  const teamPageList = Object.values(teams).map((team) => ({
    link: `https://queenballers.club${team.scheduleUrl}`,
  }))

  const lineUpList = await getReturn('https://queenballers.club/api/lineups')
    .then((lineUps) =>
      lineUps.map((lineup) => ({ link: `https://queenballers.club${lineup.slug}` }))
    )
    .catch((err) => console.log(err))

  const shopPageList = [
    { link: 'https://queenballers.club/shop/shirts' },
    { link: 'https://queenballers.club/shop/shorts' },
    { link: 'https://queenballers.club/shop/hoodies' },
    { link: 'https://queenballers.club/shop/pants' },
    { link: 'https://queenballers.club/shop/shoes' },
    { link: 'https://queenballers.club/shop/basketballs' },
  ]

  const pages = [
    ...oneOffPageList,
    ...teamPageList,
    ...pageList,
    ...shopPageList,
    ...postList,
    ...lineUpList,
    // ...authorList,
    // ...tagList,
  ]

  pages.forEach((page) => {
    const canonical = page.link
      .replace(API_DOMAIN, 'https://queenballers.club/')
      .replace('/wnba-draft-2021', '/wnba-draft/2021')
      .replace('--', '-')
      .replace(/\/$/, '')

    xml += '<url>'
    xml += `<loc>${canonical}</loc>`
    xml += '</url>'
  })

  xml += '</urlset>'

  fs.writeFileSync(origin === 'client' ? 'public/static/sitemap.xml' : DESTINATION, xml)

  //
  const numPages = pages.length
  console.log(`Wrote sitemap for ${numPages} pages to ${DESTINATION}`)

  return xml
}

getPages()
