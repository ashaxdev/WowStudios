import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Photo from '@/models/Photo';

// GET SINGLE CATEGORY
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

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
  try {
    await connectDB();

    const { id } = await params;
    const { name } = await req.json();

    const newName = name?.trim();

    if (!newName) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    const existing = await Category.findOne({ name: newName, _id: { $ne: id } });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Category already exists' },
        { status: 400 }
      );
    }

    // new: false → returns OLD document, update applied in same round-trip
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
    if (oldCategory.name !== newName) {
      await Photo.updateMany(
        { category: oldCategory.name },
        { $set: { category: newName } }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...oldCategory.toObject(), name: newName },
      message: 'Category updated successfully',
    });
  } catch (error) {
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
  try {
    await connectDB();

    const { id } = await params;

    // Delete category and cascade delete all its photos in parallel
    const [category] = await Promise.all([
      Category.findByIdAndDelete(id),
      Photo.deleteMany({ category: id }),
    ]);

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}