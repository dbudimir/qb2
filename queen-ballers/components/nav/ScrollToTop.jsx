import { memo } from 'react'
import styled from 'styled-components'
import CarrotDownIcon from '../icons/CarrotDownIcon'

const ScrollToTopContainer = styled.div`
  position: fixed;
  right: 18px;
  bottom: -60px;
  transition: all 0.75s ease;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background: #393939;
    border: 2px solid #ffffff;
    height: 28px;
    width: 28px;

    svg {
      transform: scaleY(-1);
      height: 32px;
      width: 32px;
    }
  }

  span {
    position: absolute;
    width: max-content;
    right: 150%;
    top: 50%;
    transform: translateY(-50%);
    background: #ffffff;
    padding: 2px 6px;
    border-radius: 4px;
    display: none;
  }

  &:hover {
    span {
      display: block;
    }
  }

  &.show {
    bottom: 10px;
  }

  @media screen and (max-width: 768px) {
    svg {
      transform: scaleY(-1);
    }
  }
`

const ScrollToTop = ({ progress }) => (
  <ScrollToTopContainer
    className={`${progress > 10 ? 'show' : ''} ${
      progress > 50 && progress < 95 ? 'with-donate-bar' : ''
    }`}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <span>Scroll To Top</span>
    <div>
      <CarrotDownIcon stroke="#ffffff" />
    </div>
  </ScrollToTopContainer>
)

export default memo(ScrollToTop)
