import nextConnect from 'next-connect'
import middleware from '../../middleware/database'

import connectDb from '../../utils/connectDB'

connectDb()

const Lineup = require('../../server/models/Lineup')
const Player = require('../../server/models/Player') // DO NOT REMOVE

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  try {
    Lineup.find({}).then((allLineups) => res.json(allLineups))
  } catch (error) {
    res.status(500).send(error)
  }
})

handler.post(async (req, res) => {
  try {
    Lineup.create({ ...req.body.lineUp }).then((newLineup) => {
      const lineUpSlug = `/teams/${newLineup.shortId}/${newLineup.name
        .replace(/\s+/g, '-')
        .toLowerCase()}-${req.body.playerName.replace(/\s+/g, '-').toLowerCase()}`
      newLineup.slug = lineUpSlug
      newLineup.save()
      res.json(newLineup)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default (req, res) => handler.run(req, res)
