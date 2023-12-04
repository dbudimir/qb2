'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

// Utils
import qbParser from '../../utils/qbParser'

const HighlightContainer = styled.div`
  background: #ffffff;
  border: 1px solid #b565f3;
  box-shadow: -8px 8px #b565f3;
  position: relative;

  .highlight-header {
    color: #b565f3;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    font-size: 22px;
    font-weight: 900;
    padding: 24px 0;
    margin: unset;
    text-shadow: #b49bd3 -1px 1px 0px;
  }

  figure {
    margin: 0 auto 18px auto;
    max-width: 840px;

    .embed-youtube {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
    }
    .embed-youtube iframe,
    .embed-youtube object,
    .embed-youtube embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  p {
    color: #393939;
    padding: 0 12px;
    margin: unset;

    &:first-of-type {
      position: absolute;
      left: 0px;
      bottom: 0px;
      padding: 8px;
      font-weight: 800;
      font-size: 14px;
      text-transform: uppercase;
    }

    &:nth-of-type(2) {
      color: #393939;
      margin: 12px 0;
      font-size: 30px;
      font-weight: 900;
    }

    &:nth-of-type(3) {
      font-size: 18px;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      /* margin-bottom: 36px; */
    }
  }

  /* .show-more {
    color: #b49bd3;
    position: absolute;
    right: 0px;
    bottom: 0px;
    padding: 8px;
    display: block;
    width: max-content;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1.5px;
    cursor: pointer;

    &:hover {
      color: #b565f3;
      text-decoration: none;
    }
  } */

  @media screen and (max-width: 768px) {
    p {
      &:nth-of-type(3) {
        margin-bottom: 36px;
      }
    }
  }
`

const Highlight = ({ highlight }) => {
  const { content } = highlight
  const [renderHighlight, setRenderHighlight] = useState(null)

  const generateBody = () => {
    //
    const parser = new DOMParser()
    const doc = parser.parseFromString(content.rendered, 'text/html')

    const highlightContent = doc.querySelector('body')

    const contentArray = Array.prototype.slice
      .call(highlightContent.childNodes)
      .filter((node) => node.nodeName !== '#text')

    const lazyLoad = window.innerWidth < 768

    // Runs this content through qbParser.
    // qbParser arguments (content: node array, lazyLoad: should this conte be lazy loaded or not)
    setRenderHighlight(qbParser(contentArray, lazyLoad))
  }

  useEffect(() => {
    !renderHighlight && generateBody()
  }, [])

  return (
    renderHighlight && (
      <HighlightContainer>
        <h3 className="highlight-header"> Highlight of the Week </h3>
        {renderHighlight}
        {/* <Link href="/highlights">
            <a className="show-more">Show More →</a>
         </Link> */}
      </HighlightContainer>
    )
  )
}

export default Highlight
