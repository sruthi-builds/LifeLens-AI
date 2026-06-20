import { useState } from 'react';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';

function App() {
  // Simple view toggle so the hackathon demo doesn't need react-router.
  // Swap this for real routes (e.g. react-router-dom) when wiring up the app.
  const [view, setView] = useState('login'); // 'login' | 'register'

  if (view === 'register') {
    return <Register onSwitchToLogin={() => setView('login')} />;
  }

  return <Login onSwitchToRegister={() => setView('register')} />;
}

export default App;