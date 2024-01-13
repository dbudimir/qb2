import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: -60px;
  top: calc(50% - 60px);
  pointer-events: none;
  transition: all 0.75s ease;

  @media screen and (max-width: 768px) {
    top: 60px;

    button {
      transform: translateX(200px);
    }
  }

  button {
    width: 50px;
    height: 50px;
    margin-bottom: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(60px);

    &:first-of-type {
      transition: all 0.5s ease;
      background: #3b5998 !important;
    }

    &:nth-of-type(2) {
      transition: all 1s ease;
      background: #000000 !important;
    }
  }

  &.show {
    pointer-events: unset;
    right: 0;

    button {
      transform: translateX(0px);

      @media screen and (max-width: 768px) {
        transform: translateY(0px);

        &:first-of-type {
          transition: all 0.75s ease;
        }
        &:nth-of-type(2) {
          transition: all 0.5s ease;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    top: 60px;
    flex-direction: row;
  }
`;

const Share = ({ progress }) => {
  const [metaDesc, setMetaDesc] = useState('');
  const [pagePath, setPagePath] = useState('');

  useEffect(() => {
    // Set the page path for the share buttons
    window && setPagePath(window.location.pathname);

    // Set the meta description for the share buttons
    const metaDescTag = document.querySelector('meta[name="description"]');
    const metaDescContent = metaDescTag && metaDescTag.getAttribute('content');
    setMetaDesc(metaDescContent);
  }, []);

  return (
    <ShareContainer id="share-buttons" className={progress > 10 ? 'show' : ''}>
      <FacebookShareButton
        url={`https://queenballers.club${pagePath}`}
        quote={metaDesc}
      >
        <FacebookIcon stroke="#ffffff" wh="28" />
      </FacebookShareButton>
      <TwitterShareButton
        url={`https://queenballers.club${pagePath}`}
        title={`${metaDesc} @queenballers`}
      >
        <TwitterIcon stroke="#ffffff" wh="22" />
      </TwitterShareButton>
    </ShareContainer>
  );
};

export default Share;
