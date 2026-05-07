'use client';
import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import AIChatbot from '@/components/chatbot/AIChatbot';

// export const metadata: Metadata = {
//   title: 'About Us – Our Story & Team',
//   description: 'Learn about Wow Shotz Studio, Tirunelveli\'s premier photography studio. Our story, our team, and our passion for capturing precious memories since 2015.',
// };

const team = [
  { name: 'Arun Kumar', role: 'Lead Photographer', spec: 'Pre-Wedding & Events', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Preethi S.', role: 'Maternity Specialist', spec: 'Maternity & Newborn', img: 'https://images.unsplash.com/photo-1494790108755-2616b17e1849?w=300&q=80' },
  { name: 'Ramesh M.', role: 'Creative Director', spec: 'Concept & Styling', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  { name: 'Kavitha L.', role: 'Photo Editor', spec: 'Post-Processing', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
];

const values = [
  { icon: '◎', title: 'Artistry First', desc: 'Every frame is composed with intention — light, emotion, and story working in harmony.' },
  { icon: '◈', title: 'Comfort & Care', desc: 'We create a warm, relaxed environment so your authentic moments shine naturally.' },
  { icon: '◆', title: 'Premium Quality', desc: 'From capture to delivery, we maintain the highest standards in every detail.' },
  { icon: '⬡', title: 'Your Memories', desc: 'We treat every session as if we\'re documenting our own family\'s story.' },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ background: 'var(--charcoal)', paddingTop: 140, paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -200, top: '50%', transform: 'translateY(-50%)', width: 600, height: 600, border: '1px solid rgba(184,147,90,0.07)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="container">
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Our Story
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: 'white', lineHeight: 1.05, maxWidth: 700 }}>
            Passion for<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>preserving moments</em>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Founded 2015
              </p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: 'var(--charcoal)', lineHeight: 1.15, marginBottom: '1.75rem' }}>
                Nine years of<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>beautiful storytelling</em>
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--mist)', lineHeight: 1.95, marginBottom: '1.25rem' }}>
                Wow Shotz Studio was born from a simple belief: every family deserves photographs that truly capture who they are — not just how they look, but how they feel.
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--mist)', lineHeight: 1.95, marginBottom: '1.25rem', opacity: 0.85 }}>
                Starting with a single camera and an overflowing passion, we have grown into Tirunelveli&apos;s most trusted photography destination, earning a 4.9★ Google rating and the love of thousands of families.
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--mist)', lineHeight: 1.95, opacity: 0.75 }}>
                Today our team of specialised photographers handles everything from intimate maternity sessions to grand wedding productions — each with the same care and artistry that defined us from day one.
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1512070679279-8988d32161be?w=700&q=80" alt="Our Studio" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 2, boxShadow: 'var(--shadow-strong)' }} />
              <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', background: 'linear-gradient(135deg,var(--gold-light),var(--gold))', padding: '1.5rem 2rem', boxShadow: 'var(--shadow-med)' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, color: 'white', lineHeight: 1 }}>9+</p>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Years Active</p>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){[style*="grid-template-columns: 1fr 1fr"][style*="5rem"]{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--ivory)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Our Values
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: 'var(--charcoal)' }}>What drives us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.5rem' }}>
            {values.map(v => (
              <div key={v.title} style={{ padding: '2rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 2, boxShadow: 'var(--shadow-soft)', transition: 'box-shadow 0.3s,transform 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-med)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-soft)'; }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--gold)', display: 'block', marginBottom: '1rem' }}>{v.icon}</span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--mist)', lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Meet the Team
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: 'var(--charcoal)' }}>The people behind the lens</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '2rem' }}>
            {team.map(m => (
              <div key={m.name} style={{ textAlign: 'center' }}>
                <div style={{ width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.25rem', border: '3px solid var(--border)', boxShadow: 'var(--shadow-med)' }}>
                  <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>{m.role}</p>
                <p style={{ fontSize: '0.76rem', color: 'var(--mist)' }}>{m.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AIChatbot />
    </PublicLayout>
  );
}
