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

// Cycle through different aspect ratios for visual variety in masonry
const ASPECT_VARIANTS = ['tall', 'square', 'wide', 'tall', 'wide', 'square'];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── Hero ── */
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

  .blog-hero-rule {
    width: 28px;
    height: 1px;
    background: var(--gold);
    display: block;
    flex-shrink: 0;
  }

  .blog-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 300;
    color: white;
    line-height: 1.0;
    letter-spacing: -0.01em;
  }

  .blog-hero-title em {
    color: var(--gold);
    font-style: italic;
  }

  /* ── Featured ── */
  .featured-wrap {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 3rem;
    box-shadow: 0 12px 56px rgba(0,0,0,0.18);
    height: 480px;
  }

  .featured-wrap img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .featured-wrap:hover img {
    transform: scale(1.04);
  }

  .featured-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(14,12,10,0.92) 0%,
      rgba(14,12,10,0.45) 45%,
      transparent 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2.5rem 3rem;
  }

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

  .featured-badge::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: var(--gold);
  }

  .featured-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 300;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
    max-width: 640px;
  }

  .featured-excerpt {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.65);
    line-height: 1.8;
    margin-bottom: 1.25rem;
    max-width: 520px;
  }

  .featured-footer {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .featured-date {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.45);
  }

  /* ── Masonry Grid ── */
  .masonry-grid {
    columns: 3;
    column-gap: 1.25rem;
  }

  .blog-card {
    break-inside: avoid;
    margin-bottom: 1.25rem;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    display: block;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0,0,0,0.14);
    transition: box-shadow 0.35s ease, transform 0.35s ease;
  }

  .blog-card:hover {
    box-shadow: 0 16px 52px rgba(0,0,0,0.26);
    transform: translateY(-4px);
  }

  /* image fills entirely — padding-top trick gives reliable height */
  .card-img-wrap {
    width: 100%;
    position: relative;
    display: block;
    overflow: hidden;
  }

  .card-img-wrap img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .blog-card:hover .card-img-wrap img {
    transform: scale(1.06);
  }

  /* padding-top forces explicit height so img has a container to fill */
  .card-img-wrap.tall   { padding-top: 133%; } /* 3:4  */
  .card-img-wrap.square { padding-top: 100%; } /* 1:1  */
  .card-img-wrap.wide   { padding-top: 75%;  } /* 4:3  */

  /* text overlay pinned to bottom of image */
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(14,12,10,0.90) 0%,
      rgba(14,12,10,0.40) 50%,
      transparent 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.25rem;
    transition: background 0.35s ease;
  }

  .blog-card:hover .card-overlay {
    background: linear-gradient(
      to top,
      rgba(14,12,10,0.95) 0%,
      rgba(14,12,10,0.55) 55%,
      transparent 100%
    );
  }

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
    letter-spacing: -0.01em;
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

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-date {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    color: rgba(255,255,255,0.38);
  }

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

  /* ── States ── */
  .blog-state-wrap {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    color: var(--mist);
    font-size: 0.9rem;
    letter-spacing: 0.05em;
  }

  /* ── MOBILE ── */
  @media (max-width: 900px) {
    .masonry-grid { columns: 2; }
  }

  @media (max-width: 640px) {
    .blog-hero {
      padding-top: 100px;
      padding-bottom: 2.5rem;
    }

    .featured-wrap {
      height: 320px;
      margin-bottom: 2rem;
    }

    .featured-overlay {
      padding: 1.5rem;
    }

    .featured-excerpt { display: none; }

    .masonry-grid {
      columns: 1;
      column-gap: 0;
    }

    .blog-card { margin-bottom: 1rem; }
  }

  @media (max-width: 480px) {
    .blog-hero-title {
      font-size: clamp(2.6rem, 11vw, 3.5rem);
    }
  }
`;

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

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="blog-state-wrap">Loading stories…</div>
      </>
    );
  }

  if (!blogs.length) {
    return (
      <>
        <style>{styles}</style>
        <div className="blog-state-wrap">No blog posts found.</div>
      </>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <>
      <style>{styles}</style>

      {/* ── Hero ── */}
      <section className="blog-hero">
        <div className="container">
          <p className="blog-hero-eyebrow">
            <span className="blog-hero-rule" />
            Our Blog
          </p>
          <h1 className="blog-hero-title">
            Stories &amp;
            <br />
            <em>inspiration</em>
          </h1>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">

          {/* Featured — full cover */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/blog/${featured.slug}`} className="featured-wrap" style={{ display: 'block' }}>
              <img
                src={featured.coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=85'}
                alt={featured.title}
              />
              <div className="featured-overlay">
                <span className="featured-badge">Featured Article</span>
                <h2 className="featured-title">{featured.title}</h2>
                <p className="featured-excerpt">{featured.excerpt}</p>
                <div className="featured-footer">
                  <span className="featured-date">
                    {new Date(featured.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                  <span className="card-read-link">Read Article →</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Masonry grid */}
          {rest.length > 0 && (
            <div className="masonry-grid">
              {rest.map((blog, i) => {
                const aspect = ASPECT_VARIANTS[i % ASPECT_VARIANTS.length];
                return (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={`/blog/${blog.slug}`} className="blog-card" style={{ display: 'block' }}>
                      <div className={`card-img-wrap ${aspect}`}>
                        <img
                          src={blog.coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'}
                          alt={blog.title}
                        />
                        <div className="card-overlay">
                          <span className="card-tag">Blog Post</span>
                          <h3 className="card-title">{blog.title}</h3>
                          <p className="card-excerpt">{blog.excerpt}</p>
                          <div className="card-footer">
                            <span className="card-date">
                              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric',
                              })}
                            </span>
                            <span className="card-read-link">Read →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
}