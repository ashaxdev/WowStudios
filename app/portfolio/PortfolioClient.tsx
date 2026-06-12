'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
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

// Fixed tab order — defined outside component so it's never recreated
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

// Skeleton card — avoids layout shift while images load
function SkeletonCard({ aspect }: { aspect: string }) {
  return (
    <div
      style={{
        aspectRatio: aspect,
        borderRadius: 2,
        background: 'linear-gradient(90deg,#e8e0d4 25%,#f0e8de 50%,#e8e0d4 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite',
      }}
    />
  );
}

// Lazily animated card — only triggers entrance when the card enters the viewport
function LazyCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: '120px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function PortfolioClient() {
  const [active, setActive] = useState('All');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Keep a ref to the in-flight fetch so we can abort it on tab change
  const fetchAbortRef = useRef<AbortController | null>(null);

  // ---------------- FETCH CATEGORIES (once) ----------------
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/category');
        const data = await res.json();
        if (cancelled) return;

        if (data.success) {
          const cats: string[] = data.data.map((c: any) => c.name);
          const sorted = [
            ...CATEGORY_ORDER.filter(
              (o) => o !== 'All' && o !== 'Films' && cats.includes(o)
            ),
            ...cats.filter((c) => !CATEGORY_ORDER.includes(c)),
          ];
          setCategories(['All', ...sorted, 'Films']);
        }
      } catch {
        setCategories(CATEGORY_ORDER);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ---------------- FETCH CONTENT on tab change ----------------
  useEffect(() => {
    // Abort any previous in-flight request
    fetchAbortRef.current?.abort();
    const ctrl = new AbortController();
    fetchAbortRef.current = ctrl;

    // Films tab navigates away — no fetch needed
    if (active === 'Films') {
      router.push('/films');
      return;
    }

    setLoading(true);

    const url =
      active === 'All'
        ? '/api/photos'
        : `/api/photos?category=${encodeURIComponent(active)}`;

    fetch(url, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((data) => {
        setPhotos(data.success ? data.data ?? [] : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // stale, ignore
        console.error('Photo load failed', err);
        setPhotos([]);
        setLoading(false);
      });

    return () => ctrl.abort();
  }, [active]);

  // Preload data for a tab on hover (fires a background fetch into browser cache)
  const prefetchTab = useCallback((cat: string) => {
    if (cat === 'Films' || cat === active) return;
    const url =
      cat === 'All'
        ? '/api/photos'
        : `/api/photos?category=${encodeURIComponent(cat)}`;
    // Fire-and-forget — result goes into HTTP cache
    fetch(url, { priority: 'low' } as RequestInit).catch(() => {});
  }, [active]);

  // Memoised skeleton count so it doesn't thrash during re-renders
  const skeletonCount = useMemo(() => (active === 'All' ? 12 : 6), [active]);

  return (
    <>
      {/* Shimmer keyframe — injected once */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
      `}</style>

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
            pointerEvents: 'none',
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
            <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
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
                  onMouseEnter={() => prefetchTab(c)}
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
                      <svg width="8" height="9" viewBox="0 0 8 9" fill="none" aria-hidden>
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
            /* ---- SKELETON ---- */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
                gap: '1rem',
              }}
            >
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonCard key={i} aspect="3/4" />
              ))}
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
              {photos.map((p) => (
                <LazyCard
                  key={p._id}
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
                    loading="lazy"
                    decoding="async"
                    width={560}
                    height={747}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.55s ease',
                      display: 'block',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')
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
                      transition: 'opacity 0.35s',
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
                      }}
                    >
                      {p.category}
                    </span>
                  </div>
                </LazyCard>
              ))}

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