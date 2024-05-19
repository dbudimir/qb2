import getUniquePlayers from './parsePlayers';

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

    try {
      const response = await fetch('http://localhost:8002/api/players/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  });
};

export default updateDB;
