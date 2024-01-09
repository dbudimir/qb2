import styled from 'styled-components';

const InfoPageContainer = styled.div`
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
    > ul:last-of-type {
      list-style: none;
      padding: unset;
      display: flex;
      flex-wrap: wrap;
      font-weight: 600;

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
        }
      }
    }
  }
`;

export default InfoPageContainer;
