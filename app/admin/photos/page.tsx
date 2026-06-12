'use client';
import { useRouter } from 'next/navigation';
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  useTransition,
} from 'react';
import './photo.css';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Photo {
  _id: string;
  category: string;
  imageUrl: string;
}

interface Category {
  _id: string;
  name: string;
}

type BulkStatus = 'pending' | 'uploading' | 'done' | 'error';

interface BulkFile {
  id: string;
  file: File;
  preview: string;
  status: BulkStatus;
  error?: string;
}

// ─────────────────────────────────────────────
// Reducer – batches photo + category state updates
// to avoid cascading re-renders
// ─────────────────────────────────────────────
interface AppState {
  photos: Photo[];
  categories: Category[];
  loading: boolean;
  msg: string;
  catMsg: string;
}

type AppAction =
  | { type: 'SET_PHOTOS'; photos: Photo[] }
  | { type: 'OPTIMISTIC_DELETE'; id: string }
  | { type: 'RESTORE_PHOTO'; photo: Photo }
  | { type: 'SET_CATEGORIES'; categories: Category[] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_MSG'; msg: string }
  | { type: 'SET_CAT_MSG'; msg: string };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PHOTOS':
      return { ...state, photos: action.photos, loading: false };
    case 'OPTIMISTIC_DELETE':
      return { ...state, photos: state.photos.filter(p => p._id !== action.id) };
    case 'RESTORE_PHOTO':
      return { ...state, photos: [action.photo, ...state.photos] };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.categories };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_MSG':
      return { ...state, msg: action.msg };
    case 'SET_CAT_MSG':
      return { ...state, catMsg: action.msg };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────
// Concurrency limiter for bulk uploads
// ─────────────────────────────────────────────
function createConcurrencyQueue(limit: number) {
  let running = 0;
  const queue: Array<() => void> = [];
  return function run<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const attempt = () => {
        running++;
        task()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            running--;
            if (queue.length > 0) queue.shift()!();
          });
      };
      if (running < limit) attempt();
      else queue.push(attempt);
    });
  };
}

