// // Pages listing all all posts with a matching tag (queenballers.club/basketball/tag)

// import Head from 'next/head'
// import ReactHtmlParser from 'react-html-parser'
// import _ from 'lodash'

// // Utils
// import { getReturn, getTag } from '../../../utils/getReturn'
// import { cleanPosts, cleanHead } from '../../../utils/cleanText'
// import buildQuery from '../../../utils/buildQuery'

// // Components
// import LatestPosts from '../../../components/postgrid/LatestPosts'
// import HeaderText from '../../../components/shared/HeaderText'

// const TagPage = ({ head, tag, posts }) => (
//   <>
//     <Head>{ReactHtmlParser(head)}</Head>
//     <div className="page-container content">
//       <HeaderText
//         titleContent={<h1>{tag.name}</h1>}
//         bodyContent={<p className="page-desc">{tag.description}</p>}
//       />

//       <LatestPosts latestPosts={posts} hideHeader homePage />
//     </div>
//   </>
// )

// export async function getServerSideProps({ params }) {
//   //
//   const { category, tag } = params

//   // Function accepts the tag url slug
//   const currentTag = await getTag(tag)

//   const posts = await getReturn(
//     buildQuery({
//       objectType: 'posts',
//       filter: 'tags',
//       filterKey: currentTag.id,
//       fields: ['link', 'title', 'date', 'excerpt', 'yoast_head', 'jetpack_featured_media_url'],
//       perPage: 100,
//     })
//   )

//   const latestPosts = _.orderBy(posts, (post) => post.date, ['desc'])
//   const cleanLatestPosts = await cleanPosts(latestPosts)

//   const head = await cleanHead(
//     currentTag.yoast_head,
//     `${category}/tag/${tag}`,
//     'https://queenballers.club/static/images/qb-background.png'
//   ).replace(
//     /<meta name="robots".*>/,
//     `<meta name="robots" content="noindex">
// 	`
//   )

//   return {
//     props: { head, tag: currentTag, posts: cleanLatestPosts },
//   }
// }

// export default TagPage
