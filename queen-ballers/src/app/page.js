// "use client";

// import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import _ from 'lodash'
import parse from 'html-react-parser'
import styled from 'styled-components'

// Utils
// import axios from 'axios'
import { getReturn, getPage } from '../../utils/getReturn'
import { cleanHead, cleanPosts } from '../../utils/cleanText'
import buildQuery from '../../utils/buildQuery'

// Components
import LatestPosts from '../../components/postgrid/LatestPosts'
import HeaderText from '../../components/shared/HeaderText'
import TagsRow from '../../components/shared/TagsRow'

// // Style
// const LoadMoreContainer = styled.div`
//   span {
//     display: block;
//     margin: 12px auto;
//     padding: 12px 24px;
//     font-weight: 600;
//     width: max-content;
//     background: #393939;
//     color: #ffffff;
//     border: 2px solid #393939;
//     cursor: pointer;

//     &:hover {
//       background: #b49bd3;
//       color: #393939;
//       border: 2px solid #b49bd3;
//     }
//   }

//   video {
//     max-height: 100px;
//     margin: 0 auto;
//     display: block;
//   }
// `

// async function getData() {
//   console.log(getPage(8))
//   // const res = await fetch('https://api.example.com/...')
//   // // The return value is *not* serialized
//   // // You can return Date, Map, Set, etc.

//   // if (!res.ok) {
//   //   // This will activate the closest `error.js` Error Boundary
//   //   throw new Error('Failed to fetch data')
//   // }

//   // return res.json()

//   return 'the data'
// }

async function getData () {
  console.log('getData')
  //
  // Get stuff - list of popular tags and posts
  const homePage = await getPage(8)

  console.log('homePage', homePage)
  const tags = await getReturn(
    buildQuery({
      objectType: 'tags',
      fields: ['count', 'slug', 'name'],
      perPage: 100
    })
  )
  const posts = await getReturn(
    buildQuery({
      objectType: 'posts',
      fields: [
        'link',
        'title',
        'date',
        'excerpt',
        'jetpack_featured_media_url'
      ],
      perPage: 50,
      page: 1
    })
  )

  // Clean up head and tags
  const head = await cleanHead(
    homePage.yoast_head,
    '',
    'https://queenballers.club/static/images/qb-background.png'
  )
  const cleanTags = tags
    .map(({ count, slug, name }) => ({
      count,
      url: `/basketball/tag/${slug}`,
      name: name.replace('WNBA ', '')
    }))
    .filter(tag => tag.name !== 'Women Basketball Players' && tag.count > 5)

  // Clean up and sort posts
  const latestPosts = _.orderBy(posts, post => post.date, ['desc'])
  const cleanLatestPosts = await cleanPosts(latestPosts)

  // TO DO LATER // Inject highlight into feed
  const highlight = await getReturn(
    buildQuery({
      objectType: 'highlights',
      fields: ['content', 'title'],
      perPage: 1
    })
  )

  // Just helps us slot in this specific component in LatestPosts.jsx
  const popular = { type: 'popular' }

  popular && cleanLatestPosts.splice(3, 0, popular)
  highlight && cleanLatestPosts.splice(6, 0, highlight[0])

  return {
    head,
    posts: cleanLatestPosts,
    tags: _.orderBy(cleanTags, tag => tag.count, ['desc'])
  }
}

export default async function Index ({ adminSettings }) {
  const data = await getData()

  console.log('data', data)
  // const [showLoader, setShowLoader] = useState(false)
  // const [morePosts, setMorePosts] = useState([])

  const getMorePosts = async () => {
    setShowLoader(true)
    const morePostsRes = await getReturn(
      buildQuery({
        objectType: 'posts',
        fields: [
          'link',
          'title',
          'date',
          'excerpt',
          'jetpack_featured_media_url'
        ],
        perPage: 50,
        page: 2
      })
    )
    const latestPosts = _.orderBy(morePostsRes, post => post.date, ['desc'])
    const cleanLatestPosts = await cleanPosts(latestPosts)

    setMorePosts(cleanLatestPosts)
    setShowLoader(false)
  }

  return (
    <>
      {/* <Head>{parse(`${data.head}`)}</Head> */}
      <div className='page-container content'>
        <HeaderText titleContent={<h1>Court is in session</h1>} />
        <TagsRow
          tags={data.tags.map(({ url, name }, i) => (
            <Link key={name + i} href={url}>
              {name}
            </Link>
          ))}
          showMore
        />
        {/* <LatestPosts
          latestPosts={[...data.posts, ...morePosts]}
          topPosts={adminSettings?.topPosts}
          homePage
          hideHeader
        /> */}
        <div>
          {/* {showLoader ? (
            <video className='video-loader' playsInline autoPlay muted loop>
              <source src='/static/images/loader.mp4' type='video/mp4' />
            </video>
          ) : (
            !morePosts.length && (
              <span className='load-more' onClick={e => getMorePosts()}>
                Load More
              </span>
            )
          )} */}
        </div>
      </div>
    </>
  )
}
