'use client';

import { useEffect, useState } from 'react';

export default function AdminPortfolioPage() {
  const [showForm, setShowForm] = useState(false);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    fetchPortfolios();
    fetchCategories();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch('/api/portfolios');
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          images: [],
          isPublished: true,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create portfolio');
      }

      await fetchPortfolios();

      setFormData({
        title: '',
        description: '',
        category: '',
      });

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert('Failed to create portfolio');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Delete this portfolio?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Delete failed');
      }

      fetchPortfolios();
    } catch (error) {
      console.error(error);
    }
  };

  const inp: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,168,83,0.25)',
    padding: '0.75rem 1rem',
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '0.88rem',
    outline: 'none',
    borderRadius: 4,
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'Playfair Display,serif',
              fontSize: 'clamp(1.4rem,3vw,2rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '0.3rem',
            }}
          >
            📸 Portfolio
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.82rem',
            }}
          >
            Manage portfolio projects
          </p>
        </div>

        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            background:
              'linear-gradient(135deg,#D4A853,#B8935A)',
            color: 'white',
            border: 'none',
            padding: '0.65rem 1.4rem',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '0.74rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add New'}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: '#1a1a1a',
            border:
              '1px solid rgba(212,168,83,0.2)',
            borderRadius: 8,
            padding: '1.75rem',
            marginBottom: '1.5rem',
          }}
        >
          <h3
            style={{
              color: 'white',
              fontSize: '1rem',
              marginBottom: '1.25rem',
              fontFamily: 'Playfair Display,serif',
            }}
          >
            Add New Portfolio
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div>
              <label
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#D4A853',
                  display: 'block',
                  marginBottom: '0.35rem',
                  fontWeight: 600,
                }}
              >
                Title
              </label>

              <input
                style={inp}
                value={formData.title}
                placeholder="Enter title"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#D4A853',
                  display: 'block',
                  marginBottom: '0.35rem',
                  fontWeight: 600,
                }}
              >
                Category
              </label>

              <select
                style={inp}
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#D4A853',
                display: 'block',
                marginBottom: '0.35rem',
                fontWeight: 600,
              }}
            >
              Description
            </label>

            <textarea
              rows={3}
              style={{
                ...inp,
                resize: 'vertical',
              }}
              value={formData.description}
              placeholder="Description..."
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              background:
                'linear-gradient(135deg,#D4A853,#B8935A)',
              color: 'white',
              border: 'none',
              padding: '0.65rem 1.5rem',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
          >
            Save Portfolio
          </button>
        </div>
      )}

      <div
        style={{
          background: '#1a1a1a',
          border:
            '1px solid rgba(255,255,255,0.07)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom:
              '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <input
            style={{
              ...inp,
              padding: '0.6rem 1rem',
              maxWidth: 320,
            }}
            placeholder="Search..."
          />
        </div>

        {portfolios.map((item) => (
          <div
            key={item._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderBottom:
                '1px solid rgba(255,255,255,0.05)',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 4,
                  background:
                    'rgba(212,168,83,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                }}
              >
                📸
              </div>

              <div>
                <p
                  style={{
                    color:
                      'rgba(255,255,255,0.85)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    marginBottom: 2,
                  }}
                >
                  {item.title}
                </p>

                <p
                  style={{
                    color:
                      'rgba(255,255,255,0.3)',
                    fontSize: '0.72rem',
                  }}
                >
                  {item.category?.name ||
                    'No Category'}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <button
                style={{
                  padding: '0.4rem 0.875rem',
                  background: 'transparent',
                  border:
                    '1px solid rgba(212,168,83,0.35)',
                  color: '#D4A853',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  borderRadius: 4,
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(item._id)
                }
                style={{
                  padding: '0.4rem 0.875rem',
                  background: 'transparent',
                  border:
                    '1px solid rgba(244,138,138,0.35)',
                  color: '#f48a8a',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  borderRadius: 4,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div style={{ padding: '1rem 1.25rem' }}>
          <p
            style={{
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            Showing {portfolios.length} items
          </p>
        </div>
      </div>
    </div>
  );
}