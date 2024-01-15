const axios = require('axios');
const playerRef = require('../../public/static/players.json');

const seedDB = async (name) => {
  axios
    .post('http://localhost:8000/api/create-player', { name })
    .then((response) => response)
    .catch((error) => console.log(error));
};

// Run function
playerRef.forEach((player, index) => {
  setTimeout(() => {
    seedDB(player.name);
  }, index * 100);
});

seedDB();

export default seedDB;
