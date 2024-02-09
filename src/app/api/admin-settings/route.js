import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Admin from '/server/models/Admin';

// Get admin settings
export async function GET() {
  await connectDb();

  try {
    const adminSettings = await Admin.find({ _id: '60a9cb629e15d3bbe6a033f8' });

    return NextResponse.json(adminSettings);
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Post admin settings
export async function POST(req) {
  await connectDb();

  const adminSettings = await req.json();

  try {
    await Admin.findOneAndUpdate(
      { _id: '60a9cb629e15d3bbe6a033f8' },
      adminSettings
    );

    return NextResponse.json('Success');
  } catch (error) {
    return NextResponse.json(error);
  }
}
