import { useState } from 'react';
import '../../styles/ProfileShared.css';
import './JobSeekerProfile.css';
import {
  LogoIcon,
  TargetIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  InfoIcon,
} from '../../components/Icons.jsx';

const QUALIFICATIONS = [
  'High School', 'Diploma', 'BSc', 'BTech', 'BCA', 'BA', 'BCom',
  'MSc', 'MTech', 'MBA', 'MCA', 'PhD', 'Other',
];

const EXPERIENCE_OPTIONS = [
  { label: 'Fresher (0 years)', value: 0 },
  { label: '1 year', value: 1 },
  { label: '2 years', value: 2 },
  { label: '3 years', value: 3 },
  { label: '4 years', value: 4 },
  { label: '5 years', value: 5 },
  { label: '6–8 years', value: 7 },
  { label: '9–12 years', value: 10 },
  { label: '13+ years', value: 13 },
];

const STEPS = [
  { label: 'Account', done: true },
  { label: 'Profile', active: true },
  { label: 'Dashboard' },
];

export default function JobSeekerProfile({ onBack, onContinue }) {
  // Controlled state — keys mirror backend job seeker profile request exactly.
  const [formData, setFormData] = useState({
    qualification: '',
    experience: '',
    target_role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'experience' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /profile/job-seeker when backend is ready.
    console.log('JobSeekerProfile payload:', formData);
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
            <div className="profile-card__icon-badge js-icon-badge">
              <TargetIcon size={26} />
            </div>
            <h1 className="profile-card__title">Complete Your Profile</h1>
            <p className="profile-card__subtitle">
              Tell us about your background so we can match you with the right opportunities.
            </p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit} noValidate>

            {/* Qualification */}
            <div className="pf-field">
              <label className="pf-label" htmlFor="js-qual">Highest Qualification</label>
              <select
                id="js-qual"
                name="qualification"
                className="input-field"
                value={formData.qualification}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your qualification</option>
                {QUALIFICATIONS.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div className="pf-field">
              <label className="pf-label" htmlFor="js-exp">Years of Experience</label>
              <select
                id="js-exp"
                name="experience"
                className="input-field"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select experience level</option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Target role */}
            <div className="pf-field">
              <label className="pf-label" htmlFor="js-role">Target Role</label>
              <input
                id="js-role"
                type="text"
                name="target_role"
                className="input-field"
                placeholder="e.g. Software Engineer, UX Designer, Data Analyst"
                value={formData.target_role}
                onChange={handleChange}
                required
              />
            </div>

            {/* Visual emphasis card */}
            <div className="js-highlight-card">
              <div className="js-highlight-card__inner">
                <div className="js-highlight-icon">
                  <TargetIcon size={22} />
                </div>
                <div>
                  <p className="js-highlight-title">We'll find your perfect match</p>
                  <p className="js-highlight-body">
                    Based on your qualification, experience, and target role, LifeLens AI will
                    surface relevant job listings, upskilling resources, and interview prep guides.
                  </p>
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="profile-infobox">
              <span className="profile-infobox__icon"><InfoIcon size={15} /></span>
              <p className="profile-infobox__text">
                You can update your target role anytime. We'll refresh your recommendations
                within seconds of any change.
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