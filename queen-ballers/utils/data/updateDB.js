import getUniquePlayers from './parsePlayers';

const axios = require('axios');

const updateDB = async () => {
  console.log('Updating DB...');

  console.log('Fetching existing unique players...');
  console.log(getUniquePlayers());

  console.log('Prepare player for database...');
  const uniquePlayers = getUniquePlayers();
  uniquePlayers.forEach(async (player) => {
    console.log(player);
    const playerPayload = { name: player.PLAYER_NAME };

    player.PPG && (playerPayload.PPG = player.PTS);
    player.APG && (playerPayload.APG = player.AST);
    player.RPG && (playerPayload.RPG = player.REB);
    player.FGPercent && (playerPayload.FGPercent = player.FG_PCT);
    player.ThreePointPercent && (playerPayload.ThreePointPercent = player.FG3_PCT); // prettier-ignore

    await axios
      .post('http://localhost:8002/api/players/create', playerPayload)
      .then((response) => response)
      .catch((error) => console.log(error));
  });
};

export default updateDB;
