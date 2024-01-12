import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Player from '/server/models/Player';

// Get all platers
export async function POST(req) {
  await connectDb();

  const { name } = await req.json();

  const referenceId = name.toLowerCase().replace(/\s/g, '');
  const existingPlayer = await Player.findOne({ name }).exec();

  try {
    if (!existingPlayer) {
      // Create new player
      console.log('Create new player');
      const newPlayer = await Player.create({ name, referenceId });

      return NextResponse.json({ newPlayer });
    }

    // Update existing player
    console.log('Update Existing Plater');
    const updatedPlayer = await Player.findOneAndUpdate(
      { name },
      { referenceId, ...req.body },
      { new: true }
    );

    return NextResponse.json({ updatedPlayer });
  } catch (error) {
    NextResponse.json(error);
  }
}
