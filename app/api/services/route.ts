import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { uploadImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');
    const query = published === 'true' ? { published: true } : {};
    const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: services });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const icon = formData.get('icon') as string;
    const features = (formData.get('features') as string || '').split('\n').map(f => f.trim()).filter(Boolean);
    const published = formData.get('published') !== 'false';
    const order = parseInt(formData.get('order') as string) || 0;

    let imageUrl, imagePublicId;
    const file = formData.get('image') as File;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
      const result = await uploadImage(base64, 'photo-studio/services');
      imageUrl = result.url;
      imagePublicId = result.publicId;
    }

    const service = await Service.create({ title, description, price, icon, features, published, order, imageUrl, imagePublicId });
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
