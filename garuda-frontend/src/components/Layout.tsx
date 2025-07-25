import React, { useState } from "react";
import {
  Home,
  Users,
  TrendingUp,
  MapPin,
  UserPlus,
  Database,
  FileText,
  ClipboardList,
  User,
  LogOut,
  UserCircle,
  Menu,
} from "lucide-react";
import { cn } from "./ui/utils";
import { useIsMobile } from "./ui/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  userRole: "user" | "scout" | "trainer";
  onRoleChange: (role: "user" | "scout" | "trainer") => void;
}

export function Layout({
  children,
  activeScreen,
  onScreenChange,
  userRole,
  onRoleChange,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Remove 'Profile' from menu items
  const filterProfile = (items: any[]) =>
    items.filter((item) => item.label !== "Profile");

  const userMenuItems = filterProfile([
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "player-rankings", label: "Player Rankings", icon: TrendingUp },
    // { id: "school-rankings", label: "School Rankings", icon: Users },
    { id: "training-programs", label: "Training Programs", icon: FileText },
    { id: "clubs", label: "Clubs", icon: MapPin },
    { id: "matches", label: "Matches", icon: ClipboardList },
    // { id: 'profile', label: 'Profile', icon: User },
  ]);
  const scoutMenuItems = filterProfile([
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "player-database", label: "Player Database", icon: Database },
    { id: "add-match-review", label: "Add Match Review", icon: ClipboardList },
    { id: "my-reports", label: "My Reports", icon: FileText },
    // { id: 'profile', label: 'Profile', icon: User },
  ]);
  const trainerMenuItems = filterProfile([
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "training-programs", label: "Training Programs", icon: FileText },
    { id: "clubs", label: "Clubs", icon: MapPin },
    // { id: 'profile', label: 'Profile', icon: User },
  ]);

  const menuItems =
    userRole === "user"
      ? userMenuItems
      : userRole === "trainer"
      ? trainerMenuItems
      : scoutMenuItems;

  // TopBar component
  const TopBar = () => (
    <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-[#1b1b1e] border-b border-[#6d676e]/20 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen((open) => !open)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-[#23232b] transition"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6 text-[#f46036]" />
        </button>
        <span className="text-[#f46036] font-extrabold text-2xl tracking-wide">
          PICKUPs
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onScreenChange("profile")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#23232b] text-white hover:bg-[#f46036] hover:text-white transition-all"
        >
          <UserCircle className="w-6 h-6" />
          <span className="hidden sm:inline font-medium">Profile</span>
        </button>
        <button
          onClick={() => onScreenChange("logout")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f46036] text-white font-bold border-2 border-[#f46036] shadow hover:bg-[#d94e1f] hover:scale-105 focus:bg-[#d94e1f] focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#f46036]/60 transition-all duration-150"
          aria-label="Log Out"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-background dark">
      <TopBar />
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#1b1b1e] border-r border-[#6d676e]/20 z-20 transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          {/* Role Switcher */}
          <div className="p-4 border-b border-[#6d676e]/20">
            <div className="flex bg-[#6d676e]/20 rounded-lg p-1">
              <button
                onClick={() => onRoleChange("user")}
                className={cn(
                  "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  userRole === "user"
                    ? "bg-[#f46036] text-white"
                    : "text-[#6d676e] hover:text-[#fbfffe]"
                )}
              >
                User
              </button>
              <button
                onClick={() => onRoleChange("scout")}
                className={cn(
                  "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  userRole === "scout"
                    ? "bg-[#f46036] text-white"
                    : "text-[#6d676e] hover:text-[#fbfffe]"
                )}
              >
                Scout
              </button>
              <button
                onClick={() => onRoleChange("trainer")}
                className={cn(
                  "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  userRole === "trainer"
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
                      onClick={() => {
                        onScreenChange(item.id);
                        if (isMobile) setSidebarOpen(false);
                      }}
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
        {/* Overlay for mobile sidebar */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}
        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-[#1b1b1e] ml-0 md:ml-64 pt-16">
          {children}
        </div>
      </div>
    </div>
  );
}
