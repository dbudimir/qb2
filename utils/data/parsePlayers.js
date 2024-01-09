import players from '../../public/static/players.json';
import players2023 from '../../public/static/2023players.json';

const getUniquePlayers = () => {
  const headers = players2023.resultSets[0].headers;

  const updatedPlayers = players2023.resultSets[0].rowSet.map((playerData) => {
    let playerObject = {};
    playerData.map((data, index) => {
      playerObject[headers[index]] = data;
    });
    return playerObject;
  });

  // function mergeArrays(arr1, arr2) {
  const mergedArr = [...players, ...updatedPlayers]; // combine the two arrays

  const uniquePlayers = {}; // object to keep track of unique players

  mergedArr.forEach((obj) => {
    const playerName = obj.PLAYER_NAME;
    if (!uniquePlayers[playerName]) {
      // if the player hasn't been added yet, add them to the uniquePlayers object
      uniquePlayers[playerName] = obj;
    } else {
      // if the player has already been added, merge the two objects
      uniquePlayers[playerName] = { ...uniquePlayers[playerName], ...obj };
    }
  });

  return Object.values(uniquePlayers);
};

export default getUniquePlayers;
