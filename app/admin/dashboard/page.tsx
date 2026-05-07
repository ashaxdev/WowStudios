'use client';
import Link from 'next/link';

const cards = [
  { label: 'Portfolio Items', value: 24, sub: 'published', color: '#D4A853', icon: '📸' },
  { label: 'Total Inquiries', value: 156, sub: 'all time', color: '#D4A853', icon: '📩' },
  { label: 'New Bookings', value: 8, sub: 'needs review', color: '#f48a8a', icon: '🆕' },
  { label: 'Shop Orders', value: 12, sub: 'pending', color: '#81c784', icon: '🛍️' },
];

const quick = [
  { label: 'Add Portfolio', href: '/admin/projects', icon: '📸', desc: 'Upload new work' },
  { label: 'View Inquiries', href: '/admin/inquiries', icon: '📩', desc: 'Respond to leads' },
  { label: 'Manage Products', href: '/admin/products', icon: '🛍️', desc: 'Edit shop items' },
  { label: 'Write Blog', href: '/admin/blogs', icon: '✍️', desc: 'Create new post' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: '⭐', desc: 'Manage reviews' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️', desc: 'Studio config' },
];

const recentInquiries = [
  { name: 'Anitha R.', service: 'Maternity', date: 'Today 2:30 PM', status: 'New' },
  { name: 'Vikram S.', service: 'Pre-Wedding', date: 'Today 10:15 AM', status: 'Replied' },
  { name: 'Meena K.', service: 'Birthday', date: 'Yesterday', status: 'New' },
  { name: 'Rajesh P.', service: 'Family', date: 'Yesterday', status: 'Booked' },
  { name: 'Deepa V.', service: 'Newborn', date: '2 days ago', status: 'Replied' },
];

const statusColor: Record<string, string> = { New: '#f48a8a', Replied: '#D4A853', Booked: '#81c784' };

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 960 }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, color: 'white', marginBottom: '0.35rem' }}>Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>Welcome back to Wow Shotz Studio admin panel.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: '#1a1a1a', padding: '1.5rem 1.25rem', borderLeft: `3px solid ${c.color}`, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', borderLeftWidth: 3, borderLeftColor: c.color, transition: 'transform 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <p style={{ fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{c.label}</p>
              <span style={{ fontSize: '1rem' }}>{c.icon}</span>
            </div>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{c.value}</p>
            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.28)', marginTop: '0.4rem' }}>{c.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem' }}>
        {/* Quick actions */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {quick.map(q => (
              <Link key={q.href} href={q.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#1a1a1a', padding: '1.1rem', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: '0.45rem', transition: 'border-color 0.2s,transform 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(212,168,83,0.5)'; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'translateY(0)'; }}>
                  <span style={{ fontSize: '1.1rem' }}>{q.icon}</span>
                  <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{q.label}</span>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)' }}>{q.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent inquiries */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>Recent Inquiries</h2>
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden' }}>
            {recentInquiries.map((r, i) => (
              <div key={r.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.25rem', borderBottom: i < recentInquiries.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: '0.84rem', color: 'white', fontWeight: 500, marginBottom: 2 }}>{r.name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>{r.service} · {r.date}</p>
                </div>
                <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: statusColor[r.status], border: `1px solid ${statusColor[r.status]}`, padding: '2px 8px', borderRadius: 2, fontWeight: 600 }}>{r.status}</span>
              </div>
            ))}
            <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link href="/admin/inquiries" style={{ fontSize: '0.72rem', color: 'rgba(212,168,83,0.8)', letterSpacing: '0.1em' }}>View all inquiries →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Studio info */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(212,168,83,0.15)', borderRadius: 8, padding: '1.75rem', marginTop: '1.5rem' }}>
        <p style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A853', marginBottom: '0.75rem', fontWeight: 600 }}>Studio Info</p>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9 }}>
          📍 94G/2, 1st Main Rd, Kodeeswaran Nagar, Pettai, Tirunelveli 627004<br />
          📞 096558 37868 ·{' '}
          <a href="https://wa.me/9655837868" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A853' }}>WhatsApp</a> ·{' '}
          <a href="/" target="_blank" style={{ color: '#D4A853' }}>View Website ↗</a>
        </p>
      </div>

      <style>{`@media(max-width:640px){[style*="grid-template-columns: 1fr 1.3fr"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
