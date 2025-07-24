import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from './ui/utils';

const mockTeams = [
  "SMA Jakarta Utara",
  "SMA Bandung Raya", 
  "SMA Surabaya",
  "SMA Medan Central",
  "SMA Yogyakarta",
  "SMA Denpasar",
  "SMA Makassar",
  "SMA Palembang"
];

const mockPlayers = [
  { id: 1, name: "Ahmad Rizki", team: "SMA Jakarta Utara" },
  { id: 2, name: "Budi Santoso", team: "SMA Bandung Raya" },
  { id: 3, name: "Charles Wijaya", team: "SMA Surabaya" },
  { id: 4, name: "Dani Kurniawan", team: "SMA Medan Central" },
  { id: 5, name: "Eko Prasetyo", team: "SMA Yogyakarta" }
];

interface PlayerComment {
  playerId: string;
  playerName: string;
  comment: string;
}

export function AddMatchReview() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [matchDate, setMatchDate] = useState<Date>();
  const [matchSummary, setMatchSummary] = useState("");
  const [playerComments, setPlayerComments] = useState<PlayerComment[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [newComment, setNewComment] = useState("");

  const availablePlayers = mockPlayers.filter(player => 
    player.team === homeTeam || player.team === awayTeam
  );

  const addPlayerComment = () => {
    if (selectedPlayer && newComment.trim()) {
      const player = availablePlayers.find(p => p.id.toString() === selectedPlayer);
      if (player) {
        setPlayerComments([...playerComments, {
          playerId: selectedPlayer,
          playerName: player.name,
          comment: newComment.trim()
        }]);
        setSelectedPlayer("");
        setNewComment("");
      }
    }
  };

  const removePlayerComment = (index: number) => {
    setPlayerComments(playerComments.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Match review submitted:", {
      homeTeam,
      awayTeam,
      matchDate,
      matchSummary,
      playerComments
    });
    // Handle form submission
  };

  const isFormValid = homeTeam && awayTeam && matchDate && matchSummary.trim();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#fbfffe]">Submit a New Match Review</h1>
      </div>

      <Card className="bg-[#fbfffe] border-[#6d676e]/20">
        <CardHeader>
          <CardTitle className="text-xl text-[#1b1b1e]">Match Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Team Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="home-team" className="text-[#1b1b1e] font-medium">Home Team</Label>
              <Select value={homeTeam} onValueChange={setHomeTeam}>
                <SelectTrigger className="bg-white border-[#6d676e]/30">
                  <SelectValue placeholder="Select home team" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeams.map((team) => (
                    <SelectItem key={team} value={team} disabled={team === awayTeam}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="away-team" className="text-[#1b1b1e] font-medium">Away Team</Label>
              <Select value={awayTeam} onValueChange={setAwayTeam}>
                <SelectTrigger className="bg-white border-[#6d676e]/30">
                  <SelectValue placeholder="Select away team" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeams.map((team) => (
                    <SelectItem key={team} value={team} disabled={team === homeTeam}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Match Date */}
          <div className="space-y-2">
            <Label className="text-[#1b1b1e] font-medium">Match Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-[#6d676e]/30",
                    !matchDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {matchDate ? format(matchDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={matchDate}
                  onSelect={setMatchDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Match Summary */}
          <div className="space-y-2">
            <Label htmlFor="match-summary" className="text-[#1b1b1e] font-medium">Overall Match Summary</Label>
            <Textarea
              id="match-summary"
              placeholder="Provide an overall summary of the match including key moments, standout performances, and game flow..."
              value={matchSummary}
              onChange={(e) => setMatchSummary(e.target.value)}
              className="min-h-32 bg-white border-[#6d676e]/30 focus:border-[#f46036]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Player Comments Section */}
      <Card className="bg-[#fbfffe] border-[#6d676e]/20">
        <CardHeader>
          <CardTitle className="text-xl text-[#1b1b1e]">Individual Player Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Player Comment */}
          <div className="space-y-4 p-4 bg-[#6d676e]/5 rounded-lg">
            <h4 className="font-medium text-[#1b1b1e]">Add Player Comment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-[#1b1b1e] font-medium">Select Player</Label>
                <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                  <SelectTrigger className="bg-white border-[#6d676e]/30">
                    <SelectValue placeholder="Choose a player" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePlayers.map((player) => (
                      <SelectItem 
                        key={player.id} 
                        value={player.id.toString()}
                        disabled={playerComments.some(comment => comment.playerId === player.id.toString())}
                      >
                        {player.name} ({player.team})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-[#1b1b1e] font-medium">Comment</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add specific notes about this player's performance..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-white border-[#6d676e]/30"
                  />
                  <Button 
                    onClick={addPlayerComment}
                    disabled={!selectedPlayer || !newComment.trim()}
                    className="bg-[#f46036] hover:bg-[#f46036]/90 text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Player Comments List */}
          {playerComments.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-[#1b1b1e]">Player Comments ({playerComments.length})</h4>
              {playerComments.map((comment, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-white border border-[#6d676e]/20 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-[#1b1b1e]">{comment.playerName}</p>
                    <p className="text-sm text-[#6d676e] mt-1">{comment.comment}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePlayerComment(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="px-8 bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium"
        >
          Publish Review
        </Button>
      </div>
    </div>
  );
}