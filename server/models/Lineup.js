import mongoose from 'mongoose';

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
);

delete mongoose.connection.models.Lineup;

const Lineup = mongoose.model('Lineup', LineupSchema);

export default Lineup;
