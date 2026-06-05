'use client';
import Link from 'next/link';

export default function Footer() {
  const services = ['Maternity Photography', 'Newborn Photography', 'Birthday Shoots', 'Pre-Wedding', 'Family Photography', 'Product Photography', 'Corporate Shoots', 'Event Coverage'];
  const quickLinks = [
    { href: '/', label: 'Home' }, { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' }, { href: '/shop', label: 'Shop' },
    { href: '/blog', label: 'Blog' }, { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer style={{ background: 'var(--charcoal)', color: 'rgba(250,247,242,0.55)' }}>
      {/* CTA band */}
      <div style={{ background: 'linear-gradient(135deg,rgba(212,168,83,0.12),rgba(212,168,83,0.04))', padding: '5rem 0', textAlign: 'center', borderBottom: '1px solid rgba(184,147,90,0.12)' }}>
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Ready to create memories?</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '1.75rem', lineHeight: 1.1 }}>
            Book Your <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Session Today</em>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.45)', marginBottom: '2.5rem', maxWidth: 400, margin: '0 auto 2.5rem' }}>Open Mon–Sun · 9 AM to 8 PM · Tirunelveli</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://wa.me/9655837868" target="_blank" rel="noopener noreferrer" className="btn-gold">📱 WhatsApp Us</a>
            <Link href="/contact" className="btn-outline" style={{ color: 'rgba(250,247,242,0.7)', borderColor: 'rgba(250,247,242,0.3)' }}>View Packages</Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container" style={{ padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>WOW SHOTZ</p>
            <p style={{ fontSize: '0.5rem', letterSpacing: '0.3em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem' }}>STUDIO</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(250,247,242,0.4)', lineHeight: 1.85, marginBottom: '1rem', maxWidth: 240 }}>
              Tirunelveli&apos;s most loved photography studio. Capturing precious moments with artistry and passion since 2015.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600, border: '1px solid rgba(184,147,90,0.3)', padding: '4px 10px', borderRadius: 2, marginBottom: '0.75rem' }}>
              ⭐ 4.9 Rating · 88+ Reviews
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 500 }}>📞 096558 37868</p>
          </div>

          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1.25rem' }}>Quick Links</p>
            {quickLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(250,247,242,0.45)', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,0.45)')}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1.25rem' }}>Our Services</p>
            {services.slice(0, 6).map(s => (
              <p key={s} style={{ fontSize: '0.8rem', color: 'rgba(250,247,242,0.45)', marginBottom: '0.6rem' }}>{s}</p>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1.25rem' }}>Visit Us</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(250,247,242,0.45)', lineHeight: 1.95, marginBottom: '1rem' }}>
              94G/2, 1st Main Rd,<br />Kodeeswaran Nagar, Pettai,<br />Tirunelveli, Tamil Nadu 627004
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(250,247,242,0.4)', marginBottom: '1rem' }}>🕐 Mon – Sun: 9 AM – 8 PM</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[['📸', 'Instagram'], ['📘', 'Facebook'], ['▶️', 'YouTube']].map(([icon, name]) => (
                <a key={name as string} href="#" style={{ fontSize: '0.64rem', color: 'rgba(250,247,242,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 3 }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,0.3)')}>
                  {icon} {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(250,247,242,0.07)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <div
  style={{
    // borderTop: '1px solid rgba(250,247,242,0.07)',
    // paddingTop: '1.5rem',
    // textAlign: 'center',
  }}
>
  {/* <p
    style={{
      fontSize: '0.72rem',
      color: 'rgba(250,247,242,0.22)',
      marginBottom: '0.4rem',
    }}
  >
    © {new Date().getFullYear()} Wow Shotz Studio. All rights reserved.
  </p> */}

  <p
    style={{
      fontSize: '0.75rem',
      color: 'rgba(250,247,242,0.35)',
      letterSpacing: '0.05em',
    }}
  >
    Designed & Developed by{' '}
    <span
      style={{
        color: 'var(--gold)',
        fontWeight: 600,
      }}
    >
      Nexira Solutions
    </span>
  </p>
</div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms', 'Sitemap'].map(t => (
              <a key={t} href="#" style={{ fontSize: '0.68rem', color: 'rgba(250,247,242,0.2)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,0.2)')}>
                {t}
              </a>
            ))}
            {/* <Link href="/admin/login" style={{ fontSize: '0.65rem', color: 'rgba(250,247,242,0.1)' }}>Admin</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
