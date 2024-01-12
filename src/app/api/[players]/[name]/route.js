import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Player from '/server/models/Player';

// Get player by name
export async function GET(req, { params }) {
  await connectDb();

  try {
    const player = await Player.findOne({ name: params.name });

    return NextResponse.json({ player });
  } catch (error) {
    return NextResponse.json(error);
  }
}
