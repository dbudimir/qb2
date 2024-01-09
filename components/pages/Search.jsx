'use client';

import styled from 'styled-components';

import HeaderText from '../shared/HeaderText';

const SearchResultsContainer = styled.div`
  a {
    color: #393939;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    max-width: 840px;
    margin: 0 auto 32px;
    border: 3px solid transparent;
    padding: 12px 18px;

    &:first-of-type {
      margin-top: 48px;
    }

    &:hover {
      border: 3px solid #b565f3;
      border-radius: 12px;
    }

    span {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 12px;
    }

    .continue {
      text-transform: uppercase;
      font-weight: 800;
      font-size: 14px;
      color: #b565f3;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Search = ({ searchTerm, searchResults }) => {
  return (
    <SearchResultsContainer className="page-container">
      <HeaderText titleContent={<h1>Search Results for {searchTerm}</h1>} />
      {
        // Search results
        searchResults.map(({ link, title }, i) => (
          <a key={`result${i}`} href={link}>
            <span>{title}</span>
            <span className="continue">Read More</span>
          </a>
        ))
      }
    </SearchResultsContainer>
  );
};

export default Search;
