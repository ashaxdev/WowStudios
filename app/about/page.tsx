'use client';
import PublicLayout from '@/components/layout/PublicLayout';
import AIChatbot from '@/components/chatbot/AIChatbot';

const values = [
  {
    icon: '📸',
    title: 'Experienced Professionals',
    desc: 'Expert photographers with 5+ years of experience capturing weddings, portraits, events, and special moments.',
  },
  {
    icon: '⏰',
    title: 'Open 24 Hours',
    desc: 'Available whenever you need us, offering flexible scheduling and round-the-clock support for your events.',
  },
  {
    icon: '🎬',
    title: 'Candid & Cinematic Style',
    desc: 'We specialize in candid, natural, and cinematic storytelling that beautifully preserves genuine emotions.',
  },
  {
    icon: '🌍',
    title: 'Serving Across Tamil Nadu',
    desc: 'Based in Tirunelveli and proudly serving clients throughout Tamil Nadu and destination locations beyond.',
  },
];

const services = [
  'Wedding Photography & Videography',
  'Candid Photography',
  'Drone Coverage',
  'Pre-Wedding Sessions',
  'Destination Weddings',
  'Maternity Photography',
  'Newborn Photography',
  'Birthday Celebrations',
  'Family Portraits',
  'Corporate Photography',
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <style>{`
        /* ── Reset & base ── */
        * { box-sizing: border-box; }

        /* ── Hero ── */
        .about-hero {
          background: var(--charcoal);
          padding-top: 140px;
          padding-bottom: 5rem;
          position: relative;
          overflow: hidden;
        }
        .about-hero-ring {
          position: absolute;
          right: -200px;
          top: 50%;
          transform: translateY(-50%);
          width: 600px;
          height: 600px;
          border: 1px solid rgba(184,147,90,0.07);
          border-radius: 50%;
          pointer-events: none;
        }
        .about-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 7vw, 6rem);
          font-weight: 300;
          color: white;
          line-height: 1.05;
          max-width: 700px;
          margin: 0;
        }

        /* ── Label row ── */
        .label-row {
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .label-row span {
          width: 28px;
          height: 1px;
          background: var(--gold);
          display: block;
          flex-shrink: 0;
        }
        .label-row-center {
          justify-content: center;
        }

        /* ── Story section ── */
        .story-section {
          background: var(--cream);
        }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .story-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 300;
          color: var(--charcoal);
          line-height: 1.15;
          margin-bottom: 1.75rem;
        }
        .story-body {
          font-size: 0.9rem;
          color: var(--mist);
          line-height: 1.95;
          margin-bottom: 1.25rem;
        }

        /* ── Expertise card ── */
        .expertise-card {
          background: #fff;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
        }
        .expertise-card-ring {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 180px;
          height: 180px;
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 50%;
          pointer-events: none;
        }
        .expertise-label {
          color: var(--gold);
          letter-spacing: 4px;
          font-size: 0.8rem;
          text-transform: uppercase;
          font-weight: 600;
        }
        .expertise-heading {
          font-size: clamp(1.6rem, 3vw, 2.5rem);
          margin: 1rem 0 2rem;
          font-family: 'Cormorant Garamond', serif;
          color: #1a1a1a;
        }
        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0;
        }
        .expertise-item {
          padding: 1.1rem 0.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .expertise-num {
          font-size: 1.6rem;
          font-family: 'Cormorant Garamond', serif;
          color: var(--gold);
          min-width: 36px;
          flex-shrink: 0;
        }
        .expertise-name {
          margin: 0;
          color: #555;
          font-weight: 500;
          font-size: 0.88rem;
          line-height: 1.4;
        }
        .expertise-footer {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .expertise-stat-num {
          margin: 0;
          font-size: 3rem;
          font-family: 'Cormorant Garamond', serif;
          color: var(--gold);
          line-height: 1;
        }
        .expertise-stat-label {
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.75rem;
          color: #888;
          display: block;
          margin-top: 0.25rem;
        }

        /* ── Values section ── */
        .values-section {
          background: var(--ivory);
          border-top: 1px solid var(--border);
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .value-card {
          padding: 2rem;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 2px;
          box-shadow: var(--shadow-soft);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-med);
        }
        .value-icon {
          font-size: 1.5rem;
          color: var(--gold);
          display: block;
          margin-bottom: 1rem;
        }
        .value-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 0.75rem;
        }
        .value-desc {
          font-size: 0.82rem;
          color: var(--mist);
          line-height: 1.8;
          margin: 0;
        }

        /* ── MOBILE BREAKPOINTS ── */
        @media (max-width: 900px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .expertise-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            padding-top: 100px;
            padding-bottom: 3rem;
          }
          .about-hero-ring {
            display: none;
          }
          .about-hero h1 {
            font-size: clamp(2rem, 10vw, 3rem);
          }
          .story-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .expertise-card {
            padding: 1.75rem 1.25rem;
          }
          .expertise-heading {
            font-size: 1.6rem;
          }
          .expertise-grid {
            grid-template-columns: 1fr;
          }
          .expertise-footer {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .values-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .value-card {
            padding: 1.5rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .about-hero {
            padding-top: 90px;
            padding-bottom: 2.5rem;
          }
          .values-grid {
            grid-template-columns: 1fr;
          }
          .story-body {
            font-size: 0.85rem;
          }
          .expertise-item {
            padding: 0.9rem 0;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-ring" />
        <div className="container">
          <p className="label-row">
            <span />Our Story
          </p>
          <h1>
            Capturing Your <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Most Precious Moments</em>
          </h1>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            {/* Left: text */}
            <div>
              <p className="label-row">
                <span />Founded 2015
              </p>
              <h2 className="story-heading">
                Five years of<br />
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>beautiful storytelling</em>
              </h2>
              <p className="story-body">
                Wow Shotz Studio is a professional photography and videography studio based in Tirunelveli,
                Tamil Nadu, with over 5 years of experience in preserving life's most meaningful milestones.
              </p>
              <p className="story-body" style={{ opacity: 0.85 }}>
                We are a team of passionate visual storytellers dedicated to delivering stunning imagery that
                you'll treasure forever. From the grandeur of a wedding day to the delicate beauty of a
                newborn's first moments, we approach every shoot with creativity, care, and an eye for
                authentic emotion.
              </p>
            </div>

            {/* Right: expertise card */}
            <div className="expertise-card">
              <div className="expertise-card-ring" />
              <span className="expertise-label">Our Expertise</span>
              <h2 className="expertise-heading">Capturing Life's Finest Moments</h2>

              <div className="expertise-grid">
                {services.map((service, index) => (
                  <div key={index} className="expertise-item">
                    <span className="expertise-num">{String(index + 1).padStart(2, '0')}</span>
                    <p className="expertise-name">{service}</p>
                  </div>
                ))}
              </div>

              <div className="expertise-footer">
                <div>
                  <p className="expertise-stat-num">5+</p>
                  <span className="expertise-stat-label">Years of Experience</span>
                </div>
                <div>
                  <p className="expertise-stat-num">500+</p>
                  <span className="expertise-stat-label">Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section values-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="label-row label-row-center">
              <span />Our Values
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: 'var(--charcoal)',
              margin: 0,
            }}>
              Why Choose Us
            </h2>
          </div>
          <div className="values-grid">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AIChatbot />
    </PublicLayout>
  );
}