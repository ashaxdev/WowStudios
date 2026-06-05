import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs/slug/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink: #1a1a1a;
          --smoke: #f7f5f2;
          --mist: #8a8278;
          --accent: #c8a96e;
          --rule: #e8e4de;
          --white: #ffffff;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .blog-page {
          font-family: 'DM Sans', sans-serif;
          background: var(--smoke);
          min-height: 100vh;
          color: var(--ink);
        }

        /* ── NAV BAR ─────────────────────────────── */
        .blog-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(247, 245, 242, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--rule);
          padding: 0 1.5rem;
          height: 60px;
          display: flex;
          align-items: center;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--mist);
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 0.35rem 0;
          border: none;
          background: none;
          cursor: pointer;
        }

        .back-btn:hover { color: var(--ink); }

        .back-btn svg {
          transition: transform 0.2s ease;
        }

        .back-btn:hover svg {
          transform: translateX(-3px);
        }

        /* ── HERO ─────────────────────────────────── */
        .blog-hero {
          background: var(--ink);
          padding: 4rem 1.5rem 3.5rem;
          position: relative;
          overflow: hidden;
        }

        .blog-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 60% at 80% 20%, rgba(200,169,110,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 10% 80%, rgba(200,169,110,0.07) 0%, transparent 50%);
          pointer-events: none;
        }

        .blog-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
        }

        .blog-meta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .blog-date {
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
        }

        .reading-time {
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .blog-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 5.5vw, 3.6rem);
          font-weight: 700;
          line-height: 1.15;
          color: #fff;
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
        }

        .hero-rule {
          width: 48px;
          height: 2px;
          background: var(--accent);
          margin-top: 0.25rem;
        }

        /* ── COVER IMAGE ─────────────────────────── */
        .cover-wrap {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 1.5rem;
          transform: translateY(-2rem);
        }

        .cover-img {
          width: 100%;
          max-height: 460px;
          object-fit: cover;
          border-radius: 6px;
          display: block;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        }

        /* ── BODY ─────────────────────────────────── */
        .blog-body {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        /* pull body up when no cover image */
        .blog-body--no-image {
          padding-top: 3rem;
        }

        .blog-excerpt {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: clamp(1.05rem, 2.5vw, 1.25rem);
          line-height: 1.85;
          color: var(--mist);
          padding: 1.75rem 0 2rem;
          border-bottom: 1px solid var(--rule);
          margin-bottom: 2.5rem;
        }

        .blog-content {
          font-size: clamp(0.95rem, 2vw, 1.05rem);
          line-height: 1.95;
          color: #2e2b27;
        }

        /* Prose resets for injected HTML */
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          color: var(--ink);
          margin: 2.25em 0 0.75em;
          line-height: 1.25;
        }
        .blog-content h2 { font-size: clamp(1.35rem, 3vw, 1.65rem); }
        .blog-content h3 { font-size: clamp(1.15rem, 2.5vw, 1.35rem); }

        .blog-content p { margin-bottom: 1.4em; }

        .blog-content a {
          color: var(--ink);
          text-decoration: underline;
          text-decoration-color: var(--accent);
          text-underline-offset: 3px;
          transition: color 0.15s;
        }
        .blog-content a:hover { color: var(--accent); }

        .blog-content blockquote {
          border-left: 3px solid var(--accent);
          padding: 0.5em 0 0.5em 1.5em;
          margin: 2em 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 1.1em;
          color: var(--mist);
        }

        .blog-content ul,
        .blog-content ol {
          padding-left: 1.5em;
          margin-bottom: 1.4em;
        }
        .blog-content li { margin-bottom: 0.4em; }

        .blog-content img {
          max-width: 100%;
          border-radius: 4px;
          margin: 1.5em 0;
        }

        .blog-content code {
          font-size: 0.87em;
          background: #edeae4;
          padding: 0.15em 0.4em;
          border-radius: 3px;
        }

        .blog-content pre {
          background: var(--ink);
          color: #e8e4de;
          padding: 1.25em 1.5em;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1.75em 0;
          font-size: 0.88em;
          line-height: 1.7;
        }

        .blog-content pre code {
          background: none;
          padding: 0;
        }

        /* ── TAGS ─────────────────────────────────── */
        .tags-section {
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--rule);
        }

        .tags-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--mist);
          margin-bottom: 1rem;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .tag-chip {
          padding: 0.35rem 0.85rem;
          background: var(--white);
          border: 1px solid var(--rule);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 400;
          color: var(--mist);
          letter-spacing: 0.03em;
          transition: border-color 0.2s, color 0.2s;
        }

        .tag-chip:hover {
          border-color: var(--accent);
          color: var(--ink);
        }

        /* ── RESPONSIVE ───────────────────────────── */
        @media (max-width: 640px) {
          .blog-hero { padding: 3rem 1.25rem 2.75rem; }
          .cover-wrap { padding: 0 1.25rem; transform: translateY(-1.5rem); }
          .blog-body { padding: 0 1.25rem 4rem; }
          .cover-img { max-height: 220px; }
        }

        @media (min-width: 1024px) {
          .blog-hero { padding: 5rem 2rem 4rem; }
          .cover-wrap { padding: 0 2rem; }
          .blog-body { padding: 0 2rem 6rem; }
        }
      `}</style>

      <div className="blog-page">

        {/* ── Sticky nav with back button ── */}
        <nav className="blog-nav">
          <Link href="/blog" className="back-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All articles
          </Link>
        </nav>

        {/* ── Hero ── */}
        <header className="blog-hero">
          <div className="blog-hero-inner">
            <div className="blog-meta-row">
              <span className="blog-date">{formattedDate}</span>
              {blog.tags?.length > 0 && (
                <>
                  <span className="meta-dot" />
                  <span className="reading-time">{blog.tags[0]}</span>
                </>
              )}
            </div>

            <h1 className="blog-title">{blog.title}</h1>
            <div className="hero-rule" />
          </div>
        </header>

        {/* ── Cover image ── */}
        {blog.coverImage && (
          <div className="cover-wrap">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="cover-img"
            />
          </div>
        )}

        {/* ── Body ── */}
        <main className={`blog-body${blog.coverImage ? '' : ' blog-body--no-image'}`}>

          {blog.excerpt && (
            <p className="blog-excerpt">{blog.excerpt}</p>
          )}

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.tags?.length > 0 && (
            <div className="tags-section">
              <p className="tags-label">Topics</p>
              <div className="tags-list">
                {blog.tags.map(tag => (
                  <span key={tag} className="tag-chip">#{tag}</span>
                ))}
              </div>
            </div>
          )}
        </main>

      </div>
    </>
  );
}