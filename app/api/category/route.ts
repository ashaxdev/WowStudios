import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

// GET ALL CATEGORIES
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('GET Categories Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

// CREATE CATEGORY
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category name is required',
        },
        { status: 400 }
      );
    }

    const existing = await Category.findOne({
      name: {
        $regex: new RegExp(`^${name.trim()}$`, 'i'),
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category already exists',
        },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name: name.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        data: category,
        message: 'Category created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE Category Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create category',
      },
      { status: 500 }
    );
  }
}