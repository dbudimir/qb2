import { memo } from 'react'
import styled from 'styled-components'

// Components
import SocialLinks from '../shared/SocialLinks'

const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  background: #000000;

  .content {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding-left: 100px;

    span {
      color: #ffffff;
      font-weight: 800;
      line-height: auto;
      letter-spacing: 2.5px;
    }
  }

  @media screen and (max-width: 768px) {
    .social-links {
      display: none;
    }
  }

  @media screen and (max-width: 550px) {
    span {
      font-size: 14px;

      .secondary-text {
        display: none;
      }
    }
  }
`

const NavUpper = ({ upperNavRef }) => (
  <UpperContainer ref={upperNavRef}>
    <div className="content">
      <span>QUEEN BALLERS CLUB</span>
      <SocialLinks />
    </div>
  </UpperContainer>
)

export default memo(NavUpper)
