import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';

const mockPrograms = [
  {
    id: 1,
    name: "Elite Basketball Camp",
    organizer: "Coach Marcus Thompson",
    city: "Jakarta",
    price: "Rp 2,500,000",
    duration: "2 weeks",
    level: "Advanced",
    participants: 20,
    description: "Intensive training camp for elite high school players focusing on advanced techniques and game strategy.",
    startDate: "Aug 15, 2024"
  },
  {
    id: 2,
    name: "Youth Development Program",
    organizer: "Jakarta Basketball Academy",
    city: "Jakarta",
    price: "Rp 1,200,000",
    duration: "1 month",
    level: "Beginner",
    participants: 30,
    description: "Foundational training program for young players aged 13-16 focusing on basic skills and teamwork.",
    startDate: "Sep 1, 2024"
  },
  {
    id: 3,
    name: "Skills & Drills Workshop",
    organizer: "Coach Sarah Williams",
    city: "Bandung",
    price: "Rp 800,000",
    duration: "3 days",
    level: "Intermediate",
    participants: 15,
    description: "Weekend workshop focusing on shooting techniques, ball handling, and defensive fundamentals.",
    startDate: "Aug 20, 2024"
  },
  {
    id: 4,
    name: "Point Guard Masterclass",
    organizer: "Indonesian Basketball Federation",
    city: "Surabaya",
    price: "Rp 1,800,000",
    duration: "1 week",
    level: "Advanced",
    participants: 12,
    description: "Specialized training for point guards covering leadership, court vision, and playmaking.",
    startDate: "Sep 10, 2024"
  },
  {
    id: 5,
    name: "Free Community Training",
    organizer: "Bali Basketball Club",
    city: "Denpasar",
    price: "Free",
    duration: "4 weeks",
    level: "All Levels",
    participants: 50,
    description: "Community outreach program providing free basketball training for underprivileged youth.",
    startDate: "Aug 25, 2024"
  },
  {
    id: 6,
    name: "High Performance Camp",
    organizer: "Coach David Chen",
    city: "Medan",
    price: "Rp 3,200,000",
    duration: "3 weeks",
    level: "Elite",
    participants: 16,
    description: "Elite camp for top-tier players preparing for national competitions and scholarships.",
    startDate: "Sep 5, 2024"
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-blue-100 text-blue-800';
    case 'Advanced':
      return 'bg-orange-100 text-orange-800';
    case 'Elite':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function TrainingPrograms() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#fbfffe]">Available Training Programs</h1>
        <p className="text-[#6d676e]">{mockPrograms.length} programs available</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPrograms.map((program) => (
          <Card key={program.id} className="bg-[#fbfffe] border-[#6d676e]/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-[#1b1b1e] line-clamp-2">
                  {program.name}
                </CardTitle>
                <Badge className={getLevelColor(program.level)}>
                  {program.level}
                </Badge>
              </div>
              <p className="text-[#6d676e] font-medium">{program.organizer}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#1b1b1e] text-sm line-clamp-3">{program.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                  <MapPin className="w-4 h-4" />
                  <span>{program.city}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                  <Calendar className="w-4 h-4" />
                  <span>{program.startDate} • {program.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                  <Users className="w-4 h-4" />
                  <span>{program.participants} participants</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                  <DollarSign className="w-4 h-4" />
                  <span className={program.price === 'Free' ? 'text-green-600 font-medium' : 'font-medium'}>
                    {program.price}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}