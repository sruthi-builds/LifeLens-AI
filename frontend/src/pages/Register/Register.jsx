import { useState } from 'react';
import './Register.css';
import {
  LogoIcon,
  EyeIcon,
  CalendarIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  HeartIcon,
  CheckBadgeIcon,
} from '../../components/Icons.jsx';

// Demo option lists for the location selects. Swap these for an API-driven
// cascading country -> state -> city lookup when the backend is ready.
const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Singapore'];
const STATES = ['Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra'];
const CITIES = ['Nellore', 'Hyderabad', 'Chennai', 'Bengaluru', 'Kochi', 'Mumbai'];

const USER_TYPES = [
  {
    value: 'student',
    label: 'Student',
    icon: <GraduationCapIcon />,
    description: 'Find scholarships, internships and research opportunities.',
    bestFor: ['Students', 'Researchers', 'Learners'],
  },
  {
    value: 'job_seeker',
    label: 'Job Seeker',
    icon: <BriefcaseIcon />,
    description: 'Discover jobs, career growth and upskilling opportunities.',
    bestFor: ['Graduates', 'Professionals', 'Career Switchers'],
  },
  {
  value: 'working_professional',
  label: 'Working Professional',
  icon: <BriefcaseIcon />,
  description: 'Advance your career through certifications, promotions, government benefits and upskilling opportunities.',
  bestFor: [
    'Full-Time Employees',
    'Corporate Professionals',
    'Government Employees'
  ],
},

  {
    value: 'senior_citizen',
    label: 'Senior Citizen',
    icon: <HeartIcon />,
    description: 'Access government schemes, healthcare reminders and support services.',
    bestFor: ['Retired Individuals', 'Senior Citizens', 'Caregivers'],
  },

];

export default function Register({
  onSwitchToLogin,
  onContinue,
}) {  // Controlled form state — keys mirror the backend register request contract exactly.
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    date_of_birth: '',
    country: '',
    state: '',
    city: '',
    user_type: 'student',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'password' || name === 'confirm_password') {
      setPasswordError('');
    }
  };

  const handleSelectUserType = (value) => {
    setFormData((prev) => ({ ...prev, user_type: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setPasswordError('Passwords do not match.');
      return;
    }

    // TODO: wire up to POST /register once the backend is ready.
    // Send everything except confirm_password, which is client-side only.
    const { confirm_password, ...registerPayload } = formData;

console.log('Register submit payload:', registerPayload);

// Temporary hackathon navigation
if (onContinue) {
  onContinue(formData.user_type);
}
  };

  return (
    <div className="register-page">
      <div className="star-field" />
      <div className="register-bg-glow register-bg-glow--1" />
      <div className="register-bg-glow register-bg-glow--2" />

      <div className="register-card glass-card">
        <div className="register-card__header">
          <div className="brand brand--center">
            <LogoIcon size={28} />
            <span className="brand-name">LifeLens AI</span>
          </div>
          <h1 className="card-title">Create Your Account</h1>
          <p className="card-subtitle">
            Start your personalized journey toward smarter opportunities, career growth, and life
            planning.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="section-label-row">
            <span>Account Information</span>
          </div>

          <div className="form-row form-row--2">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              className="input-field"
              value={formData.full_name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
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
          </div>

          <div className="form-row form-row--2">
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
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

            <div className="password-field">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm_password"
                placeholder="Confirm Password"
                className="input-field"
                value={formData.confirm_password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowConfirmPassword((s) => !s)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
          </div>

          {passwordError && <p className="field-error">{passwordError}</p>}

          <div className="section-label-row">
            <span>Personal Information</span>
          </div>

          <div className="form-row form-row--4">
            <div className="date-field">
              <input
                type="date"
                name="date_of_birth"
                placeholder="Date of Birth"
                className="input-field"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
              <CalendarIcon size={16} />
            </div>

            <select
              name="country"
              className="input-field"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              name="state"
              className="input-field"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                State
              </option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              name="city"
              className="input-field"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                City
              </option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="who-are-you">
            <h3 className="who-are-you__title">Who are you today?</h3>
            <p className="who-are-you__subtitle">
              We&apos;ll personalize opportunities, recommendations and life planning based on your
              profile.
            </p>
          </div>

          <div className="user-type-grid">
            {USER_TYPES.map((type) => {
              const selected = formData.user_type === type.value;
              return (
                <button
                  type="button"
                  key={type.value}
                  className={`user-type-card${selected ? ' user-type-card--selected' : ''}`}
                  onClick={() => handleSelectUserType(type.value)}
                  aria-pressed={selected}
                >
                  <div className="user-type-card__head">
                    <span className="user-type-card__icon">{type.icon}</span>
                    <span className="user-type-card__title">{type.label}</span>
                    {selected && (
                      <span className="user-type-card__badge">
                        <CheckBadgeIcon /> Selected
                      </span>
                    )}
                  </div>
                  <p className="user-type-card__desc">{type.description}</p>
                  <div className="user-type-card__best">
                    <span>Best For:</span>
                    <ul>
                      {type.bestFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>

          <button type="submit" className="btn-primary register-submit">
            Create Account
          </button>

          <p className="signin-row">
            Already have an account?{' '}
            <button type="button" className="signin-link" onClick={onSwitchToLogin}>
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}