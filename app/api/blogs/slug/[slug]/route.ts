import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{ slug: string }>;
  }
) {
  try {
    await dbConnect();

    const { slug } = await context.params;

    const blog = await Blog.findOne({
      slug,
      published: true,
    });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: 'Server error',
      },
      { status: 500 }
    );
  }
}