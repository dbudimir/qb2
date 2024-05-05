'use server';

// Utils
import { cleanPostContent } from '/utils/cleanText';
import parseHtmlOnServer from '/utils/parseHtmlOnServer';

// Components
import PostContent from '/components/posts/PostContent';

const getContent = async (blogPost) => {
  const content = await cleanPostContent(blogPost.content.rendered);

  const parsedContent = await parseHtmlOnServer(content);

  return parsedContent;
};

const PostContainer = async ({ blogPost }) => {
  // Data
  const content = await getContent(blogPost);

  return <PostContent content={content} className="content" />;
};

export default PostContainer;
