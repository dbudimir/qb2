'use client';

// Utils
import { useEffect, useState } from 'react';

// Components
import PopularContainer from '/components/postgrid/PopularContainer';

// Styles // import order matters
import PostContentContainer from '/components/style/PostContentContainer';

const PostContent = ({ content }) => {
  const [pageContent, setPageContent] = useState(content);

  useEffect(() => {
    const parsedArray1 = content.slice(0, 10);
    const parsedArray2 = content.slice(10);

    const splicedArray = [
      ...parsedArray1,
      <PopularContainer key="popular-posts" />,
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
