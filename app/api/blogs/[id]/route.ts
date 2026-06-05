import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { deleteImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    const blog = await Blog.findById(id);

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
    console.error('GET BLOG ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Server error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
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

    const { id } = await context.params;

    const {
      title,
      content,
      excerpt,
      tags,
      published,
    } = await req.json();

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        tags,
        published,
      },
      {
        new: true,
        runValidators: true,
      }
    );

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
    console.error('UPDATE BLOG ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update blog',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
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

    const { id } = await context.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog not found',
        },
        { status: 404 }
      );
    }

    if (blog.coverImagePublicId) {
      await deleteImage(blog.coverImagePublicId);
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('DELETE BLOG ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete blog',
      },
      { status: 500 }
    );
  }
}