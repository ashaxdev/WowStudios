'use client';
import { useEffect, useState, useRef } from 'react';
import './blog.css';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', tags: '', published: false });
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  async function load() {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data.data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (fileRef.current?.files?.[0]) fd.append('coverImage', fileRef.current.files[0]);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setMsg('Blog created!');
        setShowForm(false);
        setForm({ title: '', content: '', excerpt: '', tags: '', published: false });
        setPreview(null);
        load();
      } else setMsg(data.error || 'Failed');
    } catch { setMsg('Error saving blog'); }
    setSaving(false);
  }

  async function togglePublish(blog: Blog) {
    await fetch(`/api/blogs/${blog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ published: !blog.published }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/blogs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  return (
    <div className="blogs-admin">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Blogs</h1>
          <p className="page-sub">
            {blogs.length} posts · {blogs.filter(b => b.published).length} published
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          + New post
        </button>
      </div>

      {/* Success message */}
      {msg && (
        <div className="alert-success" role="alert">
          {msg}
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="form-card">
          <h2 className="form-title">New blog post</h2>
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
                {saving ? 'Saving…' : 'Save post'}
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog list */}
      {loading ? (
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
      )}
    </div>
  );
}