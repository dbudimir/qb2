import styled from 'styled-components'

const SchedulePage = styled.div`
  max-width: 900px;

  .tags {
    margin-bottom: 32px;
  }

  p {
    margin: 0 auto 18px;
    font-size: 18px;
    line-height: 1.5;
  }

  .description {
    margin: 0 0 48px 0;

    p {
      color: #393939;
      line-height: 1.5;
      font-size: 18px;
      text-align: center;

      @media screen and (max-width: 768px) {
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;

        &.expand {
          overflow: unset;
          display: block;
        }
      }
    }

    h2 {
      text-align: center;
      font-size: 22px;
      color: #393939;
      margin-top: 24px;
    }

    span {
      margin: 0 auto;
      display: none;
      width: max-content;
      text-transform: uppercase;
      opacity: 0.75;

      @media screen and (max-width: 768px) {
        display: block;
      }

      svg {
        margin: 0 6px;
      }
    }
  }

  #schedule-content {
    margin-top: 32px;
  }

  .game-date {
    margin-bottom: 32px;
    text-decoration: none;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #393939;
    text-align: center;
    /* content-visibility: auto; */

    .header {
      display: flex;
      justify-content: center;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        #b565f3 calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      );

      span {
        background: #ffffff;
        padding: 0px 8px;
        margin: 0px 12px;
        font-weight: 800;

        .game-count {
          padding: 0;
          margin: 0 0 0 12px;
          opacity: 0.5;
        }
      }
    }

    .game {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .matchup {
        width: 60%;
        display: flex;
        align-items: center;

        .team {
          display: flex;
          align-items: center;

          > div {
            margin-right: 6px !important;
          }

          a {
            text-decoration: none;
            color: #393939;
            font-size: 16px;

            &:hover {
              color: #b565f3;
            }
          }
        }

        .at {
          font-size: 22px;
          margin: 0 12px;
        }
      }

      .time {
        width: 20%;
      }
      .location {
        width: 20%;

        .arena {
          text-transform: capitalize;
          font-size: 14px;
          opacity: 0.5;
        }
      }

      &.labels {
        font-weight: 900;
      }
    }
  }

  #season-info {
    width: 100%;
    border-bottom: 2px solid black;
    margin-bottom: 32px;
  }

  // prettier-ignore
  @media screen and (max-width: 1024px) { .team { a { font-size: 14px !important; } } }

  @media screen and (max-width: 768px) {
    .game-date {
      .header {
        font-size: 13px;

        .game-count {
          padding: 0 0px;
          margin: 4px;
        }
      }
      .game {
        padding: 12px 0px;
        font-size: 14px !important;

        .matchup {
          flex-wrap: wrap;
          width: 70%;

          .team {
            img {
              max-height: 24px;
            }
            a {
              font-size: 13px;
            }
          }
          .at {
            font-size: 13px;
            margin: 0 6px;
          }
        }

        .time {
          width: 30%;
        }

        .location {
          display: none;
        }
      }
    }
  }
`

export default SchedulePage
