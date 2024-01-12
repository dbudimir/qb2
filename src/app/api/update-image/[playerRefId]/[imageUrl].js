import nextConnect from 'next-connect';
import middleware from '../../../../middleware/database';

import connectDb from '../../../../utils/connectDB';

connectDb();

const Player = require('../../../../server/models/Player');

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  Player.findOneAndUpdate(
    { referenceId: req.query.playerRefId },
    { image: req.query.imageUrl }
  ).then((player) => {
    res.send(player ? 'Done' : 'No player');
  });
});

export default (req, res) => handler.run(req, res);
