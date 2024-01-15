import { useEffect, useState } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import styled from 'styled-components';

// Util Functions
import updateDB from '../../utils/data/updateDB';

const UpdateImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background: white;
    padding: 12px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .player-name {
      font-size: 24px;
      display: block;
      margin-bottom: 12px;
    }

    .input-container {
      width: 300px;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      padding: unset;

      > * {
        height: 32px;
      }

      input {
        width: 80%;
      }

      span {
        background: black;
        width: 20%;
        padding: 6px;
        color: #ffffff;
        text-align: center;
      }
    }

    p {
      font-size: 12px;
    }
  }
`;

const PlayerImagesContainer = styled.div`
  margin-top: 24px;

  .player-row {
    display: flex;
    justify-content: space-between;

    &.label-row {
      font-weight: 800;
      font-size: 18px;
      background: #eeeef1;
    }

    div {
      width: 25%;
      padding: 2px;

      &.image-cell {
        width: 50%;
        padding: 4px;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;

        &:hover {
          background: yellow;
        }
      }
    }
  }
`;

const PlayerImages = ({}) => {
  // Data
  const [allPlayers, setAllPlayers] = useState([]);

  // Page state
  const [showUpdateImageModal, setShowUpdateImageModal] = useState(false);
  const [playerToUpdate, setPlayerToUpdate] = useState({
    playerName: null,
    playerId: null,
  });
  const [playerImage, setPlayerImage] = useState(null);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const players = await fetch('/api/players').then((res) => res.json());

        setAllPlayers(players);
      } catch (error) {
        console.log(error);
      }
    };

    getPlayers();
  }, []);

  const onClickEditImage = ({ playerName, playerId, playerImage }) => {
    setShowUpdateImageModal(true);
    setPlayerToUpdate({ playerName, playerId, playerImage });
  };

  const onClickSaveImage = async () => {
    try {
      await fetch('/api/players/update-image', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          id: playerToUpdate.playerId,
          imageUrl: playerImage,
        }),
      });

      const playerArray = allPlayers;
      // Find item index using _.findIndex (thanks @AJ Richardson for comment)
      const index = _.findIndex(playerArray, { _id: playerToUpdate.playerId });
      playerArray.splice(index, 1, {
        ...allPlayers[index],
        image: playerImage,
      });

      // Replace item at index using native splice
      setAllPlayers(playerArray);

      setShowUpdateImageModal(false);
      setPlayerToUpdate({ playerName: null, playerId: null });
      setPlayerImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = (e) => {
    e.target.id === 'outer-modal' &&
      setShowUpdateImageModal(!showUpdateImageModal);
  };

  return (
    <div className="player-images">
      {showUpdateImageModal && (
        <UpdateImageModal
          id="outer-modal"
          className="update-image-modal"
          onClick={toggleModal}
        >
          <div>
            <span className="player-name">{playerToUpdate.playerName}</span>
            <div className="input-container">
              <input
                type="text"
                onChange={(e) => setPlayerImage(e.target.value)}
              />
              <span onClick={onClickSaveImage}>Save</span>
            </div>
            <p>Current image address: {playerToUpdate.playerImage} </p>
          </div>
        </UpdateImageModal>
      )}

      <PlayerImagesContainer className="player-table">
        <div className="label-row player-row">
          <div>PLAYER NAME</div>
          <div>IMAGE ADDRESS</div>
          <div>LAST UPDATED</div>
        </div>
        {allPlayers.map((player) => {
          return (
            <div key={player._id} className="player-row">
              <div>
                <span>{player.name}</span>
              </div>
              <div
                id={player._id}
                className="image-cell"
                onClick={() =>
                  onClickEditImage({
                    playerName: player.name,
                    playerId: player._id,
                    playerImage: player.image,
                  })
                }
              >
                {player.image ? (
                  <span>{player.image}</span>
                ) : (
                  <span>no image</span>
                )}
              </div>
              <div>
                <span>
                  {dayjs(player.updatedAt).format('MMMM D, YYYY h:mm A')}
                </span>
                {/* <span>{player.updatedAt}</span> */}
              </div>
            </div>
          );
        })}
      </PlayerImagesContainer>

      {/* <div onClick={updateDB}>update db</div> */}
    </div>
  );
};

export default PlayerImages;
