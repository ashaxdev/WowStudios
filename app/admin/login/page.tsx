'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    if (email === 'admin@wowshotz.com' && password === 'Admin@123456') {
      localStorage.setItem('admin_token', 'mock_token_' + Date.now());
      localStorage.setItem('admin_user', JSON.stringify({ name: 'Admin', email }));
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(212,168,83,0.25)', padding: '0.875rem 1rem', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none', borderRadius: 6, transition: 'border-color 0.25s' };

  return (
    <div style={{ minHeight: '100svh', background: 'linear-gradient(135deg,#0A0A08 0%,#1a1408 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,168,83,0.18)', padding: 'clamp(2rem,6vw,3rem)', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>📸</p>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: 5 }}>WOW SHOTZ</p>
          <p style={{ fontSize: '0.52rem', letterSpacing: '0.25em', color: '#D4A853', textTransform: 'uppercase', fontWeight: 600 }}>STUDIO ADMIN PORTAL</p>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A853', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} placeholder="admin@wowshotz.com" required
              onFocus={e => (e.currentTarget.style.borderColor = '#D4A853')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,83,0.25)')} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A853', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inp} placeholder="••••••••" required
              onFocus={e => (e.currentTarget.style.borderColor = '#D4A853')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,83,0.25)')} />
          </div>
          {error && <p style={{ color: '#f48a8a', fontSize: '0.82rem', textAlign: 'center' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding: '0.9rem', background: 'linear-gradient(135deg,#D4A853,#B8935A)', color: 'white', border: 'none', cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: loading ? 0.7 : 1, marginTop: '0.5rem', borderRadius: 6, transition: 'opacity 0.2s' }}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)', borderRadius: 6 }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Demo credentials:<br />
            <span style={{ color: 'rgba(212,168,83,0.7)' }}>admin@wowshotz.com / Admin@123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}
