const axios = require('axios')
const buildQuery = require('./buildQuery')
const _ = require('lodash')

const getReturn = async url => {
  console.log('getReturn url', url)
  // return await fetch(`https://queenballers.wpcomstaging.com/wp-json/wp/v2/${url}`)

  // return axios
  //   .get(url)
  //   .then((response) => response.data)
  //   .catch((error) => console.log(error))

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

  // console.log('do this')
  // const page = await getReturn(`${process.env.WP_API}/pages/${pageId}`)

  // return page
}

const getPost = async postSlug => {
  const post = await getReturn(`${process.env.WP_API}/posts?slug=${postSlug}`)

  return post[0]
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
