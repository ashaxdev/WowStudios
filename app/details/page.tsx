'use client';
import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import AIChatbot from '@/components/chatbot/AIChatbot';

// export const metadata: Metadata = {
//   title: 'Studio Details – Packages & Pricing',
//   description: 'Explore our photography packages and studio details. Maternity, newborn, birthday, pre-wedding and family packages. Located in Tirunelveli.',
// };

const packages = [
  {
    name: 'Wedding Photography & Videography',
    price: 'Contact Us',
    duration: 'Full Day',
    prints: 'Unlimited Coverage',
    features: [
      'Traditional Photography',
      'Candid Photography',
      'Traditional Videography',
      'Cinematic Wedding Film',
      'Premium Wedding Album',
    ],
    color: 'var(--gold-pale)',
    popular: true,
  },
  {
    name: 'Candid Photography',
    price: 'Contact Us',
    duration: 'Custom',
    prints: 'Full Softcopy',
    features: [
      'Natural Expressions',
      'Storytelling Moments',
      'Professional Retouching',
      'High Resolution Delivery',
      'Online Gallery',
    ],
    color: 'var(--ivory)',
  },
  {
    name: 'Drone Photography',
    price: 'Contact Us',
    duration: 'Custom',
    prints: 'Aerial Coverage',
    features: [
      '4K Drone Coverage',
      'Venue Aerial Shots',
      'Outdoor Event Coverage',
      'Cinematic Drone Videos',
      'Licensed Drone Operation',
    ],
    color: 'var(--gold-pale)',
  },
  {
    name: 'Pre-Wedding Shoots',
    price: 'Contact Us',
    duration: '4 Hours',
    prints: '40 Full Softcopy',
    features: [
      'Multiple Locations',
      'Outfit Changes',
      'Creative Concepts',
      'Cinematic Reel',
      'Premium Editing',
    ],
    color: 'var(--ivory)',
  },
  {
    name: 'Destination Wedding Photography',
    price: 'Contact Us',
    duration: 'Multi-Day',
    prints: 'Complete Coverage',
    features: [
      'Travel Coverage',
      'Wedding Event Coverage',
      'Drone Photography',
      'Highlight Film',
      'Luxury Album Design',
    ],
    color: 'var(--gold-pale)',
  },
  {
    name: 'Maternity Photography',
    price: 'Contact Us',
    duration: '2 Hours',
    prints: '20 Full Softcopy',
    features: [
      'Studio Session',
      'Outdoor Session',
      'Partner Included',
      'Wardrobe Guidance',
      'Professional Retouching',
    ],
    color: 'var(--ivory)',
  },
  {
    name: 'Newborn Photography',
    price: 'Contact Us',
    duration: '3 Hours',
    prints: '25 Full Softcopy',
    features: [
      'Safe Baby Posing',
      'Premium Props',
      'Family Portraits',
      'Sibling Photos',
      'Fast Delivery',
    ],
    color: 'var(--gold-pale)',
  },
  {
    name: 'Birthday Photography',
    price: 'Contact Us',
    duration: '2 Hours',
    prints: '30 Full Softcopy',
    features: [
      'Theme Setup',
      'Cake Smash Session',
      'Family Coverage',
      'Highlight Reel',
      'Same-Day Preview',
    ],
    color: 'var(--ivory)',
  },
  {
    name: 'Family Portraits',
    price: 'Contact Us',
    duration: '1.5 Hours',
    prints: '15 Full Softcopy',
    features: [
      'Studio Portraits',
      'Outdoor Portraits',
      'Large Family Groups',
      'Print Ready Images',
      'Quick Delivery',
    ],
    color: 'var(--gold-pale)',
  },
  {
    name: 'Corporate Photography',
    price: 'Contact Us',
    duration: 'Custom',
    prints: 'As Required',
    features: [
      'Corporate Headshots',
      'Team Photography',
      'Office Branding',
      'Business Events',
      'Commercial Usage Rights',
    ],
    color: 'var(--ivory)',
  },
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
            <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />
Our Services
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: 'white', lineHeight: 1.05 }}>
            Capturing Every
<br />
<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
  Beautiful Moment
</em>
          </h1>
        </div>
      </section>

      {/* Packages */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'block' }} />Photography Services
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 300, color: 'var(--charcoal)' }}>
              Explore Our <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
  Premium Services
</em>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginTop: '0.75rem', maxWidth: 500, margin: '0.75rem auto 0' }}>From weddings and pre-wedding shoots to maternity and corporate photography, we create timeless memories with creativity and passion.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
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
      {/* <section className="section" style={{ background: 'var(--ivory)', borderTop: '1px solid var(--border)' }}>
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
      </section> */}

      <AIChatbot />
    </PublicLayout>
  );
}
