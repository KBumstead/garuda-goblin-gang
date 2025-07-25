import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../services/apiClient";
import { SignUp } from "./SignUp";

interface LoginProps {
  onLogin: (email: string, password: string, userType: string) => void;
  onNavigateToSignUp: () => void;
  onForgotPassword: () => void;
}

export function Login({
  onLogin,
  onNavigateToSignUp,
  onForgotPassword,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Add error state
  const [error, setError] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (email && password) {
      setIsLoading(true);
      try {
        const data = await login(email, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user_type || "user");
        onLogin(email, password, data.user_type || "user");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = email.trim() && password.trim();

  if (showSignUp) {
    return <SignUp onNavigateToLogin={() => setShowSignUp(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#1b1b1e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#fbfffe] border-[#6d676e]/20 rounded-xl shadow-lg">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-[#f46036] font-extrabold text-3xl tracking-wide">PICKUPs</span>
          </div>
          {/* Header */}
          <h1 className="text-2xl font-bold text-[#f46036] mb-2">Welcome Back</h1>
        </CardHeader>

        <CardContent>
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mb-2">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1b1b1e] font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1b1b1e] font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6d676e] hover:text-[#1b1b1e] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-[#6d676e] hover:text-[#f46036] transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium py-3"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-[#6d676e]">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowSignUp(true)}
                  className="text-[#f46036] hover:text-[#f46036]/80 font-medium transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
