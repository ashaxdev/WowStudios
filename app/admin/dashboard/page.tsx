'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const MODULES = [
  {
    href: '/admin/photos',
    title: 'Photos',
    desc: 'Manage gallery images by category. Upload to Cloudinary.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="15" rx="2"/>
        <circle cx="12" cy="13" r="3.5"/>
        <path d="M9 6V5a1 1 0 011-1h4a1 1 0 011 1v1"/>
        <circle cx="18.5" cy="9.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
    stat: 'photos',
  },
  {
    href: '/admin/blogs',
    title: 'Blogs',
    desc: 'Write and publish blog posts with cover images.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    color: 'bg-purple-50 text-purple-600',
    border: 'border-purple-100',
    stat: 'blogs',
  },
  // {
  //   href: '/admin/testimonials',
  //   title: 'Testimonials',
  //   desc: 'Add and manage client testimonials with ratings.',
  //   icon: (
  //     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  //       <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  //     </svg>
  //   ),
  //   color: 'bg-amber-50 text-amber-600',
  //   border: 'border-amber-100',
  //   stat: 'testimonials',
  // },
  {
    href: '/admin/videos',
    title: 'YouTube Videos',
    desc: 'Add YouTube videos by category for the frontend.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
    color: 'bg-red-50 text-red-600',
    border: 'border-red-100',
    stat: 'videos',
  },
  // {
  //   href: '/admin/services',
  //   title: 'Services',
  //   desc: 'Manage services offered with pricing and features.',
  //   icon: (
  //     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  //       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  //     </svg>
  //   ),
  //   color: 'bg-green-50 text-green-600',
  //   border: 'border-green-100',
  //   stat: 'services',
  // },
];

interface Stats {
  photos: number;
  blogs: number;
  testimonials: number;
  videos: number;
  services: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ photos: 0, blogs: 0, testimonials: 0, videos: 0, services: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem('admin_token');
        const headers = { Authorization: `Bearer ${token}` };
        const [photos, blogs, testimonials, videos, services] = await Promise.all([
          fetch('/api/photos', { headers }).then(r => r.json()),
          fetch('/api/blogs', { headers }).then(r => r.json()),
          fetch('/api/testimonials', { headers }).then(r => r.json()),
          fetch('/api/videos', { headers }).then(r => r.json()),
          fetch('/api/services', { headers }).then(r => r.json()),
        ]);
        setStats({
          photos: photos.data?.length || 0,
          blogs: blogs.data?.length || 0,
          testimonials: testimonials.data?.length || 0,
          videos: videos.data?.length || 0,
          services: services.data?.length || 0,
        });
      } catch {}
      setLoadingStats(false);
    }
    fetchStats();
  }, []);

  return (
    
  <div className="admin-page">
    {/* Header */}
    <div className="dashboard-header">
      <h1 className="dashboard-main-title">Dashboard</h1>
      <p className="dashboard-main-subtitle">
        Welcome back. Manage all your studio content below.
      </p>
    </div>

    {/* Module Cards */}
    <div className="dashboard-grid">
      {MODULES.map(mod => (
        <Link
          key={mod.href}
          href={mod.href}
          className="dashboard-module-card"
        >
          <div className="dashboard-card-top">
            <div className={`dashboard-icon-box ${mod.stat}`}>
              {mod.icon}
            </div>

            <div className="dashboard-stats">
              <div className="dashboard-count">
                {loadingStats ? '—' : stats[mod.stat as keyof Stats]}
              </div>
              <div className="dashboard-total">total</div>
            </div>
          </div>

          <h3 className="dashboard-card-title">
            {mod.title}
          </h3>

          <p className="dashboard-card-description">
            {mod.desc}
          </p>

          <div className="dashboard-manage">
            Manage
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="dashboard-arrow"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
  
}
