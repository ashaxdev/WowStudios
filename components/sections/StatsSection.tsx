'use client';
import { motion } from 'framer-motion';

const stats = [
  { n: '9+', label: 'Years of Excellence' },
  { n: '2K+', label: 'Sessions Captured' },
  { n: '88+', label: 'Five-Star Reviews' },
  { n: '4.9★', label: 'Google Rating' },
];

export default function StatsSection() {
  return (
    <section style={{ background: 'var(--white)', padding: '5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '2rem' }}>
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{ textAlign: 'center', padding: '1.25rem 0' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1 }}>{s.n}</p>
              <div style={{ width: 24, height: 1, background: 'var(--gold)', margin: '0.85rem auto' }} />
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mist)', fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
