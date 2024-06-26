'use client';

import Script from 'next/script';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const LazyLoaderContainer = styled.figure`
  width: 100%;
  background-size: contain;
  border: none;
  margin: 0 auto;
  min-height: 200px;
  display: flex;
  justify-content: center;
  position: relative;

  > div {
    z-index: 1;
    width: 100%;
    max-width: 720px;
  }

  &.wp-block-embed-youtube {
    display: block;
  }

  // Loader appearing on the home page
  &.home-page {
    margin: 50px auto;
  }

  .react-tweet-theme {
    display: flex;
    margin: 0 auto !important;
    justify-content: center;
    width: 96% !important;
    max-width: 550px !important;

    article {
      width: 100%;
    }
  }

  blockquote {
    border: none !important;
    margin: unset !important;
  }

  .video-loader {
    position: absolute;
    max-width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;

const LazyLoader = ({ index, classes, type, children }) => {
  const contentRef = useRef(null);
  const [loadContent, setLoadContent] = useState(false);

  const loadElm = () => {
    const elm = contentRef.current;

    elm &&
      elm.id === `content${index}` &&
      elm.getBoundingClientRect().top < 1600 &&
      setLoadContent(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', loadElm, ['once']);
    return () => window.removeEventListener('scroll', loadElm, ['once']);
  }, []);

  return (
    <>
      {type === 'tiktok' && loadContent && (
        <Script src="https://www.tiktok.com/embed.js" defer />
      )}
      {type === 'twitter' && loadContent && (
        <Script async src="https://platform.twitter.com/widgets.js" />
      )}
      {type === 'pinterest' && loadContent && (
        <Script async defer src="https://assets.pinterest.com/js/pinit.js" />
      )}
      <LazyLoaderContainer
        className={classes}
        id={`content${index ? index : ''}`}
        ref={contentRef}
      >
        {loadContent && children}
        <video className="video-loader" playsInline autoPlay muted loop>
          <source src="/static/images/loader.mp4" type="video/mp4" />
        </video>
      </LazyLoaderContainer>
    </>
  );
};

export default LazyLoader;
