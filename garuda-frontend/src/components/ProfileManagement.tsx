import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface ProfileManagementProps {
  userRole: 'user' | 'scout' | 'trainer';
}

export function ProfileManagement({ userRole }: ProfileManagementProps) {
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    password: '',
    avatar: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated! (not really, this is a placeholder)');
    }, 1200);
  };

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-lg bg-[#fbfffe] border-[#6d676e]/20">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-[#1b1b1e] mb-2">Profile Management</CardTitle>
          <p className="text-[#6d676e] text-sm mb-4">Update your personal information and avatar.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="w-24 h-24 mb-2">
                {form.avatar ? (
                  <AvatarImage src={form.avatar} alt={form.name} />
                ) : (
                  <AvatarFallback>{form.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
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
              <Label htmlFor="name" className="text-[#1b1b1e] font-medium">Name</Label>
              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] text-[#1b1b1e]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1b1b1e] font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="bg-white border-[#6d676e]/30 focus:border-[#f46036] text-[#1b1b1e]"
                required
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