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
      height:100%;
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

        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Didact+Gothic&display=swap');

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
          min-height:10vh;
          background:var(--white);
          overflow:hidden;
          position:relative;
          font-family:'Didact Gothic',sans-serif;
        }

        .s-grid{
          min-height:100vh;
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
          font-size:0.62rem;
          letter-spacing:0.32em;
          text-transform:uppercase;
          color:var(--brown-light);
        }

        .s-quote{
          font-family:'Cormorant Garamond',serif;
          font-size:1.2rem;
          font-style:italic;
          color:var(--brown);
          line-height:1.7;
          max-width:340px;
          margin-bottom:1.5rem;
        }

        .s-body{
          font-size:0.82rem;
          line-height:2;
          max-width:320px;
          color:#5e5247;
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
          font-size:0.58rem;
          letter-spacing:0.28em;
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

        /* MOBILE LOGO */

        .s-mobile-logo-wrap{
          display:none;
        }

        /* MOBILE */

        @media(max-width:640px){

          .s-grid{
            grid-template-columns:1fr;
            min-height:auto;
          }

          .s-left,
          .s-right{
            display:none;
          }

          /* FULL WIDTH LOGO */

          .s-mobile-logo-wrap{
            display:flex;
            justify-content:center;
            align-items:center;
            width:100%;
            overflow:hidden;
            line-height:0;
          }

          .s-mobile-logo{
            width:100%;
            height:auto;
            object-fit:contain;
            display:block;
            margin-bottom:-6px;
          }

          /* TEXT */

          .s-centre{
            border-right:none;
            padding:2rem 1.2rem 2.5rem;
          }

          .s-eyebrow{
            gap:0.5rem;
            margin-bottom:1.4rem;
          }

          .s-eyebrow-rule{
            width:16px;
          }

          .s-eyebrow span{
            font-size:0.5rem;
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

          {/* LEFT IMAGE */}

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
                style={{
                  transform:'scaleX(-1)',
                }}
              />

            </div>

            <p className="s-quote">
              “Capturing emotions, celebrations,
              and memories that last forever”
            </p>

            <p className="s-body">
              From weddings and grand celebrations
              to baby shoots and intimate family moments —
              we preserve every emotion with elegance,
              creativity, and{' '}
              <span className="s-highlight">
                authenticity.
              </span>
            </p>

          </div>

          {/* RIGHT VIDEO */}

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

      </section>

    </>
  );
}