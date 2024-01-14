import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Lineup from '/server/models/Lineup';

// Get all platers
export async function GET() {
  await connectDb();

  try {
    const allLineups = await Lineup.find({});
    return NextResponse.json(allLineups);
  } catch (error) {
    return NextResponse.json(error);
  }
}
