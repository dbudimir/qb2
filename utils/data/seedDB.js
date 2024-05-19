const playerRef = require('../../public/static/players.json');

const seedDB = async (name) => {
  try {
    const response = await fetch('http://localhost:8000/api/create-player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Run function
playerRef.forEach((player, index) => {
  setTimeout(() => {
    seedDB(player.name);
  }, index * 100);
});

seedDB();

export default seedDB;
