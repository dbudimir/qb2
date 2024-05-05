'use client';

import styled from 'styled-components';

const NavAdContainer = styled.div`
  background: #7c14cc;
  overflow: hidden;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    font-weight: 500;
    display: block;
    color: #ffffff;
    margin: 0 auto;
    text-align: center;
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: all 0.25s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const NavAd = ({ adminSettings }) => {
  return (
    <NavAdContainer>
      <a href={adminSettings.bannerUrl} target="_blank" rel="noreferrer">
        {adminSettings.bannerText ? adminSettings.bannerText : ' '}
      </a>
    </NavAdContainer>
  );
};

export default NavAd;
