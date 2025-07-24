import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Star, Calendar, MapPin } from 'lucide-react';

const mockPlayer = {
  id: 1,
  name: "Ahmad Rizki",
  school: "SMA Jakarta Utara",
  position: "Point Guard",
  height: "175 cm",
  weight: "68 kg",
  age: 17,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  stats: {
    ppg: 18.5,
    apg: 7.2,
    rpg: 4.1,
    fg: "45.2%",
    threept: "38.7%",
    ft: "82.1%"
  },
  matchHistory: [
    {
      id: 1,
      date: "2024-07-15",
      opponent: "SMA Bandung",
      score: "78-65",
      performance: "24 pts, 8 ast, 5 reb"
    },
    {
      id: 2,
      date: "2024-07-10",
      opponent: "SMA Surabaya",
      score: "82-79",
      performance: "19 pts, 6 ast, 3 reb"
    },
    {
      id: 3,
      date: "2024-07-05",
      opponent: "SMA Medan",
      score: "91-88",
      performance: "22 pts, 9 ast, 4 reb"
    }
  ]
};

interface PlayerProfileProps {
  onBack: () => void;
  player?: any;
  userRole?: 'user' | 'scout' | 'trainer';
}

export function PlayerProfile({ onBack, player, userRole }: PlayerProfileProps) {
  const [scoutNotes, setScoutNotes] = useState("");
  // Use a 1-5 star rating system
  const [playerRating, setPlayerRating] = useState([player?.rating || 3]);

  // Use the passed player or fallback to mockPlayer
  const p = player || mockPlayer;

  const handleSubmitReview = () => {
    console.log("Review submitted:", { scoutNotes, playerRank: playerRating[0] });
    // Handle review submission
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="bg-[#fbfffe] border-[#6d676e] hover:bg-[#6d676e]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Database
        </Button>
        <h1 className="text-3xl font-bold text-[#fbfffe]">Player Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Player Info */}
        <div className="lg:col-span-1">
          <Card className="bg-[#fbfffe] border-[#6d676e]/20">
            <CardHeader className="text-center">
              <Avatar className="w-32 h-32 mx-auto">
                <AvatarImage src={p.avatar} alt={p.name} />
                <AvatarFallback className="text-2xl">{p.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl text-[#1b1b1e]">{p.name}</CardTitle>
              <p className="text-[#6d676e]">{p.school}</p>
              <Badge className="mx-auto bg-[#f46036]/10 text-[#f46036]">
                {p.position}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#1b1b1e]">{p.height}</p>
                  <p className="text-sm text-[#6d676e]">Height</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1b1b1e]">{p.weight}</p>
                  <p className="text-sm text-[#6d676e]">Weight</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1b1b1e]">{p.age}</p>
                  <p className="text-sm text-[#6d676e]">Age</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1b1b1e]">{p.stats?.ppg}</p>
                  <p className="text-sm text-[#6d676e]">PPG</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-[#1b1b1e] mb-3">Season Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6d676e]">APG:</span>
                    <span className="font-medium text-[#1b1b1e]">{p.stats?.apg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6d676e]">RPG:</span>
                    <span className="font-medium text-[#1b1b1e]">{p.stats?.rpg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6d676e]">FG%:</span>
                    <span className="font-medium text-[#1b1b1e]">{p.stats?.fg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6d676e]">3PT%:</span>
                    <span className="font-medium text-[#1b1b1e]">{p.stats?.threept}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-[#6d676e]">FT%:</span>
                    <span className="font-medium text-[#1b1b1e]">{p.stats?.ft}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Tabs */}
        <div className="lg:col-span-2">
          <Card className="bg-[#fbfffe] border-[#6d676e]/20">
            <Tabs defaultValue="review" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#6d676e]/10">
                <TabsTrigger value="review" className="data-[state=active]:bg-[#f46036] data-[state=active]:text-white">
                  Add Review & Ranking
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-[#f46036] data-[state=active]:text-white">
                  Match History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="review" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1b1b1e] mb-3">Scout Notes & Comments</h3>
                  <Textarea
                    placeholder={userRole === 'user' ? 'Viewing scout notes and observations...' : 'Add your scouting notes and observations about this player...'}
                    value={scoutNotes}
                    onChange={userRole === 'user' ? undefined : (e) => setScoutNotes(e.target.value)}
                    className="min-h-32 bg-white border-[#6d676e]/30 focus:border-[#f46036]"
                    readOnly={userRole === 'user'}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#1b1b1e] mb-3">Player Rating</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6d676e]">{userRole === 'user' ? 'Assigned Rating' : 'Assign Rating (1-5 Stars)'}</span>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <button
                            key={i}
                            type="button"
                            disabled={userRole === 'user'}
                            onClick={userRole === 'user' ? undefined : () => setPlayerRating([i + 1])}
                            style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: userRole === 'user' ? 'default' : 'pointer' }}
                          >
                            <Star className={`w-5 h-5 ${i < playerRating[0] ? 'text-[#f46036]' : 'text-[#e0e0e0]'}`} fill={i < playerRating[0] ? '#f46036' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-[#6d676e]">
                      <span>Needs Development</span>
                      <span>Elite Talent</span>
                    </div>
                  </div>
                </div>
                {userRole !== 'user' && (
                  <Button 
                    onClick={handleSubmitReview}
                    className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium"
                  >
                    Submit Review
                  </Button>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="p-6">
                <h3 className="text-lg font-semibold text-[#1b1b1e] mb-4">Recent Matches</h3>
                <div className="space-y-4">
                  {(p.matchHistory || []).map((match: any) => (
                    <div key={match.id} className="border border-[#6d676e]/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-[#6d676e]" />
                          <span className="text-sm text-[#6d676e]">{match.date}</span>
                        </div>
                        <Badge variant="outline" className="text-[#1b1b1e]">
                          {match.score}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1b1b1e]">vs {match.opponent}</span>
                        <span className="text-sm text-[#6d676e]">{match.performance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}