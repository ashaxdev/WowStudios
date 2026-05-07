'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { id: '1', name: 'Priya Rajan', role: 'Maternity Client', content: 'The team at Wow Shotz made us feel so comfortable and the maternity photos are absolutely breathtaking. Every detail was perfect. These memories will last forever.' },
  { id: '2', name: 'Karthikeyan M.', role: 'Newborn Session', content: 'We were nervous about a newborn shoot but they were incredibly gentle and patient. The photos captured our daughter\'s first days so beautifully. Worth every rupee!' },
  { id: '3', name: 'Deepa & Senthil', role: 'Pre-Wedding Couple', content: 'Our pre-wedding photos look like they belong in a magazine! The team had such creative ideas and the editing is stunning. Everyone asked who the photographer was.' },
  { id: '4', name: 'Lakshmi V.', role: 'Family Photography Client', content: 'We\'ve been coming to Wow Shotz for 3 years for family photos. They remember every preference and the results keep getting better. Best studio in Tirunelveli!' },
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];

  return (
    <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Client Voices</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: 'var(--charcoal)' }}>What our clients say</h2>
        </div>

        <div style={{ minHeight: 220, position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={t.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>★</span>)}
              </div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', color: 'var(--gold)', lineHeight: 0.4, marginBottom: '1.25rem', opacity: 0.3 }}>&quot;</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.05rem,2.5vw,1.45rem)', fontStyle: 'italic', color: 'var(--slate)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto 2rem' }}>{t.content}</p>
              <p style={{ fontWeight: 500, fontSize: '0.87rem', color: 'var(--charcoal)', letterSpacing: '0.04em' }}>{t.name}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--gold)', marginTop: 4, letterSpacing: '0.08em' }}>{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: '2.5rem' }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Testimonial ${i + 1}`}
              style={{ width: i === idx ? 22 : 6, height: 6, borderRadius: 3, background: i === idx ? 'var(--gold)' : 'rgba(184,147,90,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
