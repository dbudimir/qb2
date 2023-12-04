import styled from 'styled-components';
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';

const PostContainer = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  max-width: unset;
  padding: 0;
  transition: all 0.5s ease;
  text-decoration: none;
  border: 1px solid #eeeef1;

  h3 {
    font-size: 28px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 32px 0 6px;
  }

  img {
    width: 100%;
    max-height: 300px;
    position: relative;
    object-fit: cover;
  }

  .post-excerpt {
    padding: 0 12px;
    min-width: 40%;

    h2 {
      color: #393939;
      margin: 12px 0 6px;
      font-size: 30px;
      font-weight: 900;
      text-decoration: none;
    }

    span {
      color: #393939;
    }

    p {
      color: #393939;
      line-height: 1.5;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;

      .screen-reader-text {
        border: 0;
        clip: rect(1px, 1px, 1px, 1px);
        -webkit-clip-path: inset(50%);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute !important;
        width: 1px;
        word-wrap: normal !important;
      }
    }

    .continue {
      margin-bottom: 12px;
      color: #b49bd3;
      padding: 0px;
      margin-top: 6px;
      display: block;
      width: max-content;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-size: 14px;
    }

    .more-link {
      display: none;
    }
  }

  &:hover {
    transform: scale(1.02);

    .post-excerpt {
      h2,
      .continue {
        color: #b565f3;
      }
    }
  }
`;

const Post = ({ post, homePage, width, height, first }) => {
  const { link, image, title, date, excerpt } = post;
  const titleFontSize = first ? (title.length > 60 ? '30px' : '42px') : '30px';

  return (
    <Link href={link}>
      <PostContainer className="post-excerpt-container">
        <Image
          className="post-image"
          src={image}
          alt={title}
          height={height}
          width={width}
          priority={first}
          quality={60}
        />
        <div className="post-excerpt">
          <h2 style={{ fontSize: titleFontSize }}>{title}</h2>
          <span>{date}</span>
          {
            // Only show on home page
            homePage && parse(`${excerpt.replace(/<a .*a>/, '')}`)
          }
          <span className="continue">Continue Reading</span>
        </div>
      </PostContainer>
    </Link>
  );
};

export default Post;
