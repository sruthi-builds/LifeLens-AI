import { useState } from 'react';
import '../../styles/ProfileShared.css';
import './WorkingProfile.css';
import ChipInput from '../../components/ChipInput.jsx';
import {
  LogoIcon,
  BriefcaseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  InfoIcon,
} from '../../components/Icons.jsx';

const EXPERIENCE_OPTIONS = [
  { label: 'Less than 1 year', value: 0 },
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

export default function WorkingProfile({ onBack, onContinue }) {
  // Controlled state — keys mirror backend working profile request exactly.
  const [formData, setFormData] = useState({
    job_title: '',
    organization: '',
    experience: '',
    skills: [],
    career_goal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'experience' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /profile/working when backend is ready.
    console.log('WorkingProfile payload:', formData);
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
            <div className="profile-card__icon-badge wp-icon-badge">
              <BriefcaseIcon size={26} />
            </div>
            <h1 className="profile-card__title">Complete Your Profile</h1>
            <p className="profile-card__subtitle">
              Help us personalize career growth recommendations and opportunities for you.
            </p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit} noValidate>

            {/* Row 1: Job Title + Organization */}
            <div className="pf-row pf-row--2">
              <div className="pf-field">
                <label className="pf-label" htmlFor="wp-title">Job Title</label>
                <input
                  id="wp-title"
                  type="text"
                  name="job_title"
                  className="input-field"
                  placeholder="e.g. Software Engineer"
                  value={formData.job_title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pf-field">
                <label className="pf-label" htmlFor="wp-org">Organization</label>
                <input
                  id="wp-org"
                  type="text"
                  name="organization"
                  className="input-field"
                  placeholder="e.g. Infosys, TCS, Startup"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 2: Experience */}
            <div className="pf-row wp-exp-row">
              <div className="pf-field">
                <label className="pf-label" htmlFor="wp-exp">Years of Experience</label>
                <select
                  id="wp-exp"
                  name="experience"
                  className="input-field"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select experience</option>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Skills chip input */}
            <ChipInput
              label="Skills"
              chips={formData.skills}
              onChange={(chips) => setFormData((p) => ({ ...p, skills: chips }))}
              placeholder="e.g. Python, SQL, Java, AWS…"
              hint="Add your professional and technical skills."
            />

            {/* Career Goal */}
            <div className="pf-field">
              <label className="pf-label" htmlFor="wp-goal">Career Goal</label>
              <input
                id="wp-goal"
                type="text"
                name="career_goal"
                className="input-field"
                placeholder="e.g. Senior Software Engineer, Tech Lead"
                value={formData.career_goal}
                onChange={handleChange}
                required
              />
            </div>

            {/* Info box */}
            <div className="profile-infobox">
              <span className="profile-infobox__icon"><InfoIcon size={15} /></span>
              <p className="profile-infobox__text">
                We'll use this to surface relevant upskilling courses, job opportunities, and
                career growth milestones tailored to your current role.
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