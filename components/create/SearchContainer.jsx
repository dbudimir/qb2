import { useState, useEffect } from 'react';

import _ from 'lodash';
import styled from 'styled-components';

const SearchContainerOuter = styled.div`
  position: relative;
  width: 100%;
  padding: 24px 0px;

  input {
    border-radius: 12px;
    border: 4px solid #393939;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 46px;
    font-weight: 800;
    padding: 12px 18px;
    transition: box-shadow 0.15s ease-in-out,
      -webkit-transform 0.15s ease-in-out;
    width: 100%;

    &:focus,
    &:hover {
      box-shadow: 0 8px 24px 0 rgba(151, 157, 170, 0.4), inset 0 0 1px 0 #979daa;
      transform: scale(1.02);
      outline: none;
    }
  }

  .player-list {
    border-radius: 12px;
    border: 1px solid #393939;
    position: absolute;
    left: 0;
    margin-top: 12px;
    width: 100%;
    background: #ffffff;
    z-index: 100;
    max-height: 420px;
    overflow: scroll;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 8px 30px;
    animation: downOutList 0.25s ease-in-out;

    @keyframes downOutList {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    ul {
      padding: 0px;
      list-style-type: none;
      padding: 0 12px;

      li {
        border-radius: 8px;
        padding: 12px;
        font-size: 24px;

        &:hover,
        &.active {
          cursor: pointer;
          background: #eeeef1;
        }
      }
    }
  }

  &.has-error {
    input {
      border-color: #ff0000;
      color: #ff0000;
    }

    animation-name: wobble;
    animation-duration: 0.6s;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier();

    @keyframes wobble {
      0% {
        transform: none;
      }
      15% {
        transform: translate3d(-4%, 0, 0) rotate3d(0, 0, 1, -2deg);
      }
      30% {
        transform: translate3d(3%, 0, 0) rotate3d(0, 0, 1, 1deg);
      }
      45% {
        transform: translate3d(-2%, 0, 0) rotate3d(0, 0, 1, -1deg);
      }
      60% {
        transform: translate3d(1%, 0, 0) rotate3d(0, 0, 1, 0deg);
      }
      75% {
        transform: translate3d(-0%, 0, 0) rotate3d(0, 0, 1, -0deg);
      }
      100% {
        transform: none;
      }
    }
  }
`;

const SearchContainer = ({ playerRef, lineUp, setLineUp, searchInput }) => {
  const [showError, setShowError] = useState(false);
  const [searchState, setSearchState] = useState({
    list: playerRef,
    value: '',
    active: 0,
  });
  const { list, value, active } = searchState;
  //
  const getPlayerStats = async ({ name, slug }) => {
    // Find the player in the "local database"
    const selectedPlayer = _.find(playerRef, { PLAYER_NAME: name });

    // Try to match the player against an existing player in our database
    const { player } = await fetch(`/api/players/${name}`).then((res) =>
      res.json()
    );

    // Prepare the player for the line up
    const formattedPlayer = {
      ...player,
      name: player.name || selectedPlayer.PLAYER_NAME,
      PPG: player.PPG || selectedPlayer.PTS,
      RPG: player.RPG || selectedPlayer.REB,
      APG: player.APG || selectedPlayer.AST,
    };

    // Add the player to the database
    await fetch(`/api/players/create`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: formattedPlayer.name,
        PPG: formattedPlayer.PPG,
        RPG: formattedPlayer.RPG,
        APG: formattedPlayer.APG,
      }),
    });

    setLineUp([...lineUp, formattedPlayer]);
    setSearchState({ ...searchState, value: '', active: 0 });
    searchInput.current.value = '';
  };

  const searchPlayer = async (e) => {
    // // Index position in list
    const inputValue = searchInput.current.value.toLocaleLowerCase();

    const filteredPlayerList = _.filter(playerRef, (player) =>
      player.PLAYER_NAME.toLocaleLowerCase().includes(
        inputValue.toLocaleLowerCase()
      )
    );

    let activeIndex = active;
    activeIndex +=
      inputValue.length > 0 &&
      active < filteredPlayerList.length - 1 &&
      e.key === 'ArrowDown' &&
      1;
    activeIndex +=
      inputValue.length > 0 && active > 0 && e.key === 'ArrowUp' && -1;

    const selectedPlayer = filteredPlayerList[activeIndex];

    setSearchState({
      ...searchState,
      list: filteredPlayerList,
      value: inputValue,
      active: activeIndex,
    });

    if (e.key === 'Enter') {
      if (selectedPlayer) {
        // Add the player to the line up
        inputValue.length > 1 &&
          getPlayerStats({ name: selectedPlayer.PLAYER_NAME });
      } else {
        console.log('error');
        // If no player is selected, communicate error
        setShowError(true);
        setTimeout(() => setShowError(false), 1000);
      }
    }
  };

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  return (
    <SearchContainerOuter
      className={`search-container ${showError ? 'has-error' : ''}`}
    >
      <input
        type="text"
        className={list.length >= 5 ? 'max-players' : undefined}
        placeholder="Start typing to find a player..."
        ref={searchInput}
        onKeyDown={(e) => searchPlayer(e)}
        onChange={(e) => searchPlayer(e)}
      />
      {
        // Show list only after text has been entered
        value.length > 1 && list.length > 0 && (
          <div className="player-list">
            <ul>
              {
                // Show player list
                list.map(({ PLAYER_NAME, slug }, index) => (
                  <li
                    key={`$player${index}`}
                    className={active === index ? 'active' : undefined}
                    onClick={(e) =>
                      lineUp.length < 5 && getPlayerStats({ name: PLAYER_NAME })
                    }
                  >
                    {PLAYER_NAME}
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </SearchContainerOuter>
  );
};

export default SearchContainer;
