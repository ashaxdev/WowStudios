import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { uploadImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');
    const query = published === 'true' ? { published: true } : {};
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await dbConnect();
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const message = formData.get('message') as string;
    const rating = parseInt(formData.get('rating') as string) || 5;
    const published = formData.get('published') !== 'false';

    let avatarUrl, avatarPublicId;
    const file = formData.get('avatar') as File;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
      const result = await uploadImage(base64, 'photo-studio/avatars');
      avatarUrl = result.url;
      avatarPublicId = result.publicId;
    }

    const testimonial = await Testimonial.create({ name, role, message, rating, published, avatarUrl, avatarPublicId });
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
