'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/details', label: 'Details' },
  { href: '/shop', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isHome = pathname === '/';
  const navBg = scrolled ? 'rgba(250,247,242,0.97)' : isHome ? 'transparent' : 'rgba(250,247,242,0.97)';
  const borderBottom = scrolled || !isHome ? '1px solid rgba(184,147,90,0.15)' : 'none';
  const boxShadow = scrolled || !isHome ? '0 1px 40px rgba(44,36,22,0.08)' : 'none';
  const logoColor = (scrolled || !isHome) ? 'var(--charcoal)' : 'white';
  const linkColor = (scrolled || !isHome) ? 'var(--mist)' : 'rgba(255,255,255,0.82)';
  const burgerColor = (scrolled || !isHome) ? 'var(--charcoal)' : 'white';

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: navBg,
          borderBottom,
          boxShadow,
          backdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="container">
          <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700, color: logoColor, letterSpacing: '0.07em', lineHeight: 1, transition: 'color 0.4s' }}>
                WOW SHOTZ
              </span>
              <span style={{ fontSize: '0.48rem', letterSpacing: '0.35em', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase' }}>
                STUDIO · TIRUNELVELI
              </span>
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
              {links.map(l => (
                <Link key={l.href} href={l.href} style={{
                  fontSize: '0.7rem', letterSpacing: '0.13em', textTransform: 'uppercase', fontWeight: 500,
                  color: pathname === l.href ? 'var(--gold)' : linkColor,
                  transition: 'color 0.25s', position: 'relative', paddingBottom: 3,
                }}>
                  {l.label}
                  {pathname === l.href && (
                    <motion.span layoutId="nav-underline" style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1, background: 'var(--gold)', borderRadius: 1 }} />
                  )}
                </Link>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hidden-mobile">
              {/* <a href="tel:+919655837868" style={{ fontSize: '0.68rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.05em' }}>
                📱 096558 37868
              </a> */}
              <Link href="/contact" className="btn-gold" style={{ padding: '0.55rem 1.1rem', fontSize: '0.66rem' }}>Book Now</Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', flexDirection: 'column', gap: 5, zIndex: 1200, display: 'none' }}
              className="show-mobile"
            >
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
                style={{ display: 'block', width: 24, height: 1.5, background: open ? 'var(--gold)' : burgerColor, transformOrigin: 'center', transition: 'background 0.3s' }} />
              <motion.span animate={{ opacity: open ? 0 : 1, width: open ? 0 : 15 }}
                style={{ display: 'block', width: 15, height: 1.5, background: burgerColor, marginLeft: 'auto', transition: 'background 0.3s' }} />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
                style={{ display: 'block', width: 24, height: 1.5, background: open ? 'var(--gold)' : burgerColor, transformOrigin: 'center', transition: 'background 0.3s' }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1100,
              background: 'var(--cream)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.25rem', padding: '2rem',
            }}
          >
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link href={l.href} style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.8rem, 7vw, 2.5rem)',
                  fontWeight: 400,
                  color: pathname === l.href ? 'var(--gold)' : 'var(--charcoal)',
                }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <a href="https://wa.me/9655837868" target="_blank" rel="noopener noreferrer" className="btn-gold">
                📱 Book on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
