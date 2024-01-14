import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Player from '/server/models/Player';

// Get all platers
export async function GET() {
  await connectDb();

  try {
    const allPlayers = await Player.find({});
    return NextResponse.json(allPlayers);
  } catch (error) {
    return NextResponse.json(error);
  }
}
