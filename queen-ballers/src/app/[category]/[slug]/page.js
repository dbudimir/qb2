// Utils
import Image from 'next/image'
import dayjs from 'dayjs'
import _ from 'lodash'
import { cleanText, cleanHead, cleanPostContent } from '/utils/cleanText'
import { getReturn, getPost } from '/utils/getReturn'
import { parseMetadata } from '/utils/parseMetadata'

// Components

import PostHeader from '/components/posts/PostHeader'
import PostContent from '/components/posts/PostContent'
import PrevNextPosts from '/components/posts/PrevNextPosts'

const getData = async ({ params }) => {
  const { slug, category } = params

  // Get stuff
  const [blogPost] = await getPost(slug)

  const [author, title, content] = await Promise.all([
    getReturn(`${process.env.WP_API}/users/${blogPost.author}`),
    cleanText(blogPost.title.rendered),
    cleanPostContent(blogPost.content.rendered)
  ])

  return {
    ...blogPost,
    author,
    category,
    content,
    image: blogPost.jetpack_featured_media_url,
    title,
    date: dayjs(blogPost.date).format('MMMM D, YYYY'),
    timeStamp: blogPost.date
  }
}

export async function generateMetadata ({ params }) {
  // Data fetch here should be cached
  const data = await getData({ params })

  const head = cleanHead(
    data.yoast_head,
    `${params.category}/${params.slug}`,
    data.jetpack_featured_media_url
  )

  return parseMetadata(head)
}

const BlogPost = async ({ params }) => {
  const { author, content, category, slug, date, timeStamp, title, image } =
    await getData({ params })

  return (
    <>
      {/*Css managed by global style.scss */}
      <div className='post-container'>
        <PostHeader
          category={category}
          title={title}
          author={author}
          date={date}
        />
        <div className='image-container header-image'>
          <Image
            src={image}
            alt={slug}
            height={520}
            width={1200}
            quality={25}
            priority={true}
          />
        </div>
        <PostContent content={content} />
        <PrevNextPosts currentPostDate={timeStamp} />
      </div>
    </>
  )
}

export default BlogPost
