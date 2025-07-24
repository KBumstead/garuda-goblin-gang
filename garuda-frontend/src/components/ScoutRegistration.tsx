import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Upload } from 'lucide-react';

interface ScoutRegistrationProps {
  onRegister: (formData: any) => void;
  onNavigateToLogin: () => void;
}

export function ScoutRegistration({ onRegister, onNavigateToLogin }: ScoutRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    organization: '',
    portfolioLink: '',
    verificationFile: null as File | null,
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange('verificationFile', file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        onRegister(formData);
        setIsLoading(false);
      }, 1500);
    }
  };

  const isFormValid = 
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.password.trim() &&
    formData.organization.trim() &&
    formData.agreeToTerms;

  return (
    <div className="min-h-screen bg-[#1b1b1e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#fbfffe] border-[#6d676e]/20">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-[#f46036] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-[#1b1b1e] font-bold text-2xl">BasketIndo</span>
          </div>
          
          {/* Header */}
          <h1 className="text-2xl font-bold text-[#1b1b1e] mb-2">Register as Media / Scout</h1>
          <p className="text-[#6d676e] text-sm">
            Gain access to review players, assign rankings, and add match commentary.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#1b1b1e] font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1b1b1e] font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1b1b1e] font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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

            {/* Organization */}
            <div className="space-y-2">
              <Label htmlFor="organization" className="text-[#1b1b1e] font-medium">
                Media Outlet / Organization Name
              </Label>
              <Input
                id="organization"
                type="text"
                placeholder="e.g., Jakarta Sports Media, Basketball Indonesia"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>

            {/* Portfolio Link */}
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-[#1b1b1e] font-medium">
                Link to Portfolio or Profile <span className="text-[#6d676e] font-normal">(Optional)</span>
              </Label>
              <Input
                id="portfolio"
                type="url"
                placeholder="https://your-portfolio.com"
                value={formData.portfolioLink}
                onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e]"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-[#1b1b1e] font-medium">
                Upload Verification Document <span className="text-[#6d676e] font-normal">(Optional)</span>
              </Label>
              <div className="relative">
                <input
                  type="file"
                  id="verification"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-3 p-3 border border-[#6d676e]/30 rounded-md bg-white hover:bg-[#6d676e]/5 transition-colors cursor-pointer">
                  <Upload className="w-5 h-5 text-[#6d676e]" />
                  <span className="text-[#6d676e] text-sm">
                    {formData.verificationFile 
                      ? formData.verificationFile.name 
                      : 'Upload ID or affiliation proof'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                className="mt-1 border-[#6d676e]/30"
              />
              <Label htmlFor="terms" className="text-sm text-[#1b1b1e] leading-relaxed">
                I agree to the{' '}
                <span className="text-[#f46036] hover:text-[#f46036]/80 cursor-pointer">
                  Terms of Service
                </span>
                {' '}and{' '}
                <span className="text-[#f46036] hover:text-[#f46036]/80 cursor-pointer">
                  Privacy Policy
                </span>
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium py-3"
            >
              {isLoading ? 'Submitting Application...' : 'Submit Application'}
            </Button>

            {/* Login Link */}
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