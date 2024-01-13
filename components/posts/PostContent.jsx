'use client';

// Utils
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Components
import Popular from '/components/postgrid/Popular';

// Styles // import order matters
import PostContentContainer from '/components/style/PostContentContainer';

const PostContent = ({ content }) => {
  const [splicedContent, setSplicedContent] = useState(null);

  useEffect(() => {
    // Todo: Improve this so popular post can appear in different places
    if (!splicedContent) {
      const parsedArray1 = content.slice(0, 10);
      const parsedArray2 = content.slice(10);

      const splicedArray = [
        ...parsedArray1,
        <Popular key="popular-posts" />,
        ...parsedArray2,
      ];

      setSplicedContent(splicedArray);
    }
  }, []);

  // TODO: See if we can do this on the server side
  const generateBody = () => {
    return parsedContentArray;
  };

  return (
    <PostContentContainer className="content">
      {splicedContent || content}
    </PostContentContainer>
  );
};

export default PostContent;
