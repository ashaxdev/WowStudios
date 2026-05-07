'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Maternity', 'Newborn', 'Birthday', 'Pre-Wedding', 'Family', 'Corporate'];

const photos = [
  { id: '1', cat: 'Pre-Wedding', title: 'Beach Romance', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80' },
  { id: '2', cat: 'Maternity', title: 'Golden Hour Glow', img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&q=80' },
  { id: '3', cat: 'Newborn', title: 'Tiny Moments', img: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=700&q=80' },
  { id: '4', cat: 'Birthday', title: 'Sweet Sixteen', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80' },
  { id: '5', cat: 'Family', title: 'Family Portrait', img: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=700&q=80' },
  { id: '6', cat: 'Corporate', title: 'Executive Headshots', img: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=700&q=80' },
  { id: '7', cat: 'Pre-Wedding', title: 'Garden Stroll', img: 'https://images.unsplash.com/photo-1606216794079-73db0d987e5d?w=700&q=80' },
  { id: '8', cat: 'Maternity', title: 'Ethereal Light', img: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=700&q=80' },
  { id: '9', cat: 'Birthday', title: 'Half-Saree Ceremony', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80' },
  { id: '10', cat: 'Family', title: 'Golden Family', img: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=700&q=80' },
  { id: '11', cat: 'Newborn', title: 'Bundle of Joy', img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80' },
  { id: '12', cat: 'Corporate', title: 'Product Showcase', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80' },
];

export default function PortfolioClient() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? photos : photos.filter(p => p.cat === active);

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--charcoal)', paddingTop: 140, paddingBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -100, bottom: -100, width: 400, height: 400, border: '1px solid rgba(184,147,90,0.06)', borderRadius: '50%' }} />
        <div className="container">
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Our Portfolio
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: 'white', lineHeight: 1.05 }}>
            Frames that<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>tell stories</em>
          </h1>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          {/* Filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', borderRadius: 2, border: '1.5px solid', transition: 'all 0.25s',
                  background: active === c ? 'var(--gold)' : 'transparent',
                  color: active === c ? 'white' : 'var(--mist)',
                  borderColor: active === c ? 'var(--gold)' : 'var(--border-strong)',
                }}>
                {c}
              </button>
            ))}
          </div>

          {/* Masonry-like grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1rem' }}>
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  style={{ position: 'relative', overflow: 'hidden', borderRadius: 2, aspectRatio: '3/4', cursor: 'pointer', background: 'var(--linen)' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(44,36,22,0.85) 0%,transparent 50%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem', opacity: 0, transition: 'opacity 0.4s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0')}>
                    <span style={{ fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: 4 }}>{p.cat}</span>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: 'white', fontWeight: 400 }}>{p.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
