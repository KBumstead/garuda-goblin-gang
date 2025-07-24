import React from 'react';
import { Home, Users, TrendingUp, MapPin, UserPlus, Database, FileText, ClipboardList, User } from 'lucide-react';
import { cn } from './ui/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  userRole: 'user' | 'scout' | 'trainer';
  onRoleChange: (role: 'user' | 'scout' | 'trainer') => void;
}

export function Layout({ children, activeScreen, onScreenChange, userRole, onRoleChange }: LayoutProps) {
  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'player-rankings', label: 'Player Rankings', icon: TrendingUp },
    { id: 'school-rankings', label: 'School Rankings', icon: Users },
    { id: 'training-programs', label: 'Training Programs', icon: FileText },
    { id: 'clubs', label: 'Clubs', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];
  const scoutMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'player-database', label: 'Player Database', icon: Database },
    { id: 'add-match-review', label: 'Add Match Review', icon: ClipboardList },
    { id: 'my-reports', label: 'My Reports', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];
  const trainerMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'training-programs', label: 'Training Programs', icon: FileText },
    { id: 'clubs', label: 'Clubs', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const menuItems = userRole === 'user' ? userMenuItems : userRole === 'trainer' ? trainerMenuItems : scoutMenuItems;

  return (
    <div className="min-h-screen bg-background dark">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#1b1b1e] border-r border-[#6d676e]/20">
        {/* Logo */}
        <div className="p-6 border-b border-[#6d676e]/20">
          <div className="flex items-center space-x-3">
            <span className="text-[#fbfffe] font-bold text-lg">PickUp</span>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="p-4 border-b border-[#6d676e]/20">
          <div className="flex bg-[#6d676e]/20 rounded-lg p-1">
            <button
              onClick={() => onRoleChange('user')}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
                userRole === 'user'
                  ? "bg-[#f46036] text-white"
                  : "text-[#6d676e] hover:text-[#fbfffe]"
              )}
            >
              User
            </button>
            <button
              onClick={() => onRoleChange('scout')}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
                userRole === 'scout'
                  ? "bg-[#f46036] text-white"
                  : "text-[#6d676e] hover:text-[#fbfffe]"
              )}
            >
              Scout
            </button>
            <button
              onClick={() => onRoleChange('trainer')}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
                userRole === 'trainer'
                  ? "bg-[#f46036] text-white"
                  : "text-[#6d676e] hover:text-[#fbfffe]"
              )}
            >
              Trainer
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onScreenChange(item.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all",
                      activeScreen === item.id
                        ? "bg-[#f46036] text-white"
                        : "text-[#6d676e] hover:text-[#fbfffe] hover:bg-[#6d676e]/10"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen bg-[#1b1b1e]">
        {children}
      </div>
    </div>
  );
}