'use client';

import { useEffect, useRef } from 'react';

export default function StatsSection() {

  const vfRef = useRef<HTMLDivElement>(null);
  const mobileVfRef = useRef<HTMLDivElement>(null);

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

  const loadMobileVideo = () => {

    if (!mobileVfRef.current) return;

    mobileVfRef.current.innerHTML = '';
    mobileVfRef.current.appendChild(createIframe());
  };

  /* AUTO LOAD VIDEO */

  useEffect(() => {

    loadDesktopVideo();
    loadMobileVideo();

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
          --white:#fdf6f0;
          --off:#faeee8;
          --linen:#f5e4dc;
          --stone:#e8cfc6;
          --taupe:#c9958a;
          --mink:#b5736a;
          --espresso:#b76e79;
          --espresso60:rgba(183,110,121,0.75);
          --espresso35:rgba(183,110,121,0.55);
          --copper:#c9848e;
          --copper-lt:#d9a0aa;
          --border:rgba(183,110,121,0.2);
        }

        body{
          overflow-x:hidden;
        }

        .s-wrap{
          width:100%;
          min-height:100vh;
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
          border:0.5px solid var(--copper);
          opacity:0.3;
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
          background:var(--copper);
          opacity:0.5;
        }

        .s-eyebrow span{
          font-size:0.62rem;
          letter-spacing:0.32em;
          text-transform:uppercase;
          color:var(--copper);
        }

        .s-quote{
          font-family:'Cormorant Garamond',serif;
          font-size:1.2rem;
          font-style:italic;
          color:var(--espresso60);
          line-height:1.7;
          max-width:340px;
          margin-bottom:1.5rem;
        }

        .s-body{
          font-size:0.82rem;
          line-height:2;
          max-width:320px;
          color:var(--espresso35);
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

        /* MOBILE */

        .s-mobile-media{
          display:none;
        }

        @media(max-width:640px){

          .s-grid{
            grid-template-columns:1fr;
          }

          .s-left,
          .s-right{
            display:none;
          }

          .s-mobile-media{
            display:flex;
            justify-content:center;
            align-items:stretch;
            gap:14px;
            padding:1.5rem 1rem;
            border-bottom:0.5px solid var(--border);
          }

          .s-mobile-img-wrap,
          .s-mobile-vid-wrap{
            width:48%;
            max-width:170px;
            aspect-ratio:9/16;
          }

          .s-mobile-img-wrap{
            position:relative;
          }

          .s-mobile-img-wrap::before{
            content:'';
            position:absolute;
            top:6px;
            left:6px;
            width:100%;
            height:100%;
            border:0.5px solid var(--copper);
            opacity:0.3;
          }

          .s-mobile-img{
            width:100%;
            height:100%;
            object-fit:cover;
            position:relative;
            z-index:1;
          }

          .s-mobile-vid-wrap{
            position:relative;
          }

          .s-mobile-vid-frame{
            width:100%;
            height:100%;
            overflow:hidden;
            position:relative;
            background:black;
            border-radius:2px;
          }

          .s-centre{
            border-right:none;
            padding:2.5rem 1.2rem 3rem;
          }

          .s-eyebrow{
            gap:0.5rem;
            margin-bottom:1.4rem;
          }

          .s-eyebrow span{
            font-size:0.5rem;
            line-height:1.6;
            text-align:center;
          }

          .s-quote{
            font-size:1rem;
          }

          .s-body{
            font-size:0.74rem;
          }

        }

      `}</style>

      <section className="s-wrap">

        <div className="s-grid">

          {/* MOBILE */}

          <div className="s-mobile-media">

            <div className="s-mobile-img-wrap">

              <img
                className="s-mobile-img"
                src="photos/divya.jpg"
                alt="Photography"
              />

            </div>

            <div className="s-mobile-vid-wrap">

              <div
                className="s-mobile-vid-frame"
                ref={mobileVfRef}
              />

            </div>

          </div>

          {/* LEFT */}

          <div className="s-left">

            <div className="s-img-wrap">

              <img
                className="s-photo"
                src="photos/divya.jpg"
                alt="Photography"
              />

            </div>

          </div>

          {/* CENTER */}

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
              creativity, and authenticity.
            </p>

          </div>

          {/* RIGHT */}

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