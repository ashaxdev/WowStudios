'use client';
import { useEffect, useState, useRef } from 'react';
import './service.css';

interface Service {
  _id: string;
  title: string;
  description: string;
  price?: string;
  imageUrl?: string;
  features: string[];
  icon?: string;
  published: boolean;
  order: number;
  createdAt: string;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', icon: '', features: '', published: true, order: 0 });
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  async function load() {
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data.data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (fileRef.current?.files?.[0]) fd.append('image', fileRef.current.files[0]);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setMsg('Service added!');
        setShowForm(false);
        setForm({ title: '', description: '', price: '', icon: '', features: '', published: true, order: 0 });
        setImgPreview(null);
        load();
      } else setMsg(data.error || 'Failed');
    } catch { setMsg('Error saving'); }
    setSaving(false);
  }

  async function togglePublish(s: Service) {
    await fetch(`/api/services/${s._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ published: !s.published }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    load();
  }

  return (
  <div className="services-page">

    <div className="page-header">
      <div>
        <h1>Services</h1>
        <p>
          {services.length} services ·{" "}
          {services.filter((s) => s.published).length} published
        </p>
      </div>

      <button
        type="button"
        className="btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "+ Add Service"}
      </button>
    </div>

    {msg && (
      <div className="success-message">
        {msg}
      </div>
    )}

    {showForm && (
      <div className="form-card">
        <h2>New Service</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid two-column">
            <div className="form-group">
              <label>Service Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Wedding Photography"
                required
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                placeholder="Starting from ₹25,000"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              rows="4"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Features (one per line)</label>
            <textarea
              rows="4"
              value={form.features}
              onChange={(e) =>
                setForm({ ...form, features: e.target.value })
              }
            />
          </div>

          <div className="form-grid three-column">

            <div className="form-group">
              <label>Icon</label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) =>
                  setForm({ ...form, icon: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm({
                    ...form,
                    order: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Cover Image</label>

              <div
                className="upload-box"
                onClick={() => fileRef.current?.click()}
              >
                {imgPreview ? (
                  <img
                    src={imgPreview}
                    alt=""
                    className="upload-preview"
                  />
                ) : (
                  "Upload Image"
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImgPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({
                  ...form,
                  published: e.target.checked,
                })
              }
            />
            <span>Publish immediately</span>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Service"}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    )}

    {loading ? (
      <div className="empty-state">Loading...</div>
    ) : services.length === 0 ? (
      <div className="empty-state">
        No services available
      </div>
    ) : (
      <div className="service-grid">
        {services.map((s) => (
          <div key={s._id} className="service-card">

            {s.imageUrl && (
              <img
                src={s.imageUrl}
                alt={s.title}
                className="service-image"
              />
            )}

            <div className="service-content">

              <div className="service-top">
                <h3>
                  {s.icon} {s.title}
                </h3>

                <span
                  className={
                    s.published
                      ? "status-live"
                      : "status-hidden"
                  }
                >
                  {s.published ? "Live" : "Hidden"}
                </span>
              </div>

              {s.price && (
                <div className="service-price">
                  {s.price}
                </div>
              )}

              <p className="service-description">
                {s.description}
              </p>

              {s.features.length > 0 && (
                <ul className="feature-list">
                  {s.features.slice(0, 3).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}

              <div className="card-actions">
                <button
                  className="btn-secondary"
                  onClick={() => togglePublish(s)}
                >
                  {s.published ? "Hide" : "Publish"}
                </button>

                <button
                  className="btn-danger"
                  onClick={() => handleDelete(s._id)}
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
