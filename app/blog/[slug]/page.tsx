import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

interface BlogData {
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

async function getBlog(slug: string): Promise<BlogData | null> {
  try {
    await dbConnect();
    const blog = await Blog.findOne({
      slug: decodeURIComponent(slug),
      published: true,
    }).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog)) as BlogData;
  } catch (error) {
    console.error('GET BLOG PAGE ERROR:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog not found' };
  return {
    title: `${blog.title} – Wow Shotz Studio`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .bd-page {
    --bd-ink: #1a1a1a;
    --bd-smoke: #f7f5f2;
    --bd-mist: #8a8278;
    --bd-accent: #c8a96e;
    --bd-rule: #e8e4de;
    --bd-white: #ffffff;
    font-family: 'DM Sans', sans-serif;
    background: var(--bd-smoke);
    min-height: 100vh;
    color: var(--bd-ink);
  }
  .bd-page *, .bd-page *::before, .bd-page *::after { box-sizing: border-box; }

  /* Back bar */
  .bd-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(247, 245, 242, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--bd-rule);
    padding: 0 1.5rem;
    height: 56px;
    display: flex;
    align-items: center;
    margin-top: 80px; /* space for the site's fixed header */
  }
  .bd-back {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--bd-mist);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .bd-back:hover { color: var(--bd-ink); }
  .bd-back svg { transition: transform 0.2s ease; }
  .bd-back:hover svg { transform: translateX(-3px); }

  /* Hero */
  .bd-hero {
    background: var(--bd-ink);
    padding: 4rem 1.5rem 3.5rem;
    position: relative;
    overflow: hidden;
  }
  .bd-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 60% at 80% 20%, rgba(200,169,110,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 40% 50% at 10% 80%, rgba(200,169,110,0.07) 0%, transparent 50%);
    pointer-events: none;
  }
  .bd-hero-inner { max-width: 780px; margin: 0 auto; position: relative; }
  .bd-meta-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .bd-date {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--bd-accent);
  }
  .bd-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: rgba(255,255,255,0.25);
  }
  .bd-topic {
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }
  .bd-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2rem, 5.5vw, 3.6rem);
    font-weight: 700;
    line-height: 1.15;
    color: #fff;
    letter-spacing: -0.01em;
    margin: 0 0 1.5rem;
  }
  .bd-hero-rule { width: 48px; height: 2px; background: var(--bd-accent); }

  /* Cover */
  .bd-cover-wrap {
    max-width: 780px;
    margin: 0 auto;
    padding: 0 1.5rem;
    transform: translateY(-2rem);
  }
  .bd-cover-img {
    width: 100%;
    max-height: 460px;
    object-fit: cover;
    border-radius: 6px;
    display: block;
    box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  }

  /* Body */
  .bd-body { max-width: 780px; margin: 0 auto; padding: 0 1.5rem 5rem; }
  .bd-body--no-image { padding-top: 3rem; }
  .bd-excerpt {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-size: clamp(1.05rem, 2.5vw, 1.25rem);
    line-height: 1.85;
    color: var(--bd-mist);
    padding: 1.75rem 0 2rem;
    border-bottom: 1px solid var(--bd-rule);
    margin: 0 0 2.5rem;
  }
  .bd-content {
    font-size: clamp(0.95rem, 2vw, 1.05rem);
    line-height: 1.95;
    color: #2e2b27;
    word-wrap: break-word;
  }
  .bd-content--plain { white-space: pre-wrap; }
  .bd-content h1, .bd-content h2, .bd-content h3, .bd-content h4 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    color: var(--bd-ink);
    margin: 2.25em 0 0.75em;
    line-height: 1.25;
  }
  .bd-content h1 { font-size: clamp(1.6rem, 3.5vw, 2rem); }
  .bd-content h2 { font-size: clamp(1.35rem, 3vw, 1.65rem); }
  .bd-content h3 { font-size: clamp(1.15rem, 2.5vw, 1.35rem); }
  .bd-content p { margin: 0 0 1.4em; }
  .bd-content a {
    color: var(--bd-ink);
    text-decoration: underline;
    text-decoration-color: var(--bd-accent);
    text-underline-offset: 3px;
  }
  .bd-content a:hover { color: var(--bd-accent); }
  .bd-content blockquote {
    border-left: 3px solid var(--bd-accent);
    padding: 0.5em 0 0.5em 1.5em;
    margin: 2em 0;
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-size: 1.1em;
    color: var(--bd-mist);
  }
  .bd-content ul, .bd-content ol { padding-left: 1.5em; margin: 0 0 1.4em; }
  .bd-content ul { list-style: disc; }
  .bd-content ol { list-style: decimal; }
  .bd-content li { margin-bottom: 0.4em; }
  .bd-content img { max-width: 100%; height: auto; border-radius: 4px; margin: 1.5em 0; }
  .bd-content code {
    font-size: 0.87em;
    background: #edeae4;
    padding: 0.15em 0.4em;
    border-radius: 3px;
  }
  .bd-content pre {
    background: var(--bd-ink);
    color: #e8e4de;
    padding: 1.25em 1.5em;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1.75em 0;
    font-size: 0.88em;
    line-height: 1.7;
  }
  .bd-content pre code { background: none; padding: 0; }

  /* Tags */
  .bd-tags { margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--bd-rule); }
  .bd-tags-label {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--bd-mist);
    margin: 0 0 1rem;
  }
  .bd-tags-list { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .bd-chip {
    padding: 0.35rem 0.85rem;
    background: var(--bd-white);
    border: 1px solid var(--bd-rule);
    border-radius: 999px;
    font-size: 0.78rem;
    color: var(--bd-mist);
    letter-spacing: 0.03em;
    transition: border-color 0.2s, color 0.2s;
  }
  .bd-chip:hover { border-color: var(--bd-accent); color: var(--bd-ink); }

  @media (max-width: 640px) {
    .bd-nav { margin-top: 64px; }
    .bd-hero { padding: 3rem 1.25rem 2.75rem; }
    .bd-cover-wrap { padding: 0 1.25rem; transform: translateY(-1.5rem); }
    .bd-body { padding: 0 1.25rem 4rem; }
    .bd-cover-img { max-height: 220px; }
  }
  @media (min-width: 1024px) {
    .bd-hero { padding: 5rem 2rem 4rem; }
    .bd-cover-wrap { padding: 0 2rem; }
    .bd-body { padding: 0 2rem 6rem; }
  }
`;

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

  // If the content has no HTML tags (plain textarea), keep line breaks
  const isHtml = /<[a-z][\s\S]*>/i.test(blog.content);

  return (
    <PublicLayout>
      <style>{styles}</style>

      <div className="bd-page">
        <nav className="bd-nav">
          <Link href="/blog" className="bd-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All articles
          </Link>
        </nav>

        <header className="bd-hero">
          <div className="bd-hero-inner">
            <div className="bd-meta-row">
              <span className="bd-date">{formattedDate}</span>
              {blog.tags?.length > 0 && (
                <>
                  <span className="bd-dot" />
                  <span className="bd-topic">{blog.tags[0]}</span>
                </>
              )}
            </div>
            <h1 className="bd-title">{blog.title}</h1>
            <div className="bd-hero-rule" />
          </div>
        </header>

        {blog.coverImage && (
          <div className="bd-cover-wrap">
            <img src={blog.coverImage} alt={blog.title} className="bd-cover-img" />
          </div>
        )}

        <main className={`bd-body${blog.coverImage ? '' : ' bd-body--no-image'}`}>
          {blog.excerpt && <p className="bd-excerpt">{blog.excerpt}</p>}

          <div
            className={`bd-content${isHtml ? '' : ' bd-content--plain'}`}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.tags?.length > 0 && (
            <div className="bd-tags">
              <p className="bd-tags-label">Topics</p>
              <div className="bd-tags-list">
                {blog.tags.map((tag) => (
                  <span key={tag} className="bd-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </PublicLayout>
  );
}