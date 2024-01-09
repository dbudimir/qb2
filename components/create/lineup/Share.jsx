import styled from 'styled-components'

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  RedditIcon,
  TwitterIcon,
  TwitterShareButton,
  FacebookMessengerShareButton,
  RedditShareButton,
} from 'react-share'

const ShareContainer = styled.div`
  padding: 10px 6px;
  width: 100%;
  background: #eeeef1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    display: block;
    font-weight: 800;
    color: #6e6d6d;
    font-size: 15px;
  }

  button {
    align-items: center;
    border-radius: 8px;
    color: #ffffff !important;
    display: flex;
    margin-left: 12px;
    padding: 1px 12px 1px 6px !important;
    transition: all 0.5s ease;

    svg {
      max-height: 28px;
      max-width: 28px;
      margin-right: 6px;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`

const Share = ({ slug, metaDesc }) => (
  <ShareContainer>
    <span>SHARE:</span>
    <FacebookShareButton
      url={`https://queenballers.club/${slug}`}
      quote={metaDesc}
      style={{ background: 'rgb(59, 89, 152)' }}
    >
      <FacebookIcon round="true" />
      Facebook
    </FacebookShareButton>
    <TwitterShareButton
      url={`https://queenballers.club/${slug}`}
      title={metaDesc}
      hashtags={['queenballers']}
      style={{ background: 'rgb(0, 172, 237)' }}
    >
      <TwitterIcon round="true" />
      Twitter
    </TwitterShareButton>
    <FacebookMessengerShareButton
      appId="467485130880445"
      url={`https://queenballers.club/${slug}`}
      style={{ background: 'rgb(33, 150, 243)' }}
    >
      <FacebookMessengerIcon round="true" />
      Messenger
    </FacebookMessengerShareButton>
    <RedditShareButton
      url={`https://queenballers.club/${slug}`}
      title={metaDesc}
      style={{ background: 'rgb(95, 153, 207)' }}
    >
      <RedditIcon round="true" />
      Reddit
    </RedditShareButton>
  </ShareContainer>
)

export default Share
