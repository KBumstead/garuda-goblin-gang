import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { register } from "../services/apiClient";

interface SignUpProps {
  onNavigateToLogin: () => void;
}

export function SignUp({ onNavigateToLogin }: SignUpProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState<string[]>(['user']);

  const handleRoleChange = (role: string) => {
    setRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!fullName || !email || !password || !passwordConfirmation) {
      setError("All fields are required.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }
    if (roles.length === 0) {
      setError("Please select at least one role.");
      return;
    }
    setIsLoading(true);
    try {
      await register(fullName, email, password, passwordConfirmation, roles);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1b1e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#fbfffe] border-[#6d676e]/20 rounded-xl shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-[#f46036] font-extrabold text-3xl tracking-wide">PICKUPs</span>
          </div>
          <h1 className="text-2xl font-bold text-[#f46036] mb-2">Create Account</h1>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          {success && <div className="text-green-600 text-center mb-2">Registration successful! You can now log in.</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#1b1b1e] font-medium">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1b1b1e] font-medium">Email Address</Label>
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
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1b1b1e] font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirmation" className="text-[#1b1b1e] font-medium">Confirm Password</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="Confirm your password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1b1b1e] font-medium">Register as</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="userType"
                    value="user"
                    checked={roles.includes('user')}
                    onChange={() => handleRoleChange('user')}
                  />
                  User
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="userType"
                    value="scout"
                    checked={roles.includes('scout')}
                    onChange={() => handleRoleChange('scout')}
                  />
                  Scout
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="userType"
                    value="trainer"
                    checked={roles.includes('trainer')}
                    onChange={() => handleRoleChange('trainer')}
                  />
                  Trainer
                </label>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium py-3"
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </Button>
            <div className="text-center">
              <p className="text-[#6d676e]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-[#f46036] hover:text-[#f46036]/80 font-medium transition-colors"
                >
                  Log In
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 