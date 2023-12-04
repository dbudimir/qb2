import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: calc(50% - 625px);
  height: 142px;
  width: 142px;
  padding: 6px;
  z-index: 300;
  transition: filter 0.25s ease;
  filter: drop-shadow(-4px 2px 8px rgba(57, 57, 57, 0));

  img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 1248px) {
    left: 0;

    .mask {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    height: 100px;
    width: 100px;
  }

  &.sticky {
    position: fixed;
    height: 60px;
    width: 60px;
    min-width: unset;
    animation: slideInLogo 0.5s ease-in-out;
    top: 0;
    left: 0;
    filter: unset;
    padding: 2px 0 0 0;

    // prettier-ignore
    @keyframes slideInLogo { 0% { left: -100px; } 100% { left: 0; } }

    &:hover {
      filter: unset;
    }
  }

  .mask {
    pointer-events: none;
    position: absolute;
    z-index: 1;
    width: 75px;
    height: 75px;
    left: 0;
    transform: translate(60%, 6px) rotate(-45deg);
    border-radius: 100px;
    overflow: hidden;
    opacity: 0.5;
  }

  &:hover {
    filter: drop-shadow(-4px 2px 8px rgba(57, 57, 57, 0.3));

    .mask:after {
      pointer-events: none;
      content: '';
      top: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      transform: translate(-100%, 0%);
      animation: shine 1.25s 1;
      // prettier-ignore
      background: linear-gradient( to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.75) 50%, rgba(125, 185, 232, 0) 100% );

      // prettier-ignore
      @keyframes shine { 0% { transform: translate(-100%, 0%); } 100% { transform: translate(200%, 0); } }
    }
  }
`

const NavLogo = ({ scroll }) => (
  <Link href="/">
    <LogoContainer className={`logo ${scroll && 'sticky'}`}>
      <div className="mask" />
      <Image
        src="/static/images/queen-ballers-icon-v2.png"
        alt="Queen Ballers Logo"
        height={142}
        width={142}
        priority
      />
    </LogoContainer>
  </Link>
)

export default memo(NavLogo)
