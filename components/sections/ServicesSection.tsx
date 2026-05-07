'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  { id: '1', title: 'Maternity Photography', description: 'Glowing portraits celebrating the miracle of life — elegant, timeless, and deeply personal.', icon: '◎', price: 'Enquire Now' },
  { id: '2', title: 'Newborn Photography', description: 'Gentle, safe sessions capturing tiny fingers and precious first days with artistic care.', icon: '◈', price: 'Enquire Now' },
  { id: '3', title: 'Birthday Shoots', description: 'From half-saree to milestone birthdays — vibrant, fun sessions your family will treasure.', icon: '◆', price: 'Enquire Now' },
  { id: '4', title: 'Pre-Wedding', description: 'Romantic storytelling sessions before your big day — natural, cinematic, and unforgettable.', icon: '⬡', price: 'Enquire Now' },
  { id: '5', title: 'Family Photography', description: 'Capturing genuine laughter, love and connection — portraits that become heirlooms.', icon: '▷', price: 'Enquire Now' },
  { id: '6', title: 'Product & Corporate', description: 'Professional imagery that elevates your brand — clean, compelling, and conversion-ready.', icon: '▫', price: 'Enquire Now' },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{ marginBottom: '3.5rem', maxWidth: 540 }}>
          <p className="eyebrow">Our Expertise</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1.1 }}>
            Services for<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>every occasion</em>
          </h2>
        </div>

        <div>
          {services.map((s, i) => (
            <motion.div key={s.id}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6 }}
              onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered(null)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.75rem 0', borderBottom: '1px solid var(--border)', gap: '1rem', flexWrap: 'wrap', cursor: 'default', transition: 'padding-left 0.3s', paddingLeft: hovered === s.id ? '0.75rem' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '1.1rem', color: hovered === s.id ? 'var(--gold)' : 'rgba(184,147,90,0.4)', transition: 'color 0.3s', flexShrink: 0, marginTop: 3 }}>{s.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem,3vw,1.75rem)', fontWeight: 400, color: hovered === s.id ? 'var(--charcoal)' : 'var(--slate)', transition: 'color 0.3s', marginBottom: '0.15rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--mist)', lineHeight: 1.75 }}>{s.description}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{s.price}</span>
                <span style={{ color: 'var(--gold)', transform: hovered === s.id ? 'translateX(5px)' : 'translateX(0)', transition: 'transform 0.3s', fontSize: '1rem' }}>→</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/contact" className="btn-gold">Book a Session Today</Link>
        </div>
      </div>
    </section>
  );
}
