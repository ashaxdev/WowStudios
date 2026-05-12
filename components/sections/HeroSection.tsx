'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const SLIDES = [
  { src: '/photos/2.jpg',   alt: 'Wedding photography' },
  { src: '/photos/3.jpg',    alt: 'Couple portrait' },
  // { src: '/photos/maternity.jpg', alt: 'Maternity shoot' },
  // { src: '/photos/family.jpg',    alt: 'Family portraits' },
  // { src: '/photos/studio.jpg',    alt: 'Studio portrait' },
];

const INTERVAL = 3000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progressing, setProgressing] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setCurrent(next);
    setProgressing(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setProgressing(true)));
  }, []);

  const advance = useCallback(() => {
    setCurrent(prev => {
      const next = (prev + 1) % SLIDES.length;
      setProgressing(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setProgressing(true)));
      return next;
    });
  }, []);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, INTERVAL);
    setProgressing(true);
  }, [advance]);

  useEffect(() => { startAuto(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startAuto]);

  // Touch / swipe
  const touchX = useRef(0);

  return (
    <section
      style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); setProgressing(false); }}
      onMouseLeave={startAuto}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) goTo((current + (dx < 0 ? 1 : SLIDES.length - 1)) % SLIDES.length);
      }}
    >
      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, height: 2, zIndex: 10,
        background: 'linear-gradient(to right, var(--gold-light), var(--gold))',
        width: progressing ? '100%' : '0%',
        transition: progressing ? `width ${INTERVAL}ms linear` : 'none',
      }} />

      {/* Slides */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {SLIDES.map((slide, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.4s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <Image
              src={slide.src} alt={slide.alt} fill
              style={{
                objectFit: 'cover',
                // Ken Burns — alternating directions per slide index
                animation: i === current
                  ? `kb${(i % 5) + 1} 8s ease-in-out forwards`
                  : 'none',
              }}
              priority={i === 0}
            />
          </div>
        ))}

        {/* Overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(20,16,10,0.55) 0%,rgba(44,36,22,0.3) 50%,transparent 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, var(--cream), transparent)', zIndex: 1 }} />
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '5.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: 6, height: 6, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.5)', cursor: 'pointer',
            background: i === current ? 'var(--gold-light)' : 'rgba(201,169,110,0.35)',
            transform: i === current ? 'scale(1.3)' : 'scale(1)',
            transition: 'all 0.4s ease', padding: 0,
          }} />
        ))}
      </div>

      {/* ── Your existing content below (unchanged) ── */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 110, paddingBottom: '5rem' }}>
        {/* ... all your existing motion elements ... */}
      </div>

      {/* Ken Burns keyframes */}
      <style>{`
        @keyframes kb1 { from { transform: scale(1.08) translate(1%,0.5%); }  to { transform: scale(1) translate(0%,0%); } }
        @keyframes kb2 { from { transform: scale(1) translate(0%,0%); }        to { transform: scale(1.07) translate(-1%,0.5%); } }
        @keyframes kb3 { from { transform: scale(1.06) translate(-0.5%,1%); } to { transform: scale(1) translate(0.5%,-0.5%); } }
        @keyframes kb4 { from { transform: scale(1) translate(0.5%,-1%); }     to { transform: scale(1.07) translate(-0.5%,0.5%); } }
        @keyframes kb5 { from { transform: scale(1.05) translate(0%,1%); }    to { transform: scale(1) translate(0%,-0.5%); } }
        @media(max-width:768px){ [style*="right: 6%"] { display: none; } }
      `}</style>
    </section>
  );
}