'use client';

const items = ['Maternity Photography', '✦', 'Newborn Photography', '✦', 'Birthday Shoots', '✦', 'Pre-Wedding', '✦', 'Family Photography', '✦', 'Corporate Shoots', '✦', 'Event Coverage', '✦'];

export default function MarqueeSection() {
  return (
    <div style={{ background: 'var(--ivory)', padding: '1.1rem 0', overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="marquee-track">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: item === '✦' ? 'var(--gold)' : 'var(--mist)',
            padding: '0 2rem', fontWeight: 500, whiteSpace: 'nowrap',
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}
