import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { ScoutRegistration } from "./components/ScoutRegistration";
import { PlayerRankings } from "./components/PlayerRankings";
import { TrainingPrograms } from "./components/TrainingPrograms";
import { Clubs } from "./components/Clubs";
import { PlayerProfile } from "./components/PlayerProfile";
import { AddMatchReview } from "./components/AddMatchReview";
import ProtectedRoute from "./components/ProtectedRoute";

// Simple Unauthorized page
const Unauthorized = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-[#fbfffe]">Unauthorized</h1>
    <p className="text-[#6d676e] mt-4">You do not have access to this page.</p>
  </div>
);
import { ProfileManagement } from "./components/ProfileManagement";

type AuthView = "login" | "scout-registration" | "forgot-password";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [userRole, setUserRole] = useState<"user" | "scout" | "trainer">(
    "user"
  );
  const [showPlayerProfile, setShowPlayerProfile] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);

    // Set user role based on email domain or backend response
    if (email.includes("scout") || email.includes("media")) {
      setUserRole("scout");
    } else if (email.includes("trainer") || email.includes("coach")) {
      setUserRole("trainer");
    } else {
      setUserRole("user");
    }
    navigate("/");
  };

  const handleScoutRegistration = (formData: any) => {
    alert(
      "Application submitted successfully! Please check your email for verification."
    );
    navigate("/login");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveScreen("dashboard");
    setShowPlayerProfile(false);
    setAuthView("login");
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
    navigate("/");
  };

  const handlePlayerClick = (player: any) => {
    setSelectedPlayer(player);
    setShowPlayerProfile(true);
    navigate("/player-profile");
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality would be implemented here.");
  };

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
              allowedRoles={["player", "scout"]}
              userRole={userRole}
            >
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
                <div className="bg-[#fbfffe] p-6 rounded-lg border border-[#6d676e]/20">
                  <h3 className="text-xl font-semibold text-[#1b1b1e] mb-4">
                    Latest News
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-[#f46036] pl-4">
                      <p className="font-medium text-[#1b1b1e]">
                        National Basketball Championship 2024 Registration Open
                      </p>
                      <p className="text-sm text-[#6d676e]">
                        Registration for the biggest high school tournament is
                        now open
                      </p>
                    </div>
                    <div className="border-l-4 border-[#f46036] pl-4">
                      <p className="font-medium text-[#1b1b1e]">
                        New Training Facility Opens in Jakarta
                      </p>
                      <p className="text-sm text-[#6d676e]">
                        State-of-the-art basketball training center now
                        accepting members
                      </p>
                    </div>
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
              allowedRoles={["player", "scout"]}
              userRole={userRole}
            >
              <PlayerRankings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/school-rankings"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["player", "scout"]}
              userRole={userRole}
            >
              <div className="p-8">
                <h1 className="text-3xl font-bold text-[#fbfffe]">
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
              allowedRoles={["player", "scout"]}
              userRole={userRole}
            >
              <TrainingPrograms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["player", "scout"]}
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
              <div className="p-8 space-y-6">
                <h1 className="text-3xl font-bold text-[#fbfffe]">
                  Player Database
                </h1>
                <div className="bg-[#fbfffe] rounded-lg border border-[#6d676e]/20 p-4">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        onClick={handlePlayerClick}
                        className="flex items-center justify-between p-4 border border-[#6d676e]/20 rounded-lg hover:bg-[#6d676e]/5 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-medium text-[#1b1b1e]">
                            Player {i}
                          </p>
                          <p className="text-sm text-[#6d676e]">
                            SMA Jakarta {i}
                          </p>
                        </div>
                        <button className="text-[#f46036] hover:text-[#f46036]/80">
                          View Profile
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/player-profile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["scout"]}
              userRole={userRole}
            >
              <PlayerProfile onBack={() => navigate(-1)} />
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
                <h1 className="text-3xl font-bold text-[#fbfffe]">
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
          path="/profile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={["player", "scout"]}
              userRole={userRole}
            >
              <div className="p-8">
                <h1 className="text-3xl font-bold text-[#fbfffe]">Profile</h1>
                <p className="text-[#6d676e] mt-4">
                  Profile management coming soon...
                </p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
