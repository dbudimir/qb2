import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Player from '/server/models/Player';

// Get all platers
export async function POST(req) {
  await connectDb();

  const body = await req.json();

  const referenceId = body.name.toLowerCase().replace(/\s/g, '');
  const existingPlayer = await Player.findOne({ name: body.name }).exec();

  try {
    if (!existingPlayer) {
      // Create new player
      console.log('Create new player');
      const newPlayer = await Player.create({ name: body.name, referenceId });

      return NextResponse.json({ newPlayer });
    }

    // Update existing player
    console.log('Update existing player');
    const updatedPlayer = await Player.findOneAndUpdate(
      { name: body.name },
      { referenceId, ...req.body },
      { new: true }
    );

    return NextResponse.json({ updatedPlayer });
  } catch (error) {
    return NextResponse.json(error);
  }
}
