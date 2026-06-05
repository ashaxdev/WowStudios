'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

const ASPECT_VARIANTS = ['tall', 'square', 'wide', 'tall', 'wide', 'square'];
const ASPECT_PADDING: Record<string, string> = {
  tall: '133%',
  square: '100%',
  wide: '75%',
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .blog-hero {
    background: var(--charcoal);
    padding-top: 140px;
    padding-bottom: 4rem;
  }
  .blog-hero-eyebrow {
    font-size: 0.6rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'DM Sans', sans-serif;
  }
  .blog-hero-rule { width: 28px; height: 1px; background: var(--gold); display: block; flex-shrink: 0; }
  .blog-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 300;
    color: white;
    line-height: 1.0;
    letter-spacing: -0.01em;
  }
  .blog-hero-title em { color: var(--gold); font-style: italic; }

  /* featured badge */
  .featured-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.58rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .featured-badge::before { content: ''; display: block; width: 20px; height: 1px; background: var(--gold); }

  /* card overlay text */
  .card-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 0.4rem;
  }
  .card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(0.95rem, 1.4vw, 1.2rem);
    font-weight: 400;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 0.35rem;
  }
  .card-excerpt {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.58);
    line-height: 1.6;
    margin-bottom: 0.7rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-date { font-family: 'DM Sans', sans-serif; font-size: 0.62rem; color: rgba(255,255,255,0.38); }
  .card-read-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    color: var(--gold);
    font-weight: 600;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: gap 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .card-read-link:hover { gap: 0.55rem; }

  .blog-state-wrap {
    min-height: 60vh;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Sans', sans-serif;
    color: var(--mist); font-size: 0.9rem;
  }

  @media (max-width: 900px) {
    .masonry-cols { columns: 2 !important; }
  }
  @media (max-width: 640px) {
    .blog-hero { padding-top: 100px; padding-bottom: 2.5rem; }
    .masonry-cols { columns: 1 !important; }
    .featured-excerpt-text { display: none; }
  }
  @media (max-width: 480px) {
    .blog-hero-title { font-size: clamp(2.6rem, 11vw, 3.5rem); }
  }
`;

/* All sizing for image containers is via inline styles so nothing can override */
export default function BlogClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBlogs(); }, []);

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/blogs?published=true');
      const data = await res.json();
      if (data.success) setBlogs(data.data || []);
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (<><style>{styles}</style><div className="blog-state-wrap">Loading stories…</div></>);
  if (!blogs.length) return (<><style>{styles}</style><div className="blog-state-wrap">No blog posts found.</div></>);

  const [featured, ...rest] = blogs;

  return (
    <>
      <style>{styles}</style>

      {/* Hero */}
      <section className="blog-hero">
        <div className="container">
          <p className="blog-hero-eyebrow">
            <span className="blog-hero-rule" />
            Our Blog
          </p>
          <h1 className="blog-hero-title">
            Stories &amp;<br />
            <em>inspiration</em>
          </h1>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">

          {/* ── Featured: motion.div IS the container with explicit height ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              height: '480px',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '3rem',
              boxShadow: '0 12px 56px rgba(0,0,0,0.18)',
            }}
          >
            <img
              src={featured.coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=85'}
              alt={featured.title}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* gradient overlay + content */}
            <Link
              href={`/blog/${featured.slug}`}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, rgba(14,12,10,0.92) 0%, rgba(14,12,10,0.45) 45%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2.5rem 3rem',
                textDecoration: 'none',
              }}
            >
              <span className="featured-badge">Featured Article</span>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 300,
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em',
                maxWidth: '640px',
              }}>
                {featured.title}
              </h2>
              <p className="featured-excerpt-text" style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8,
                marginBottom: '1.25rem',
                maxWidth: '520px',
              }}>
                {featured.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)' }}>
                  {new Date(featured.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="card-read-link">Read Article →</span>
              </div>
            </Link>
          </motion.div>

          {/* ── Masonry grid ── */}
          {rest.length > 0 && (
            <div className="masonry-cols" style={{ columns: 3, columnGap: '1.25rem' }}>
              {rest.map((blog, i) => {
                const aspect = ASPECT_VARIANTS[i % ASPECT_VARIANTS.length];
                const paddingTop = ASPECT_PADDING[aspect];
                return (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      breakInside: 'avoid',
                      marginBottom: '1.25rem',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
                      display: 'block',
                    }}
                  >
                    {/* padding-top trick: creates height proportional to width */}
                    <div style={{ position: 'relative', width: '100%', paddingTop, overflow: 'hidden' }}>
                      <img
                        src={blog.coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'}
                        alt={blog.title}
                        style={{
                          position: 'absolute',
                          top: 0, left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <Link
                        href={`/blog/${blog.slug}`}
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, right: 0, bottom: 0,
                          background: 'linear-gradient(to top, rgba(14,12,10,0.90) 0%, rgba(14,12,10,0.35) 50%, transparent 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          padding: '1.25rem',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="card-tag">Blog Post</span>
                        <h3 className="card-title">{blog.title}</h3>
                        <p className="card-excerpt">{blog.excerpt}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="card-date">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="card-read-link">Read →</span>
                        </div>
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
}