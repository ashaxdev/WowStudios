'use client';
import { useEffect, useState, useRef } from 'react';
import './testimonial.css';

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  message: string;
  rating: number;
  avatarUrl?: string;
  published: boolean;
  createdAt: string;
}

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', message: '', rating: 5, published: true });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  async function load() {
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    setItems(data.data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('role', form.role);
    fd.append('message', form.message);
    fd.append('rating', String(form.rating));
    fd.append('published', String(form.published));
    if (fileRef.current?.files?.[0]) fd.append('avatar', fileRef.current.files[0]);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setMsg('Testimonial added!');
        setShowForm(false);
        setForm({ name: '', role: '', message: '', rating: 5, published: true });
        setAvatarPreview(null);
        load();
      } else setMsg(data.error || 'Failed');
    } catch { setMsg('Error saving'); }
    setSaving(false);
  }

  async function togglePublish(item: Testimonial) {
    await fetch(`/api/testimonials/${item._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ published: !item.published }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

  return (
  <div className="testimonials-page">
    <div className="testimonials-header">
      <div>
        <h1 className="testimonials-title">Testimonials</h1>
        <p className="testimonials-subtitle">
          {items.length} reviews · {items.filter(i => i.published).length} published
        </p>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="primary-btn"
      >
        + Add Testimonial
      </button>
    </div>

    {msg && (
      <div className="success-msg">
        {msg}
      </div>
    )}

    {showForm && (
      <div className="form-card">
        <h2 className="form-title">New Testimonial</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label>Client Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
                placeholder="Jane Smith"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Role / Event</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                placeholder="Bride, Corporate Client..."
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              required
              rows={4}
              placeholder="What did the client say?"
              className="form-textarea"
            />
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Rating</label>

              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() =>
                      setForm({ ...form, rating: n })
                    }
                    className={`star-btn ${
                      n <= form.rating ? 'active' : ''
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Avatar Photo</label>

              <div
                className="upload-box"
                onClick={() => fileRef.current?.click()}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt=""
                    className="avatar-preview"
                  />
                ) : (
                  <span>Upload photo (optional)</span>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setAvatarPreview(
                      URL.createObjectURL(file)
                    );
                  }
                }}
              />
            </div>
          </div>

          <div className="publish-row">
            <input
              type="checkbox"
              id="tpub"
              checked={form.published}
              onChange={(e) =>
                setForm({
                  ...form,
                  published: e.target.checked,
                })
              }
            />

            <label htmlFor="tpub">
              Publish immediately
            </label>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={saving}
              className="primary-btn"
            >
              {saving
                ? 'Saving...'
                : 'Save Testimonial'}
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

    {loading ? (
      <div className="loading-state">
        Loading...
      </div>
    ) : items.length === 0 ? (
      <div className="empty-state">
        <div className="empty-state-icon">
          💬
        </div>

        <div className="empty-state-text">
          No testimonials yet.
        </div>
      </div>
    ) : (
      <div className="testimonial-grid">
        {items.map((item) => (
          <div
            key={item._id}
            className="testimonial-card"
          >
            <div className="card-top">

              {item.avatarUrl ? (
                <div className="card-avatar">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                  />
                </div>
              ) : (
                <div className="avatar-placeholder">
                  {item.name[0]}
                </div>
              )}

              <div className="card-content">
                <div className="client-name">
                  {item.name}
                </div>

                {item.role && (
                  <div className="client-role">
                    {item.role}
                  </div>
                )}
              </div>

              <span
                className={`status-badge ${
                  item.published
                    ? 'status-live'
                    : 'status-hidden'
                }`}
              >
                {item.published
                  ? 'Live'
                  : 'Hidden'}
              </span>
            </div>

            <div className="review-stars">
              {stars(item.rating)}
            </div>

            <p className="review-message">
              "{item.message}"
            </p>

            <div className="card-actions">
              <button
                onClick={() =>
                  togglePublish(item)
                }
                className="card-btn"
              >
                {item.published
                  ? 'Hide'
                  : 'Publish'}
              </button>

              <button
                onClick={() =>
                  handleDelete(item._id)
                }
                className="card-btn delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);}
