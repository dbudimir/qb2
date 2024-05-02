'use client';

// Utils
import { useEffect, useState } from 'react';

// Components
import Popular from '/components/postgrid/Popular';

// Styles // import order matters
import PostContentContainer from '/components/style/PostContentContainer';

const PostContent = ({ content, adminSettings }) => {
  const [pageContent, setPageContent] = useState(content);

  useEffect(() => {
    const parsedArray1 = content.slice(0, 10);
    const parsedArray2 = content.slice(10);

    const splicedArray = [
      ...parsedArray1,
      <Popular adminSettings={adminSettings} key="popular-posts" />,
      ...parsedArray2,
    ];

    setPageContent(splicedArray);
  }, []);

  return (
    <PostContentContainer className="content">
      {pageContent}
    </PostContentContainer>
  );
};

export default PostContent;
