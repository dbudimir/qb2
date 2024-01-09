'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import parseHtmlString from 'utils/parseHtmlString';

// Components
import PostContent from '/components/posts/PostContent';

// Styles
const ShopContainer = styled.div`
  max-width: 720px;

  h1 {
    font-size: 48px;
    margin-top: 0;
  }

  h3 {
    font-size: 32px;
  }

  h4 {
    font-size: 28px;
    margin: 0;
    text-decoration: underline;
  }

  .wp-block-coblocks-gallery-offset {
    /* overflow: scroll; */
    ul {
      list-style: none;
      padding: unset;
      margin: unset;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    li {
      width: 48%;
      padding: unset;
      margin: unset;
      display: flex;
      align-items: center;
      justify-content: center;

      figure {
        padding: 12px;
        margin: unset;
      }

      @media screen and (max-width: 960px) {
        width: 100%;
      }
    }

    img {
      max-width: 100%;
      max-height: 500px;
      width: auto;
      height: auto;
      border: 2px solid #eeeef1;
      border-radius: 12px;
    }
  }

  .content {
    ul {
      padding-bottom: 32px;
      margin-bottom: 32px;
      border-bottom: 1px solid #393939;

      li {
        margin-bottom: 6px;
      }
    }
  }
`;

export default function SportsJobs({ content, title }) {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    !pageContent && setPageContent(parseHtmlString(content));
  }, []);
  //
  return (
    <ShopContainer className="page-container">
      <h1>{title}</h1>
      <PostContent content={content} />
    </ShopContainer>
  );
}
