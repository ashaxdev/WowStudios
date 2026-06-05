import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Photo from '@/models/Photo';
import { uploadImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const query = category ? { category } : {};
    const photos = await Photo.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: photos });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const featured = formData.get('featured') === 'true';
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const { url, publicId } = await uploadImage(base64, 'photo-studio/gallery');

    const photo = await Photo.create({
      title,
      category,
      description,
      featured,
      imageUrl: url,
      publicId,
    });

    return NextResponse.json({ success: true, data: photo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
