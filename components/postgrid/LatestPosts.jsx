'use client';

import { useState } from 'react';
import { getReturn } from '/utils/getReturn';
import { cleanPosts } from '/utils/cleanText';
import buildQuery from '/utils/buildQuery';
import styled from 'styled-components';

// Components
import Post from '/components/postgrid/Post';
import Highlight from '/components/postgrid/Highlight';
import Popular from '/components/postgrid/Popular';

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

const LoadMoreContainer = styled.div`
  span {
    display: block;
    margin: 12px auto;
    padding: 12px 24px;
    font-weight: 600;
    width: max-content;
    background: #393939;
    color: #ffffff;
    border: 2px solid #393939;
    cursor: pointer;

    &:hover {
      background: #b49bd3;
      color: #393939;
      border: 2px solid #b49bd3;
    }
  }

  video {
    max-height: 100px;
    margin: 0 auto;
    display: block;
  }
`;

const LatestPosts = ({ latestPosts, homePage, hideHeader }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [morePosts, setMorePosts] = useState([]);

  const getMorePosts = async () => {
    setShowLoader(true);
    const morePostsRes = await getReturn(
      buildQuery({
        objectType: 'posts',
        fields: [
          'link',
          'title',
          'date',
          'excerpt',
          'jetpack_featured_media_url',
        ],
        perPage: 50,
        page: 2,
      })
    );
    const latestPosts = _.orderBy(morePostsRes, (post) => post.date, ['desc']);
    const cleanLatestPosts = await cleanPosts(latestPosts);

    setMorePosts(cleanLatestPosts);
    setShowLoader(false);
  };

  return (
    <LatestPostsContainer className="latest-posts-container">
      {!hideHeader && <h3>Latest Posts</h3>}
      <div className={`posts ${homePage ? 'home-page' : undefined}`}>
        {
          // List of posts
          [...latestPosts, ...morePosts].map((post, index) => {
            // Image data
            const first = index === 0 && homePage;
            const featured = index === 7 || index === 11 || index === 17;

            const width = first ? 720 : featured ? 800 : 490;
            const height = first ? 400 : featured ? 305 : 305;

            return post.type === 'popular' ? (
              <Popular key={`popular${index}`} homePage={homePage} />
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
      {homePage && (
        <LoadMoreContainer>
          {showLoader ? (
            <video className="video-loader" playsInline autoPlay muted loop>
              <source src="/static/images/loader.mp4" type="video/mp4" />
            </video>
          ) : (
            !morePosts.length && (
              <span className="load-more" onClick={(e) => getMorePosts()}>
                Load More
              </span>
            )
          )}
        </LoadMoreContainer>
      )}
    </LatestPostsContainer>
  );
};

export default LatestPosts;
