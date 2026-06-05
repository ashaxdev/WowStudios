'use client';
import { useEffect, useState, useRef } from 'react';
import '../globals.css';

interface Photo {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  featured: boolean;
  createdAt: string;
}

export default function PhotosAdmin() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState('');
  const [form, setForm] = useState({ title: '', category: '', description: '', featured: false });
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  async function loadPhotos() {
    const url = filterCat ? `/api/photos?category=${filterCat}` : '/api/photos';
    const res = await fetch(url);
    const data = await res.json();
    setPhotos(data.data || []);
    setLoading(false);
  }

  useEffect(() => { loadPhotos(); }, [filterCat]);

  const categories = [...new Set(photos.map(p => p.category))];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fileRef.current?.files?.[0]) return setMsg('Please select an image');
    setUploading(true);
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('category', form.category);
    fd.append('description', form.description);
    fd.append('featured', String(form.featured));
    fd.append('image', fileRef.current.files[0]);
    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setMsg('Photo uploaded!');
        setShowForm(false);
        setForm({ title: '', category: '', description: '', featured: false });
        setPreview(null);
        loadPhotos();
      } else setMsg(data.error || 'Upload failed');
    } catch { setMsg('Upload failed'); }
    setUploading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this photo?')) return;
    await fetch(`/api/photos/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    loadPhotos();
  }

  return (
  <div className="photos-page">
    <div className="page-header">
      <div>
        <h1 className="page-title">Photos</h1>
        <p className="page-subtitle">
          {photos.length} photos in gallery
        </p>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="btn-primary"
      >
        + Add Photo
      </button>
    </div>

    {msg && (
      <div className="alert-info">
        {msg}
      </div>
    )}

    {showForm && (
      <div className="admin-form-card">
        <h2 className="form-title">
          Upload New Photo
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label className="form-label">
                Title *
              </label>

              <input
                type="text"
                value={form.title}
                onChange={e =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                required
                placeholder="Photo title"
                className="admin-input"
              />
            </div>

            <div>
              <label className="form-label">
                Category *
              </label>

              <input
                type="text"
                value={form.category}
                onChange={e =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                required
                placeholder="Wedding, Portrait..."
                list="categories"
                className="admin-input"
              />

              <datalist id="categories">
                {categories.map(c => (
                  <option
                    key={c}
                    value={c}
                  />
                ))}
              </datalist>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={e =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              rows={3}
              placeholder="Optional description"
              className="admin-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Image *
            </label>

            <div
              onClick={() =>
                fileRef.current?.click()
              }
              className="upload-box"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="upload-preview"
                />
              ) : (
                <>
                  <div className="upload-icon">
                    📷
                  </div>

                  <div className="upload-title">
                    Click to select image
                  </div>

                  <div className="upload-subtitle">
                    JPG, PNG, WEBP up to 10MB
                  </div>
                </>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const f =
                  e.target.files?.[0];

                if (f) {
                  setPreview(
                    URL.createObjectURL(f)
                  );
                }
              }}
            />
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={e =>
                setForm({
                  ...form,
                  featured:
                    e.target.checked,
                })
              }
            />

            <label htmlFor="featured">
              Mark as featured
            </label>
          </div>

          <div className="button-group">
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary"
            >
              {uploading
                ? 'Uploading...'
                : 'Upload Photo'}
            </button>

            <button
              type="button"
              onClick={() =>
                setShowForm(false)
              }
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )}

    {categories.length > 0 && (
      <div className="filter-wrap">
        <button
          onClick={() => setFilterCat('')}
          className={`filter-btn ${
            !filterCat ? 'active' : ''
          }`}
        >
          All
        </button>

        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`filter-btn ${
              filterCat === c
                ? 'active'
                : ''
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    )}

    {loading ? (
      <div className="loading-state">
        Loading...
      </div>
    ) : photos.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon">
          📷
        </div>

        <div className="empty-text">
          No photos yet. Upload your
          first photo!
        </div>
      </div>
    ) : (
      <div className="photo-grid">
        {photos.map(photo => (
          <div
            key={photo._id}
            className="photo-card"
          >
            <div className="photo-image-wrap">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="photo-image"
              />

              {photo.featured && (
                <span className="featured-badge">
                  ★ Featured
                </span>
              )}

              <button
                onClick={() =>
                  handleDelete(photo._id)
                }
                className="delete-btn"
              >
                ×
              </button>
            </div>

            <div className="photo-content">
              <div className="photo-title">
                {photo.title}
              </div>

              <div className="photo-category">
                {photo.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}