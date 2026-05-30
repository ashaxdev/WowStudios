'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const videos = [
  {
    src: 'videos/flim.mp4',
    // poster: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80',
    label: 'Wedding Films',
    title: 'Eternal Moments',
    sub: 'Tamil Nadu · 2024',
  },
  {
    src: 'videos/flim2.mp4',
    // poster: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80',
     label: 'Engagement Films',
    title: 'Cherishing Moments',
    sub: 'Tamil Nadu · 2024',
  },
];

const gold    = 'rgba(180,145,85,1)';
const goldDim  = 'rgba(180,145,85,0.55)';
const goldFaint = 'rgba(180,145,85,0.18)';

export default function VideographyTeaser() {
  const [width, setWidth]         = useState(0);
  const [hoveredCard, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isMobile = width > 0 && width <= 640;
  const isTablet = width > 640 && width <= 900;

  const gridCols   = isMobile ? '1fr' : '1fr 1fr';
  const gridGap    = isMobile ? '3px' : '2px';
  const gridMargin = isMobile ? '14px' : isTablet ? '16px 24px' : 'clamp(20px,3vw,36px) clamp(20px,5vw,52px)';
  const cardMinH   = isMobile ? '56vw' : isTablet ? 'clamp(220px,36vw,380px)' : 'clamp(260px,42vw,520px)';
  const padH       = isMobile ? '20px' : isTablet ? '24px' : 'clamp(20px,5vw,52px)';
  const padT       = isMobile ? '24px' : 'clamp(24px,5vw,52px)';

  return (
    <section style={s.section}>

      {/* ── Top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          ...s.topBar,
          padding: `${padT} ${padH} 0`,
          flexDirection: isMobile ? 'column' as const : 'row' as const,
          alignItems: isMobile ? 'flex-start' as const : 'flex-end' as const,
          gap: isMobile ? '12px' : '0',
        }}
      >
        <div style={s.brandBlock}>
          <p style={s.eyebrow}>Explore</p>
          <h2 style={s.heading}>Video&shy;graphy</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            style={s.goldRule}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            style={s.subtext}
          >
            Cinematic stories captured <br />
            in the heart of South India.
          </motion.p>
        </div>
        {!isMobile && <div style={s.cornerBracket} />}
      </motion.div>

      {/* ── Two-column video grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          ...s.columnsWrap,
          gridTemplateColumns: gridCols,
          gap: gridGap,
          margin: gridMargin,
        }}
      >
        {videos.map((v, i) => {
          const hovered = hoveredCard === i;
          return (
            <div
              key={i}
              style={{ ...s.videoCard, minHeight: cardMinH }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <video
                autoPlay muted loop playsInline
                // poster={v.poster}
                src={v.src}
                style={{
                  ...s.videoEl,
                  opacity: hovered ? 0.8 : 0.6,
                  transform: hovered ? 'scale(1.03)' : 'scale(1)',
                }}
              />

              {/* <div style={{
                ...s.playBtn,
                opacity: hovered ? 1 : 0,
                transform: hovered
                  ? 'translate(-50%, -50%) scale(1.08)'
                  : 'translate(-50%, -50%) scale(1)',
              }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <polygon points="2,1 13,7 2,13" fill="rgba(180,145,85,0.9)" />
                </svg>
              </div> */}

              <div style={s.cardGradient} />

              <div style={s.cardContent}>
                <span style={s.cardLabel}>{v.label}</span>
                <h3 style={{
                  ...s.cardTitle,
                  fontSize: isMobile ? 'clamp(1.1rem,5vw,1.6rem)' : 'clamp(1.15rem,2.6vw,2.1rem)',
                }}>{v.title}</h3>
                <p style={s.cardSub}>{v.sub}</p>
              </div>
            </div>
          );
        })}
        {!isMobile && <div style={s.colDivider} />}
      </motion.div>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={s.bottomBar}
      >
        <div style={s.playRow}>
          <div style={s.tick} />
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.65 }}>
            <polygon points="2,1 13,7 2,13" fill="rgba(180,145,85,0.85)" />
          </svg>
          <div style={s.tick} />
        </div>
        <Link href="/films" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: gold }}
            whileTap={{ scale: 0.97 }}
            style={s.ctaBtn}
          >
            View Films
          </motion.button>
        </Link>
        <p style={s.scrollHint}>Scroll to explore</p>
      </motion.div>

      {!isMobile && (
        <>
          <div style={s.edgeRule} />
          <div style={s.blBracket} />
        </>
      )}
    </section>
  );
}

