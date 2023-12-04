import { memo, useRef, useEffect } from 'react'
import Router from 'next/router'
import styled from 'styled-components'

// Components
import SearchIcon from './icons/SearchIcon'

const SearchBoxContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 32px;
  min-width: 32px;
  cursor: pointer;

  .input-container {
    display: flex;
    margin: 12px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-200px);
    transition: transform 0.25s;

    input {
      background: transparent;
      border: none;
      color: #000000;
      font-size: 18px;
      font-weight: 500;
      height: 30px;
      padding: 6px;
      width: 0px;
      background: #ffffff;
      width: 200px;
      border: 2px solid #b49bd3;
      box-shadow: -4px 4px #b49bd3;
      z-index: 10;

      &:focus {
        outline: none;
      }
    }

    span {
      display: flex;
      align-items: center;
      font-size: 0px;
      cursor: pointer;
      background: #000000;
      border: 2px solid #000000;
      color: #ffffff;
      font-size: 14px;
      padding: 0 12px;
      box-shadow: -4px 4px #b49bd3;
    }
  }

  &.show .input-container {
    position: absolute;
    transition: transform 0.25s;
    z-index: 20;
    transform: translateX(0%) translateY(50px);
  }

  @media screen and (max-width: 768px) {
    &.show {
      position: unset;

      .input-container {
        background: #b49bd3;
        width: 96vw;
        left: 0;
        border-radius: 6px;
        padding: 12px;

        input {
          width: 100%;
          border: unset;
        }
      }
    }
  }
`

const SearchBox = ({ scroll, showSearch, setShowSearch }) => {
  const searchBar = useRef(null)
  //
  const runSearch = () => {
    Router.push(`/search/${searchBar.current.value}`).then(() => window.scrollTo(0, 0))
    searchBar.current.value = ''
    setShowSearch(!showSearch)
  }

  useEffect(() => {
    setTimeout(() => {
      searchBar.current.focus()
    }, 500)
  }, [showSearch])

  return (
    <SearchBoxContainer className={`search-input ${scroll && 'sticky'} ${showSearch && 'show'}`}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search..."
          ref={searchBar}
          onKeyPress={(e) => e.key === 'Enter' && showSearch && runSearch()}
        />
        <span onClick={() => searchBar.current.value.length > 0 && runSearch()}>SEARCH</span>
      </div>
      <SearchIcon stroke="#000000" showSearch={showSearch} setShowSearch={setShowSearch} />
    </SearchBoxContainer>
  )
}

export default memo(SearchBox)
