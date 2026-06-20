import { useState } from 'react';
import './Login.css';
import { LogoIcon, CheckIcon, EyeIcon } from '../../components/Icons.jsx';

const HIGHLIGHTS = ['Scholarships', 'Internships', 'Career Roadmaps', 'AI Guidance'];

const NETWORK_LABELS = [
  { label: 'Internships', style: { top: '4%', left: '34%' } },
  { label: 'Career Growth', style: { top: '14%', left: '64%' } },
  { label: 'Scholarships', style: { top: '46%', left: '2%' } },
  { label: 'AI Guidance', style: { top: '58%', left: '70%' } },
];

export default function Login({ onSwitchToRegister }) {
  // Controlled form state — keys mirror the backend login request contract.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to POST /login once the backend is ready.
    // Expected request body: { email, password }
    console.log('Login submit payload:', formData);
  };

  return (
    <div className="login-page">
      <div className="star-field" />
      <div className="login-bg-glow login-bg-glow--1" />
      <div className="login-bg-glow login-bg-glow--2" />

      {/* ---------------------------------------------------------------- */}
      {/* Left: brand / hero panel                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="login-left">
        <div className="brand">
          <LogoIcon />
          <span className="brand-name">LifeLens AI</span>
        </div>

        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="gradient-text">LifeLens</span> AI
          </h1>
          <h2 className="hero-subtitle">
            Discover Opportunities.
            <br />
            Build Your Future.
          </h2>
          <p className="hero-description">
            AI-powered platform for scholarships, internships, jobs, government schemes, career
            planning and personal growth.
          </p>

          <div className="badge-row">
            {HIGHLIGHTS.map((item) => (
              <span className="badge-pill" key={item}>
                <CheckIcon />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="network-graphic" aria-hidden="true">
          <svg className="network-lines" viewBox="0 0 480 260" fill="none">
            <ellipse cx="240" cy="210" rx="190" ry="44" stroke="rgba(94,234,212,0.22)" strokeWidth="1" />
            <ellipse cx="240" cy="210" rx="120" ry="44" stroke="rgba(94,234,212,0.16)" strokeWidth="1" />
            <path d="M240 166v88M120 210h240" stroke="rgba(94,234,212,0.14)" strokeWidth="1" />
            <path d="M165 60 L195 175" stroke="rgba(94,234,212,0.3)" strokeWidth="1" />
            <path d="M330 45 L255 170" stroke="rgba(94,234,212,0.3)" strokeWidth="1" />
            <path d="M45 130 L185 190" stroke="rgba(94,234,212,0.3)" strokeWidth="1" />
            <path d="M395 150 L270 195" stroke="rgba(94,234,212,0.3)" strokeWidth="1" />
            <circle cx="165" cy="60" r="3" fill="#5eead4" />
            <circle cx="330" cy="45" r="3" fill="#5eead4" />
            <circle cx="45" cy="130" r="3" fill="#5eead4" />
            <circle cx="395" cy="150" r="3" fill="#5eead4" />
          </svg>
          {NETWORK_LABELS.map((item) => (
            <span className="network-label" style={item.style} key={item.label}>
              {item.label}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Right: login card                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="login-right">
        <div className="login-card glass-card">
          <div className="login-card__header">
            <h2 className="card-title">Welcome Back</h2>
            <p className="card-subtitle">Sign in to continue your journey.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>

            <div className="forgot-row">
              <a href="#forgot-password" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn-primary">
              Login
            </button>

            <button type="button" className="btn-secondary" onClick={onSwitchToRegister}>
              Don&apos;t have an account yet? <strong>Create Account</strong>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}