// Up to 4 concurrent uploads
const concurrentUpload = createConcurrencyQueue(4);

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function PhotosAdmin() {
  const [state, dispatch] = useReducer(appReducer, {
    photos: [],
    categories: [],
    loading: true,
    msg: '',
    catMsg: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');
  const [filterCat, setFilterCat] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  // Single upload
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Bulk upload
  const [bulkFiles, setBulkFiles] = useState<BulkFile[]>([]);
  const [bulkProgress, setBulkProgress] = useState({ done: 0, total: 0 });
  const [bulkRunning, setBulkRunning] = useState(false);
  const bulkFileRef = useRef<HTMLInputElement>(null);

  // Category panel
  const [showCatPanel, setShowCatPanel] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [editCatName, setEditCatName] = useState('');

  const [, startTransition] = useTransition();
  const router = useRouter();

  const token = useRef<string>(
    typeof window !== 'undefined'
      ? (localStorage.getItem('admin_token') ?? '')
      : ''
  );

  // ── Auto-clear messages ──
  useEffect(() => {
    if (!state.msg) return;
    const t = setTimeout(() => dispatch({ type: 'SET_MSG', msg: '' }), 3000);
    return () => clearTimeout(t);
  }, [state.msg]);

  useEffect(() => {
    if (!state.catMsg) return;
    const t = setTimeout(() => dispatch({ type: 'SET_CAT_MSG', msg: '' }), 3000);
    return () => clearTimeout(t);
  }, [state.catMsg]);

  // ── Preview URL cleanup ──
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => { bulkFiles.forEach(f => URL.revokeObjectURL(f.preview)); }, []);

  // ─────────────────────────────────────────────
  // Data fetching – single fetch, client-side filter
  // ─────────────────────────────────────────────
  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/category');
      const data = await res.json();
      if (data.success) {
        dispatch({ type: 'SET_CATEGORIES', categories: data.data ?? [] });
      } else {
        dispatch({ type: 'SET_CAT_MSG', msg: data.error ?? 'Failed to load categories' });
      }
    } catch {
      dispatch({ type: 'SET_CAT_MSG', msg: 'Failed to load categories' });
    }
  }, []);

  // Fetch ALL photos once; filter client-side via useMemo
  const loadPhotos = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();
      if (data.success) {
        dispatch({ type: 'SET_PHOTOS', photos: data.data ?? [] });
      } else {
        dispatch({ type: 'SET_MSG', msg: data.error ?? 'Failed to load photos' });
        dispatch({ type: 'SET_PHOTOS', photos: [] });
      }
    } catch {
      dispatch({ type: 'SET_MSG', msg: 'Failed to load photos' });
      dispatch({ type: 'SET_PHOTOS', photos: [] });
    }
  }, []);

  // ── Initial load ──
  useEffect(() => {
    loadCategories();
    loadPhotos();
  }, [loadCategories, loadPhotos]);

  // ── Client-side filtered view (no refetch on filter change) ──
  const filteredPhotos = useMemo(
    () =>
      filterCat
        ? state.photos.filter(p => p.category === filterCat)
        : state.photos,
    [state.photos, filterCat]
  );

  // ─────────────────────────────────────────────
  // Single upload
  // ─────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!fileRef.current?.files?.[0]) { dispatch({ type: 'SET_MSG', msg: 'Please select an image' }); return; }
      if (!selectedCategory) { dispatch({ type: 'SET_MSG', msg: 'Please select a category' }); return; }

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
          dispatch({ type: 'SET_MSG', msg: 'Photo uploaded!' });
          setShowForm(false);
          setSelectedCategory('');
          setPreview(null);
          if (fileRef.current) fileRef.current.value = '';
          loadPhotos();
        } else {
          dispatch({ type: 'SET_MSG', msg: data?.error ?? 'Upload failed' });
        }
      } catch {
        dispatch({ type: 'SET_MSG', msg: 'Upload failed' });
      } finally {
        setUploading(false);
      }
    },
    [selectedCategory, loadPhotos]
  );

  // ─────────────────────────────────────────────
  // Bulk upload helpers
  // ─────────────────────────────────────────────
  const addBulkFiles = useCallback((files: File[]) => {
    const newEntries: BulkFile[] = files
      .filter(f => f.type.startsWith('image/'))
      .map(file => ({
        id: `${file.name}-${file.size}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        status: 'pending' as BulkStatus,
      }));
    setBulkFiles(prev => [...prev, ...newEntries]);
  }, []);

  const handleBulkFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addBulkFiles(Array.from(e.target.files ?? []));
      if (bulkFileRef.current) bulkFileRef.current.value = '';
    },
    [addBulkFiles]
  );

  const removeBulkFile = useCallback((id: string) => {
    setBulkFiles(prev => {
      const entry = prev.find(f => f.id === id);
      if (entry) URL.revokeObjectURL(entry.preview);
      return prev.filter(f => f.id !== id);
    });
  }, []);

  // Concurrent bulk upload – up to 4 in parallel
  const handleBulkUpload = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedCategory) { dispatch({ type: 'SET_MSG', msg: 'Please select a category' }); return; }

      const pending = bulkFiles.filter(f => f.status === 'pending');
      if (pending.length === 0) { dispatch({ type: 'SET_MSG', msg: 'No images to upload' }); return; }

      setBulkRunning(true);
      setBulkProgress({ done: 0, total: pending.length });

      let doneCount = 0;

      await Promise.all(
        pending.map(entry =>
          concurrentUpload(async () => {
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

              setBulkFiles(prev =>
                prev.map(f =>
                  f.id === entry.id
                    ? data?.success
                      ? { ...f, status: 'done' }
                      : { ...f, status: 'error', error: data?.error ?? 'Failed' }
                    : f
                )
              );
            } catch {
              setBulkFiles(prev =>
                prev.map(f =>
                  f.id === entry.id ? { ...f, status: 'error', error: 'Network error' } : f
                )
              );
            } finally {
              doneCount++;
              setBulkProgress(p => ({ ...p, done: doneCount }));
            }
          })
        )
      );

      setBulkRunning(false);
      loadPhotos();

      setBulkFiles(prev => {
        const errors = prev.filter(f => f.status === 'error').length;
        dispatch({
          type: 'SET_MSG',
          msg: errors > 0 ? `Done. ${errors} file(s) failed.` : 'All photos uploaded!',
        });
        return prev;
      });
    },
    [selectedCategory, bulkFiles, loadPhotos]
  );

  const clearDone = useCallback(() => {
    setBulkFiles(prev => {
      prev.filter(f => f.status === 'done').forEach(f => URL.revokeObjectURL(f.preview));
      return prev.filter(f => f.status !== 'done');
    });
  }, []);

  const clearAll = useCallback(() => {
    setBulkFiles(prev => {
      prev.forEach(f => URL.revokeObjectURL(f.preview));
      return [];
    });
  }, []);

  // ─────────────────────────────────────────────
  // Delete – optimistic
  // ─────────────────────────────────────────────
  const handleDelete = useCallback(
    async (photo: Photo) => {
      if (!confirm('Delete this photo?')) return;

      // Remove immediately from UI
      dispatch({ type: 'OPTIMISTIC_DELETE', id: photo._id });

      try {
        const res = await fetch(`/api/photos/${photo._id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token.current}` },
        });
        const data = await res.json();
        if (data?.success) {
          dispatch({ type: 'SET_MSG', msg: 'Photo deleted' });
        } else {
          // Restore on failure
          dispatch({ type: 'RESTORE_PHOTO', photo });
          dispatch({ type: 'SET_MSG', msg: data?.error ?? 'Failed to delete photo' });
        }
      } catch {
        dispatch({ type: 'RESTORE_PHOTO', photo });
        dispatch({ type: 'SET_MSG', msg: 'Failed to delete photo' });
      }
    },
    []
  );

  // ─────────────────────────────────────────────
  // Category CRUD
  // ─────────────────────────────────────────────
  const handleAddCategory = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newCatName.trim()) return;
      try {
        const res = await fetch('/api/category', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.current}` },
          body: JSON.stringify({ name: newCatName.trim() }),
        });
        const data = await res.json();
        if (data?.success) {
          dispatch({ type: 'SET_CAT_MSG', msg: 'Category added!' });
          setNewCatName('');
          loadCategories();
        } else {
          dispatch({ type: 'SET_CAT_MSG', msg: data?.error ?? 'Failed to add category' });
        }
      } catch {
        dispatch({ type: 'SET_CAT_MSG', msg: 'Failed to add category' });
      }
    },
    [newCatName, loadCategories]
  );

  const handleEditCategory = useCallback(
    async (e: React.FormEvent) => {
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
          dispatch({ type: 'SET_CAT_MSG', msg: 'Category updated!' });
          setEditingCat(null);
          setEditCatName('');
          if (selectedCategory === oldName) setSelectedCategory(newName);
          startTransition(() => {
            if (filterCat === oldName) setFilterCat(newName);
          });
          loadCategories();
          loadPhotos();
        } else {
          dispatch({ type: 'SET_CAT_MSG', msg: data?.error ?? 'Failed to update category' });
        }
      } catch {
        dispatch({ type: 'SET_CAT_MSG', msg: 'Failed to update category' });
      }
    },
    [editingCat, editCatName, selectedCategory, filterCat, loadCategories, loadPhotos]
  );

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      if (!confirm('Delete this category?')) return;
      const deleted = state.categories.find(c => c._id === id);
      try {
        const res = await fetch(`/api/category/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token.current}` },
        });
        const data = await res.json();
        if (data?.success) {
          dispatch({ type: 'SET_CAT_MSG', msg: 'Category deleted' });
          if (deleted) {
            if (filterCat === deleted.name) setFilterCat('');
            if (selectedCategory === deleted.name) setSelectedCategory('');
          }
          loadCategories();
          loadPhotos();
        } else {
          dispatch({ type: 'SET_CAT_MSG', msg: data?.error ?? 'Failed to delete category' });
        }
      } catch {
        dispatch({ type: 'SET_CAT_MSG', msg: 'Failed to delete category' });
      }
    },
    [state.categories, filterCat, selectedCategory, loadCategories, loadPhotos]
  );

  // ── Reset form on mode switch ──
  const switchMode = useCallback((mode: 'single' | 'bulk') => {
    setUploadMode(mode);
    setSelectedCategory('');
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }, []);

  // ── Pending count (memoised) ──
  const pendingCount = useMemo(
    () => bulkFiles.filter(f => f.status === 'pending').length,
    [bulkFiles]
  );

  const hasDone = useMemo(
    () => bulkFiles.some(f => f.status === 'done'),
    [bulkFiles]
  );

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <div className="photos-page">

      {/* HEADER */}
      <div className="page-header">
        <button onClick={() => router.back()} className="back-btn">← Back</button>
        <h1>Photos</h1>
        <div className="header-actions">
          <button onClick={() => setShowCatPanel(v => !v)}>Categories</button>
          <button onClick={() => setShowForm(v => !v)}>+ Add Photo</button>
        </div>
      </div>

      {state.msg && <div className="alert">{state.msg}</div>}

      {/* CATEGORY PANEL */}
      {showCatPanel && (
        <div className="panel">
          <h2>Manage Categories</h2>
          {state.catMsg && <div className="alert">{state.catMsg}</div>}
          <form onSubmit={handleAddCategory}>
            <input
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
              placeholder="New category"
            />
            <button>Add</button>
          </form>
          {state.categories.map(cat => (
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
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Select category</option>
            {state.categories.map(c => (
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
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (preview) URL.revokeObjectURL(preview);
                  setPreview(URL.createObjectURL(file));
                }}
              />
              {preview && <img src={preview} width={120} alt="preview" loading="lazy" />}
              <button disabled={uploading}>{uploading ? 'Uploading…' : 'Upload'}</button>
            </form>
          )}

          {/* ── BULK MODE ── */}
          {uploadMode === 'bulk' && (
            <form onSubmit={handleBulkUpload}>

              <div
                className="bulk-dropzone"
                onClick={() => bulkFileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  addBulkFiles(Array.from(e.dataTransfer.files));
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
                <small>
                  {bulkFiles.length} image{bulkFiles.length !== 1 ? 's' : ''} selected
                </small>
              </div>

              {bulkFiles.length > 0 && (
                <>
                  <div className="bulk-preview-grid">
                    {bulkFiles.map(entry => (
                      <div
                        key={entry.id}
                        className={`bulk-preview-item bulk-status-${entry.status}`}
                      >
                        <img src={entry.preview} alt={entry.file.name} loading="lazy" />

                        <span className="bulk-badge">
                          {entry.status === 'pending'   && '⏳'}
                          {entry.status === 'uploading' && '⬆️'}
                          {entry.status === 'done'      && '✅'}
                          {entry.status === 'error'     && '❌'}
                        </span>

                        {entry.status === 'error' && (
                          <span className="bulk-error-msg">{entry.error}</span>
                        )}

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

                  {bulkRunning && (
                    <div className="bulk-progress">
                      <div
                        className="bulk-progress-bar"
                        style={{
                          width: `${(bulkProgress.done / bulkProgress.total) * 100}%`,
                          transition: 'width 0.2s ease',
                        }}
                      />
                      <span>{bulkProgress.done} / {bulkProgress.total}</span>
                    </div>
                  )}

                  <div className="bulk-actions">
                    <button type="submit" disabled={bulkRunning}>
                      {bulkRunning
                        ? `Uploading ${bulkProgress.done}/${bulkProgress.total}…`
                        : `Upload ${pendingCount} Photo${pendingCount !== 1 ? 's' : ''}`}
                    </button>
                    {hasDone && (
                      <button type="button" onClick={clearDone}>Clear Done</button>
                    )}
                    <button type="button" onClick={clearAll} disabled={bulkRunning}>
                      Clear All
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      )}

      {/* FILTER – uses client-side filter, no network call */}
      <div className="filters">
        <button
          onClick={() => startTransition(() => setFilterCat(''))}
          className={filterCat === '' ? 'active' : ''}
        >
          All
        </button>
        {state.categories.map(c => (
          <button
            key={c._id}
            onClick={() => startTransition(() => setFilterCat(c.name))}
            className={filterCat === c.name ? 'active' : ''}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* GRID */}
      {state.loading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid">
          {filteredPhotos.map(p => (
            <div key={p._id}>
              {/* Native lazy loading — no JS overhead */}
              <img src={p.imageUrl} alt={p.category} loading="lazy" decoding="async" />
              <p>{p.category}</p>
              <button onClick={() => handleDelete(p)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}