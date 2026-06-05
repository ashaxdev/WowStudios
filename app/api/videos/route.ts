import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';
import { isAuthenticated } from '@/lib/auth';

const extractYoutubeId = (input: string) => {
  const match = input.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );

  return match ? match[1] : input;
};

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get('category');

    const query = category
      ? { category }
      : {};

    const videos = await Video.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: 'Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const body = await req.json();

    const video = await Video.create({
      ...body,
      youtubeId: extractYoutubeId(body.youtubeId),
    });

    return NextResponse.json(
      {
        success: true,
        data: video,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: 'Server Error' },
      { status: 500 }
    );
  }
}