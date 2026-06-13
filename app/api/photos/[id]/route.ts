import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Photo from '@/models/Photo';
import { deleteImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

// DELETE PHOTO
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;

    const photo = await Photo.findById(id);

    if (!photo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Photo not found',
        },
        { status: 404 }
      );
    }

    await deleteImage(photo.publicId);
    await Photo.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Photo deleted successfully',
    });
  } catch (error) {
    console.error('DELETE Photo Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete photo',
      },
      { status: 500 }
    );
  }
}

// UPDATE PHOTO
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;
    const { category } = await req.json();

    if (!category?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category is required',
        },
        { status: 400 }
      );
    }

    const photo = await Photo.findByIdAndUpdate(
      id,
      {
        category: category.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!photo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Photo not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: photo,
      message: 'Photo updated successfully',
    });
  } catch (error) {
    console.error('UPDATE Photo Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update photo',
      },
      { status: 500 }
    );
  }
}

