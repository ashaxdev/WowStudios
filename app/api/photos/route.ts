import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Photo from '@/models/Photo';
import { uploadImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

// GET ALL PHOTOS
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const query = category ? { category } : {};

    const photos = await Photo.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: photos,
    });
  } catch (error) {
    console.error('GET Photos Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch photos',
      },
      { status: 500 }
    );
  }
}

// UPLOAD PHOTO
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
      },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const formData = await req.formData();

    const category = formData.get('category') as string;
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image is required',
        },
        { status: 400 }
      );
    }

    if (!category?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category is required',
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const { url, publicId } = await uploadImage(
      base64,
      'photo-studio/gallery'
    );

    const photo = await Photo.create({
      category: category.trim(),
      imageUrl: url,
      publicId,
    });

    return NextResponse.json(
      {
        success: true,
        data: photo,
        message: 'Photo uploaded successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('UPLOAD Photo Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload photo',
      },
      { status: 500 }
    );
  }
}