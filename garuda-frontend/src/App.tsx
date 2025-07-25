import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { ScoutRegistration } from "./components/ScoutRegistration";
import { PlayerRankings } from "./components/PlayerRankings";
import { TrainingPrograms } from "./components/TrainingPrograms";
import { Clubs } from "./components/Clubs";
import { PlayerProfile } from "./components/PlayerProfile";
import { AddMatchReview } from "./components/AddMatchReview";
import { Contact } from "./components/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardCarousel } from "./components/DashboardCarousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

// Simple Unauthorized page
const Unauthorized = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-[#fbfffe]">Unauthorized</h1>
    <p className="text-[#6d676e] mt-4">You do not have access to this page.</p>
  </div>
);
import { ProfileManagement } from "./components/ProfileManagement";
import { MatchesList } from "./components/MatchesList";

type AuthView = "login" | "scout-registration" | "forgot-password";

export default function App() {
  // Restore auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [authView, setAuthView] = useState<AuthView>("login");
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [userRole, setUserRole] = useState<"user" | "scout" | "trainer">(() => {
    return (
      (localStorage.getItem("userRole") as "user" | "scout" | "trainer") ||
      "user"
    );
  });
  const [showPlayerProfile, setShowPlayerProfile] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
    localStorage.setItem("userRole", userRole);
  }, [isAuthenticated, userRole]);

  const handleLogin = (email: string, password: string, userType: string) => {
    setIsAuthenticated(true);
    setUserRole(userType as "user" | "scout" | "trainer");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", userType);
    // Redirect based on userType
    if (userType === "scout") {
      navigate("/player-database");
    } else if (userType === "trainer") {
      navigate("/training-programs");
    } else {
      navigate("/");
    }
  };

  const handleScoutRegistration = (formData: any) => {
    alert(
      "Application submitted successfully! Please check your email for verification."
    );
    navigate("/login");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("user");
    setActiveScreen("dashboard");
    setShowPlayerProfile(false);
    setAuthView("login");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const handleScreenChange = (screen: string) => {
    if (screen === "logout") {
      handleLogout();
      return;
    }
    setActiveScreen(screen);
    setShowPlayerProfile(false);
    navigate(`/${screen}`);
  };

  const handleRoleChange = (role: "user" | "scout" | "trainer") => {
    setUserRole(role);
    setActiveScreen("dashboard");
    setShowPlayerProfile(false);
    localStorage.setItem("userRole", role);
    navigate("/");
  };

  const handlePlayerClick = (player: any) => {
    setSelectedPlayer(player);
    setShowPlayerProfile(true);
    navigate(`/player-profile/${player.id}`);
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality would be implemented here.");
  };
  const mockPlayers = [
    {
      id: 1,
      name: "Budi Santoso",
      avatar: "https://placehold.co/40x40",
      rating: 95,
    },
    {
      id: 2,
      name: "Citra Dewi",
      avatar: "https://placehold.co/40x40",
      rating: 92,
    },
    {
      id: 3,
      name: "Eka Sari",
      avatar: "https://placehold.co/40x40",
      rating: 90,
    },
  ];
  const mockTournaments = [
    {
      id: 1,
      name: "National High School Cup",
      date: "2024-08-10",
      location: "Jakarta",
    },
    {
      id: 2,
      name: "Java Regional Qualifier",
      date: "2024-08-24",
      location: "Bandung",
    },
    {
      id: 3,
      name: "Sumatra Invitational",
      date: "2024-09-05",
      location: "Medan",
    },
  ];
  // Add mockPrograms for training programs
  const mockPrograms = [
    {
      id: 1,
      name: "Elite Basketball Camp",
      date: "2024-08-15",
      location: "Jakarta",
      description: "Intensive camp for high school players.",
    },
    {
      id: 2,
      name: "Youth Development Program",
      date: "2024-09-01",
      location: "Bandung",
      description: "Foundational training for ages 13-16.",
    },
  ];

  // Auth routes
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              onNavigateToSignUp={() => navigate("/scout-registration")}
              onForgotPassword={handleForgotPassword}
            />
          }
        />
        <Route
          path="/scout-registration"
          element={
            <ScoutRegistration
              onRegister={handleScoutRegistration}
              onNavigateToLogin={() => navigate("/login")}
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Main app routes (protected)
  type CarouselItem = {
    type: "Tournament" | "Training";
    title: string;
    organizer: string;
    image: string;
  };
  const carouselItems: CarouselItem[] = [
    {
      type: "Tournament",
      title: "Jakarta 3x3 Championship",
      organizer: "Perbasi DKI Jakarta",
      image: "https://placehold.co/600x400/f46036/fbfffe?text=Tournament",
    },
    {
      type: "Training",
      title: "Elite Guard Training Camp",
      organizer: "Coach Andi",
      image: "https://placehold.co/600x400/1b1b1e/fbfffe?text=Training",
    },
    {
      type: "Tournament",
      title: "Surabaya High School Cup",
      organizer: "DBL Indonesia",
      image: "https://placehold.co/600x400/f46036/fbfffe?text=Tournament",
    },
    {
      type: "Training",
      title: "Youth Development Program",
      organizer: "Jakarta Basketball Academy",
      image: "https://placehold.co/600x400/1b1b1e/fbfffe?text=Training",
    },
  ];

  return (
    <Layout
      activeScreen={activeScreen}
      onScreenChange={handleScreenChange}
      userRole={userRole}
      onRoleChange={handleRoleChange}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout", "trainer"]}
              userRole={userRole}
            >
              <div className="p-8 space-y-6">
                {/* Feature Carousel */}
                <DashboardCarousel items={carouselItems} />
                {/* Slideshow/Carousel */}
                {/* Remove the old Carousel usage (the div with className="mb-8" containing Carousel, CarouselContent, etc.) */}
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-[#f46036]">
                    Welcome to PICKUPs
                  </h1>
                </div>
                {/* First row: previous dashboard cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                    <h3 className="text-xl font-semibold text-[#1b1b1e] mb-2">
                      Players Registered
                    </h3>
                    <p className="text-3xl font-bold text-[#f46036]">1,247</p>
                    <p className="text-[#6d676e] text-sm">
                      Active players nationwide
                    </p>
                  </div>
                  <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                    <h3 className="text-xl font-semibold text-[#1b1b1e] mb-2">
                      Training Programs
                    </h3>
                    <p className="text-3xl font-bold text-[#f46036]">85</p>
                    <p className="text-[#6d676e] text-sm">Available programs</p>
                  </div>
                  <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                    <h3 className="text-xl font-semibold text-[#1b1b1e] mb-2">
                      Basketball Clubs
                    </h3>
                    <p className="text-3xl font-bold text-[#f46036]">156</p>
                    <p className="text-[#6d676e] text-sm">Clubs to join</p>
                  </div>
                </div>
                {/* Second row: new previews */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Player Rankings Preview */}
                  <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-[#1b1b1e]">
                        Player Rankings Preview
                      </h3>
                      <Button
                        size="sm"
                        className="bg-[#f46036] text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-[#d94e1f]"
                        onClick={() => handleScreenChange("player-rankings")}
                      >
                        View All
                      </Button>
                    </div>
                    <ol className="space-y-3">
                      {mockPlayers
                        .slice(0, 3)
                        .map((player: (typeof mockPlayers)[0], idx: number) => (
                          <li
                            key={player.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f46036]/10 transition"
                          >
                            <span className="w-7 h-7 flex items-center justify-center bg-[#f46036] text-white rounded-full font-bold">
                              {idx + 1}
                            </span>
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={player.avatar}
                                alt={player.name}
                              />
                              <AvatarFallback>
                                {player.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-[#1b1b1e]">
                              {player.name}
                            </span>
                            <span className="ml-auto text-[#f46036] font-bold">
                              ★ {player.rating}
                            </span>
                          </li>
                        ))}
                    </ol>
                  </div>
                  {/* Upcoming Tournaments (unchanged) */}
                  <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                    <h3 className="text-xl font-semibold text-[#1b1b1e] mb-2">
                      Upcoming Tournaments
                    </h3>
                    <ul className="space-y-3">
                      {mockTournaments.map((tournament) => (
                        <li
                          key={tournament.id}
                          className="flex flex-col gap-1 border-l-4 border-[#f46036] pl-4"
                        >
                          <span className="font-medium text-[#1b1b1e]">
                            {tournament.name}
                          </span>
                          <span className="text-sm text-[#6d676e]">
                            {tournament.date} &bull; {tournament.location}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/player-rankings"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout", "trainer"]}
              userRole={userRole}
            >
              <PlayerRankings
                onPlayerClick={handlePlayerClick}
                userRole={userRole}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/school-rankings"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout", "trainer"]}
              userRole={userRole}
            >
              <div className="p-8">
                <h1 className="text-3xl font-bold text-[#f46036]">
                  School Rankings
                </h1>
                <p className="text-[#6d676e] mt-4">
                  School rankings feature coming soon...
                </p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/training-programs"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout", "trainer"]}
              userRole={userRole}
            >
              <TrainingPrograms userRole={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout", "trainer"]}
              userRole={userRole}
            >
              <Clubs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/player-database"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["scout"]}
              userRole={userRole}
            >
              <PlayerRankings
                onPlayerClick={handlePlayerClick}
                userRole={userRole}
                enableSearch
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/player-profile/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout", "trainer"]}
              userRole={userRole}
            >
              <PlayerProfile
                onBack={() => navigate(-1)}
                player={selectedPlayer}
                userRole={userRole}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-match-review"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["scout"]}
              userRole={userRole}
            >
              <AddMatchReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-reports"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["scout"]}
              userRole={userRole}
            >
              <div className="p-8">
                <h1 className="text-3xl font-bold text-[#f46036]">
                  My Reports
                </h1>
                <p className="text-[#6d676e] mt-4">
                  Your scouting reports will appear here...
                </p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout", "trainer"]}
              userRole={userRole}
            >
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout", "trainer"]}
              userRole={userRole}
            >
              <ProfileManagement userRole={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["user", "scout"]}
              userRole={userRole}
            >
              <MatchesList />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}