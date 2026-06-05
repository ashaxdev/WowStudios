
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import './globals.css';

// const NAV_ITEMS = [
//   { href: '/admin', label: 'Dashboard', icon: '⊞', exact: true },
//   { href: '/admin/photos', label: 'Photos', icon: '📷' },
//   { href: '/admin/blogs', label: 'Blogs', icon: '✍️' },
//   { href: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
//   { href: '/admin/videos', label: 'Videos', icon: '▶️' },
//   { href: '/admin/services', label: 'Services', icon: '⭐' },
// ];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // const pathname = usePathname();

  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [checking, setChecking] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem('admin_token');

  //   if (!token) {
  //     router.replace('/');
  //   } else {
  //     setChecking(false);
  //   }
  // }, [router]);

  // async function handleLogout() {
  //   await fetch('/api/auth/logout', {
  //     method: 'POST',
  //   });

  //   localStorage.removeItem('admin_token');
  //   router.replace('/');
  // }

  // const isActive = (href: string, exact?: boolean) =>
  //   exact ? pathname === href : pathname.startsWith(href);

  // if (checking) {
  //   return (
  //     <div className="admin-loading">
  //       <div>Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="admin-layout">
      {/* {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? 'sidebar-open' : ''
        }`}
      >
        <div className="admin-logo">
          <div className="admin-logo-icon">
            📸
          </div>

          <div>
            <div className="admin-logo-title">
              Photo Studio
            </div>

            <div className="admin-logo-subtitle">
              Admin Panel
            </div>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`admin-nav-link ${
                isActive(item.href, item.exact)
                  ? 'active'
                  : ''
              }`}
            >
              <span className="admin-nav-icon">
                {item.icon}
              </span>

              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-mobile-header">
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="admin-mobile-title">
            {NAV_ITEMS.find(i =>
              isActive(i.href, i.exact)
            )?.label || 'Admin'}
          </div>
        </header> */}

        <main className="admin-main">
          {children}
        </main>
      {/* </div> */}
    </div>
  );
}
