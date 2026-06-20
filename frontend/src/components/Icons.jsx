// Lightweight inline icon set shared between Login and Register pages.
// All icons inherit color via `currentColor` so they pick up parent text color.

export const LogoIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="2" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5eead4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="17.5" stroke="url(#logoGrad)" strokeWidth="2.5" />
    <path
      d="M20 6c5 4 5 9 0 14s-5 10 0 14"
      stroke="url(#logoGrad)"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="20" cy="20" r="3.2" fill="url(#logoGrad)" />
  </svg>
);

export const CheckIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 7.2L5.4 10L11.5 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EyeIcon = ({ open = false, size = 18 }) =>
  open ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 12s4-7.5 11-7.5S23 12 23 12s-4 7.5-11 7.5S1 12 1 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3l18 18M10.6 5.2c.45-.07.92-.1 1.4-.1 7 0 11 7.5 11 7.5a17.6 17.6 0 0 1-3.4 4.4M6.3 6.5C3.4 8.4 1 12 1 12s4 7.5 11 7.5c1.6 0 3-.3 4.3-.9M14.1 14.1a3.2 3.2 0 0 1-4.4-4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

export const CalendarIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const GraduationCapIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M6 11.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 9.5V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const BriefcaseIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="7.5" width="19" height="12.5" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.5 12.5h19" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.5 12.5h3v1.8h-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const HeartIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 20.5s-8-4.8-8-11A4.8 4.8 0 0 1 12 6.4 4.8 4.8 0 0 1 20 9.5c0 6.2-8 11-8 11Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckBadgeIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6 10.2l2.6 2.6 5.4-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);