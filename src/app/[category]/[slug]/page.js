// Utils
import Image from 'next/image';
import dayjs from 'dayjs';
import { cleanText, cleanHead } from '/utils/cleanText';
import { getReturn, getPost } from '/utils/getReturn';
import parseMetadata from '/utils/parseMetadata';

// Components
import PostHeader from '/components/posts/PostHeader';
import PostContainer from '/components/posts/PostContainer';
import PrevNextPosts from '/components/posts/PrevNextPosts';
import LazyLoader from '/components/LazyLoader';
import { Suspense } from 'react';

const getBlogPost = async (slug) => {
  const [blogPost] = await getPost(slug);

  return { blogPost };
};

const getData = async (blogPost) => {
  // Get stuff
  const author = await getReturn(
    `${process.env.WP_API}/users/${blogPost.author}`
  );

  const title = await cleanText(blogPost.title.rendered);

  return {
    author,
    image: blogPost.jetpack_featured_media_url,
    title,
    date: dayjs(blogPost.date).format('MMMM D, YYYY'),
    timeStamp: blogPost.date,
  };
};

export async function generateMetadata({ params }) {
  // Data fetch here should be cached
  const { blogPost } = await getBlogPost(params.slug);

  const head = cleanHead(
    blogPost.yoast_head,
    `${params.category}/${params.slug}`,
    blogPost.jetpack_featured_media_url
  );

  return parseMetadata(head);
}

const BlogPost = async ({ params }) => {
  const { blogPost } = await getBlogPost(params.slug);

  const { author, date, timeStamp, title, image } = await getData(blogPost);

  return (
    <>
      {/*Css managed by global style.scss */}
      <div className="post-container">
        <PostHeader
          category={params.category}
          title={title}
          author={author}
          date={date}
        />
        <div className="image-container header-image">
          <Image
            src={image}
            alt={params.slug}
            height={520}
            width={1200}
            quality={25}
            priority={true}
          />
        </div>

        <Suspense fallback={<LazyLoader classes="home-page" />}>
          <PostContainer blogPost={blogPost} />
        </Suspense>

        <PrevNextPosts currentPostDate={timeStamp} />
      </div>
    </>
  );
};

export default BlogPost;
