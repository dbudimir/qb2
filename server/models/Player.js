import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String },
    referenceId: { type: String, unique: true },
    image: { type: String },
    PPG: { type: String },
    APG: { type: String },
    RPG: { type: String },
    FG_PCT: { type: String },
    FG3_PCT: { type: String },
    // Legacy
    FGPercent: { type: String },
    ThreePointPercent: { type: String },
  },
  {
    timestamps: true,
  }
);

delete mongoose.connection.models.Player;

const Player = mongoose.model('Player', PlayerSchema);

export default Player;
