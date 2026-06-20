'use client';

import { useEffect, useRef } from 'react';

export default function StatsSection() {

  const vfRef = useRef<HTMLDivElement>(null);

  const VIDEO_URL =
    'https://www.youtube.com/embed/t95SiS4OiQw?autoplay=1&mute=1&playsinline=1&loop=1&playlist=t95SiS4OiQw&controls=0&showinfo=0&rel=0&modestbranding=1';

  const createIframe = () => {

    const iframe = document.createElement('iframe');

    iframe.src = VIDEO_URL;

    iframe.allow =
      'autoplay; encrypted-media; picture-in-picture';

    iframe.allowFullscreen = true;

    iframe.style.cssText = `
      position:absolute;
      top:50%;
      left:50%;
      width:220%;
      transform:translate(-50%, -50%);
      border:none;
      pointer-events:none;
    `;

    return iframe;
  };

  const loadDesktopVideo = () => {

    if (!vfRef.current) return;

    vfRef.current.innerHTML = '';
    vfRef.current.appendChild(createIframe());
  };

  useEffect(() => {

    loadDesktopVideo();

  }, []);

  return (
    <>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        :root{
          --white:#f8f5f1;
          --off:#f2ede7;
          --linen:#ece5dd;
          --stone:#d8cfc4;
          --taupe:#8d7b68;
          --brown:#4a3426;
          --brown-light:#6e5647;
          --border:rgba(74,52,38,0.12);
        }

        body{
          overflow-x:hidden;
        }

        .s-wrap{
          width:100%;
          background:var(--white);
          overflow:hidden;
          position:relative;
          font-family:'Lato', sans-serif;
        }

        /* ── DESKTOP GRID (unchanged) ── */

        .s-grid{
          display:grid;
          grid-template-columns:240px 1fr 160px;
          position:relative;
          z-index:1;
        }

        /* LEFT */

        .s-left{
          border-right:0.5px solid var(--border);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:3rem 1.5rem;
        }

        .s-img-wrap{
          width:190px;
          height:270px;
          position:relative;
        }

        .s-img-wrap::before{
          content:'';
          position:absolute;
          top:8px;
          left:8px;
          width:100%;
          height:100%;
          border:0.5px solid rgba(74,52,38,0.2);
          opacity:0.5;
        }

        .s-photo{
          width:100%;
          height:100%;
          object-fit:cover;
          position:relative;
          z-index:1;
        }

        /* CENTER */

        .s-centre{
          border-right:0.5px solid var(--border);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          padding:5rem 3rem;
        }

        .s-eyebrow{
          display:flex;
          align-items:center;
          gap:1rem;
          margin-bottom:2rem;
        }

        .s-eyebrow-rule{
          width:28px;
          height:0.5px;
          background:var(--brown-light);
          opacity:0.5;
        }

        .s-eyebrow span{
          font-family:'Cinzel', serif;
          font-size:0.52rem;
          font-weight:400;
          letter-spacing:0.28em;
          text-transform:uppercase;
          color:var(--brown-light);
        }

        .s-quote{
          font-family:'Cormorant Garamond', serif;
          font-size:1.2rem;
          font-style:italic;
          font-weight:300;
          color:var(--brown);
          line-height:1.7;
          max-width:340px;
          margin-bottom:1.5rem;
        }

        .s-body{
          font-family:'Lato', sans-serif;
          font-size:0.82rem;
          font-weight:300;
          line-height:2;
          max-width:320px;
          color:#5e5247;
          letter-spacing:0.01em;
        }

        .s-highlight{
          color:#000;
          font-weight:700;
        }

        /* RIGHT VIDEO */

        .s-right{
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-end;
          gap:1rem;
          padding-bottom:3rem;
        }

        .s-vid-label{
          font-family:'Cinzel', serif;
          font-size:0.48rem;
          font-weight:400;
          letter-spacing:0.24em;
          text-transform:uppercase;
          color:var(--taupe);
          writing-mode:vertical-rl;
          transform:rotate(180deg);
        }

        .s-vid-frame{
          width:108px;
          aspect-ratio:9/16;
          overflow:hidden;
          position:relative;
          border-radius:2px;
          background:black;
          border:0.5px solid var(--border);
        }

        /* ── MOBILE LOGO (full-width banner) ── */

        .s-mobile-logo-wrap{
          display:none;
        }

        /* ── MOBILE MEDIA ROW (image + video side by side) ── */

        .s-mobile-media{
          display:none;
        }

        /* ── MOBILE BREAKPOINT ── */

        @media(max-width:640px){

          /* Collapse desktop grid to single column */
          .s-grid{
            grid-template-columns:1fr;
            grid-template-rows:auto auto auto;
            min-height:auto;
            gap:0;
          }

          /* Hide desktop left/right columns */
          .s-left{
            display:none;
          }

          .s-right{
            display:none;
          }

          /* ── FULL WIDTH LOGO BANNER ── */

          .s-mobile-logo-wrap{
            display:flex;
            justify-content:center;
            align-items:center;
            width:100%;
            overflow:hidden;
            padding:5px;
            margin:15px;
            line-height:0;
            grid-column:1;
            grid-row:1;
          }

          .s-mobile-logo{
            width:100%;
            height:auto;
            display:block;
            object-fit:cover;
            margin:0;
            padding:0;
          }

          /* ── TEXT BLOCK — moved to row 3 (bottom) ── */

          .s-centre{
            border-right:none;
            border-top:0.5px solid var(--border);
            border-bottom:none;
            padding:2rem 1.2rem 2.5rem;
            grid-column:1;
            grid-row:3;
          }

          .s-eyebrow{
            gap:0.5rem;
            margin-bottom:1.4rem;
          }

          .s-eyebrow-rule{
            width:16px;
          }

          .s-eyebrow span{
            font-size:0.44rem;
            line-height:1.6;
            text-align:center;
            letter-spacing:0.18em;
          }

          .s-quote{
            font-size:1rem;
            margin-bottom:1rem;
          }

          .s-body{
            font-size:0.74rem;
            line-height:1.9;
          }

          /* ── 2-COLUMN MEDIA ROW — moved to row 2 (below logo) ── */

          .s-mobile-media{
            display:grid;
            grid-template-columns:1fr 1fr;
            grid-column:1;
            grid-row:2;
          }

          /* Image cell */
          .s-mobile-media__img{
            border-right:0.5px solid var(--border);
            display:flex;
            align-items:center;
            justify-content:center;
            padding:1.5rem 1rem;
          }

          .s-mobile-img-wrap{
            width:100%;
            max-width:160px;
            aspect-ratio:190/270;
            position:relative;
          }

          .s-mobile-img-wrap::before{
            content:'';
            position:absolute;
            top:6px;
            left:6px;
            width:100%;
            height:100%;
            border:0.5px solid rgba(74,52,38,0.2);
            opacity:0.5;
          }

          .s-mobile-img-wrap img{
            width:100%;
            height:100%;
            object-fit:cover;
            position:relative;
            z-index:1;
            display:block;
          }

          /* Video cell */
          .s-mobile-media__vid{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:flex-end;
            gap:0.75rem;
            padding:1.5rem 1rem;
          }

          .s-mobile-vid-label{
            font-family:'Cinzel', serif;
            font-size:0.42rem;
            font-weight:400;
            letter-spacing:0.22em;
            text-transform:uppercase;
            color:var(--taupe);
            writing-mode:vertical-rl;
            transform:rotate(180deg);
          }

          .s-mobile-vid-frame{
            width:100%;
            max-width:120px;
            aspect-ratio:9/16;
            overflow:hidden;
            position:relative;
            border-radius:2px;
            background:black;
            border:0.5px solid var(--border);
          }

        }

      `}</style>

      <section className="s-wrap">

        <div className="s-grid">

          {/* MOBILE LOGO */}

          <div className="s-mobile-logo-wrap">

            <img
              className="s-mobile-logo"
              src="photos/website_logo.png"
              alt="Logo"
            />

          </div>

          {/* LEFT IMAGE — desktop only */}

          <div className="s-left">

            <div className="s-img-wrap">

              <img
                className="s-photo"
                src="photos/divya.jpg"
                alt="Photography"
              />

            </div>

          </div>

          {/* CENTER CONTENT */}

          <div className="s-centre">

            <div className="s-eyebrow">

              <div className="s-eyebrow-rule" />

              <span>
                Real Moments · Real Emotions · Timeless Stories
              </span>

              <div
                className="s-eyebrow-rule"
                style={{ transform: 'scaleX(-1)' }}
              />

            </div>

            <p className="s-quote">
              "Capturing emotions, celebrations,
              and memories that last forever"
            </p>

            <p className="s-body">
              From weddings and grand celebrations
              to baby shoots and intimate family moments —
              we preserve every emotion with elegance,
              creativity, and authenticity.
            </p>

          </div>

          {/* RIGHT VIDEO — desktop only */}

          <div className="s-right">

            <span className="s-vid-label">
              Watch Our Story
            </span>

            <div
              className="s-vid-frame"
              ref={vfRef}
            />

          </div>

        </div>

        {/* MOBILE MEDIA ROW — image + video in 2 cols, outside grid */}

        {/* <div className="s-mobile-media"> */}

          {/* Image col */}
          {/* <div className="s-mobile-media__img">

            <div className="s-mobile-img-wrap">

              <img
                src="photos/divya.jpg"
                alt="Photography"
              />

            </div>

          </div> */}

          {/* Video col */}
          {/* <div className="s-mobile-media__vid">

            <span className="s-mobile-vid-label">
              Watch Our Story
            </span>

            <div
              className="s-mobile-vid-frame"
              ref={(el) => {
                if (!el || el.childElementCount > 0) return;
                const iframe = document.createElement('iframe');
                iframe.src = VIDEO_URL;
                iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.style.cssText = `
                  position:absolute;
                  top:50%;
                  left:50%;
                  width:300%;
                  height:100%;
                  transform:translate(-50%, -50%);
                  border:none;
                  pointer-events:none;
                `;
                el.appendChild(iframe);
              }}
            />

          </div> */}

        {/* </div> */}

      </section>

    </>
  );
}