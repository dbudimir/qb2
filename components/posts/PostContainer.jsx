'use server';

// Utils
import { cleanPostContent } from '/utils/cleanText';
import { getAdminSettings } from '/utils/getReturn';
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
  let adminSettings = {};
  const content = await getContent(blogPost);
  try {
    adminSettings = await getAdminSettings().then((res) => res);
  } catch (error) {
    throw new Error(`Failed to fetch data fetching admin settings`);
  }

  return (
    <PostContent
      content={content}
      adminSettings={adminSettings}
      className="content"
    />
  );
};

export default PostContainer;
