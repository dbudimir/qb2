'use client';

import Link from 'next/link';
import Image from 'next/image';

import styled from 'styled-components';

const PopularPostsContainer = styled.div`
  background: #ffffff;
  border: 1px solid #393939;
  box-shadow: -8px 8px #393939;
  position: relative;
  padding: 0 24px;
  margin-bottom: 36px;
  overflow: hidden;
  max-width: 720px;

  .highlight-header {
    color: #393939;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    font-size: 20px;
    font-weight: 900;
    padding: 18px 0;
    margin: unset;
    text-shadow: #fcd100 -1px 1px 0px;
  }

  a {
    font-size: 18px;
    text-decoration: none;
    color: rgb(90, 79, 79);
    margin-bottom: 24px;
    display: block;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-shadow: #fcd100 -1px 1px 0px;
      background: transparent;
      color: #000000;
    }
  }

  .image-container {
    position: absolute;
    top: 65%;
    left: 0px;
    height: 300px;
    width: 130%;
    transform: rotate(-15deg);
  }

  @media screen and (max-width: 768px) {
    p {
      &:nth-of-type(3) {
        margin-bottom: 36px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    a {
      font-size: 16px;
    }
  }
`;

const Popular = ({ adminSettings, homePage }) => {
  const postArray =
    adminSettings?.topPosts && Object.values(adminSettings.topPosts);

  return (
    <PopularPostsContainer className="popular-posts">
      <h2 className="highlight-header">Popular Reads</h2>
      {adminSettings &&
        postArray.map((post, i) => (
          <Link key={`popular-post-${i}`} href={post.url}>
            {post.title}
          </Link>
        ))}
      {/* Shows cool graphic on home page */}
      {homePage && (
        <div className="image-container">
          <Image
            src="https://queenballers.wpcomstaging.com/wp-content/uploads/2022/07/wnbalogos.webp"
            fill="true"
            alt="Team logos"
          />
        </div>
      )}
    </PopularPostsContainer>
  );
};

export default Popular;
