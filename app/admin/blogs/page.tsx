'use client';
import { useRouter } from 'next/navigation';


import { useEffect, useState, useRef } from 'react';
import './blog.css';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

type FormState = {
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  published: boolean;
};

const EMPTY_FORM: FormState = {
  title: '',
  content: '',
  excerpt: '',
  tags: '',
  published: false,
};

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [token, setToken] = useState('');

  const router = useRouter();

  // null = create mode, string = edit mode (holds the blog _id)
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setToken(localStorage.getItem('admin_token') || '');
    load();
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data.success ? data.data || [] : []);
    } catch (error) {
      console.error(error);
      setMsg('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
    setMsg('');
    setShowForm(true);
  }

  function openEdit(blog: Blog) {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      tags: blog.tags.join(', '),
      published: blog.published,
    });
    // Show existing cover image as preview (it's already a URL, not a blob)
    setPreview(blog.coverImage || null);
    if (fileRef.current) fileRef.current.value = '';
    setMsg('');
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);
      setMsg('');

      const file = fileRef.current?.files?.[0];
      const isEdit = editingId !== null;

      if (isEdit) {
        // PUT with JSON (cover image change via separate upload or keep existing)
        const body: Record<string, any> = {
          title: form.title,
          content: form.content,
          excerpt: form.excerpt,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
          published: form.published,
        };

        // If a new file was selected, upload via FormData
        if (file) {
          const fd = new FormData();
          Object.entries(body).forEach(([k, v]) =>
            fd.append(k, Array.isArray(v) ? v.join(',') : String(v))
          );
          fd.append('coverImage', file);

          const res = await fetch(`/api/blogs/${editingId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed');
        } else {
          const res = await fetch(`/api/blogs/${editingId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed');
        }

        setMsg('Blog updated successfully');
      } else {
        // POST — create new
        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('content', form.content);
        fd.append('excerpt', form.excerpt);
        fd.append('tags', form.tags);
        fd.append('published', String(form.published));
        if (file) fd.append('coverImage', file);

        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed');

        setMsg('Blog created successfully');
      }

      closeForm();
      await load();
    } catch (error: any) {
      setMsg(error.message || 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(blog: Blog) {
    try {
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          tags: blog.tags,
          published: !blog.published,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      load();
    } catch (error) {
      console.error(error);
      setMsg('Failed to update blog');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this blog post?')) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMsg('Blog deleted successfully');
      load();
    } catch (error) {
      console.error(error);
      setMsg('Failed to delete blog');
    }
  }

  return (
    <div className="blogs-admin">
      
      {/* Header */}
      <div className="page-header">
           <button
      onClick={() => router.back()}
      className="back-btn"
    >
      ← Back
    </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Back button — visible when form is open */}
          {showForm && (
            <button className="btn-back" onClick={closeForm} aria-label="Back to list">
              ← Back
            </button>
          )}
          <div>
            <h1 className="page-title">{showForm ? (editingId ? 'Edit post' : 'New post') : 'Blogs'}</h1>
            {!showForm && (
              <p className="page-sub">
                {blogs.length} posts · {blogs.filter(b => b.published).length} published
              </p>
            )}
          </div>
        </div>
        {!showForm && (
          <button className="btn-primary" onClick={openCreate}>
            + New post
          </button>
        )}
      </div>

      {/* Message */}
      {msg && (
        <div className="alert-success" role="alert">
          {msg}
        </div>
      )}

      {/* Create / Edit form */}
      {showForm && (
        <div className="form-card">
          <h2 className="form-title">{editingId ? 'Edit blog post' : 'New blog post'}</h2>
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="field">
              <label htmlFor="bf-title">Title *</label>
              <input
                id="bf-title"
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Blog title"
              />
            </div>

            <div className="field">
              <label htmlFor="bf-excerpt">Excerpt *</label>
              <textarea
                id="bf-excerpt"
                value={form.excerpt}
                onChange={e => setForm({ ...form, excerpt: e.target.value })}
                required
                rows={2}
                placeholder="Short description (shown in listing)"
              />
            </div>

            <div className="field">
              <label htmlFor="bf-content">Content *</label>
              <textarea
                id="bf-content"
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                required
                rows={8}
                placeholder="Full blog content (supports HTML or Markdown)"
                className="mono"
              />
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="bf-tags">Tags (comma separated)</label>
                <input
                  id="bf-tags"
                  type="text"
                  value={form.tags}
                  onChange={e => setForm({ ...form, tags: e.target.value })}
                  placeholder="photography, wedding, tips"
                />
              </div>
              <div className="field">
                <label>Cover image</label>
                <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                  {preview
                    ? <img src={preview} alt="Cover preview" className="upload-preview" />
                    : <span>Click to upload cover</span>}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) setPreview(URL.createObjectURL(f));
                  }}
                />
              </div>
            </div>

            <div className="checkbox-row">
              <input
                type="checkbox"
                id="bf-pub"
                checked={form.published}
                onChange={e => setForm({ ...form, published: e.target.checked })}
              />
              <label htmlFor="bf-pub">Publish immediately</label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Saving…' : editingId ? 'Update post' : 'Save post'}
              </button>
              <button type="button" className="btn-secondary" onClick={closeForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog list */}
      {!showForm && (
        loading ? (
          <div className="state-loading">Loading…</div>
        ) : blogs.length === 0 ? (
          <div className="state-empty">
            <div className="empty-icon">✍️</div>
            <p>No blog posts yet.</p>
          </div>
        ) : (
          <div className="blog-list">
            {blogs.map(blog => (
              <div key={blog._id} className="blog-item">
                {blog.coverImage && (
                  <img src={blog.coverImage} alt="" className="blog-cover" />
                )}
                <div className="blog-body">
                  <div className="blog-head">
                    <h3 className="blog-title">{blog.title}</h3>
                    <span className={`badge ${blog.published ? 'badge-published' : 'badge-draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  <div className="tag-list">
                    {blog.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="blog-actions">
                  <button className="btn-action" onClick={() => openEdit(blog)}>
                    Edit
                  </button>
                  <button className="btn-action" onClick={() => togglePublish(blog)}>
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button className="btn-action btn-danger" onClick={() => handleDelete(blog._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}