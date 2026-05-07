'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/projects', label: 'Portfolio', icon: '📸' },
  { href: '/admin/products', label: 'Shop Products', icon: '🛍️' },
  { href: '/admin/blogs', label: 'Blog Posts', icon: '✍️' },
  { href: '/admin/services', label: 'Services', icon: '🎨' },
  { href: '/admin/team', label: 'Team', icon: '👥' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: '📩' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (!token) { router.push('/admin/login'); return; }
    try { const u = localStorage.getItem('admin_user'); if (u) setUser(JSON.parse(u)); } catch {}
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;
  const currentLabel = navItems.find(n => n.href === pathname)?.label || 'Admin';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F0F0F', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 90, display: 'none' }} className="mob-overlay" />}

      {/* Sidebar */}
      <aside style={{ width: 220, background: '#111', flexShrink: 0, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100, overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s' }} className="admin-sidebar">
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: 'white', fontWeight: 700, marginBottom: 3 }}>WOW SHOTZ</p>
          <p style={{ fontSize: '0.48rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>STUDIO ADMIN</p>
        </div>
        <nav style={{ flex: 1, padding: '0.75rem 0' }}>
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1.25rem', background: active ? 'rgba(212,168,83,0.1)' : 'transparent', borderLeft: `2px solid ${active ? 'var(--gold)' : 'transparent'}`, transition: 'background 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.76rem', color: active ? 'white' : 'rgba(255,255,255,0.45)', fontWeight: active ? 500 : 300 }}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          {user?.name && <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>{user.name}</p>}
          <button onClick={logout} style={{ width: '100%', padding: '0.55rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '0.72rem', fontFamily: 'inherit', marginBottom: '0.75rem', borderRadius: 4, transition: 'background 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)')}>
            Sign Out
          </button>
          <Link href="/" target="_blank" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)' }}>↗ View Website</Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: 220 }} className="admin-main">
        <div style={{ height: 54, background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 1.5rem', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 4, padding: 4, display: 'none' }} className="admin-burger">
              {[0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: i === 1 ? 12 : 18, height: 1.5, background: 'white' }} />)}
            </button>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{currentLabel}</p>
          </div>
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
        <div style={{ flex: 1, padding: '2rem 1.5rem', overflowX: 'hidden' }}>
          {children}
        </div>
      </main>

      <style>{`
        :root { --gold: #D4A853; }
        @media(max-width:768px){
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.open { transform: translateX(0); }
          .admin-main { margin-left: 0 !important; }
          .admin-burger { display: flex !important; }
          .mob-overlay { display: block !important; }
        }
      `}</style>
    </div>
  );
}
