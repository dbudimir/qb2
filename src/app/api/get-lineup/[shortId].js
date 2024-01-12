import nextConnect from 'next-connect'
import middleware from '../../../middleware/database'

import connectDb from '../../../utils/connectDB'

connectDb()

const Lineup = require('../../../server/models/Lineup')
const Player = require('../../../server/models/Player') // DO NOT REMOVE

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  try {
    Lineup.findOne({ shortId: req.query.shortId })
      .populate('players')
      .lean()
      .then((lineUp) => res.json(lineUp))
  } catch (error) {
    res.status(500).send(error)
  }
})

export default (req, res) => handler.run(req, res)
