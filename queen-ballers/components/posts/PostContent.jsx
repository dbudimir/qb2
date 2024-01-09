'use client';

// Utils
import parseHtmlString from 'utils/parseHtmlString';
import styled from 'styled-components';

// Components
import Popular from '/components/postgrid/Popular';

// Styles // import order matters
import PostContentContainer from '/components/style/PostContentContainer';

const PostContent = ({ content }) => {
  // TODO: See if we can do this on the server side
  const generateBody = () => {
    const parsedContentArray = parseHtmlString(content);
    parsedContentArray.splice(10, 0, <Popular key="popular-posts" />);

    return parsedContentArray;
  };

  return (
    <PostContentContainer className="content">
      {generateBody()}
    </PostContentContainer>
  );
};

export default PostContent;
