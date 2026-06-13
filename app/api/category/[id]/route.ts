import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Photo from '@/models/Photo';
import Category from '@/models/Category';
import { isAuthenticated } from '@/lib/auth';

// GET SINGLE CATEGORY
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// UPDATE CATEGORY
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const { id } = await params;
    const { name } = await req.json();
    const newName = name?.trim();

    if (!newName) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Check for duplicate name (excluding current category)
    const duplicate = await Category.findOne({ name: newName, _id: { $ne: id } });
    if (duplicate) {
      return NextResponse.json(
        { success: false, error: 'Category already exists' },
        { status: 400 }
      );
    }

    // new: false → returns OLD document so we can get the old name
    const oldCategory = await Category.findByIdAndUpdate(
      id,
      { name: newName },
      { new: false, runValidators: true }
    );

    if (!oldCategory) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Cascade update photos only if name actually changed
    let photosModified = 0;
    if (oldCategory.name !== newName) {
      const photoResult = await Photo.updateMany(
        { category: oldCategory.name },
        { $set: { category: newName } }
      );
      photosModified = photoResult.modifiedCount;
    }

    return NextResponse.json({
      success: true,
      message: `Category renamed "${oldCategory.name}" → "${newName}", updated ${photosModified} photo(s)`,
      data: { ...oldCategory.toObject(), name: newName },
    });
  } catch (error) {
    console.error('Edit Category Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE CATEGORY
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const { id } = await params;

    // Get category first so we can delete photos by category NAME not id
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Cascade delete all photos belonging to this category
    await Photo.deleteMany({ category: category.name });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Delete Category Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}