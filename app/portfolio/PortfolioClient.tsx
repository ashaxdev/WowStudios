'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  _id: string;
  category: string;
  title?: string;
  imageUrl: string;
}

interface Video {
  _id: string;
  title?: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

// Fixed tab order: All → Wedding → Pre Post Wedded → Baby Shoots → Newborn → Birthday Shoot → Birthday → Films
const CATEGORY_ORDER = [
  'All',
  'Wedding',
  'Pre Post Wedded',
  'Baby Shoots',
  'Newborn',
  'Birthday Shoot',
  'Birthday',
  'Films',
];

export default function PortfolioClient() {
  const [active, setActive] = useState('All');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ---------------- FETCH CATEGORIES ----------------
  const loadCategories = async () => {
    try {
      const res = await fetch('/api/category');
      const data = await res.json();

      if (data.success) {
        const cats: string[] = data.data.map((c: any) => c.name);

        // Sort fetched categories by preferred order, append any extras before Films
        const sorted = [
          ...CATEGORY_ORDER.filter(
            (o) => o !== 'All' && o !== 'Films' && cats.includes(o)
          ),
          // Any categories from API not in our order list go after Birthday
          ...cats.filter((c) => !CATEGORY_ORDER.includes(c)),
        ];

        setCategories(['All', ...sorted, 'Films']);
      }
    } catch (err) {
      console.error('Category load failed', err);
      // Fallback: use the hardcoded order as-is
      setCategories(CATEGORY_ORDER);
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
      setPhotos(data.success ? data.data || [] : []);
    } catch (err) {
      console.error('Photo load failed', err);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FETCH VIDEOS ----------------
  const loadVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();
      setVideos(data.success ? data.data || [] : []);
    } catch (err) {
      console.error('Video load failed', err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (active === 'Films') {
      loadVideos();
    } else {
      loadPhotos();
    }
  }, [active]);

  const isFilms = active === 'Films';

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
            {categories.map((c) => {
              const isFilmsTab = c === 'Films';
              const isActive = active === c;
              return (
                <button
                  key={c}
                  onClick={() => isFilmsTab ? router.push('/films') : setActive(c)}
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
                    background: isActive && !isFilmsTab
                      ? 'var(--gold)'
                      : isFilmsTab
                      ? 'rgba(245,235,220,0.08)'
                      : 'transparent',
                    color: isActive && !isFilmsTab
                      ? 'white'
                      : isFilmsTab
                      ? '#878785'
                      : 'var(--mist)',
                    borderColor: isFilmsTab
                      ? '#c8a97a'
                      : isActive
                      ? 'var(--gold)'
                      : 'var(--border-strong)',
                    marginLeft: isFilmsTab ? '0.75rem' : 0,
                  }}
                >
                  {isFilmsTab ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                        <polygon points="0,0 8,4.5 0,9" fill="#878785" />
                      </svg>
                      Films
                    </span>
                  ) : c}
                </button>
              );
            })}
          </div>

          {/* GRID */}
          {loading ? (
            <p style={{ color: 'var(--mist)' }}>Loading...</p>
          ) : isFilms ? (
            /* ---- FILMS GRID ---- */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))',
                gap: '1rem',
              }}
            >
              <AnimatePresence>
                {videos.map((v, i) => (
                  <motion.div
                    key={v._id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 2,
                      aspectRatio: '16/9',
                      cursor: 'pointer',
                      background: 'var(--charcoal)',
                    }}
                  >
                    <video
                      src={v.videoUrl}
                      poster={v.thumbnailUrl}
                      controls
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {v.title && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '0.75rem 1rem',
                          background:
                            'linear-gradient(to top,rgba(44,36,22,0.85) 0%,transparent 100%)',
                          pointerEvents: 'none',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: '1rem',
                            color: 'white',
                            fontWeight: 400,
                          }}
                        >
                          {v.title}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {videos.length === 0 && (
                <p style={{ color: 'var(--mist)', gridColumn: '1/-1' }}>
                  No films available yet.
                </p>
              )}
            </div>
          ) : (
            /* ---- PHOTOS GRID ---- */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
                gap: '1rem',
              }}
            >
              <AnimatePresence>
                {photos.map((p, i) => (
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
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {photos.length === 0 && (
                <p style={{ color: 'var(--mist)', gridColumn: '1/-1' }}>
                  No photos in this category yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}