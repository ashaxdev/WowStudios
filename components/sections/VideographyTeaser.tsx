'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VideographyTeaser() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.55,
          zIndex: 0,
        }}
        // Replace with your own hosted video URL
        src="videos/flim.mp4"
        poster="https://images.unsplash.com/photo-1512070679279-8988d32161be?w=1400&q=80"
      />

      {/* ── Gradient overlays for cinematic depth ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
        }}
      />
      {/* Bottom vignette */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          zIndex: 2,
        }}
      />
      {/* Top-left corner accent glow matching gold brand colour */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-80px',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(180,145,85,0.18) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Top-left brand + title text ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 'clamp(28px, 6vw, 56px)',
          left: 'clamp(24px, 5vw, 56px)',
          zIndex: 10,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(210,175,110,0.85)',
            marginBottom: '0.5rem',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
          }}
        >
          Explore
        </p>

        {/* Main heading */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          Video&shy;graphy
        </h2>

        {/* Thin gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            marginTop: '1rem',
            height: 1,
            width: 'clamp(80px, 18vw, 180px)',
            background:
              'linear-gradient(90deg, rgba(180,145,85,0.9) 0%, transparent 100%)',
            transformOrigin: 'left center',
          }}
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{
            marginTop: '1rem',
            fontSize: 'clamp(0.72rem, 1.4vw, 0.85rem)',
            color: 'rgba(255,255,255,0.55)',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.06em',
            maxWidth: 280,
            lineHeight: 1.75,
          }}
        >
          Cinematic stories captured <br />
          in the heart of South India.
        </motion.p>
      </motion.div>

      {/* ── Decorative corner frame lines ── */}
      {/* Top-left corner bracket */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(16px, 3vw, 28px)',
          right: 'clamp(16px, 3vw, 28px)',
          width: 48,
          height: 48,
          borderTop: '1px solid rgba(180,145,85,0.4)',
          borderRight: '1px solid rgba(180,145,85,0.4)',
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(80px, 12vw, 120px)',
          left: 'clamp(16px, 3vw, 28px)',
          width: 48,
          height: 48,
          borderBottom: '1px solid rgba(180,145,85,0.4)',
          borderLeft: '1px solid rgba(180,145,85,0.4)',
          zIndex: 10,
        }}
      />

      {/* ── Centre-bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(36px, 7vw, 64px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Play icon row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.25rem',
          }}
        >
          <div
            style={{
              width: 1,
              height: 20,
              background: 'rgba(180,145,85,0.5)',
            }}
          />
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{ opacity: 0.7 }}
          >
            <polygon points="2,1 13,7 2,13" fill="rgba(180,145,85,0.85)" />
          </svg>
          <div
            style={{
              width: 1,
              height: 20,
              background: 'rgba(180,145,85,0.5)',
            }}
          />
        </div>

        {/* CTA Button */}
        <Link href="/films" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(180,145,85,1)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.85rem 2.8rem',
              background: 'transparent',
              border: '1px solid rgba(180,145,85,0.75)',
              color: '#fff',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            View Films
          </motion.button>
        </Link>

        {/* Scroll hint */}
        <p
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: "'Montserrat', sans-serif",
            marginTop: '0.25rem',
          }}
        >
          Scroll to explore
        </p>
      </motion.div>

      {/* ── Framing rule on right edge ── */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(16px, 3vw, 28px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 1,
          height: '35%',
          background:
            'linear-gradient(to bottom, transparent, rgba(180,145,85,0.3) 40%, rgba(180,145,85,0.3) 60%, transparent)',
          zIndex: 10,
        }}
      />
    </section>
  );
}
