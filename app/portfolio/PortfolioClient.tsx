'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  _id: string;
  category: string;
  title?: string;
  imageUrl: string;
}

export default function PortfolioClient() {
  const [active, setActive] = useState('All');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH CATEGORIES ----------------
  const loadCategories = async () => {
    try {
      const res = await fetch('/api/category');
      const data = await res.json();

      if (data.success) {
        const cats = data.data.map((c: any) => c.name);
        setCategories(['All', ...cats]);
      }
    } catch (err) {
      console.error('Category load failed', err);
    }
  };

  // ---------------- FETCH PHOTOS ----------------
  const loadPhotos = async () => {
    setLoading(true);

    try {
      const url =
        active === 'All'
          ? '/api/photos'
          : `/api/photos?category=${encodeURIComponent(active)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setPhotos(data.data || []);
      } else {
        setPhotos([]);
      }
    } catch (err) {
      console.error('Photo load failed', err);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [active]);

  const filtered = photos;

  return (
    <>
      {/* HERO */}
      <section
        style={{
          background: 'var(--charcoal)',
          paddingTop: 140,
          paddingBottom: '4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: -100,
            bottom: -100,
            width: 400,
            height: 400,
            border: '1px solid rgba(184,147,90,0.06)',
            borderRadius: '50%',
          }}
        />

        <div className="container">
          <p
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ width: 28, height: 1, background: 'var(--gold)' }} />
            Our Portfolio
          </p>

          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.8rem,7vw,6rem)',
              fontWeight: 300,
              color: 'white',
              lineHeight: 1.05,
            }}
          >
            Frames that <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
              tell stories
            </em>
          </h1>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          {/* FILTER BUTTONS */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '3rem',
            }}
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: '1.5px solid',
                  transition: 'all 0.25s',
                  background: active === c ? 'var(--gold)' : 'transparent',
                  color: active === c ? 'white' : 'var(--mist)',
                  borderColor:
                    active === c ? 'var(--gold)' : 'var(--border-strong)',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* GRID */}
          {loading ? (
            <p style={{ color: 'var(--mist)' }}>Loading...</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
                gap: '1rem',
              }}
            >
              <AnimatePresence>
                {filtered.map((p, i) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 2,
                      aspectRatio: '3/4',
                      cursor: 'pointer',
                      background: 'var(--linen)',
                    }}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title || p.category}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.transform =
                          'scale(1.06)')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.transform =
                          'scale(1)')
                      }
                    />

                    {/* OVERLAY */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top,rgba(44,36,22,0.85) 0%,transparent 50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '1.25rem',
                        opacity: 0,
                        transition: 'opacity 0.4s',
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.opacity = '1')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.opacity = '0')
                      }
                    >
                      <span
                        style={{
                          fontSize: '0.56rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'var(--gold-light)',
                          marginBottom: 4,
                        }}
                      >
                        {p.category}
                      </span>

                      {/* <h3
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.25rem',
                          color: 'white',
                          fontWeight: 400,
                        }}
                      >
                        {p.title || p.category}
                      </h3> */}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  );
}