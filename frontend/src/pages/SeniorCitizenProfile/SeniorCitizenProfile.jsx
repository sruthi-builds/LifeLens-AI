import { useState } from 'react';
import '../../styles/ProfileShared.css';
import './SeniorCitizenProfile.css';
import {
  LogoIcon,
  ShieldIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  InfoIcon,
  HeartIcon,
} from '../../components/Icons.jsx';

const STEPS = [
  { label: 'Account', done: true },
  { label: 'Profile', active: true },
  { label: 'Dashboard' },
];

export default function SeniorCitizenProfile({ onBack, onContinue }) {
  // Controlled state — keys mirror backend senior citizen profile request exactly.
  const [formData, setFormData] = useState({
    retired: false,
    medicine_tracking_enabled: false,
    emergency_contact: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /profile/senior-citizen when backend is ready.
    console.log('SeniorCitizenProfile payload:', formData);
    if (onContinue) onContinue(formData);
  };

  return (
    <div className="profile-page">
      <div className="star-field" />
      <div className="profile-bg-glow profile-bg-glow--1" />
      <div className="profile-bg-glow profile-bg-glow--2" />
      <div className="profile-bg-glow profile-bg-glow--3" />

      <div className="profile-shell">

        {/* Logo */}
        <div className="profile-logo-row">
          <LogoIcon size={28} />
          <span className="brand-name">LifeLens AI</span>
        </div>

        {/* Stepper */}
        <nav className="profile-stepper" aria-label="Setup progress">
          {STEPS.map((s, i) => (
            <div
              key={s.label}
              className={`stepper-step${s.done ? ' stepper-step--done' : ''}${s.active ? ' stepper-step--active' : ''}`}
            >
              <div className="stepper-dot">
                {s.done ? <CheckCircleIcon size={14} /> : i + 1}
              </div>
              <span className="stepper-label">{s.label}</span>
            </div>
          ))}
        </nav>

        {/* Card */}
        <div className="profile-card glass-card">

          <div className="profile-card__header">
            <div className="profile-card__icon-badge sc-icon-badge">
              <ShieldIcon size={26} />
            </div>
            <h1 className="profile-card__title">Complete Your Profile</h1>
            <p className="profile-card__subtitle">
              Let us know your preferences so we can keep you informed, safe, and supported.
            </p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit} noValidate>

            {/* Feature cards row */}
            <div className="sc-feature-row">
              <div className="sc-feature-card">
                <span className="sc-feature-icon"><HeartIcon size={20} /></span>
                <span className="sc-feature-label">Government Schemes</span>
              </div>
              <div className="sc-feature-card">
                <span className="sc-feature-icon sc-feature-icon--blue">💊</span>
                <span className="sc-feature-label">Medicine Reminders</span>
              </div>
              <div className="sc-feature-card">
                <span className="sc-feature-icon sc-feature-icon--teal"><ShieldIcon size={20} /></span>
                <span className="sc-feature-label">Emergency Support</span>
              </div>
            </div>

            {/* Toggle: Retired */}
            <div className="pf-field">
              <label className="pf-label">Retirement Status</label>
              <div className={`toggle-row${formData.retired ? ' toggle-row--active' : ''}`}>
                <div className="toggle-row__text">
                  <p className="toggle-row__title">I am retired</p>
                  <p className="toggle-row__desc">
                    Enable this to receive government retirement benefits, pension schemes, and
                    senior support programmes.
                  </p>
                </div>
                <label className="toggle-switch" htmlFor="sc-retired" aria-label="Toggle retired status">
                  <input
                    type="checkbox"
                    id="sc-retired"
                    name="retired"
                    checked={formData.retired}
                    onChange={handleChange}
                  />
                  <span className="toggle-track" />
                  <span className="toggle-thumb" />
                </label>
              </div>
            </div>

            {/* Toggle: Medicine Tracking */}
            <div className="pf-field">
              <label className="pf-label">Medicine Tracking</label>
              <div className={`toggle-row${formData.medicine_tracking_enabled ? ' toggle-row--active' : ''}`}>
                <div className="toggle-row__text">
                  <p className="toggle-row__title">Enable medicine tracking</p>
                  <p className="toggle-row__desc">
                    Receive daily reminders for your medications and health check-ups directly
                    on your dashboard.
                  </p>
                </div>
                <label className="toggle-switch" htmlFor="sc-medicine" aria-label="Toggle medicine tracking">
                  <input
                    type="checkbox"
                    id="sc-medicine"
                    name="medicine_tracking_enabled"
                    checked={formData.medicine_tracking_enabled}
                    onChange={handleChange}
                  />
                  <span className="toggle-track" />
                  <span className="toggle-thumb" />
                </label>
              </div>
            </div>

            {/* Emergency contact */}
            <div className="pf-field">
              <label className="pf-label" htmlFor="sc-emergency">Emergency Contact Number</label>
              <input
                id="sc-emergency"
                type="tel"
                name="emergency_contact"
                className="input-field"
                placeholder="e.g. 9876543210"
                value={formData.emergency_contact}
                onChange={handleChange}
                maxLength={15}
                required
              />
              <p className="sc-contact-hint">
                This number will be shown on your profile for caregivers and emergency services.
              </p>
            </div>

            {/* Info box */}
            <div className="profile-infobox">
              <span className="profile-infobox__icon"><InfoIcon size={15} /></span>
              <p className="profile-infobox__text">
                All your preferences are private and encrypted. You can turn features on or off
                anytime from Settings.
              </p>
            </div>

            {/* Actions */}
            <div className="profile-actions">
              <button type="button" className="btn-back" onClick={onBack}>
                <ArrowLeftIcon size={15} /> Back
              </button>
              <button type="submit" className="btn-continue">
                Save &amp; Continue <ArrowRightIcon size={15} />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}