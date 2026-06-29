'use client';

import { useEffect, useRef } from 'react';

export default function StatsSection() {

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

        /* ── DESKTOP GRID ── */

        .s-grid{
          display:grid;
          grid-template-columns:1fr;
          position:relative;
          z-index:1;
        }

        /* CENTER */

        .s-centre{
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

        /* ── MOBILE LOGO (full-width banner) ── */

        .s-mobile-logo-wrap{
          display:none;
        }

        /* ── MOBILE BREAKPOINT ── */

        @media(max-width:640px){

          .s-grid{
            grid-template-columns:1fr;
            grid-template-rows:auto auto;
            min-height:auto;
            gap:0;
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

          /* ── TEXT BLOCK ── */

          .s-centre{
            border-top:0.5px solid var(--border);
            border-bottom:none;
            padding:2rem 1.2rem 2.5rem;
            grid-column:1;
            grid-row:2;
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

        </div>

      </section>

    </>
  );
}