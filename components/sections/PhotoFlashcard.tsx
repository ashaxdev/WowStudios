'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/photos/wedding.jpg',   tag: 'Wedding',   title: 'Timeless celebrations' },
  { src: '/photos/couple.jpg',    tag: 'Couple',    title: 'Love in every frame' },
  { src: '/photos/maternity.jpg', tag: 'Maternity', title: 'A new chapter begins' },
  { src: '/photos/family.jpg',    tag: 'Family',    title: 'Moments that last forever' },
  { src: '/photos/studio.jpg',    tag: 'Portrait',  title: 'Your story, beautifully told' },
];

const INTERVAL = 3000;
const CIRC = 88;

function getState(i: number, current: number, n: number) {
  const offset = (i - current + n) % n;
  if (offset === 0) return 'active';
  if (offset === 1) return 'behind1';
  if (offset === 2) return 'behind2';
  if (offset === n - 1) return 'exit';
  return 'hidden';
}

const stateStyles: Record<string, React.CSSProperties> = {
  active:  { opacity: 1,   transform: 'translateY(0) scale(1)',     zIndex: 4 },
  behind1: { opacity: 0.6, transform: 'translateY(14px) scale(0.95)', zIndex: 3 },
  behind2: { opacity: 0.3, transform: 'translateY(26px) scale(0.91)', zIndex: 2 },
  exit:    { opacity: 0,   transform: 'translateX(-90px) rotate(-8deg) scale(0.9)', zIndex: 5 },
  hidden:  { opacity: 0,   transform: 'translateY(36px) scale(0.88)', zIndex: 1 },
};

export default function PhotoFlashcard() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const advance = useCallback(() => {
    setCurrent(c => (c + 1) % SLIDES.length);
  }, []);

  const animateRing = useCallback((elapsed: number) => {
    if (pausedRef.current) return;
    const fraction = Math.min(elapsed / INTERVAL, 1);
    setProgress(fraction);
    if (fraction < 1) {
      rafRef.current = requestAnimationFrame(ts => animateRing(ts - startRef.current));
    }
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);
    requestAnimationFrame(ts => { startRef.current = ts; rafRef.current = requestAnimationFrame(ts2 => animateRing(ts2 - startRef.current)); });
    timerRef.current = setInterval(() => { advance(); resetTimer(); }, INTERVAL);
  }, [advance, animateRing]);

  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [resetTimer]);

  const goTo = (idx: number) => { setCurrent(idx); resetTimer(); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      {/* Stage */}
      <div
        style={{ position: 'relative', width: 340, height: 420, perspective: 900 }}
        onMouseEnter={() => { pausedRef.current = true; if (timerRef.current) clearInterval(timerRef.current); if (rafRef.current) cancelAnimationFrame(rafRef.current); }}
        onMouseLeave={() => { pausedRef.current = false; resetTimer(); }}
      >
        {/* Progress ring */}
        <svg style={{ position: 'absolute', top: -8, right: -8, width: 36, height: 36, zIndex: 10 }} viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#c9a96e" strokeWidth="2"
            strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
        </svg>

        {/* Cards */}
        {SLIDES.map((slide, i) => {
          const state = getState(i, current, SLIDES.length);
          return (
            <div key={i} onClick={() => { if (state === 'active') advance(); }}
              style={{
                position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
                transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)',
                cursor: state === 'active' ? 'pointer' : 'default',
                ...stateStyles[state],
              }}>
              <Image src={slide.src} alt={slide.tag} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.25rem 1rem',
                background: 'linear-gradient(to top, rgba(14,10,5,0.72), transparent)' }}>
                <span style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(220,195,145,0.9)', display: 'block', marginBottom: 4 }}>{slide.tag}</span>
                <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>{slide.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 7 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: 5, height: 5, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
            background: i === current ? 'var(--gold-light)' : 'rgba(184,147,90,0.3)',
            transform: i === current ? 'scale(1.5)' : 'scale(1)',
            transition: 'all 0.35s ease',
          }} />
        ))}
      </div>

      <p style={{ fontSize: 12, color: 'rgba(160,148,134,0.7)', letterSpacing: '0.08em' }}>
        {current + 1} / {SLIDES.length}
      </p>
    </div>
  );
}