'use client';
import { useEffect, useState } from 'react';
import parseHtmlString from '/utils/parseHtmlString';
import styled from 'styled-components';

// Components
import PostContentContainer from '/components/style/PostContentContainer';

const MediaKitContainer = styled.div`
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
    #logos,
    #contacts {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      gap: 6px;

      h2 {
        width: 100%;
      }

      p {
        font-size: 20px;
        border: 1px solid;
        padding: 8px;
        border-radius: 8px;
        margin: 6px 12px 0 0;
      }

      img {
        max-width: 200px !important;

        &:nth-of-type(2) {
          padding: 10px;
        }
      }
    }

    #images {
      h2 {
        align-self: flex-start;
      }

      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        padding: 12px;
      }
    }

    #social-links {
      ul {
        list-style: none;
        padding: unset;
        display: flex;
        flex-wrap: wrap;
        font-weight: 600;
        border: unset;

        li {
          padding: 6px 12px;
          border: 2px solid #000000;
          margin: 0 6px 6px 0;
          cursor: pointer;
          transition: all 0.5s ease;

          &:hover {
            background: yellow;
          }

          a {
            color: #000000;
            text-decoration: none;

            &:hover {
              background: unset;
            }
          }
        }
      }
    }
  }
`;

const MediaKit = ({ content, title }) => {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    !pageContent && setPageContent(parseHtmlString(content));
  }, []);

  return (
    <MediaKitContainer className="page-container">
      <h1>{title}</h1>
      <PostContentContainer className="content">
        {pageContent}
      </PostContentContainer>
    </MediaKitContainer>
  );
};

export default MediaKit;
