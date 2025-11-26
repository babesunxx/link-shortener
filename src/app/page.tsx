'use client';

import { useState } from 'react';
import SnowEffect from '@/components/SnowEffect';
import StructuredData from '@/components/StructuredData';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      // Call our own API
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <StructuredData />
      <SnowEffect />
      <main className="main-container">
        <div className="glass-panel content-wrapper">
          <h1 className="title">
            Link Shortener
          </h1>
          <p className="subtitle">ระบบย่อลิงก์ฟรี เปลี่ยนลิงก์ยาวๆ ให้สั้นกระชับ ใช้งานง่าย</p>

          <form onSubmit={handleSubmit} className="shortener-form">
            <div className="input-group">
              <input
                type="url"
                placeholder="Paste your long URL here..."
                className="custom-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="custom-button"
              disabled={loading}
            >
              {loading ? 'Shortening...' : 'Shorten Now'}
            </button>
          </form>

          {error && (
            <p className="error-msg">{error}</p>
          )}

          {shortUrl && (
            <div className="result-area">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="short-link"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="copy-btn"
                title="คัดลอกลิงก์"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
        
        <div className="ad-contact-container">
          <a
            href="https://t.me/sunflowering404"
            target="_blank"
            rel="noopener noreferrer"
            className="ad-contact-btn"
          >
            <span className="ad-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
            </span>
            <span className="ad-text">ติดต่อลงโฆษณา</span>
          </a>
        </div>
        
        <footer className="footer">
          <p>© 2025 Link Shortener. All rights reserved.</p>
        </footer>
        </main>
      </>
      );      
}      
