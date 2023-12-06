"use client";

import styled from "styled-components";

const NavAdContainer = styled.div`
  background: #7c14cc;
  overflow: hidden;

  a {
    font-weight: 500;
    display: block;
    color: #ffffff;
    margin: 0 auto;
    text-align: center;
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: all 0.25s ease-in-out;
    min-height: 46px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const NavAd = ({ bannerUrl, bannerText }) => {
  return (
    <NavAdContainer>
      <a href={bannerUrl} target="_blank" rel="noreferrer">
        {bannerText}
      </a>
    </NavAdContainer>
  );
};

export default NavAd;
