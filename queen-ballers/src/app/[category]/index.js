import Head from 'next/head'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'

// Utils
// import { getReturn } from '../../utils/getReturn'
// import { cleanPosts } from '../../utils/cleanText'
// import buildQuery from '../../utils/buildQuery'

// Components
import LatestPosts from '../../components/postgrid/LatestPosts'

const PageContainer = styled.div`
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 60px 1em;
    position: relative;

    .intro-text {
      width: 100%;
      position: relative;
      background: #eeeef1;
      background: linear-gradient(90deg, #b49bd3 15%, #b565f3 40%, #46029e 85%);
      height: 2px;
      margin-bottom: 32px;
      display: flex;
      justify-content: center;

      span {
        font-size: 24px;
        font-weight: 600;
        text-transform: uppercase;
        position: absolute;
        top: -14px;
        background: #ffffff;
        padding: 0px 18px;
        letter-spacing: 1.5px;
        color: #393939;

        @media screen and (max-width: 320px) {
          letter-spacing: 0.5px;
        }
      }
    }
  }
`

export default function Category({ homePage, posts, category }) {
  return (
    <>
      <Head>{ReactHtmlParser(homePage.yoast_head)}</Head>
      <PageContainer>
        <div className="content">
          <div className="intro-text">
            <span>{category}</span>
          </div>
          <LatestPosts latestPosts={posts} hideHeader homePage />
        </div>
      </PageContainer>
    </>
  )
}

export async function getServerSideProps() {
  // const posts = await getReturn(
  //    buildQuery({
  //       objectType: 'posts',
  //       fields: ['link', 'title', 'date', 'excerpt', 'jetpack_featured_media_url'],
  //       perPage: 100,
  //    })
  // )
  // const latestPosts = _.orderBy(posts, (post) => post.date, ['desc'])

  // const pages = await getReturn(`${process.env.WP_API}/pages?_fields=id,yoast_head,link`)

  // // TODO: Filter for specific page slug
  // const homePage = _.find(pages, ['id', 8])

  // return {
  //    props: { homePage, posts: cleanPosts(latestPosts), category: params.category },
  // }

  return { redirect: { destination: '/', permanent: true } }
}
