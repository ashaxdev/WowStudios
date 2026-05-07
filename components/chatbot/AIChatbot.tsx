'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message { role: 'user' | 'assistant'; content: string; }

const SYSTEM = `You are the friendly AI assistant for Wow Shotz Studio, a professional photography studio in Tirunelveli, Tamil Nadu, India.
Key info:
- Studio: Wow Shotz Studio, 94G/2, 1st Main Rd, Kodeeswaran Nagar, Pettai, Tirunelveli, Tamil Nadu 627004
- Phone/WhatsApp: 096558 37868
- Rating: 4.9 stars with 88+ reviews on Google Maps
- Hours: Mon to Sun, 9 AM to 8 PM
- Services: Maternity Photography, Newborn Photography, Birthday Shoots, Pre-Wedding, Family Photography, Product Photography, Corporate Shoots, Event Coverage
- Booking: WhatsApp, phone call, or visit the studio
- Be warm, friendly, brief (2-3 sentences max). Always end with a booking call to action.`;

const quickReplies = ['Services & Pricing', 'How to Book', 'Studio Location', 'Birthday Packages'];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! Welcome to Wow Shotz Studio! 📸 I\'m your AI assistant. Ask me about our services, packages, or how to book a session!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    setInput('');
    const updated: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          system: SYSTEM,
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Please call us at 096558 37868!';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oops! Please WhatsApp us at 096558 37868 📱' }]);
    } finally { setLoading(false); }
  };

  const showQuick = messages.length <= 2;

  return (
    <>
      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/9655837868"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{
          position: 'fixed', bottom: '6.5rem', right: '1.5rem', zIndex: 800,
          width: 52, height: 52, borderRadius: '50%', background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.562 4.14 1.54 5.873L0 24l6.326-1.515A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.491-5.19-1.352l-.371-.218-3.752.899.938-3.641-.24-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

      {/* Chat bubble */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(v => !v)}
        aria-label="AI Chat"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 800,
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(184,147,90,0.45)',
          fontSize: '1.4rem',
        }}
      >
        {open ? '✕' : '🤖'}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', bottom: '5.5rem', right: '1.5rem', zIndex: 900,
              width: 340, maxWidth: 'calc(100vw - 2rem)',
              height: 480, maxHeight: '80vh',
              background: 'var(--white)', borderRadius: 16,
              boxShadow: 'var(--shadow-strong)',
              border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1rem 1.25rem', background: 'linear-gradient(135deg,var(--gold-light),var(--gold))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>📸</div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.87rem', color: 'white', lineHeight: 1.2 }}>Wow Shotz AI</p>
                <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.75)' }}>Online · Usually replies instantly</p>
              </div>
              <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1 }}>✕</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', background: 'var(--cream)' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '82%', padding: '0.6rem 0.9rem',
                    borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: m.role === 'user' ? 'linear-gradient(135deg,var(--gold-light),var(--gold))' : 'var(--white)',
                    color: m.role === 'user' ? 'white' : 'var(--slate)',
                    fontSize: '0.8rem', lineHeight: 1.65, fontWeight: m.role === 'user' ? 500 : 300,
                    border: m.role === 'assistant' ? '1px solid var(--border)' : 'none',
                    boxShadow: 'var(--shadow-soft)',
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: 5, padding: '0.25rem 0' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', display: 'block', opacity: 0.5, animation: `typingDot 1s ease ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {showQuick && (
              <div style={{ padding: '0 0.875rem 0.625rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', background: 'var(--cream)' }}>
                {quickReplies.map(q => (
                  <button key={q} onClick={() => send(q)} style={{ fontSize: '0.66rem', padding: '0.3rem 0.75rem', background: 'var(--white)', border: '1px solid var(--border-strong)', color: 'var(--gold)', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget.style.background = 'var(--gold)'); (e.currentTarget.style.color = 'white'); }}
                    onMouseLeave={e => { (e.currentTarget.style.background = 'var(--white)'); (e.currentTarget.style.color = 'var(--gold)'); }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', background: 'var(--white)' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about services, booking..."
                style={{ flex: 1, background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.55rem 0.9rem', color: 'var(--charcoal)', fontSize: '0.8rem', fontFamily: 'inherit', outline: 'none' }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{ width: 38, height: 38, borderRadius: 8, background: 'linear-gradient(135deg,var(--gold-light),var(--gold))', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: 'white', opacity: (loading || !input.trim()) ? 0.45 : 1, transition: 'opacity 0.2s' }}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
