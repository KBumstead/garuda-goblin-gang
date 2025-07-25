import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Users, Calendar, Trophy } from 'lucide-react';
import { fetchClubs } from '../services/apiClient';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Club {
  club_id: string;
  name: string;
  city: string;
  description: string;
  logo_url: string | null;
  contact_email: string | null;
  category?: string | null;
  members?: number | null;
  founded?: number | null;
  achievements?: string | null;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Professional':
      return 'bg-red-100 text-red-800';
    case 'Semi-Pro':
      return 'bg-orange-100 text-orange-800';
    case 'Amateur':
      return 'bg-blue-100 text-blue-800';
    case 'Youth':
      return 'bg-green-100 text-green-800';
    case 'Recreational':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchClubs()
      .then((data) => {
        setClubs(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch clubs');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#fbfffe]">Find a Club</h1>
        <p className="text-[#6d676e]">{clubs.length} clubs available</p>
      </div>

      {loading ? (
        <div className="text-center text-[#f46036] py-8">Loading clubs...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Card key={club.club_id} className="bg-[#fbfffe] border-[#6d676e]/20 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-4">
                  <ImageWithFallback
                    src={club.logo_url || ''}
                    alt={`${club.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-[#1b1b1e]">
                  {club.name}
                </CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#6d676e]" />
                  <span className="text-[#6d676e]">{club.city}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getCategoryColor(club.category || '')}>
                    {club.category || 'N/A'}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-[#6d676e]">
                    <Calendar className="w-4 h-4" />
                    <span>Est. {club.founded || 'N/A'}</span>
                  </div>
                </div>

                <p className="text-[#1b1b1e] text-sm line-clamp-3">{club.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                    <Users className="w-4 h-4" />
                    <span>{club.members || 0} active members</span>
                  </div>
                  {club.achievements && club.achievements.length > 0 && (
                    <div className="flex items-start space-x-2 text-sm text-[#6d676e]">
                      <Trophy className="w-4 h-4 mt-0.5" />
                      <div>
                        {club.achievements.split(',').slice(0, 2).map((achievement, index) => (
                          <div key={index} className="text-xs">{achievement.trim()}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    className="flex-1 border-[#f46036] text-[#f46036] hover:bg-[#f46036] hover:text-white"
                  >
                    Learn More
                  </Button>
                  <Button 
                    className="flex-1 bg-[#f46036] hover:bg-[#f46036]/90 text-white"
                  >
                    Inquire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}