import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const query = category ? { category } : {};
    const videos = await Video.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const body = await req.json();
    // Extract YouTube ID from URL if full URL passed
    let youtubeId = body.youtubeId;
    const urlMatch = youtubeId.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    if (urlMatch) youtubeId = urlMatch[1];
    const video = await Video.create({ ...body, youtubeId });
    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
