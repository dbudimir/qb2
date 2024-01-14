import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Lineup from '/server/models/Lineup';

// Get all platers
export async function POST(req) {
  await connectDb();

  const body = await req.json();

  const slug = `/teams/${body.shortId}/${body.name
    .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()}`;

  try {
    const newLineup = await Lineup.create({ ...body, slug });

    return NextResponse.json(newLineup);
  } catch (error) {
    NextResponse.json(error);
  }
}
