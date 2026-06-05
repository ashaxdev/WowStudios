'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <div className="logo-box">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="8"
                width="24"
                height="18"
                rx="3"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="16"
                cy="17"
                r="5"
                stroke="white"
                strokeWidth="2"
              />
              <circle cx="16" cy="17" r="2" fill="white" />
              <path
                d="M11 8V7C11 5.9 11.9 5 13 5H19C20.1 5 21 5.9 21 7V8"
                stroke="white"
                strokeWidth="2"
              />
              <circle cx="24" cy="12" r="1.5" fill="white" />
            </svg>
          </div>

          <h1 className="login-title">Studio Admin</h1>
          <p className="login-subtitle">
            Sign in to manage your studio
          </p>
        </div>

        <div className="login-card">
          <form onSubmit={handleLogin} className="login-form">

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="admin@photostudio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="error-box">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>
        </div>

        <p className="login-footer">
         Nexira Solution © {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
}
