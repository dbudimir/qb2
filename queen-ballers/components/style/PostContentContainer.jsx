import styled from 'styled-components';

const PostContentContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.75;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 720px;

  a {
    color: #393939;
    text-decoration: underline;

    &:hover {
      background: #b565f3;
      color: #ffffff;
      text-decoration: none;
    }
  }

  p,
  h2,
  h3,
  h4 {
    max-width: 720px;
    width: 100%;
    margin: 18px auto;
    color: #393939;
  }

  p,
  > div:not(.popular-posts) {
    margin: 0 0 24px !important;
  }

  h2,
  h3 {
    font-weight: 800;
    line-height: 1.25;
  }

  h4 {
    font-size: 22px;
    line-height: 1.25;
  }

  ol,
  ul {
    max-width: 720px;
    width: 100%;
    margin: 0 0 18px;
    border-left: 2px solid #393939;
    padding-left: 48px;

    li {
      margin-bottom: 18px;

      &:last-of-type {
        margin: 0px;
      }
    }
  }

  blockquote {
    margin: 12px 0 32px;
    font-size: 24px;
    font-weight: 800;
    overflow: hidden;
    position: relative;

    svg {
      border-radius: 100px;
      border: 5px solid #ffffff;
      left: 50%;
      max-height: 36px;
      max-width: 36px;
      padding: 6px;
      position: absolute;
      top: -4px;
      transform: translateX(-50%);
      background: #393939;
    }

    hr {
      height: 2px;
      width: 50%;
      border: none;
      background: linear-gradient(90deg, #b49bd3 15%, #b565f3 40%, #46029e 85%);

      &:last-of-type {
        background: linear-gradient(
          270deg,
          #b49bd3 15%,
          #b565f3 40%,
          #46029e 85%
        );
      }
    }

    p {
      padding: 14px 18px 0;
      width: 100%;
    }

    cite {
      text-align: center;
      display: block;
      padding: 0 18px;
      color: #393939;
      font-size: 20px;

      a {
        color: #ffffff;

        &:hover {
          background: transparent;
        }
      }
    }
  }

  figure {
    margin: 16px auto 32px;
    max-width: 840px;
    width: 96%;

    &.image-outer {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    img {
      border: 1px solid #eeeef1;
      border-radius: 12px;
      margin: 0 auto;
      display: block;
      max-width: 100%;
    }

    figcaption {
      font-size: 16px;
    }

    .embed-youtube {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
    }
    .embed-youtube iframe,
    .embed-youtube object,
    .embed-youtube embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .embed-podcast {
    max-width: 720px;
    width: 100%;
    margin-bottom: 18px !important;
    iframe {
      width: 100%;
      box-shadow: -4px 4px #393939;
      height: 98px;

      h2 {
        font-size: 16px;
      }
    }
  }

  form {
    max-width: 720px;
    margin: 24px auto -24px;
  }

  .schema-faq {
    max-width: 720px;
    width: 96%;
    margin: 0 auto;

    .schema-faq-section {
      border-top: 1px solid;
      padding-top: 18px;
    }
  }

  .body-image-container {
    overflow: auto;
    max-width: 100%;

    img {
      border: 1px solid #eeeef1;
      border-radius: 12px;
      max-width: 100%;
      object-fit: contain;
      overflow: hidden;
      height: auto;
    }
  }

  figcaption {
    margin: 12px auto 0px;
    font-size: 16px;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    figure {
      margin: 0 auto 24px;
    }
    p {
      font-size: 18px;
      margin: 0 0 18px;
    }

    ol,
    ul {
      padding-left: 36px;
      li {
        font-size: 18px;
      }
    }
  }
`;

export default PostContentContainer;
