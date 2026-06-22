import { useState } from 'react';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import StudentProfile from './pages/StudentProfile/StudentProfile.jsx';
import WorkingProfile from './pages/WorkingProfile/WorkingProfile.jsx';
import JobSeekerProfile from './pages/JobSeekerProfile/JobSeekerProfile.jsx';
import SeniorCitizenProfile from './pages/SeniorCitizenProfile/SeniorCitizenProfile.jsx';

// Maps Register's user_type value to which profile page to show next.
const PROFILE_PAGE = {
  student: 'profile_student',
  job_seeker: 'profile_job_seeker',
  working_professional: 'profile_working',
  senior_citizen: 'profile_senior_citizen',
};

function App() {
  // Simple view machine — no router dependency for the hackathon demo.
  // Swap for react-router-dom when wiring up the full app.
  const [view, setView] = useState('login');
  const [userType, setUserType] = useState('student');

  const handleRegisterContinue = (registeredUserType) => {
    setUserType(registeredUserType || 'student');
    setView(PROFILE_PAGE[registeredUserType] || 'profile_student');
  };

  if (view === 'register') {
    return (
      <Register
        onSwitchToLogin={() => setView('login')}
        onContinue={handleRegisterContinue}
      />
    );
  }

  if (view === 'profile_student') {
    return (
      <StudentProfile
        onBack={() => setView('register')}
        onContinue={(data) => {
          console.log('Student profile saved, navigate to dashboard', data);
          // TODO: navigate to dashboard
        }}
      />
    );
  }

  if (view === 'profile_working') {
    return (
      <WorkingProfile
        onBack={() => setView('register')}
        onContinue={(data) => {
          console.log('Working profile saved, navigate to dashboard', data);
        }}
      />
    );
  }

  if (view === 'profile_job_seeker') {
    return (
      <JobSeekerProfile
        onBack={() => setView('register')}
        onContinue={(data) => {
          console.log('Job seeker profile saved, navigate to dashboard', data);
        }}
      />
    );
  }

  if (view === 'profile_senior_citizen') {
    return (
      <SeniorCitizenProfile
        onBack={() => setView('register')}
        onContinue={(data) => {
          console.log('Senior citizen profile saved, navigate to dashboard', data);
        }}
      />
    );
  }

  return <Login onSwitchToRegister={() => setView('register')} />;
}

export default App;