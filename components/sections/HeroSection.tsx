'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { videoRef.current?.play().catch(() => {}); }, []);

  return (
    <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Background video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef} autoPlay muted loop playsInline
          // poster="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=70"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="vid.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(20,16,10,0.55) 0%,rgba(44,36,22,0.3) 50%,transparent 100%)' }} />
        {/* Fade to cream at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, var(--cream), transparent)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 110, paddingBottom: '5rem' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold-light)', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: 28, height: 1, background: 'var(--gold-light)', display: 'block' }} />
          Tirunelveli&apos;s Most Loved Studio · Est. 2015
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: 4 }}>
          <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.45, duration: 1, ease: [0.16,1,0.3,1] }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3.2rem,9vw,8rem)', fontWeight: 300, color: 'white', lineHeight: 0.95 }}>
            Where Every
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '1.75rem' }}>
          <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.58, duration: 1, ease: [0.16,1,0.3,1] }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3.2rem,9vw,8rem)', fontWeight: 300, lineHeight: 0.95 }}>
            <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Moment Shines</em>
          </motion.h1>
        </div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
          style={{ color: 'rgba(250,247,242,0.72)', fontSize: 'clamp(0.88rem,2vw,1.05rem)', maxWidth: 440, lineHeight: 1.9, marginBottom: '2.5rem' }}>
          Tirunelveli&apos;s premier photography studio with a 4.9★ rating. From maternity to milestones — we capture your precious memories with artistry and passion.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <Link href="/portfolio" className="btn-gold">✦ View Our Portfolio</Link>
          <Link href="/contact" style={{ color: 'rgba(250,247,242,0.65)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,0.65)')}>
            Start Your Booking →
          </Link>
        </motion.div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3 }}
        className="animate-float"
        style={{
          position: 'absolute', right: '6%', bottom: '20%', zIndex: 2,
          width: 96, height: 96, border: '1px solid rgba(184,147,90,0.45)', borderRadius: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(250,247,242,0.08)', backdropFilter: 'blur(10px)',
        }}
      >
        <span style={{ fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(220,200,160,0.95)', textAlign: 'center', lineHeight: 2 }}>
          4.9★<br />88+<br />Reviews
        </span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: '2.25rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 2 }}>
        <p style={{ fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(160,148,134,0.8)' }}>Scroll</p>
        <motion.div animate={{ scaleY: [1, 0.6, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
          style={{ width: 1, height: 38, background: 'linear-gradient(to bottom, var(--gold-light), transparent)' }} />
      </motion.div>

      <style>{`@media(max-width:768px){ [style*="right: 6%"] { display: none; } }`}</style>
    </section>
  );
}
