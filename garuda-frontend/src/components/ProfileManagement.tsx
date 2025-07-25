import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { fetchProfile, updateProfile } from '../services/apiClient';

interface ProfileManagementProps {
  userRole: 'user' | 'scout' | 'trainer';
}

export function ProfileManagement({ userRole }: ProfileManagementProps) {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    bio: '',
    age: '',
    gender: '',
    height: '',
    avatar: '',
    password: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await fetchProfile();
        setForm((prev) => ({
          ...prev,
          full_name: user.full_name || '',
          email: user.email || '',
          bio: user.bio || '',
          age: user.age ? String(user.age) : '',
          gender: user.gender || '',
          height: user.height ? String(user.height) : '',
          avatar: user.profile_picture_url || '',
        }));
        localStorage.setItem('profile', JSON.stringify(user));
      } catch (err: any) {
        setError(err.message);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleChange('avatar', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const profileData = {
        full_name: form.full_name,
        bio: form.bio,
        age: form.age ? parseInt(form.age) : null,
        gender: form.gender,
        height: form.height ? parseFloat(form.height) : null,
        // profile_picture_url: form.avatar, // handle avatar upload separately if needed
        ...(form.password ? { password: form.password, password_confirmation: form.password } : {}),
      };
      const res = await updateProfile(profileData);
      setSuccess(true);
      localStorage.setItem('profile', JSON.stringify(res.user));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-lg bg-[#fbfffe] border-[#6d676e]/20">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-[#1b1b1e] mb-2">Profile Management</CardTitle>
          <p className="text-[#6d676e] text-sm mb-4">Update your personal information and avatar.</p>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          {success && <div className="text-green-600 text-center mb-2">Profile updated successfully!</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="w-24 h-24 mb-2">
                {form.avatar ? (
                  <AvatarImage src={form.avatar} alt={form.full_name} />
                ) : (
                  <AvatarFallback>{form.full_name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                )}
              </Avatar>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block text-sm text-[#6d676e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-[#1b1b1e] font-medium">Full Name</Label>
              <Input
                id="full_name"
                type="text"
                value={form.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-[#1b1b1e] font-medium">Bio</Label>
              <Input
                id="bio"
                type="text"
                value={form.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] text-[#1b1b1e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-[#1b1b1e] font-medium">Age</Label>
              <Input
                id="age"
                type="number"
                value={form.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] text-[#1b1b1e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-[#1b1b1e] font-medium">Gender</Label>
              <Input
                id="gender"
                type="text"
                value={form.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] text-[#1b1b1e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height" className="text-[#1b1b1e] font-medium">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={form.height}
                onChange={(e) => handleChange('height', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] text-[#1b1b1e]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1b1b1e] font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] text-[#1b1b1e]"
                placeholder="Enter new password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 