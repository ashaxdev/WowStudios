'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: '1',
    title: 'Maternity Photography',
    description: 'Glowing portraits celebrating the miracle of life — elegant, timeless, and deeply personal.',
    price: 'Enquire Now',
    photo: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
  },
  {
    id: '2',
    title: 'Newborn Photography',
    description: 'Gentle, safe sessions capturing tiny fingers and precious first days with artistic care.',
    price: 'Enquire Now',
    photo: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80',
  },
  {
    id: '3',
    title: 'Birthday Shoots',
    description: 'From half-saree to milestone birthdays — vibrant, fun sessions your family will treasure.',
    price: 'Enquire Now',
    photo: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
  },
  {
    id: '4',
    title: 'Pre-Wedding',
    description: 'Romantic storytelling sessions before your big day — natural, cinematic, and unforgettable.',
    price: 'Enquire Now',
    photo: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
  },
  {
    id: '5',
    title: 'Family Photography',
    description: 'Capturing genuine laughter, love and connection — portraits that become heirlooms.',
    price: 'Enquire Now',
    photo: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80',
  },
  {
    id: '6',
    title: 'Product & Corporate',
    description: 'Professional imagery that elevates your brand — clean, compelling, and conversion-ready.',
    price: 'Enquire Now',
    photo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80',
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: '3.5rem', maxWidth: 540 }}>
          <p className="eyebrow">Our Expertise</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1.1 }}>
            Services for<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>every occasion</em>
          </h2>
        </div>

        {/* Photo Card Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                aspectRatio: '3 / 4',
                border: '6px solid #ffffff',
                boxShadow: hovered === s.id
                  ? '0 20px 48px rgba(0,0,0,0.22)'
                  : '0 6px 24px rgba(0,0,0,0.10)',
                cursor: 'pointer',
                transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                transform: hovered === s.id ? 'translateY(-6px)' : 'translateY(0)',
              }}
            >
              {/* Photo */}
              <img
                src={s.photo}
                alt={s.title}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                  transform: hovered === s.id ? 'scale(1.07)' : 'scale(1)',
                }}
              />

              {/* Base gradient — always visible for title legibility */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(30,24,18,0.82) 0%, rgba(30,24,18,0.18) 55%, transparent 100%)',
              }} />

              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(20,16,12,0.55)',
                opacity: hovered === s.id ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }} />

              {/* Bottom content */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.5rem 1.25rem 1.25rem',
              }}>
                {/* Title — always visible */}
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
                  fontWeight: 400,
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: '0.01em',
                  transform: hovered === s.id ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.4s ease',
                }}>
                  {s.title}
                </h3>

                {/* Gold divider */}
                <div style={{
                  width: hovered === s.id ? '36px' : '0px',
                  height: '1px',
                  background: 'var(--gold)',
                  margin: '0.6rem 0',
                  transition: 'width 0.4s ease 0.05s',
                }} />

                {/* Description — slides in on hover */}
                <p style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.7,
                  margin: '0 0 0.85rem',
                  maxHeight: hovered === s.id ? '80px' : '0px',
                  opacity: hovered === s.id ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease, opacity 0.35s ease 0.08s',
                }}>
                  {s.description}
                </p>

                {/* CTA */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  opacity: hovered === s.id ? 1 : 0,
                  transform: hovered === s.id ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s',
                }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {s.price}
                  </span>
                  <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/contact" className="btn-gold">Book a Session Today</Link>
        </div>
      </div>
    </section>
  );
}