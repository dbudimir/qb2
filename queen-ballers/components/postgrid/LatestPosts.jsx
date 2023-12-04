'use client'

import styled from 'styled-components';

// Components
import Post from './Post';
import Highlight from './Highlight';
import Popular from './Popular';

const LatestPostsContainer = styled.div`
  h3 {
    font-size: 28px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 32px 0 6px;
  }

  .posts {
    padding: 1em 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1.4em;
    grid-auto-flow: dense;

    @media (max-width: 600px) {
      padding: 0 !important;

      .post-excerpt {
        margin-bottom: 24px;
      }
    }

    &.home-page {
      // Top post on home page
      a:nth-child(1) {
        grid-column: 1 / -1;

        div {
          flex-direction: row;
          width: 100%;

          img:first-of-type {
            width: 60%;
            min-height: 350px;
            max-height: 400px;
            object-fit: cover;
          }

          .post-excerpt {
            padding: 0 24px;

            @media (max-width: 900px) {
              padding: 12px;
            }
          }

          h2 {
            font-size: 42px;
            margin-bottom: 18px;

            @media (max-width: 900px) {
              font-size: 28px;
            }
          }
        }
      }

      a:nth-child(8),
      a:nth-child(18) {
        grid-column: -3 / -1;
      }

      a:nth-child(12) {
        grid-column: 1 / 3;
      }

      a:after {
        color: #808;
        font-weight: bold;
        font-family: courier;
      }

      @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        padding: 1em;

        a:nth-child(1) {
          grid-column: 1 / -1;

          div {
            flex-direction: column;
          }

          img {
            width: 100% !important;
            min-height: unset;
            max-height: 250px;
          }
        }

        a {
          flex-direction: column !important;

          h4 {
            font-size: 28px;
          }
        }
      }

      @media (max-width: 600px) {
        display: flex;
        flex-direction: column;

        a:nth-child(1) {
          max-height: unset !important;

          div {
            flex-direction: column !important;
          }
        }

        a {
          flex-direction: column !important;
        }
      }

      .more-link {
        display: none !important;
      }
    }
  }
`;

const LatestPosts = ({ latestPosts, topPosts, homePage, hideHeader }) => (
  <LatestPostsContainer className="latest-posts-container">
    {!hideHeader && <h3>Latest Posts</h3>}
    <div className={`posts ${homePage ? 'home-page' : undefined}`}>
      {
        // List of posts
        latestPosts.map((post, index) => {
          // Image data
          const first = index === 0 && homePage;
          const featured = index === 7 || index === 11 || index === 17;

          const width = first ? 720 : featured ? 800 : 490;
          const height = first ? 400 : featured ? 305 : 305;

          return post.type === 'popular' ? (
            <Popular
              key={`popular${index}`}
              topPosts={topPosts}
              homePage={homePage}
            />
          ) : post.type === 'highlights' ? (
            <Highlight key={`highlight${index}`} highlight={post} />
          ) : (
            <Post
              key={`post${index}`}
              post={post}
              homePage={homePage}
              width={width}
              height={height}
              first={first}
            />
          );
        })
      }
    </div>
  </LatestPostsContainer>
);

export default LatestPosts;
