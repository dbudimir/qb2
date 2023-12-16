'use client'

import Link from 'next/link';
import styled from 'styled-components';

const PostHeaderContainer = styled.div`
  max-width: 840px;
  padding: 32px 0.5em 0;
  margin: 32px auto 48px;
  border-top: 2px solid #eeeef1;

  ol {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    color: #393939;
    font-weight: 800;
    font-size: 14px;

    li {
      width: max-content;
      margin-right: 4px;
      text-transform: uppercase;
      letter-spacing: 1px;

      a {
        text-decoration: none;
        color: #393939;
      }
    }
  }

  h1 {
    font-size: 52px;
    font-weight: 800;
    margin: 24px 0 18px;
  }

  .header-meta {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 14px;
    color: #393939;
    letter-spacing: 1.5px;
    margin-bottom: 12px;
    display: block;

    a {
      letter-spacing: 1px;
      padding: 0 4px;
      color: #7c14cc;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .disclaimer {
    display: block;
    color: #a0a0a0;
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    margin: 0 auto 48px;

    h1 {
      margin: 24px 12px 24px 0;
      font-size: 32px;
    }
  }
`;

const PostHeader = ({ category, title, author, date }) => {
  const twitterHandle =
    author.yoast_head.includes('https://twitter.com/') &&
    author.yoast_head.split('"https://twitter.com/').pop().split('"')[0];

  return (
    <PostHeaderContainer className="post-header">
      <ol>
        <li>
          <Link href="/">Home →</Link>
        </li>
        <li>
          <Link href={`/${category}`}>{`${category} →`}</Link>
        </li>
        <li>{title}</li>
      </ol>
      <h1>{title}</h1>
      <span className="header-meta">
        By
        <Link href={`/author/${author.slug}`}>{author.name}</Link>|
        {twitterHandle && (
          <a
            href={`https://twitter.com/${twitterHandle}`}
            target="_blank"
            rel="noreferrer"
          >
            @{twitterHandle}
          </a>
        )}
        | <span>{date}</span>
      </span>
      <span className="disclaimer">
        If you buy something from a link on our site, Queen Ballers Club may
        earn a commission.
      </span>
    </PostHeaderContainer>
  );
};

export default PostHeader;
