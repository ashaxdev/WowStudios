'use client';
import { useRouter } from 'next/navigation';
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

interface BulkFile {
  id: string;           // local unique key
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  error?: string;
}

export default function PhotosAdmin() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');
  const [filterCat, setFilterCat] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Single upload
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Bulk upload
  const [bulkFiles, setBulkFiles] = useState<BulkFile[]>([]);
  const [bulkProgress, setBulkProgress] = useState({ done: 0, total: 0 });
  const [bulkRunning, setBulkRunning] = useState(false);
  const bulkFileRef = useRef<HTMLInputElement>(null);

  const [msg, setMsg] = useState('');

  const [showCatPanel, setShowCatPanel] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [catMsg, setCatMsg] = useState('');

  const router = useRouter();

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

  // ───────── Preview cleanup ─────────
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Cleanup bulk previews on unmount
  useEffect(() => {
    return () => {
      bulkFiles.forEach(f => URL.revokeObjectURL(f.preview));
    };
  }, []); // eslint-disable-line

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
  useEffect(() => { loadCategories(); }, [loadCategories]);
  useEffect(() => { loadPhotos(); }, [loadPhotos]);
  useEffect(() => { if (showForm) loadCategories(); }, [showForm, loadCategories]);

  // ───────── Upload Photo (single) ─────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fileRef.current?.files?.[0]) { setMsg('Please select an image'); return; }
    if (!selectedCategory) { setMsg('Please select a category'); return; }

    setUploading(true);
    const fd = new FormData();
    fd.append('category', selectedCategory);
    fd.append('image', fileRef.current.files[0]);

    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.current}` },
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

  // ───────── Bulk: pick files ─────────
  function handleBulkFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const newEntries: BulkFile[] = files.map(file => ({
      id: `${file.name}-${file.size}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
    }));
    setBulkFiles(prev => [...prev, ...newEntries]);
    // reset input so same files can be re-added if needed
    if (bulkFileRef.current) bulkFileRef.current.value = '';
  }

  // ───────── Bulk: remove one preview ─────────
  function removeBulkFile(id: string) {
    setBulkFiles(prev => {
      const entry = prev.find(f => f.id === id);
      if (entry) URL.revokeObjectURL(entry.preview);
      return prev.filter(f => f.id !== id);
    });
  }

  // ───────── Bulk: upload all pending ─────────
  async function handleBulkUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCategory) { setMsg('Please select a category'); return; }
    const pending = bulkFiles.filter(f => f.status === 'pending');
    if (pending.length === 0) { setMsg('No images to upload'); return; }

    setBulkRunning(true);
    setBulkProgress({ done: 0, total: pending.length });

    for (let i = 0; i < pending.length; i++) {
      const entry = pending[i];

      // Mark as uploading
      setBulkFiles(prev =>
        prev.map(f => f.id === entry.id ? { ...f, status: 'uploading' } : f)
      );

      const fd = new FormData();
      fd.append('category', selectedCategory);
      fd.append('image', entry.file);

      try {
        const res = await fetch('/api/photos', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token.current}` },
          body: fd,
        });
        const data = await res.json();

        if (data?.success) {
          setBulkFiles(prev =>
            prev.map(f => f.id === entry.id ? { ...f, status: 'done' } : f)
          );
        } else {
          setBulkFiles(prev =>
            prev.map(f =>
              f.id === entry.id
                ? { ...f, status: 'error', error: data?.error || 'Failed' }
                : f
            )
          );
        }
      } catch {
        setBulkFiles(prev =>
          prev.map(f =>
            f.id === entry.id ? { ...f, status: 'error', error: 'Network error' } : f
          )
        );
      }

      setBulkProgress(p => ({ ...p, done: i + 1 }));
    }

    setBulkRunning(false);
    loadPhotos();

    const errors = bulkFiles.filter(f => f.status === 'error').length;
    setMsg(errors > 0 ? `Done. ${errors} file(s) failed.` : 'All photos uploaded!');
  }

  // ───────── Bulk: clear completed ─────────
  function clearDone() {
    setBulkFiles(prev => {
      prev.filter(f => f.status === 'done').forEach(f => URL.revokeObjectURL(f.preview));
      return prev.filter(f => f.status !== 'done');
    });
  }

  // ───────── Delete Photo ─────────
  async function handleDelete(id: string) {
    if (!confirm('Delete this photo?')) return;
    try {
      const res = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token.current}` },
      });
      const data = await res.json();
      if (data?.success) { setMsg('Photo deleted'); loadPhotos(); }
      else setMsg(data?.error || 'Failed to delete photo');
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
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.current}` },
        body: JSON.stringify({ name: newCatName.trim() }),
      });
      const data = await res.json();
      if (data?.success) { setCatMsg('Category added!'); setNewCatName(''); loadCategories(); }
      else setCatMsg(data?.error || 'Failed to add category');
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
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.current}` },
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
        headers: { Authorization: `Bearer ${token.current}` },
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

  // ───────── File Preview (single) ─────────
  const handlePreview = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // ───────── Reset form on mode switch ─────────
  function switchMode(mode: 'single' | 'bulk') {
    setUploadMode(mode);
    setSelectedCategory('');
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
    // don't wipe bulkFiles so user doesn't lose selection
  }

  // ───────── UI ─────────
  return (
    <div className="photos-page">

      {/* HEADER */}
      <div className="page-header">
        <button onClick={() => router.back()} className="back-btn">← Back</button>
        <h1>Photos</h1>
        <div className="header-actions">
          <button onClick={() => setShowCatPanel(!showCatPanel)}>Categories</button>
          <button onClick={() => setShowForm(!showForm)}>+ Add Photo</button>
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
                  <input value={editCatName} onChange={e => setEditCatName(e.target.value)} />
                  <button>Save</button>
                  <button type="button" onClick={() => setEditingCat(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>{cat.name}</span>
                  <button onClick={() => { setEditingCat(cat); setEditCatName(cat.name); }}>Edit</button>
                  <button onClick={() => handleDeleteCategory(cat._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD FORM */}
      {showForm && (
        <div className="upload-box">

          {/* Mode toggle */}
          <div className="upload-mode-toggle">
            <button
              type="button"
              className={uploadMode === 'single' ? 'active' : ''}
              onClick={() => switchMode('single')}
            >
              Single Upload
            </button>
            <button
              type="button"
              className={uploadMode === 'bulk' ? 'active' : ''}
              onClick={() => switchMode('bulk')}
            >
              Bulk Upload
            </button>
          </div>

          {/* Shared category picker */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* ── SINGLE MODE ── */}
          {uploadMode === 'single' && (
            <form onSubmit={handleSubmit}>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={e => handlePreview(e.target.files?.[0])}
              />
              {preview && <img src={preview} width={120} alt="preview" />}
              <button disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </form>
          )}

          {/* ── BULK MODE ── */}
          {uploadMode === 'bulk' && (
            <form onSubmit={handleBulkUpload}>

              {/* Drop zone / file picker */}
              <div
                className="bulk-dropzone"
                onClick={() => bulkFileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files).filter(f =>
                    f.type.startsWith('image/')
                  );
                  if (!files.length) return;
                  const newEntries: BulkFile[] = files.map(file => ({
                    id: `${file.name}-${file.size}-${Math.random()}`,
                    file,
                    preview: URL.createObjectURL(file),
                    status: 'pending',
                  }));
                  setBulkFiles(prev => [...prev, ...newEntries]);
                }}
              >
                <input
                  ref={bulkFileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleBulkFileChange}
                />
                <span>📁 Click or drag & drop images here</span>
                <small>{bulkFiles.length} image{bulkFiles.length !== 1 ? 's' : ''} selected</small>
              </div>

              {/* Preview grid */}
              {bulkFiles.length > 0 && (
                <>
                  <div className="bulk-preview-grid">
                    {bulkFiles.map(entry => (
                      <div
                        key={entry.id}
                        className={`bulk-preview-item bulk-status-${entry.status}`}
                      >
                        <img src={entry.preview} alt={entry.file.name} />

                        {/* Status badge */}
                        <span className="bulk-badge">
                          {entry.status === 'pending' && '⏳'}
                          {entry.status === 'uploading' && '⬆️'}
                          {entry.status === 'done' && '✅'}
                          {entry.status === 'error' && '❌'}
                        </span>

                        {entry.status === 'error' && (
                          <span className="bulk-error-msg">{entry.error}</span>
                        )}

                        {/* Remove button (only if not uploading) */}
                        {entry.status !== 'uploading' && (
                          <button
                            type="button"
                            className="bulk-remove-btn"
                            onClick={() => removeBulkFile(entry.id)}
                          >
                            ✕
                          </button>
                        )}

                        <span className="bulk-filename">{entry.file.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar (shown while running) */}
                  {bulkRunning && (
                    <div className="bulk-progress">
                      <div
                        className="bulk-progress-bar"
                        style={{ width: `${(bulkProgress.done / bulkProgress.total) * 100}%` }}
                      />
                      <span>{bulkProgress.done} / {bulkProgress.total}</span>
                    </div>
                  )}

                  <div className="bulk-actions">
                    <button type="submit" disabled={bulkRunning}>
                      {bulkRunning
                        ? `Uploading ${bulkProgress.done}/${bulkProgress.total}...`
                        : `Upload ${bulkFiles.filter(f => f.status === 'pending').length} Photo${bulkFiles.filter(f => f.status === 'pending').length !== 1 ? 's' : ''}`}
                    </button>
                    {bulkFiles.some(f => f.status === 'done') && (
                      <button type="button" onClick={clearDone}>
                        Clear Done
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        bulkFiles.forEach(f => URL.revokeObjectURL(f.preview));
                        setBulkFiles([]);
                      }}
                      disabled={bulkRunning}
                    >
                      Clear All
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      )}

      {/* FILTER */}
      <div className="filters">
        <button onClick={() => setFilterCat('')}>All</button>
        {categories.map(c => (
          <button key={c._id} onClick={() => setFilterCat(c.name)}>
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
              <img src={p.imageUrl} alt={p.category} />
              <p>{p.category}</p>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}