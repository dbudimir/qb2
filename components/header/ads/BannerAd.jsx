'use client';

import Image from 'next/image';

import styled from 'styled-components';

const BannerAdContainer = styled.a`
  display: flex;
  justify-content: center;
  max-width: 728px;
  min-height: 90px;
  margin: 12px auto;

  @media (max-width: 768px) {
    margin: 0 auto 12px;
    min-height: 60px;
  }

  > img {
    min-height: 90px;
    max-width: 100%;
    object-fit: contain;
  }
`;

const BannerAd = ({ adminSettings }) => {
  return (
    <BannerAdContainer
      href={adminSettings.bannerAd.bannerAdUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {adminSettings.bannerAd?.bannerAdImageUrl && (
        <Image
          src={adminSettings.bannerAd.bannerAdImageUrl}
          width={728}
          height={90}
          alt="Learn More"
        />
      )}
    </BannerAdContainer>
  );
};

export default BannerAd;
