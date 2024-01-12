import mongoose from 'mongoose'

const uniqueValidator = require('mongoose-unique-validator')

const LineupSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    slug: { type: String, unique: true },
    shortId: { type: String, unique: true },
    tags: [],
    players: [
      {
        ref: 'Player',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
)

delete mongoose.connection.models.Lineup

LineupSchema.plugin(uniqueValidator)

const Lineup = mongoose.model('Lineup', LineupSchema)

module.exports = Lineup
