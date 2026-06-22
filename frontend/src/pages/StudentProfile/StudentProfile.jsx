import { useState } from 'react';
import '../../styles/ProfileShared.css';
import './StudentProfile.css';
import ChipInput from '../../components/ChipInput.jsx';
import {
  LogoIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  InfoIcon,
} from '../../components/Icons.jsx';

const EDUCATION_LEVELS = ['High School', 'Diploma', 'BSc', 'BTech', 'BCA', 'BA', 'BCom', 'MSc', 'MTech', 'MBA', 'MCA', 'PhD'];
const YEARS = [1, 2, 3, 4, 5, 6];

const STEPS = [
  { label: 'Account', done: true },
  { label: 'Profile', active: true },
  { label: 'Dashboard' },
];

export default function StudentProfile({ onBack, onContinue }) {
  // Controlled state — keys mirror backend student profile request exactly.
  const [formData, setFormData] = useState({
    education_level: '',
    field_of_study: '',
    current_year: '',
    skills: [],
    interests: [],
    career_goal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST /profile/student with formData when backend is ready.
    console.log('StudentProfile payload:', formData);
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
            <div className="profile-card__icon-badge">
              <BookOpenIcon size={26} />
            </div>
            <h1 className="profile-card__title">Complete Your Profile</h1>
            <p className="profile-card__subtitle">
              Help us personalize opportunities and recommendations for you.
            </p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit} noValidate>

            {/* Row 1: Education level + Field of study */}
            <div className="pf-row pf-row--2">
              <div className="pf-field">
                <label className="pf-label" htmlFor="sp-edu-level">Education Level</label>
                <select
                  id="sp-edu-level"
                  name="education_level"
                  className="input-field"
                  value={formData.education_level}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select level</option>
                  {EDUCATION_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              <div className="pf-field">
                <label className="pf-label" htmlFor="sp-field">Field of Study</label>
                <input
                  id="sp-field"
                  type="text"
                  name="field_of_study"
                  className="input-field"
                  placeholder="e.g. Computer Science"
                  value={formData.field_of_study}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 2: Current year */}
            <div className="pf-row sp-year-row">
              <div className="pf-field">
                <label className="pf-label" htmlFor="sp-year">Current Year of Study</label>
                <select
                  id="sp-year"
                  name="current_year"
                  className="input-field"
                  value={formData.current_year}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>Year {y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Skills chip input */}
            <ChipInput
              label="Skills"
              chips={formData.skills}
              onChange={(chips) => setFormData((p) => ({ ...p, skills: chips }))}
              placeholder="e.g. Python, SQL, Excel…"
              hint="Add skills that represent your strengths."
            />

            {/* Interests chip input */}
            <ChipInput
              label="Interests"
              chips={formData.interests}
              onChange={(chips) => setFormData((p) => ({ ...p, interests: chips }))}
              placeholder="e.g. AI, Data Science, Web Dev…"
              hint="Add topics you're passionate about."
            />

            {/* Career goal */}
            <div className="pf-field">
              <label className="pf-label" htmlFor="sp-goal">Career Goal</label>
              <input
                id="sp-goal"
                type="text"
                name="career_goal"
                className="input-field"
                placeholder="e.g. Data Scientist, Full-Stack Developer"
                value={formData.career_goal}
                onChange={handleChange}
                required
              />
            </div>

            {/* Info box */}
            <div className="profile-infobox">
              <span className="profile-infobox__icon"><InfoIcon size={15} /></span>
              <p className="profile-infobox__text">
                Your profile is used only to surface relevant scholarships, internships, and
                career roadmaps. You can update it anytime from Settings.
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