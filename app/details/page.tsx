'use client';
import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import AIChatbot from '@/components/chatbot/AIChatbot';

// export const metadata: Metadata = {
//   title: 'Studio Details – Packages & Pricing',
//   description: 'Explore our photography packages and studio details. Maternity, newborn, birthday, pre-wedding and family packages. Located in Tirunelveli.',
// };

const packages = [
  { name: 'Maternity Bliss', price: 'Contact Us', duration: '2 hrs', prints: '20 edited photos', features: ['Studio + outdoor options', 'Wardrobe styling help', 'Partner & sibling included', 'Online gallery delivery', 'Print package optional'], color: 'var(--gold-pale)' },
  { name: 'Newborn Dreams', price: 'Contact Us', duration: '3 hrs', prints: '25 edited photos', features: ['Safety-first posing', 'Premium prop collection', 'Family shots included', 'Sibling shots included', 'Same-week delivery'], color: 'var(--ivory)' },
  { name: 'Birthday Royale', price: 'Contact Us', duration: '2 hrs', prints: '30 edited photos', features: ['Theme setup', 'Costume / outfit changes', 'Cake smash optional', 'Cinematic reel add-on', 'Same-day preview'], color: 'var(--gold-pale)', popular: true },
  { name: 'Pre-Wedding Story', price: 'Contact Us', duration: '4 hrs', prints: '40 edited photos', features: ['2 locations', 'Styling consultation', 'Cinematic film optional', 'Album design available', 'Priority turnaround'], color: 'var(--ivory)' },
  { name: 'Family Portrait', price: 'Contact Us', duration: '1.5 hrs', prints: '15 edited photos', features: ['Up to 6 members', 'Studio backdrop options', 'Casual & formal looks', 'Digital + print ready', 'Quick 3-day delivery'], color: 'var(--gold-pale)' },
  { name: 'Corporate & Product', price: 'Contact Us', duration: 'Custom', prints: 'As required', features: ['Headshots & team photos', 'Product flat-lays', 'White/lifestyle backgrounds', 'Commercial licensing', 'RAW files optional'], color: 'var(--ivory)' },
];

const faqs = [
  { q: 'How far in advance should I book?', a: 'We recommend booking 2–4 weeks in advance for regular sessions and 4–8 weeks for pre-wedding shoots, especially during peak season (Oct–Feb).' },
  { q: 'What is included in each package?', a: 'Each package includes a professional photography session, full editing of selected photos, and delivery via an online gallery. Prints and albums are available as add-ons.' },
  { q: 'Do you offer outdoor locations?', a: 'Yes! We can shoot at our fully-equipped studio in Tirunelveli or travel to outdoor locations of your choice. Travel fees may apply for locations beyond 20 km.' },
  { q: 'How long until we receive our photos?', a: 'Standard delivery is 5–7 business days. Rush delivery (2–3 days) is available for an additional fee. We also provide a same-day preview of 5 images.' },
  { q: 'Can we request specific poses or styles?', a: 'Absolutely! We encourage you to create a mood board and share references. Your comfort and vision are our priority.' },
  { q: 'What should we wear?', a: 'We\'ll send you a detailed style guide after booking. Generally, we recommend coordinated — not matching — outfits and avoiding busy patterns.' },
];

export default function DetailsPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ background: 'var(--charcoal)', paddingTop: 140, paddingBottom: '4rem' }}>
        <div className="container">
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Packages & Details
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: 'white', lineHeight: 1.05 }}>
            Transparent<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>pricing & packages</em>
          </h1>
        </div>
      </section>

      {/* Packages */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Our Packages
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 300, color: 'var(--charcoal)' }}>
              Choose your <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>perfect package</em>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginTop: '0.75rem', maxWidth: 500, margin: '0.75rem auto 0' }}>Contact us for current pricing — we offer seasonal offers and custom bundles.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
            {packages.map(pkg => (
              <div key={pkg.name} style={{ background: pkg.color, border: `1.5px solid ${pkg.popular ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 2, padding: '2rem', position: 'relative', boxShadow: pkg.popular ? 'var(--shadow-med)' : 'var(--shadow-soft)', transition: 'transform 0.3s,box-shadow 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-strong)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = pkg.popular ? 'var(--shadow-med)' : 'var(--shadow-soft)'; }}>
                {pkg.popular && <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'white', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 14px', fontWeight: 600 }}>Most Popular</span>}
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '0.5rem' }}>{pkg.name}</h3>
                <p style={{ fontSize: '1.4rem', fontFamily: 'Cormorant Garamond, serif', color: 'var(--gold)', fontWeight: 300, marginBottom: '0.25rem' }}>{pkg.price}</p>
                <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--mist)' }}>⏱ {pkg.duration}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--mist)' }}>📸 {pkg.prints}</span>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: '1.75rem' }}>
                  {pkg.features.map(f => (
                    <li key={f} style={{ fontSize: '0.82rem', color: 'var(--slate)', padding: '0.4rem 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>✦</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/9655837868" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Book This Package</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--ivory)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />FAQ
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: 'var(--charcoal)' }}>Common questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ padding: '1.5rem', background: 'var(--white)', border: '1px solid var(--border)', marginBottom: '0.5rem', borderRadius: 2 }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '0.6rem' }}>{f.q}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--mist)', lineHeight: 1.85 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AIChatbot />
    </PublicLayout>
  );
}