/* ── All styles typed as CSSProperties to satisfy Framer + TS ── */
const s: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    backgroundImage: `
  linear-gradient(
    rgba(245, 240, 230, 0.75),
    rgba(245, 240, 230, 0.75)
  ),
  url('/photos/rajesh.jpg')
`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    position: 'relative',
    zIndex: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  brandBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  eyebrow: {
    fontSize: '0.58rem',
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: goldDim,
    marginBottom: '0.4rem',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2rem, 5vw, 4.5rem)',
    fontWeight: 300,
    color: '#ffffff',
    lineHeight: 1.05,
    letterSpacing: '-0.01em',
    margin: 0,
  },
  goldRule: {
    marginTop: '0.9rem',
    height: 1,
    width: 'clamp(70px, 16vw, 160px)',
    background: `linear-gradient(90deg, ${gold} 0%, transparent 100%)`,
    transformOrigin: 'left center',
  },
  subtext: {
    marginTop: '0.85rem',
    fontSize: 'clamp(0.68rem, 1.2vw, 0.82rem)',
    color: 'rgba(255,255,255,0.55)',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
    letterSpacing: '0.06em',
    lineHeight: 1.75,
  },
  cornerBracket: {
    width: 44,
    height: 44,
    borderTop: `1px solid ${goldDim}`,
    borderRight: `1px solid ${goldDim}`,
    flexShrink: 0,
  },
  columnsWrap: {
    position: 'relative',
    zIndex: 10,
    display: 'grid',
    flex: 1,
    minHeight: 0,
  },
  videoCard: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    background: '#111',
  },
  videoEl: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease, transform 0.7s ease',
  },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 4,
    width: 'clamp(42px, 5.5vw, 60px)',
    height: 'clamp(42px, 5.5vw, 60px)',
    borderRadius: '50%',
    border: `1px solid ${goldDim}`,
    background: 'rgba(0,0,0,0.35)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '55%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)',
    zIndex: 2,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    zIndex: 3,
    padding: 'clamp(14px,3vw,28px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  cardLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.52rem',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: goldDim,
    fontWeight: 500,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    color: '#ffffff',
    lineHeight: 1.1,
    margin: 0,
  },
  cardSub: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 'clamp(0.56rem, 0.85vw, 0.68rem)',
    color: 'rgba(255,255,255,0.55)',
    fontWeight: 300,
    letterSpacing: '0.05em',
  },
  colDivider: {
    position: 'absolute',
    top: '10%',
    bottom: '10%',
    left: '50%',
    width: 1,
    background: `linear-gradient(to bottom, transparent, ${goldFaint} 30%, ${goldFaint} 70%, transparent)`,
    zIndex: 20,
    pointerEvents: 'none',
  },
  bottomBar: {
    position: 'relative',
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.85rem',
    padding: 'clamp(18px,3vw,32px) clamp(20px,5vw,52px) clamp(28px,5vw,48px)',
  },
  playRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  tick: {
    width: 1,
    height: 18,
    background: goldDim,
  },
  ctaBtn: {
    padding: '0.8rem 2.6rem',
    background: 'transparent',
    border: `1px solid ${goldDim}`,
    color: '#ffffff',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '0.62rem',
    fontWeight: 500,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  scrollHint: {
    fontSize: '0.52rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.3)',
    fontFamily: "'Montserrat', sans-serif",
  },
  edgeRule: {
    position: 'fixed',
    right: 'clamp(14px, 2.5vw, 26px)',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 1,
    height: '35%',
    background: `linear-gradient(to bottom, transparent, ${goldDim} 40%, ${goldDim} 60%, transparent)`,
    zIndex: 20,
    pointerEvents: 'none',
  },
  blBracket: {
    position: 'absolute',
    bottom: 'clamp(70px, 10vw, 100px)',
    left: 'clamp(14px, 2.5vw, 26px)',
    width: 44,
    height: 44,
    borderBottom: `1px solid ${goldDim}`,
    borderLeft: `1px solid ${goldDim}`,
    zIndex: 20,
    pointerEvents: 'none',
  },
};
