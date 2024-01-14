'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';

// Components
import SearchContainer from '/components/create/SearchContainer';
import Lineup from '/components/create/lineup/Lineup';

const CreateTeamContainer = styled.div`
  max-width: 900px;
  .page-header {
    h1 {
      font-size: 48px;
      font-weight: 800;
      margin: 0 0 18px;
    }
  }

  .search-outer {
    position: sticky;
    top: 56px;
    z-index: 100;

    &.max-players {
      position: unset;

      input {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 32px 0;

    .page-header {
      h1 {
        font-size: 36px;
      }
    }

    .search-container {
      padding: 12px 0 32px;

      input {
        font-size: 24px;
      }
    }
  }
`;

const CreateTeam = ({ playerRef }) => {
  //
  const [lineUp, setLineUp] = useState([]);
  const searchInput = useRef(null);

  return (
    <CreateTeamContainer className="page-container">
      <div className="page-header">
        <h1>Create a Team</h1>
        <p>
          Use the search box below to find players and create a custom team of
          five starters.
        </p>
      </div>
      <div
        className={
          lineUp.length < 5 ? 'search-outer' : 'search-outer max-players'
        }
      >
        <SearchContainer
          playerRef={playerRef}
          lineUp={lineUp}
          setLineUp={setLineUp}
          searchInput={searchInput}
        />
      </div>
      <Lineup
        lineUp={lineUp}
        setLineUp={setLineUp}
        searchInput={searchInput}
        createPage
      />
    </CreateTeamContainer>
  );
};

export default CreateTeam;
