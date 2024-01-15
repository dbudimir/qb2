import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';

// Components
import Share from './Share';
import PlusIcon from '../../icons/PlusIcon';

const LineupContainer = styled.div`
  border-radius: 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  border: 4px solid #eeeef1;

  .player-card {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 12px;
    position: relative;
    transition: all 0.5s ease;
    width: 33.3%;

    .image-container {
      overflow: hidden;
      max-height: 300px;
      border-radius: 12px;

      img {
        min-width: 100%;
        overflow: hidden;
        object-fit: cover;
      }
    }

    .stat-box {
      margin-left: -32px;
      border-radius: 8px;
      padding: 12px;
      min-width: 100px;
      max-width: 100px;
      background: #ffffff;
      z-index: 10;
      color: #393939;
      border: 2px solid #eeeef1;
      display: flex;
      align-items: center;
      flex-direction: column;

      .player-name {
        font-weight: 800;
        font-size: 18px;
        text-align: center;
        display: block;
        width: auto;
      }

      span {
        display: block;
        text-align: center;
        margin-bottom: 8px;
        font-size: 16px;

        &.career {
          border-top: 1px solid;
          border-bottom: 1px solid;
          padding: 2px 0;
          font-weight: 700;
        }
      }

      .stats {
        display: flex;
        flex-direction: column;
      }
    }

    .remove-player {
      display: none;
      position: absolute;
      background: #f9b7a1;
      font-weight: 600;
      font-size: 15px;
      padding: 6px 10px;
      border-radius: 100px;
      bottom: 10px;
      z-index: 20;
      transition: all 0.5s ease;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
      cursor: pointer;

      &:hover {
        transform: scale(1.025);
      }
    }

    &:hover {
      transform: scale(1.02);

      .remove-player {
        display: block;
      }
    }
  }

  .end-card {
    padding: 12px;
    flex-grow: 100;

    .add-player-button,
    .lineup-name-description {
      background: #ffffff;
      min-height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      border-radius: 12px;
      border: 4px solid #aaf4e7;
      padding: 12px;
      transition: all 0.5s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.01);
      }
    }

    .add-player-button {
      background: #eeeef1;
      justify-content: center;

      span {
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 18px;
      }

      svg {
        height: 28px;
        width: 28px;
        border: 4px solid;
        border-radius: 100px;
      }
    }

    .lineup-name-description {
      align-items: flex-start;

      h3 {
        margin: 0 0 12px 0;
        font-weight: 600;
      }

      p {
        color: #393939;
        font-size: 15px;
        margin: 0 0 6px 0;
        text-align: left;
      }

      input,
      textarea {
        width: 100%;
        margin-bottom: 14px;
        border-radius: 8px;
        padding: 10px;
        font-size: 18px;
        border: 1px solid #393939;
        color: #393939;
        font-weight: 600;
      }

      .description {
        flex-grow: 100;
      }
    }

    button {
      border-radius: 100px;
      border: none;
      cursor: pointer;
      font-size: 18px;
      font-weight: 800;
      padding: 8px 18px;
      transition: all 0.5s ease;
      display: block;
      background: #aaf4e7;
      color: #393939;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;

      &:hover {
        transform: scale(1.025);
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .player-card {
      width: 45%;
    }
    .end-card {
      div {
        height: 420px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .player-card {
      width: 100%;
    }

    .end-card {
      min-width: 200px;
    }
  }
`;

const Lineup = ({
  lineUp,
  setLineUp,
  slug,
  metaDesc,
  searchInput,
  createPage,
}) => {
  //
  const router = useRouter();
  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  //
  const submitSquad = async (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value.trim();
    const description = descriptionInputRef.current.value;
    const players = lineUp.map((player) => player._id);
    const shortId =
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5);

    const savedLineUp = await fetch('/api/lineups/create', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, description, players, shortId }),
    }).then((res) => res.json());

    // Take the user to see their team
    router.push(savedLineUp.slug);
  };

  return (
    <LineupContainer className="lineup">
      {
        // Show only on view pages
        !createPage && <Share slug={slug} metaDesc={metaDesc} />
      }
      {
        // Player lineup
        lineUp.map((player, lineUpIndex) => {
          const { image, name, PPG, RPG, APG, FGPercent, ThreePointPercent } =
            player;
          // Change colors of default images
          const degree = Math.floor(Math.random() * (1000 - 10) + 10);
          const imageSource = `${
            image || '/static/images/placeholder-image.png'
          }`;
          return (
            <div className="player-card" key={`player${lineUpIndex}`}>
              <div
                className="image-container"
                style={{ filter: image ? 'unset' : `hue-rotate(${degree}deg)` }}
              >
                <img src={imageSource} alt={name} width={220} height={280} />
                {/* TODO: we can support next/image another time */}
                {/* <Image
                  src={imageSource}
                  alt={name}
                  key={name}
                  width={220}
                  height={280}
                /> */}
              </div>
              <div className="stat-box">
                <span className="player-name">{name}</span>
                <div className="stats">
                  {PPG && <span>PPG: {PPG}</span>}
                  {RPG && <span>RPG: {RPG}</span>}
                  {APG && <span>APG: {APG}</span>}
                  {/* {FGPercent && <span>FG%: {FGPercent}</span>} */}
                  {/* {ThreePointPercent && <span>3P%: {ThreePointPercent}</span>} */}
                </div>
              </div>
              {
                // Show only on create pages
                createPage && (
                  <span
                    className="remove-player"
                    onClick={(e) =>
                      setLineUp(
                        lineUp.filter(
                          (player, removeIndex) => removeIndex !== lineUpIndex
                        )
                      )
                    }
                  >
                    Remove Player
                  </span>
                )
              }
            </div>
          );
        })
      }
      {
        // Show only on create pages
        createPage && (
          <div className="end-card">
            {
              // Hide add button when at max players
              lineUp.length < 5 ? (
                <div
                  className="add-player-button"
                  onClick={(e) => searchInput.current.focus()}
                >
                  <span>Add Player</span>
                  <PlusIcon stroke="#393939" />
                </div>
              ) : (
                <div className="lineup-name-description">
                  <h3>Name your team.</h3>
                  <input
                    type="text"
                    placeholder='ex. "GOAT Sparks", "Elite Huskies", "90s All-Stars"'
                    ref={nameInputRef}
                  />
                  <h3>Enter a description. Why this team?</h3>
                  <textarea
                    className="description"
                    type="textarea"
                    rows="5"
                    ref={descriptionInputRef}
                  />
                  <button onClick={(e) => submitSquad(e)}>Submit Team</button>
                </div>
              )
            }
          </div>
        )
      }
    </LineupContainer>
  );
};

export default Lineup;
