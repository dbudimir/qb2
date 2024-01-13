'use client';

import styled from 'styled-components';

const HeaderTextRow = styled.div`
  width: 100%;

  .header-text-boarder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 4px;
    margin-bottom: 24px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) calc(50% - 2px),
      #b565f3 calc(50%),
      rgba(0, 0, 0, 0) calc(50% + 2px)
    );

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      img {
        border-radius: 9999px;
        border: 12px solid #ffffff !important;
      }

      h1,
      h2 {
        font-size: 24px;
        font-weight: 600;
        text-transform: uppercase;
        top: -14px;
        background: #ffffff;
        padding: 0px 14px;
        letter-spacing: 1.5px;
        color: #393939;
        margin: unset;

        @media screen and (max-width: 500px) {
          font-size: 22px;
        }

        @media screen and (max-width: 320px) {
          letter-spacing: 0.5px;
        }
      }

      h2 {
        font-size: 20px;
      }
    }
  }

  .page-desc {
    font-size: 22px;
    text-align: center;
    margin: 24px auto;
    max-width: 1000px;
    line-height: 1.75;
    padding: 0 10px;

    @media screen and (max-width: 540px) {
      font-size: 18px;
      line-height: 1.5;
    }
  }
`;

const HeaderText = ({ titleContent, bodyContent }) => (
  <HeaderTextRow>
    <div className="header-text-boarder">
      <div className="content">{titleContent}</div>
    </div>
    {bodyContent}
    {bodyContent && <div className="header-text-boarder" />}
  </HeaderTextRow>
);

export default HeaderText;
