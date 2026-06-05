'use client';
import { useRouter } from 'next/navigation';

// const router = useRouter();
import { useEffect, useState, useRef, useCallback } from 'react';
import './photo.css';

interface Photo {
  _id: string;
  category: string;
  imageUrl: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function PhotosAdmin() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  const [showCatPanel, setShowCatPanel] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [catMsg, setCatMsg] = useState('');

  const router = useRouter();

  const fileRef = useRef<HTMLInputElement>(null);

  const token = useRef<string>(
    typeof window !== 'undefined'
      ? localStorage.getItem('admin_token') ?? ''
      : ''
  );

  // ───────── Auto clear messages ─────────
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(''), 3000);
    return () => clearTimeout(t);
  }, [msg]);

  useEffect(() => {
    if (!catMsg) return;
    const t = setTimeout(() => setCatMsg(''), 3000);
    return () => clearTimeout(t);
  }, [catMsg]);

  // ───────── Preview cleanup (IMPORTANT FIX) ─────────
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ───────── Load Categories ─────────
  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/category');
      const data = await res.json();

      if (data.success) {
        setCategories(data.data || []);
      } else {
        setCatMsg(data.error || 'Failed to load categories');
        setCategories([]);
      }
    } catch {
      setCatMsg('Failed to load categories');
      setCategories([]);
    }
  }, []);

  // ───────── Load Photos ─────────
  const loadPhotos = useCallback(async () => {
    setLoading(true);

    const url = filterCat
      ? `/api/photos?category=${encodeURIComponent(filterCat)}`
      : '/api/photos';

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setPhotos(data.data || []);
      } else {
        setMsg(data.error || 'Failed to load photos');
        setPhotos([]);
      }
    } catch {
      setMsg('Failed to load photos');
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [filterCat]);

  // ───────── Initial Load ─────────
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  useEffect(() => {
    if (showForm) loadCategories();
  }, [showForm, loadCategories]);

  // ───────── Upload Photo ─────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fileRef.current?.files?.[0]) {
      setMsg('Please select an image');
      return;
    }

    if (!selectedCategory) {
      setMsg('Please select a category');
      return;
    }

    setUploading(true);

    const fd = new FormData();
    fd.append('category', selectedCategory);
    fd.append('image', fileRef.current.files[0]);

    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (data?.success) {
        setMsg('Photo uploaded!');
        setShowForm(false);
        setSelectedCategory('');
        setPreview('');
        if (fileRef.current) fileRef.current.value = '';

        loadPhotos();
      } else {
        setMsg(data?.error || 'Upload failed');
      }
    } catch {
      setMsg('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  // ───────── Delete Photo ─────────
  async function handleDelete(id: string) {
    if (!confirm('Delete this photo?')) return;

    try {
      const res = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });

      const data = await res.json();

      if (data?.success) {
        setMsg('Photo deleted');
        loadPhotos();
      } else {
        setMsg(data?.error || 'Failed to delete photo');
      }
    } catch {
      setMsg('Failed to delete photo');
    }
  }

  // ───────── Add Category ─────────
  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();

    if (!newCatName.trim()) return;

    try {
      const res = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.current}`,
        },
        body: JSON.stringify({ name: newCatName.trim() }),
      });

      const data = await res.json();

      if (data?.success) {
        setCatMsg('Category added!');
        setNewCatName('');
        loadCategories();
      } else {
        setCatMsg(data?.error || 'Failed to add category');
      }
    } catch {
      setCatMsg('Failed to add category');
    }
  }

  // ───────── Edit Category ─────────
  async function handleEditCategory(e: React.FormEvent) {
    e.preventDefault();

    if (!editingCat || !editCatName.trim()) return;

    const oldName = editingCat.name;
    const newName = editCatName.trim();

    try {
      const res = await fetch(`/api/category/${editingCat._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.current}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await res.json();

      if (data?.success) {
        setCatMsg('Category updated!');

        setEditingCat(null);
        setEditCatName('');

        if (selectedCategory === oldName) setSelectedCategory(newName);
        if (filterCat === oldName) setFilterCat(newName);

        loadCategories();
        loadPhotos();
      } else {
        setCatMsg(data?.error || 'Failed to update category');
      }
    } catch {
      setCatMsg('Failed to update category');
    }
  }

  // ───────── Delete Category ─────────
  async function handleDeleteCategory(id: string) {
    if (!confirm('Delete this category?')) return;

    try {
      const res = await fetch(`/api/category/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });

      const data = await res.json();

      if (data?.success) {
        setCatMsg('Category deleted');

        const deleted = categories.find(c => c._id === id);

        if (deleted) {
          if (filterCat === deleted.name) setFilterCat('');
          if (selectedCategory === deleted.name) setSelectedCategory('');
        }

        loadCategories();
        loadPhotos();
      } else {
        setCatMsg(data?.error || 'Failed to delete category');
      }
    } catch {
      setCatMsg('Failed to delete category');
    }
  }

  // ───────── File Preview ─────────
  const handlePreview = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // ───────── UI ─────────
  return (
    <div className="photos-page">

      {/* HEADER */}
      <div className="page-header">
         <button
      onClick={() => router.back()}
      className="back-btn"
    >
      ← Back
    </button>
        <h1>Photos</h1>

        <div className="header-actions">
          <button onClick={() => setShowCatPanel(!showCatPanel)}>
            Categories
          </button>

          <button onClick={() => setShowForm(!showForm)}>
            + Add Photo
          </button>
        </div>
      </div>

      {msg && <div className="alert">{msg}</div>}

      {/* CATEGORY PANEL */}
      {showCatPanel && (
        <div className="panel">
          <h2>Manage Categories</h2>

          {catMsg && <div className="alert">{catMsg}</div>}

          <form onSubmit={handleAddCategory}>
            <input
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
              placeholder="New category"
            />
            <button>Add</button>
          </form>

          {categories.map(cat => (
            <div key={cat._id}>
              {editingCat?._id === cat._id ? (
                <form onSubmit={handleEditCategory}>
                  <input
                    value={editCatName}
                    onChange={e => setEditCatName(e.target.value)}
                  />
                  <button>Save</button>
                  <button onClick={() => setEditingCat(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>{cat.name}</span>
                  <button onClick={() => {
                    setEditingCat(cat);
                    setEditCatName(cat.name);
                  }}>Edit</button>
                  <button onClick={() => handleDeleteCategory(cat._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD */}
      {showForm && (
        <form onSubmit={handleSubmit} className="upload-box">

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            ref={fileRef}
            type="file"
            onChange={e => handlePreview(e.target.files?.[0])}
          />

          {preview && <img src={preview} width={120} />}

          <button disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      )}

      {/* FILTER */}
      <div className="filters">
        <button onClick={() => setFilterCat('')}>All</button>
        {categories.map(c => (
          <button
            key={c._id}
            onClick={() => setFilterCat(c.name)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {photos.map(p => (
            <div key={p._id}>
              <img src={p.imageUrl} />
              <p>{p.category}</p>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}