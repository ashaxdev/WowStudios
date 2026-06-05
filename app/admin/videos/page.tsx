'use client';
import { useEffect, useState } from 'react';

interface Video {
  _id: string;
  title: string;
  youtubeId: string;
  category: string;
  description?: string;
  featured: boolean;
  createdAt: string;
}

export default function VideosAdmin() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', youtubeId: '', category: '', description: '', featured: false });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  async function load() {
    const url = filterCat ? `/api/videos?category=${filterCat}` : '/api/videos';
    const res = await fetch(url);
    const data = await res.json();
    setVideos(data.data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [filterCat]);

  const categories = [...new Set(videos.map(v => v.category))];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMsg('Video added!');
        setShowForm(false);
        setForm({ title: '', youtubeId: '', category: '', description: '', featured: false });
        load();
      } else setMsg(data.error || 'Failed');
    } catch { setMsg('Error saving'); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this video?')) return;
    await fetch(`/api/videos/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  async function toggleFeatured(video: Video) {
    await fetch(`/api/videos/${video._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ featured: !video.featured }),
    });
    load();
  }

  const getYoutubeId = (input: string) => {
    const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : input;
  };

  
return (
  <div className="videos-admin">

    <div className="admin-header">
      <div>
        <h1 className="admin-title">YouTube Videos</h1>
        <p className="admin-subtitle">
          {videos.length} videos across {categories.length} categories
        </p>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="admin-btn"
      >
        + Add Video
      </button>
    </div>

    {msg && (
      <div className="success-msg">
        {msg}
      </div>
    )}

    {showForm && (
      <div className="admin-form-card">

        <h2 className="form-title">
          Add YouTube Video
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>
              YouTube URL or Video ID *
            </label>

            <input
              type="text"
              value={form.youtubeId}
              onChange={(e) =>
                setForm({
                  ...form,
                  youtubeId: e.target.value,
                })
              }
              required
              placeholder="https://youtube.com/watch?v=..."
              className="admin-input"
            />

            {form.youtubeId && (
              <div className="preview-video">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(
                    form.youtubeId
                  )}`}
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Title *</label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                required
                placeholder="Video title"
                className="admin-input"
              />
            </div>

            <div className="form-group">
              <label>Category *</label>

              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                required
                placeholder="Wedding"
                list="vcats"
                className="admin-input"
              />

              <datalist id="vcats">
                {categories.map((c) => (
                  <option
                    key={c}
                    value={c}
                  />
                ))}
              </datalist>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={form.description}
              onChange={(e) =>
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

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="vfeat"
              checked={form.featured}
              onChange={(e) =>
                setForm({
                  ...form,
                  featured: e.target.checked,
                })
              }
            />

            <label htmlFor="vfeat">
              Mark as featured
            </label>
          </div>

          <div className="admin-actions">

            <button
              type="submit"
              disabled={saving}
              className="admin-btn"
            >
              {saving ? 'Saving...' : 'Add Video'}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="secondary-btn"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    )}

    {categories.length > 0 && (
      <div className="filter-row">

        <button
          onClick={() => setFilterCat('')}
          className={`filter-btn ${
            !filterCat ? 'active' : ''
          }`}
        >
          All
        </button>

        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`filter-btn ${
              filterCat === c ? 'active' : ''
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
    ) : videos.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon">
          ▶
        </div>

        <div className="empty-text">
          No videos yet.
        </div>
      </div>
    ) : (
      <div className="video-grid">

        {videos.map((video) => (
          <div
            key={video._id}
            className="video-card"
          >
            <div className="video-frame">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                allowFullScreen
              />
            </div>

            <div className="video-content">

              <h3 className="video-title">
                {video.title}
              </h3>

              <div className="video-tags">

                <span className="video-category">
                  {video.category}
                </span>

                {video.featured && (
                  <span className="video-featured">
                    Featured
                  </span>
                )}

              </div>

              {video.description && (
                <p className="video-description">
                  {video.description}
                </p>
              )}

              <div className="video-actions">

                <button
                  onClick={() =>
                    toggleFeatured(video)
                  }
                  className="video-btn"
                >
                  {video.featured
                    ? 'Unfeature'
                    : 'Feature'}
                </button>

                <button
                  onClick={() =>
                    handleDelete(video._id)
                  }
                  className="video-btn delete-btn"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>
    )}

  </div>
);


}
