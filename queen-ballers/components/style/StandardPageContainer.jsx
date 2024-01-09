import styled from 'styled-components';

const StandardPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .header-text-border {
    margin-bottom: 48px;
  }

  .tags {
    margin-bottom: 48px;
    background: #ffffff;

    .more {
      display: none;

      @media screen and (max-width: 1024px) {
        display: block;
      }
    }
  }

  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .col-left {
    min-width: 65%;
    max-width: 65%;

    .post-container {
      border-top: 2px solid #eeeef1;
      padding-top: 24px;
      margin-top: 24px;
    }
  }

  .col-right {
    min-width: 32%;
    max-width: 32%;

    .twitter-timeline {
      border: 1px solid #eeeef1 !important;
      border-radius: 8px;
    }

    .posts {
      padding: 0;
      margin-bottom: 32px;

      .post-excerpt-container {
        > div:first-of-type div {
          max-height: 150px;
        }
        .post-excerpt {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          h2 {
            font-size: 22px !important;
          }
        }
      }
    }
  }

  h4 {
    text-decoration: none;
    text-transform: uppercase;
    border: 1px solid #000000;
    width: max-content;
    padding: 4px 8px;
    border: 2px solid #b565f3;
    box-shadow: -4px 4px #b565f3;
    font-size: 18px;
    background: B565F3;
    margin: 0 0 24px 0;
    letter-spacing: 0.5px;

    @media screen and (max-width: 500px) {
      margin: 0 auto 12px;
    }
  }

  @media screen and (max-width: 768px) {
    .col-left {
      max-width: 100%;
    }
    .col-right {
      display: none;
    }
  }
`;

export default StandardPageContainer;
