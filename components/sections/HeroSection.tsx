'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const BG_SLIDES = [
  { src: '/photos/1.jpg', alt: 'Wedding couple' },
  { src: '/photos/2_1.jpg', alt: 'Bride portrait' },
  { src: '/photos/c w.jpg', alt: 'Couple portrait' },
  { src: '/photos/i1.jpg', alt: 'Wedding rings' },
  { src: '/photos/kanna thali.jpg', alt: 'Reception' },
  { src: '/photos/rajesh.jpg', alt: 'First dance' },
];
const BG_INTERVAL = 4000;
const GALLERY_INTERVAL = 3000; // ← change auto-slide speed here

const GALLERY_IMAGES = [
  { src: '/photos/1.jpg', alt: 'Wedding couple' },
  { src: '/photos/2_1.jpg', alt: 'Bride portrait' },
  { src: '/photos/c w.jpg', alt: 'Couple portrait' },
  { src: '/photos/i1.jpg', alt: 'Wedding rings' },
  { src: '/photos/kanna thali.jpg', alt: 'Reception' },
  { src: '/photos/rajesh.jpg', alt: 'First dance' },
];
const GROUPS = [[0, 1, 2], [3, 4, 5]];

export default function HeroSection() {
  // ── Background slideshow ────────────────────────────────────────────────
  const [bgCurrent, setBgCurrent] = useState(0);
  const [progressing, setProgressing] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setBgCurrent(prev => {
      setProgressing(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setProgressing(true)));
      return (prev + 1) % BG_SLIDES.length;
    });
  }, []);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, BG_INTERVAL);
    setProgressing(true);
  }, [advance]);

  useEffect(() => {
    startAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startAuto]);

  // ── Gallery auto-swipe (simple slide, no fade) ──────────────────────────
  const [groupIndex, setGroupIndex] = useState(0);
  const [galleryProgressing, setGalleryProgressing] = useState(true);
  const galleryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceGallery = useCallback(() => {
    setGroupIndex(prev => (prev + 1) % GROUPS.length);
    setGalleryProgressing(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setGalleryProgressing(true)));
  }, []);

  const startGalleryAuto = useCallback(() => {
    if (galleryTimerRef.current) clearInterval(galleryTimerRef.current);
    galleryTimerRef.current = setInterval(advanceGallery, GALLERY_INTERVAL);
    setGalleryProgressing(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setGalleryProgressing(true)));
  }, [advanceGallery]);

  useEffect(() => {
    startGalleryAuto();
    return () => { if (galleryTimerRef.current) clearInterval(galleryTimerRef.current); };
  }, [startGalleryAuto]);

  const prevGroup = () => {
    setGroupIndex(prev => (prev - 1 + GROUPS.length) % GROUPS.length);
    startGalleryAuto();
  };
  const nextGroup = () => {
    setGroupIndex(prev => (prev + 1) % GROUPS.length);
    startGalleryAuto();
  };

  return (
    <section
      style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); setProgressing(false); }}
      onMouseLeave={startAuto}
    >
      {/* ── BG progress bar ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, height: 2, zIndex: 10,
        background: 'linear-gradient(to right, #d4a96a, #a07840)',
        width: progressing ? '100%' : '0%',
        transition: progressing ? `width ${BG_INTERVAL}ms linear` : 'none',
      }} />

      {/* ── Background slides ──────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {BG_SLIDES.map((slide, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === bgCurrent ? 1 : 0,
            transition: 'opacity 1.4s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <Image
              src={slide.src} alt={slide.alt} fill
              style={{
                objectFit: 'cover',
                animation: i === bgCurrent ? `kb${(i % 5) + 1} 8s ease-in-out forwards` : 'none',
              }}
              priority={i === 0}
            />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(245,240,230,0.82)', zIndex: 1 }} />
      </div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 960,
        margin: '0 auto',
        padding: 'clamp(4rem,8vw,6rem) 1.5rem 2.5rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* Quote */}
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.1rem, 3vw, 1.65rem)',
          color: '#4a3b28',
          textAlign: 'center',
          letterSpacing: '0.02em',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          maxWidth: 660,
        }}>
          Capturing Timeless Wedding & Life Stories ,{' '}
          <span style={{ color: '#a07840' }}>Through Cinematic Photography & Films.</span>
        </p>

        {/* ── Gallery frame ──────────────────────────────────────────── */}
        <div
          style={{ width: '100%', position: 'relative' }}
          onMouseEnter={() => {
            if (galleryTimerRef.current) clearInterval(galleryTimerRef.current);
            setGalleryProgressing(false);
          }}
          onMouseLeave={startGalleryAuto}
        >
          {/* Gallery progress bar */}
          <div style={{
            height: 2,
            background: 'linear-gradient(to right, #d4a96a, #a07840)',
            width: galleryProgressing ? '100%' : '0%',
            transition: galleryProgressing ? `width ${GALLERY_INTERVAL}ms linear` : 'none',
            borderRadius: '2px 2px 0 0',
            marginBottom: 2,
          }} />

          <div style={{
            border: '5px solid #fff',
            boxShadow: '0 4px 40px rgba(120,90,50,0.14)',
            borderRadius: 2,
            overflow: 'hidden',
            background: '#fff',
          }}>
            <div style={{
              display: 'flex',
              width: `${GROUPS.length * 100}%`,
              transform: `translateX(-${groupIndex * (100 / GROUPS.length)}%)`,
              transition: 'transform 0.6s ease',
            }}>
              {GROUPS.map((group, gi) => (
                <div key={gi} style={{
                  width: `${100 / GROUPS.length}%`,
                  flexShrink: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: 5,
                  background: '#fff',
                  padding: 5,
                }}>
                  {group.map(i => {
                    const img = GALLERY_IMAGES[i];
                    return (
                      <div key={i} style={{
                        aspectRatio: '3/4',
                        overflow: 'hidden',
                        position: 'relative',
                        background: '#e8e0d4',
                      }}>
                        <Image
                          src={img.src} alt={img.alt} fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 600px) 33vw, 300px"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prev / Dots / Next */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={prevGroup}
            aria-label="Previous"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1.5px solid #a07840', background: 'transparent',
              color: '#a07840', cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#a07840'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#a07840'; }}
          >←</button>

          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            {GROUPS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setGroupIndex(i); startGalleryAuto(); }}
                aria-label={`Go to group ${i + 1}`}
                style={{
                  width: 7, height: 7, borderRadius: '50%', padding: 0,
                  border: '1px solid #a07840', cursor: 'pointer',
                  background: i === groupIndex ? '#a07840' : 'rgba(160,120,64,0.3)',
                  transform: i === groupIndex ? 'scale(1.3)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={nextGroup}
            aria-label="Next"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1.5px solid #a07840', background: 'transparent',
              color: '#a07840', cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#a07840'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#a07840'; }}
          >→</button>
        </div>

        {/* Brand text */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: '1.4rem', paddingLeft: 2 }}>
          <span style={{
            fontFamily: "'Pinyon Script', 'Brush Script MT', cursive",
            fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
            color: '#4a3b28',
            lineHeight: 1,
            letterSpacing: '0.01em',
          }}>
            unscripted
          </span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Pinyon+Script&display=swap');
        @keyframes kb1 { from { transform: scale(1.08) translate(1%,0.5%); }  to { transform: scale(1) translate(0%,0%); } }
        @keyframes kb2 { from { transform: scale(1) translate(0%,0%); }        to { transform: scale(1.07) translate(-1%,0.5%); } }
        @keyframes kb3 { from { transform: scale(1.06) translate(-0.5%,1%); } to { transform: scale(1) translate(0.5%,-0.5%); } }
        @keyframes kb4 { from { transform: scale(1) translate(0.5%,-1%); }     to { transform: scale(1.07) translate(-0.5%,0.5%); } }
        @keyframes kb5 { from { transform: scale(1.05) translate(0%,1%); }    to { transform: scale(1) translate(0%,-0.5%); } }
      `}</style>
    </section>
  );
}