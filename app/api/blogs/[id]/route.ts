import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

const fail = (error: string, status: number) =>
  NextResponse.json({ success: false, error }, { status });

function toBool(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on' || value === '1';
}

function toTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((t) => String(t).trim()).filter(Boolean);
  }
  const str = String(value ?? '').trim();
  if (!str) return [];
  if (str.startsWith('[')) {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return parsed.map((t) => String(t).trim()).filter(Boolean);
      }
    } catch {
      /* fall through to comma split */
    }
  }
  return str
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return fail('Invalid blog id', 400);
    }

    const blog = await Blog.findById(id);
    if (!blog) return fail('Blog not found', 404);

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('GET BLOG ERROR:', error);
    return fail('Server error', 500);
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  if (!isAuthenticated(req)) return fail('Unauthorized', 401);

  try {
    await dbConnect();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return fail('Invalid blog id', 400);
    }

    const blog = await Blog.findById(id);
    if (!blog) return fail('Blog not found', 404);

    const contentType = req.headers.get('content-type') || '';

    let title: unknown;
    let content: unknown;
    let excerpt: unknown;
    let tags: unknown;
    let published: unknown;
    let file: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const fd = await req.formData();
      if (fd.has('title')) title = fd.get('title');
      if (fd.has('content')) content = fd.get('content');
      if (fd.has('excerpt')) excerpt = fd.get('excerpt');
      if (fd.has('tags')) tags = fd.get('tags');
      if (fd.has('published')) published = fd.get('published');
      const f = fd.get('coverImage');
      if (f instanceof File && f.size > 0) file = f;
    } else {
      const body = await req.json();
      title = body.title;
      content = body.content;
      excerpt = body.excerpt;
      tags = body.tags;
      published = body.published;
    }

    if (title !== undefined) {
      const t = String(title).trim();
      if (!t) return fail('Title cannot be empty', 400);
      blog.title = t;
    }
    if (content !== undefined) {
      const c = String(content).trim();
      if (!c) return fail('Content cannot be empty', 400);
      blog.content = c;
    }
    if (excerpt !== undefined) {
      const e = String(excerpt).trim();
      if (!e) return fail('Excerpt cannot be empty', 400);
      blog.excerpt = e;
    }
    if (tags !== undefined) blog.tags = toTags(tags);
    if (published !== undefined) blog.published = toBool(published);

    // Replace cover image if a new file was sent
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
      const uploadResult = await uploadImage(base64, 'photo-studio/blogs');

      const oldPublicId = blog.coverImagePublicId;
      blog.coverImage = uploadResult.url;
      blog.coverImagePublicId = uploadResult.publicId;

      if (oldPublicId) {
        try {
          await deleteImage(oldPublicId);
        } catch (e) {
          console.error('Old cover delete failed:', e);
        }
      }
    }

    await blog.save(); // slug stays the same so existing links keep working

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('UPDATE BLOG ERROR:', error);
    return fail('Failed to update blog', 500);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!isAuthenticated(req)) return fail('Unauthorized', 401);

  try {
    await dbConnect();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return fail('Invalid blog id', 400);
    }

    const blog = await Blog.findById(id);
    if (!blog) return fail('Blog not found', 404);

    if (blog.coverImagePublicId) {
      try {
        await deleteImage(blog.coverImagePublicId);
      } catch (e) {
        console.error('Cover delete failed:', e);
      }
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('DELETE BLOG ERROR:', error);
    return fail('Failed to delete blog', 500);
  }
}