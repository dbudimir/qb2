import nextConnect from 'next-connect'
import middleware from '../../middleware/database'

import connectDb from '../../utils/connectDB'

connectDb()

const Player = require('../../server/models/Player') // DO NOT REMOVE

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
  try {
    return res.json({ name: 'A name' })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default (req, res) => handler.run(req, res)
