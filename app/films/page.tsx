'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PublicLayout from '@/components/layout/PublicLayout';

const FILMS = [
  {
    id: 1,
    videoId: 'AJo3bMc1Cyo',
    title: 'Cinematic Nikkah',
    category: 'Wedding',
    location: 'Tirunelveli',
    year: '2024',
  },
  {
    id: 2,
    videoId: 'WXsDeLBCdwc',
    title: 'Kathija Wedding Highlights',
    category: 'Wedding',
    location: 'Madurai',
    year: '2024',
  },
  {
    id: 3,
    videoId: '4XonNF1HIGM',
    title: 'Sowmiya & Bala Engagement Highlights',
    category: 'Wedding',
    location: 'Nagercoil',
    year: '2023',
  },
  {
    id: 4,
    videoId: 'lW2G-ao6Zk0',
    title: 'Baby shower ceremony',
    category: 'Maternity',
    location: 'Tirunelveli',
    year: '2023',
  },
  // {
  //   id: 5,
  //   videoId: 'PoRdBef-leA',
  //   title: 'Silver Jubilee Celebration',
  //   category: 'Event',
  //   location: 'Chennai',
  //   year: '2024',
  // },
  // {
  //   id: 6,
  //   videoId: 'l0Foh2MxZxc',
  //   title: 'Childhood in Frames',
  //   category: 'Kids',
  //   location: 'Tirunelveli',
  //   year: '2023',
  // },
];

const CATEGORIES = ['All', ...Array.from(new Set(FILMS.map((f) => f.category)))];

// ── Types ────────────────────────────────────────────────
type Film = {
  id: number;
  videoId: string;
  title: string;
  category: string;
  location: string;
  year: string;
};

type ModalProps = {
  film: Film | null;
  onClose: () => void;
};

type FilmCardProps = {
  film: Film;
  index: number;
  onClick: (film: Film) => void;
};

// ── Light-box modal ─────────────────────────────────────
// AnimatePresence wraps the conditional content so exit animations work correctly
function Modal({ film, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {film && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.93)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            key="box"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 860,
              background: '#111',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
              border: '1px solid rgba(180,145,85,0.25)',
            }}
          >
            {/* Video embed */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${film.videoId}?autoplay=1&rel=0`}
                title={film.title}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
            {/* Caption bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 1.25rem',
                background: '#0e0e0e',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.1rem',
                    color: '#fff',
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {film.title}
                </p>
                <p
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(180,145,85,0.75)',
                    margin: '3px 0 0',
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {film.category} · {film.location} · {film.year}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Single film card ─────────────────────────────────────
function FilmCard({ film, index, onClick }: FilmCardProps) {
  const thumb = `https://img.youtube.com/vi/${film.videoId}/maxresdefault.jpg`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1 }}
      onClick={() => onClick(film)}
      style={{
        cursor: 'pointer',
        background: '#111',
        border: '1px solid rgba(180,145,85,0.12)',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.55)' }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden' }}>
        <img
          src={thumb}
          alt={film.title}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${film.videoId}/hqdefault.jpg`;
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* Play button */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              background: 'rgba(0,0,0,0.3)',
              transition: 'transform 0.25s ease',
            }}
          >
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <polygon points="2,1 15,9 2,17" fill="rgba(255,255,255,0.95)" />
            </svg>
          </div>
        </div>
        {/* Category badge */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '3px 10px',
            background: 'rgba(180,145,85,0.9)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#fff',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            borderRadius: 1,
          }}
        >
          {film.category}
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: '0.9rem 1rem' }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem',
            color: '#fff',
            margin: 0,
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          {film.title}
        </p>
        <p
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.38)',
            margin: '5px 0 0',
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {film.location} · {film.year}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main page ────────────────────────────────────────────
export default function FilmsPage() {
  const [active, setActive] = useState('All');
  const [modal, setModal] = useState<Film | null>(null);

  const filtered =
    active === 'All' ? FILMS : FILMS.filter((f) => f.category === active);

  return (
    <>
      <PublicLayout>
        {/* Import fonts */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body { background: #0a0a0a; }

          /* Responsive grid */
          .films-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
          @media (max-width: 900px) {
            .films-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 560px) {
            .films-grid { grid-template-columns: 1fr; }
          }

          /* Filter pills scroll on mobile */
          .filter-row {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
          }
          @media (max-width: 480px) {
            .filter-row {
              flex-wrap: nowrap;
              overflow-x: auto;
              padding-bottom: 4px;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
            }
            .filter-row::-webkit-scrollbar { display: none; }
          }
        `}</style>

        <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Montserrat', sans-serif" }}>

          {/* ── Hero header ── */}
          <div
            style={{
              position: 'relative',
              padding: 'clamp(64px,12vw,120px) clamp(20px,6vw,80px) clamp(40px,7vw,72px)',
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Gold glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: 280,
                background: 'radial-gradient(ellipse, rgba(180,145,85,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: 'rgba(180,145,85,0.8)',
                marginBottom: '1rem',
              }}
            >
              Explore
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                fontWeight: 300,
                color: '#fff',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              Our Films
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                margin: '1.25rem auto',
                height: 1,
                width: 80,
                background: 'linear-gradient(90deg, transparent, rgba(180,145,85,0.8), transparent)',
                transformOrigin: 'center',
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.88rem)',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.06em',
                maxWidth: 440,
                margin: '0 auto 0.5rem',
                lineHeight: 1.8,
              }}
            >
              Cinematic stories, captured with heart.
            </motion.p>
          </div>

          {/* ── Filter pills ── */}
          <div style={{ padding: '0 clamp(20px,6vw,80px) 2rem' }}>
            <div className="filter-row">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: '0.45rem 1.2rem',
                    background: active === cat ? 'rgba(180,145,85,1)' : 'transparent',
                    border: `1px solid ${active === cat ? 'rgba(180,145,85,1)' : 'rgba(255,255,255,0.18)'}`,
                    color: active === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderRadius: 2,
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Film grid ── */}
          <div style={{ padding: '0 clamp(20px,6vw,80px) clamp(48px,10vw,96px)' }}>
            <motion.div layout className="films-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((film, i) => (
                  <motion.div
                    key={film.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35 }}
                  >
                    <FilmCard film={film} index={i} onClick={setModal} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

        {/* ── Lightbox modal — always mounted so exit animation plays ── */}
        <Modal film={modal} onClose={() => setModal(null)} />

      </PublicLayout>
    </>
  );
}