'use client'

import styled from 'styled-components'
import { useRef } from 'react'

// Components
import ArrowRightIcon from '../icons/ArrowRightIcon'

const TagsRowContainer = styled.div`
  margin: 0 auto;
  display: flex;
  overflow: auto;
  position: relative;
  margin-bottom: 18px;
  align-items: center;
  width: max-content;
  max-width: 100%;
  //
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }

  a,
  .anchor {
    align-items: center;
    border-radius: 6px;
    color: #393939;
    display: flex;
    font-size: 18px;
    height: 32px;
    margin-right: 12px;
    min-width: max-content;
    padding: 0 8px;
    text-decoration: none;
    border: 2px solid #393939;
    cursor: pointer;

    &:hover {
      border: 2px solid #b565f3;
      background: #b565f3;
      color: #ffffff;
    }

    span {
      align-items: center;
      background: #393939;
      border-radius: 100px;
      color: #ffffff;
      display: block;
      font-size: 10px;
      font-weight: 600;
      height: 20px;
      justify-content: center;
      margin-left: 8px;
      padding: 4px;
      width: 20px;
      display: none;
    }
  }

  .more {
    position: sticky;
    right: 0;
    border-left: 2px solid;
    background: rgb(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    height: 100%;
    padding: 8px 0;
    min-width: 48px;

    svg {
      background: #393939;
      border-radius: 100px;
      padding: 4px;
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-name: bounce-3;
      margin: 0 auto;
      max-height: 22px;
      max-width: 22px;

      /* prettier-ignore */
      @keyframes bounce-3 {
            0% { transform: translateX(4px); }
            30% { transform: translateX(-2px); }
            50% { transform: translateX(4px); }
            100% { transform: translateX(4px); }
         }
    }
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 32px;

    a,
    span {
      font-size: 15px !important;
      border: 1px solid #393939 !important;
    }
  }
`

const TagsRow = ({ tags, showMore }) => {
  const tabContainer = useRef(null)
  const arrowRight = useRef(null)

  return (
    <TagsRowContainer className="tags" ref={tabContainer}>
      {tags}
      {showMore && (
        <div
          className="more"
          ref={arrowRight}
          onClick={(e) => tabContainer.current.scrollBy({ left: 200, behavior: 'smooth' })}
        >
          <ArrowRightIcon stroke="#ffffff" />
        </div>
      )}
    </TagsRowContainer>
  )
}

export default TagsRow
