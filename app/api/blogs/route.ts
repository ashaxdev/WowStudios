import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { uploadImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');

    const query =
      published === 'true'
        ? { published: true }
        : {};

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error('GET BLOGS ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Server error',
      },
      { status: 500 }
    );
  }
}

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

    const title = String(formData.get('title') || '').trim();
    const content = String(formData.get('content') || '').trim();
    const excerpt = String(formData.get('excerpt') || '').trim();

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, content and excerpt are required',
        },
        { status: 400 }
      );
    }

    const tags = String(formData.get('tags') || '')
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);

    const published =
      String(formData.get('published')) === 'true';

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Date.now();

    let coverImage = '';
    let coverImagePublicId = '';

    const file = formData.get('coverImage');

    if (file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const base64 = `data:${file.type};base64,${buffer.toString(
        'base64'
      )}`;

      const uploadResult = await uploadImage(
        base64,
        'photo-studio/blogs'
      );

      coverImage = uploadResult.url;
      coverImagePublicId = uploadResult.publicId;
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      tags,
      published,
      coverImage,
      coverImagePublicId,
    });

    return NextResponse.json(
      {
        success: true,
        data: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE BLOG ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create blog',
      },
      { status: 500 }
    );
  }
}