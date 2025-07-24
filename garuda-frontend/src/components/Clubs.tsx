import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Users, Calendar, Trophy } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockClubs = [
  {
    id: 1,
    name: "Jakarta Thunders",
    city: "Jakarta",
    logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop",
    category: "Professional",
    members: 25,
    founded: 2015,
    achievements: ["Jakarta League Champions 2023", "National Tournament Runner-up"],
    description: "Elite basketball club competing at the highest level in Indonesian basketball."
  },
  {
    id: 2,
    name: "Bandung Eagles",
    city: "Bandung",
    logo: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=200&h=200&fit=crop",
    category: "Semi-Pro",
    members: 18,
    founded: 2018,
    achievements: ["West Java Champions 2022"],
    description: "Competitive club focused on developing young talent and regional competitions."
  },
  {
    id: 3,
    name: "Surabaya Sharks",
    city: "Surabaya",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    category: "Amateur",
    members: 32,
    founded: 2020,
    achievements: ["East Java Amateur League Winners"],
    description: "Community-focused club welcoming players of all skill levels."
  },
  {
    id: 4,
    name: "Medan Warriors",
    city: "Medan",
    logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
    category: "Youth",
    members: 40,
    founded: 2017,
    achievements: ["North Sumatra Youth Champions"],
    description: "Dedicated to developing young basketball talent aged 12-18."
  },
  {
    id: 5,
    name: "Yogyakarta Dragons",
    city: "Yogyakarta",
    logo: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=200&h=200&fit=crop",
    category: "Semi-Pro",
    members: 22,
    founded: 2016,
    achievements: ["Central Java Semi-Pro League Champions"],
    description: "Competitive club with strong emphasis on teamwork and skill development."
  },
  {
    id: 6,
    name: "Bali Waves",
    city: "Denpasar",
    logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop",
    category: "Recreational",
    members: 35,
    founded: 2019,
    achievements: ["Community Spirit Award 2023"],
    description: "Recreational club promoting basketball as a fun and healthy lifestyle."
  }
];

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
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#fbfffe]">Find a Club</h1>
        <p className="text-[#6d676e]">{mockClubs.length} clubs available</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClubs.map((club) => (
          <Card key={club.id} className="bg-[#fbfffe] border-[#6d676e]/20 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-4">
                <ImageWithFallback
                  src={club.logo}
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
                <Badge className={getCategoryColor(club.category)}>
                  {club.category}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-[#6d676e]">
                  <Calendar className="w-4 h-4" />
                  <span>Est. {club.founded}</span>
                </div>
              </div>

              <p className="text-[#1b1b1e] text-sm line-clamp-3">{club.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                  <Users className="w-4 h-4" />
                  <span>{club.members} active members</span>
                </div>
                {club.achievements.length > 0 && (
                  <div className="flex items-start space-x-2 text-sm text-[#6d676e]">
                    <Trophy className="w-4 h-4 mt-0.5" />
                    <div>
                      {club.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="text-xs">{achievement}</div>
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
    </div>
  );
}