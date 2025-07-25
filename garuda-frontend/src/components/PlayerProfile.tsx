import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Star, Calendar, MapPin } from 'lucide-react';
import { fetchPlayerById } from '../services/apiClient';
import { useParams } from 'react-router';

interface PlayerProfileProps {
  onBack: () => void;
  player?: any; // If provided, use this, else fetch by id
  userRole?: 'user' | 'scout' | 'trainer';
}

export function PlayerProfile({ onBack, player, userRole }: PlayerProfileProps) {
  const playerId = useParams().id || '';
  const [scoutNotes, setScoutNotes] = useState("");
  const [playerRating, setPlayerRating] = useState([player?.rating || 3]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedPlayer, setFetchedPlayer] = useState<any>(null);

  // If player prop is provided, use it; else fetch by id (assume player?.id or player?.player_id)
  // useEffect(() => {
  //   if (player) {
  //     setFetchedPlayer(player);
  //     return;
  //   }
  //   // If no player prop, try to fetch by id from route param or fallback
  //   // For now, assume player prop is always provided, or you can add route param logic here
  // }, [player]);

  // If you want to always fetch from backend (even if player prop is provided), use this:
  useEffect(() => {
    setLoading(true);
    fetchPlayerById(playerId)
      .then((data) => {
        setFetchedPlayer(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch player data');
        setLoading(false);
      });
  }, [player]);

  const p = fetchedPlayer || player;

  const handleSubmitReview = () => {
    console.log("Review submitted:", { scoutNotes, playerRank: playerRating[0] });
    // Handle review submission
  };

  if (loading) return <div className="p-8 text-center text-[#6d676e]">Loading player profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="bg-[#fbfffe] border-[#6d676e] hover:bg-[#6d676e]/10 transition-colors focus:ring-2 focus:ring-[#f46036] rounded"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Database
        </Button>
        <h1 className="text-3xl font-bold text-[#fbfffe]">Player Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Player Info */}
        <div className="lg:col-span-1">
          <Card className="bg-[#fbfffe] border-[#6d676e]/20 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="w-32 h-32 mx-auto">
                <AvatarImage src={p?.user?.profile_picture_url || ''} alt={p?.user?.full_name || ''} />
                <AvatarFallback className="text-2xl">{p?.user?.full_name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl text-[#1b1b1e]">{p?.user?.full_name || ''}</CardTitle>
              <p className="text-[#6d676e]">{p?.school?.name || ''}</p>
              <Badge className="mx-auto bg-[#f46036]/10 text-[#f46036]">
                {p?.position || ''}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#1b1b1e]">{p?.height_cm ? `${p.height_cm} cm` : '-'}</p>
                  <p className="text-sm text-[#6d676e]">Height</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1b1b1e]">{p?.weight_kg ? `${p.weight_kg} kg` : '-'}</p>
                  <p className="text-sm text-[#6d676e]">Weight</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1b1b1e]">{p?.user?.age || '-'}</p>
                  <p className="text-sm text-[#6d676e]">Age</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1b1b1e]">{p?.user?.gender || '-'}</p>
                  <p className="text-sm text-[#6d676e]">Gender</p>
                </div>
              </div>

              {p?.user?.bio && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-[#1b1b1e] mb-2">Bio</h4>
                  <p className="text-[#6d676e] text-sm">{p.user.bio}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-semibold text-[#1b1b1e] mb-3">Season Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {/* TODO: Map real stats if available */}
                  <div className="flex justify-between col-span-2">
                    <span className="text-[#6d676e]">No stats available</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Tabs */}
        <div className="lg:col-span-2">
          <Card className="bg-[#fbfffe] border-[#6d676e]/20 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <Tabs defaultValue="review" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#6d676e]/10">
                <TabsTrigger value="review" className="data-[state=active]:bg-[#f46036] data-[state=active]:text-white transition-colors">Add Review & Ranking</TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-[#f46036] data-[state=active]:text-white transition-colors">Match History</TabsTrigger>
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
                    className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium transition-colors focus:ring-2 focus:ring-[#f46036] rounded"
                  >
                    Submit Review
                  </Button>
                )}
              </TabsContent>
              
              {/* <TabsContent value="history" className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-[#1b1b1e] mb-4">Recent Matches</h3>
                {p.matchHistory && p.matchHistory.length > 0 ? (
                  <ul className="space-y-4">
                    {p.matchHistory.map((match: any) => (
                      <li key={match.id} className="bg-[#f46036]/5 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-[#1b1b1e]">{match.opponent}</div>
                          <div className="text-[#6d676e] text-sm">{match.date} &bull; {match.score}</div>
                        </div>
                        <div className="text-[#f46036] font-bold text-sm mt-2 sm:mt-0">{match.performance}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-[#6d676e] py-8 text-lg">No match history available.</div>
                )}
              </TabsContent> */}
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}