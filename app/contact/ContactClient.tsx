'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

type FormData = { name: string; phone: string; email: string; service: string; date: string; message: string; };

const services = ['Maternity Photography','Newborn Photography','Birthday Shoot','Pre-Wedding','Family Photography','Corporate / Product','Event Coverage','Other'];

const infoCards = [
  { icon: '📍', title: 'Studio Address', lines: ['94G/2, 1st Main Rd,', 'Kodeeswaran Nagar, Pettai,', 'Tirunelveli, TN 627004'] },
  { icon: '📞', title: 'Phone & WhatsApp', lines: ['096558 37868', 'Available 9 AM – 8 PM'] },
  { icon: '🕐', title: 'Studio Hours', lines: ['Monday – Sunday', '9:00 AM – 8:00 PM', 'Open all days'] },
  { icon: '⭐', title: 'Google Rating', lines: ['4.9 Stars', '88+ Reviews', 'Verified Studio'] },
];

export default function ContactClient() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', service: '', date: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const inp: React.CSSProperties = { width: '100%', background: 'var(--cream)', border: '1.5px solid var(--border)', borderRadius: 2, padding: '0.875rem 1rem', color: 'var(--charcoal)', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', transition: 'border-color 0.25s' };

  return (
    <>
      <section style={{ background: 'var(--charcoal)', paddingTop: 140, paddingBottom: '4rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Get in Touch
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: 'white', lineHeight: 1.05 }}>
            Book your<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>session today</em>
          </h1>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>
            {/* Info */}
            <div>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Studio Info
              </p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1.15, marginBottom: '2rem' }}>
                We&apos;d love to<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>hear from you</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {infoCards.map(card => (
                  <motion.div key={card.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    style={{ display: 'flex', gap: '1rem', padding: '1.25rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2 }}>
                    <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: 2 }}>{card.icon}</span>
                    <div>
                      <p style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.4rem' }}>{card.title}</p>
                      {card.lines.map(l => <p key={l} style={{ fontSize: '0.84rem', color: 'var(--mist)', lineHeight: 1.8 }}>{l}</p>)}
                    </div>
                  </motion.div>
                ))}
              </div>
              <a href="https://wa.me/9655837868" target="_blank" rel="noopener noreferrer" className="btn-gold">📱 Chat on WhatsApp</a>
            </div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, padding: 'clamp(1.5rem,4vw,3rem)', boxShadow: 'var(--shadow-med)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '0.75rem' }}>Message Sent!</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--mist)', lineHeight: 1.8, marginBottom: '1.5rem' }}>Thank you! We will get back to you within 24 hours. For urgent bookings, WhatsApp us directly.</p>
                  <a href="https://wa.me/9655837868" target="_blank" rel="noopener noreferrer" className="btn-gold">📱 WhatsApp Now</a>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '2rem' }}>Booking Enquiry</h3>
                  <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                        <input name="name" value={form.name} onChange={handle} required style={inp} placeholder="Your name"
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Phone *</label>
                        <input name="phone" value={form.phone} onChange={handle} required style={inp} placeholder="10-digit number"
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Email</label>
                      <input name="email" type="email" value={form.email} onChange={handle} style={inp} placeholder="your@email.com"
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Service *</label>
                        <select name="service" value={form.service} onChange={handle} required style={{ ...inp, cursor: 'pointer' }}>
                          <option value="">Select service</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Preferred Date</label>
                        <input name="date" type="date" value={form.date} onChange={handle} style={inp}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>Message</label>
                      <textarea name="message" value={form.message} onChange={handle} rows={4} style={{ ...inp, resize: 'vertical' }} placeholder="Tell us about your vision..."
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')} />
                    </div>
                    <button type="submit" className="btn-gold" disabled={sending} style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}>
                      {sending ? '⏳ Sending...' : '✦ Send Enquiry'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
        <style>{`@media(max-width:768px){[style*="grid-template-columns: 1fr 1.4fr"]{grid-template-columns:1fr!important;}[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
      </section>

      <section style={{ background: 'var(--ivory)', borderTop: '1px solid var(--border)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5!2d77.7!3d8.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOCcyMy4zIk4gNzcnNDIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%" height="400" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          title="Wow Shotz Studio Location"
        />
      </section>
    </>
  );
}
