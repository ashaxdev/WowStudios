'use client';

import { useEffect, useState } from 'react';
import './video.css';

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
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [apiCategories, setApiCategories] = useState<string[]>([]);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  const [form, setForm] = useState({
    title: '',
    youtubeId: '',
    category: '',
    description: '',
    featured: false,
  });

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('admin_token')
      : '';

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : url;
  };

  async function load() {
    try {
      setLoading(true);
      const url = filterCat
        ? `/api/videos?category=${encodeURIComponent(filterCat)}`
        : '/api/videos';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setVideos(data.data);
      } else {
        setVideos([]);
      }
    } catch (error) {
      console.error(error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [filterCat]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/category');
        const data = await res.json();
        if (data.success) {
          setApiCategories(data.data.map((c: { name: string }) => c.name));
        }
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const categories = Array.from(new Set(videos.map((v) => v.category)));

  function handleEditClick(video: Video) {
    setEditingVideo(video);
    setForm({
      title: video.title,
      youtubeId: video.youtubeId,
      category: video.category,
      description: video.description || '',
      featured: video.featured,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelForm() {
    setShowForm(false);
    setEditingVideo(null);
    setForm({ title: '', youtubeId: '', category: '', description: '', featured: false });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSaving(true);

      const isEdit = !!editingVideo;
      const url = isEdit ? `/api/videos/${editingVideo._id}` : '/api/videos';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMsg(isEdit ? 'Video updated successfully' : 'Video added successfully');
        handleCancelForm();
        await load();
      } else {
        setMsg(data.error || (isEdit ? 'Failed to update video' : 'Failed to add video'));
      }
    } catch (error) {
      console.error(error);
      setMsg('Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this video?')) return;
    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMsg('Video deleted');
        await load();
      }
    } catch (error) {
      console.error(error);
      setMsg('Delete failed');
    }
  }

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
          onClick={() => {
            if (showForm && !editingVideo) {
              handleCancelForm();
            } else if (!showForm) {
              setShowForm(true);
            }
          }}
          className="admin-btn"
        >
          + Add Video
        </button>
      </div>

      {msg && <div className="success-msg">{msg}</div>}

      {showForm && (
        <div className="admin-form-card">
          <h2 className="form-title">
            {editingVideo ? 'Edit Video' : 'Add YouTube Video'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>YouTube URL or Video ID *</label>
              <input
                type="text"
                value={form.youtubeId}
                onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                required
                placeholder="https://youtube.com/watch?v=..."
                className="admin-input"
              />
              {form.youtubeId && (
                <div className="preview-video">
                  <iframe
                    title="Preview Video"
                    src={`https://www.youtube.com/embed/${getYoutubeId(form.youtubeId)}`}
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
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="admin-input"
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  className="admin-input"
                >
                  <option value="">Select a category</option>
                  {apiCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="admin-textarea"
              />
            </div>

            <div className="checkbox-row">
              <input
                id="vfeat"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <label htmlFor="vfeat">Featured Video</label>
            </div>

            <div className="admin-actions">
              <button type="submit" disabled={saving} className="admin-btn">
                {saving ? 'Saving...' : editingVideo ? 'Update Video' : 'Add Video'}
              </button>
              <button type="button" onClick={handleCancelForm} className="secondary-btn">
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
            className={`filter-btn ${!filterCat ? 'active' : ''}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`filter-btn ${filterCat === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : videos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">▶</div>
          <div className="empty-text">No videos found</div>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <div className="video-frame">
                <iframe
                  title={video.title}
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="video-content">
                <h3 className="video-title">{video.title}</h3>

                <div className="video-tags">
                  <span className="video-category">{video.category}</span>
                  {video.featured && (
                    <span className="video-featured">Featured</span>
                  )}
                </div>

                {video.description && (
                  <p className="video-description">{video.description}</p>
                )}

                <div className="video-actions">
                  <button
                    onClick={() => handleEditClick(video)}
                    className="video-btn edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
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