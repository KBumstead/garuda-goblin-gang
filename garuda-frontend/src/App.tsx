import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { ScoutRegistration } from './components/ScoutRegistration';
import { PlayerRankings } from './components/PlayerRankings';
import { TrainingPrograms } from './components/TrainingPrograms';
import { Clubs } from './components/Clubs';
import { PlayerProfile } from './components/PlayerProfile';
import { AddMatchReview } from './components/AddMatchReview';
import { ProfileManagement } from './components/ProfileManagement';

type AuthView = 'login' | 'scout-registration' | 'forgot-password';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [userRole, setUserRole] = useState<'user' | 'scout' | 'trainer'>('user');
  const [showPlayerProfile, setShowPlayerProfile] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // In a real app, you would validate credentials with your backend
    setIsAuthenticated(true);
    
    // Set user role based on email domain or backend response
    if (email.includes('scout') || email.includes('media')) {
      setUserRole('scout');
    } else if (email.includes('trainer') || email.includes('coach')) {
      setUserRole('trainer');
    } else {
      setUserRole('user');
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

  const handleRoleChange = (role: 'user' | 'scout' | 'trainer') => {
    setUserRole(role);
    setActiveScreen('dashboard');
    setShowPlayerProfile(false);
  };

  const handlePlayerClick = (player: any) => {
    setSelectedPlayer(player);
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
      return <PlayerProfile onBack={() => setShowPlayerProfile(false)} player={selectedPlayer} userRole={userRole} />;
    }

    switch (activeScreen) {
      case 'dashboard':
        return (
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#fbfffe]">
                Welcome to PickUp
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
            {/* Previews for Player and School Rankings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Player Rankings Preview */}
              <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                <h3 className="text-xl font-semibold text-[#1b1b1e] mb-4 flex items-center justify-between">
                  Player Rankings
                  <button className="text-[#f46036] text-sm font-medium hover:underline" onClick={() => setActiveScreen('player-rankings')}>View All</button>
                </h3>
                <ul className="divide-y divide-[#6d676e]/10">
                  <li className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#1b1b1e]">1. Ahmad Rizki</span>
                    <span className="text-[#6d676e] text-sm">SMA Jakarta Utara</span>
                  </li>
                  <li className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#1b1b1e]">2. Budi Santoso</span>
                    <span className="text-[#6d676e] text-sm">SMA Bandung Raya</span>
                  </li>
                  <li className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#1b1b1e]">3. Charles Wijaya</span>
                    <span className="text-[#6d676e] text-sm">SMA Surabaya</span>
                  </li>
                </ul>
              </div>
              {/* School Rankings Preview */}
              <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                <h3 className="text-xl font-semibold text-[#1b1b1e] mb-4 flex items-center justify-between">
                  School Rankings
                  <button className="text-[#f46036] text-sm font-medium hover:underline" onClick={() => setActiveScreen('school-rankings')}>View All</button>
                </h3>
                <ul className="divide-y divide-[#6d676e]/10">
                  <li className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#1b1b1e]">1. SMA Jakarta Utara</span>
                    <span className="text-[#6d676e] text-sm">Jakarta</span>
                  </li>
                  <li className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#1b1b1e]">2. SMA Bandung Raya</span>
                    <span className="text-[#6d676e] text-sm">Bandung</span>
                  </li>
                  <li className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#1b1b1e]">3. SMA Surabaya</span>
                    <span className="text-[#6d676e] text-sm">Surabaya</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Upcoming Tournaments News */}
            <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
              <h3 className="text-xl font-semibold text-[#1b1b1e] mb-4">Upcoming Tournaments</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-[#f46036] pl-4">
                  <p className="font-medium text-[#1b1b1e]">High School Basketball Invitational 2024</p>
                  <p className="text-sm text-[#6d676e]">Starts July 15, 2024 - Jakarta</p>
                </div>
                <div className="border-l-4 border-[#f46036] pl-4">
                  <p className="font-medium text-[#1b1b1e]">National Youth Cup</p>
                  <p className="text-sm text-[#6d676e]">Qualifiers begin August 1, 2024 - Bandung, Surabaya, Medan</p>
                </div>
                <div className="border-l-4 border-[#f46036] pl-4">
                  <p className="font-medium text-[#1b1b1e]">Regional 3x3 Challenge</p>
                  <p className="text-sm text-[#6d676e]">September 2024 - Multiple Cities</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'player-rankings':
        return <PlayerRankings onPlayerClick={handlePlayerClick} />;
      case 'school-rankings':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-[#fbfffe]">School Rankings</h1>
            <p className="text-[#6d676e] mt-4">School rankings feature coming soon...</p>
          </div>
        );
      case 'training-programs':
        return <TrainingPrograms userRole={userRole} />;
      case 'clubs':
        return <Clubs />;
      case 'player-database':
        return <PlayerRankings onPlayerClick={handlePlayerClick} userRole={userRole} enableSearch={true} />;
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
        return <ProfileManagement userRole={userRole} />;
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