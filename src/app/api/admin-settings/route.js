import { NextResponse } from 'next/server';
import connectDb from '/utils/connectDB';

import Admin from '/server/models/Admin';

// Get admin settings
export async function GET() {
  await connectDb();

  try {
    const adminSettings = await Admin.find({ _id: '60a9cb629e15d3bbe6a033f8' });

    return NextResponse.json({ adminSettings });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// Post admin settings
export async function POST(req) {
  await connectDb();

  const adminSettings = await req.json();

  try {
    Admin.findOneAndUpdate(
      { _id: '60a9cb629e15d3bbe6a033f8' },
      { ...adminSettings },
      { upsert: true },
      (error, result) => {
        if (!error) {
          // If the document doesn't exist
          if (!result) {
            // Create it
            result = new Admin();
          }
          // Save the document
          result.save();
        }
      }
    );

    return NextResponse.json('Success');
  } catch (error) {
    return NextResponse.json(error);
  }
}
