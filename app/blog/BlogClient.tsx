'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const posts = [
  { id: '1', title: 'How to Prepare for Your Maternity Shoot', category: 'Maternity', date: 'April 20, 2025', author: 'Preethi S.', readTime: '5 min', img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&q=80', excerpt: 'Everything you need to know about wardrobe, timing, and comfort for a glowing maternity photography session.' },
  { id: '2', title: 'Newborn Photography Safety: What Every Parent Should Know', category: 'Newborn', date: 'March 15, 2025', author: 'Preethi S.', readTime: '4 min', img: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=700&q=80', excerpt: 'Our team\'s rigorous safety protocols and what to expect during a newborn session.' },
  { id: '3', title: '10 Pre-Wedding Shoot Location Ideas in Tamil Nadu', category: 'Pre-Wedding', date: 'Feb 28, 2025', author: 'Arun Kumar', readTime: '7 min', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80', excerpt: 'From beach sunsets to heritage temples — our favourite locations for romantic pre-wedding photography.' },
  { id: '4', title: 'Making Your Birthday Shoot Truly Unforgettable', category: 'Birthday', date: 'Feb 1, 2025', author: 'Ramesh M.', readTime: '5 min', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80', excerpt: 'Theme ideas, colour palettes, and creative concepts to make your birthday session one for the ages.' },
  { id: '5', title: 'Family Photography: Getting Everyone to Cooperate', category: 'Family', date: 'Jan 12, 2025', author: 'Arun Kumar', readTime: '6 min', img: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=700&q=80', excerpt: 'Practical tips for keeping kids engaged and getting genuine smiles during a family portrait session.' },
  { id: '6', title: 'Why Lighting Makes or Breaks a Photo', category: 'Tips', date: 'Dec 20, 2024', author: 'Ramesh M.', readTime: '8 min', img: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=700&q=80', excerpt: 'A beginner-friendly guide to understanding light — the single most important element in photography.' },
];

const cats = ['All', 'Maternity', 'Newborn', 'Pre-Wedding', 'Birthday', 'Family', 'Tips'];

export default function BlogClient() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active);
  const [featured, ...rest] = filtered;

  return (
    <>
      <section style={{ background: 'var(--charcoal)', paddingTop: 140, paddingBottom: '4rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Our Blog
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: 'white', lineHeight: 1.05 }}>
            Stories &<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>inspiration</em>
          </h1>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{ padding: '0.5rem 1.25rem', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', borderRadius: 2, border: '1.5px solid', transition: 'all 0.25s', background: active === c ? 'var(--gold)' : 'transparent', color: active === c ? 'white' : 'var(--mist)', borderColor: active === c ? 'var(--gold)' : 'var(--border-strong)' }}>
                {c}
              </button>
            ))}
          </div>

          {featured && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden', boxShadow: 'var(--shadow-med)' }}>
              <div style={{ overflow: 'hidden', minHeight: 320 }}>
                <img src={featured.img} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.04)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')} />
              </div>
              <div style={{ padding: '2.5rem 2.5rem 2.5rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.75rem', display: 'block' }}>{featured.category} · Featured</span>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 400, color: 'var(--charcoal)', lineHeight: 1.2, marginBottom: '1rem' }}>{featured.title}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--mist)', lineHeight: 1.85, marginBottom: '1.5rem' }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--mist)' }}>✍️ {featured.author}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--mist)' }}>📅 {featured.date}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--mist)' }}>⏱ {featured.readTime} read</span>
                </div>
                <button className="btn-outline" style={{ alignSelf: 'flex-start' }}>Read Article →</button>
              </div>
              <style>{`@media(max-width:640px){[style*="grid-template-columns: 1fr 1fr"][style*="3rem"]{grid-template-columns:1fr!important;}[style*="padding: '2.5rem 2.5rem 2.5rem 0'"]{padding:1.5rem!important;}}`}</style>
            </motion.div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
            {rest.map((p, i) => (
              <motion.article key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden', boxShadow: 'var(--shadow-soft)', cursor: 'pointer', transition: 'transform 0.3s,box-shadow 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-med)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-soft)'; }}>
                <div style={{ overflow: 'hidden', aspectRatio: '16/9' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.05)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>{p.category}</span>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 400, color: 'var(--charcoal)', lineHeight: 1.3, marginBottom: '0.6rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--mist)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{p.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--mist)' }}>{p.date} · {p.readTime}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600 }}>Read →</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
