import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Lineup from '/server/models/Lineup';
import Player from '/server/models/Player'; // DO NOT REMOVE IMPORTANT FOR POPULATE

export async function GET(req, { params }) {
  await connectDb();

  try {
    const lineUp = await Lineup.findOne({ shortId: params.shortId })
      .populate('players')
      .lean();

    return NextResponse.json(lineUp);
  } catch (error) {
    return NextResponse.json(error);
  }
}
