'use client';

import useSWR from 'swr';
import styled from 'styled-components';

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

  /* @keyframes heightAnimation {
    0% {
      height: 0px;
    }
    80% {
      height: 0px;
    }
    100% {
      height: 44px;
    }
  } */
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const NavAd = () => {
  const { data, error } = useSWR('/api/admin', fetcher);

  let navAdLink;
  if (error) {
    navAdLink = <a />;
  } else if (!data) {
    navAdLink = <a />;
  } else {
    navAdLink = (
      <a href={data.bannerUrl} target="_blank" rel="noreferrer">
        {data.bannerText}
      </a>
    );
  }

  return <NavAdContainer>{navAdLink}</NavAdContainer>;
};

export default NavAd;
