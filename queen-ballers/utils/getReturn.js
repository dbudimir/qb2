const buildQuery = require('./buildQuery')
const _ = require('lodash')

const getReturn = async url => {
  try {
    const res = await fetch(url)

    return res.json()
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
}

const getPage = async pageId => {
  try {
    const res = await fetch(
      `https://queenballers.wpcomstaging.com/wp-json/wp/v2/pages/${pageId}`
    )
    return res.json()
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
}

const getPost = async postSlug => {
  try {
    const res = await fetch(
      `https://queenballers.wpcomstaging.com/wp-json/wp/v2/posts?slug=${postSlug}`
    )
    return res.json()
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
}

const getTag = async tagSlug => {
  const tag = await getReturn(
    buildQuery({
      objectType: 'tags',
      filter: 'slug',
      filterKey: tagSlug,
      fields: ['id', 'slug', 'name', 'description', 'yoast_head', 'count'],
      perPage: 1
    })
  )

  return tag[0]
}

const getAuthor = async authorSlug => {
  const author = await getReturn(
    ` ${process.env.WP_API}/users?slug=${authorSlug}`
  )

  return author[0]
}

module.exports = { getReturn, getPage, getPost, getTag, getAuthor }
