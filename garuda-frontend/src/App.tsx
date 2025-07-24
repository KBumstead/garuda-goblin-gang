import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { ScoutRegistration } from './components/ScoutRegistration';
import { PlayerRankings } from './components/PlayerRankings';
import { TrainingPrograms } from './components/TrainingPrograms';
import { Clubs } from './components/Clubs';
import { PlayerProfile } from './components/PlayerProfile';
import { AddMatchReview } from './components/AddMatchReview';

type AuthView = 'login' | 'scout-registration' | 'forgot-password';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [userRole, setUserRole] = useState<'player' | 'scout'>('player');
  const [showPlayerProfile, setShowPlayerProfile] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // In a real app, you would validate credentials with your backend
    setIsAuthenticated(true);
    
    // Set user role based on email domain or backend response
    if (email.includes('scout') || email.includes('media')) {
      setUserRole('scout');
    } else {
      setUserRole('player');
    }
  };

  const handleScoutRegistration = (formData: any) => {
    console.log('Scout registration:', formData);
    // In a real app, you would send this to your backend
    // For demo purposes, we'll just show success and redirect to login
    alert('Application submitted successfully! Please check your email for verification.');
    setAuthView('login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveScreen('dashboard');
    setShowPlayerProfile(false);
    setAuthView('login');
  };

  const handleScreenChange = (screen: string) => {
    if (screen === 'logout') {
      handleLogout();
      return;
    }
    setActiveScreen(screen);
    setShowPlayerProfile(false);
  };

  const handleRoleChange = (role: 'player' | 'scout') => {
    setUserRole(role);
    setActiveScreen('dashboard');
    setShowPlayerProfile(false);
  };

  const handlePlayerClick = () => {
    setShowPlayerProfile(true);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // In a real app, you would show a forgot password form
    alert('Forgot password functionality would be implemented here.');
  };

  // Authentication screens
  if (!isAuthenticated) {
    switch (authView) {
      case 'login':
        return (
          <Login
            onLogin={handleLogin}
            onNavigateToSignUp={() => setAuthView('scout-registration')}
            onForgotPassword={handleForgotPassword}
          />
        );
      case 'scout-registration':
        return (
          <ScoutRegistration
            onRegister={handleScoutRegistration}
            onNavigateToLogin={() => setAuthView('login')}
          />
        );
      default:
        return (
          <Login
            onLogin={handleLogin}
            onNavigateToSignUp={() => setAuthView('scout-registration')}
            onForgotPassword={handleForgotPassword}
          />
        );
    }
  }

  const renderScreen = () => {
    // Show player profile if requested (scout view)
    if (showPlayerProfile) {
      return <PlayerProfile onBack={() => setShowPlayerProfile(false)} />;
    }

    switch (activeScreen) {
      case 'dashboard':
        return (
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#fbfffe]">
                Welcome to BasketIndo
              </h1>
              <button
                onClick={handleLogout}
                className="text-[#6d676e] hover:text-[#f46036] transition-colors"
              >
                Logout
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                <h3 className="text-xl font-semibold text-[#1b1b1e] mb-2">Players Registered</h3>
                <p className="text-3xl font-bold text-[#f46036]">1,247</p>
                <p className="text-[#6d676e] text-sm">Active players nationwide</p>
              </div>
              <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                <h3 className="text-xl font-semibold text-[#1b1b1e] mb-2">Training Programs</h3>
                <p className="text-3xl font-bold text-[#f46036]">85</p>
                <p className="text-[#6d676e] text-sm">Available programs</p>
              </div>
              <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                <h3 className="text-xl font-semibold text-[#1b1b1e] mb-2">Basketball Clubs</h3>
                <p className="text-3xl font-bold text-[#f46036]">156</p>
                <p className="text-[#6d676e] text-sm">Clubs to join</p>
              </div>
            </div>
            <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
              <h3 className="text-xl font-semibold text-[#1b1b1e] mb-4">Latest News</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-[#f46036] pl-4">
                  <p className="font-medium text-[#1b1b1e]">National Basketball Championship 2024 Registration Open</p>
                  <p className="text-sm text-[#6d676e]">Registration for the biggest high school tournament is now open</p>
                </div>
                <div className="border-l-4 border-[#f46036] pl-4">
                  <p className="font-medium text-[#1b1b1e]">New Training Facility Opens in Jakarta</p>
                  <p className="text-sm text-[#6d676e]">State-of-the-art basketball training center now accepting members</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'player-rankings':
        return <PlayerRankings />;
      case 'school-rankings':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-[#fbfffe]">School Rankings</h1>
            <p className="text-[#6d676e] mt-4">School rankings feature coming soon...</p>
          </div>
        );
      case 'training-programs':
        return <TrainingPrograms />;
      case 'clubs':
        return <Clubs />;
      case 'player-database':
        return (
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-[#fbfffe]">Player Database</h1>
            <div className="bg-[#fbfffe] rounded-lg border border-[#6d676e]/20 p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    onClick={handlePlayerClick}
                    className="flex items-center justify-between p-4 border border-[#6d676e]/20 rounded-lg hover:bg-[#6d676e]/5 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-medium text-[#1b1b1e]">Player {i}</p>
                      <p className="text-sm text-[#6d676e]">SMA Jakarta {i}</p>
                    </div>
                    <button className="text-[#f46036] hover:text-[#f46036]/80">View Profile</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'add-match-review':
        return <AddMatchReview />;
      case 'my-reports':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-[#fbfffe]">My Reports</h1>
            <p className="text-[#6d676e] mt-4">Your scouting reports will appear here...</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-[#fbfffe]">Profile</h1>
            <p className="text-[#6d676e] mt-4">Profile management coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-[#fbfffe]">Page Not Found</h1>
          </div>
        );
    }
  };

  return (
    <Layout
      activeScreen={activeScreen}
      onScreenChange={handleScreenChange}
      userRole={userRole}
      onRoleChange={handleRoleChange}
    >
      {renderScreen()}
    </Layout>
  );
}