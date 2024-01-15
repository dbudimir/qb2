import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Player from '/server/models/Player';

// Get player by name
export async function POST(req) {
  await connectDb();

  const body = await req.json();

  try {
    const player = Player.findOneAndUpdate(
      { _id: body.id },
      { image: body.imageUrl }
    ).then((res) => res);

    return NextResponse.json(player ? 'Done' : 'No player');
  } catch (error) {
    return NextResponse.json(error);
  }
}
