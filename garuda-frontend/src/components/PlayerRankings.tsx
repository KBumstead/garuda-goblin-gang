import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Remove mockPlayers
// export const mockPlayers = [ ... ];
// Temporary mock data for testing while API is not ready
const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Ahmad Rizki",
    school: "SMA Jakarta Utara",
    position: "Point Guard",
    rating: 5,
    age: 17,
    gender: "Male",
    region: "Jakarta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Budi Santoso",
    school: "SMA Bandung Raya",
    position: "Shooting Guard",
    rating: 4,
    age: 18,
    gender: "Male",
    region: "West Java",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Charles Wijaya",
    school: "SMA Surabaya",
    position: "Small Forward",
    rating: 3,
    age: 17,
    gender: "Male",
    region: "East Java",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Dani Kurniawan",
    school: "SMA Medan Central",
    position: "Power Forward",
    rating: 2,
    age: 16,
    gender: "Male",
    region: "North Sumatra",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    school: "SMA Yogyakarta",
    position: "Center",
    rating: 1,
    age: 18,
    gender: "Male",
    region: "Central Java",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Siti Rahma",
    school: "SMA Jakarta Selatan",
    position: "Shooting Guard",
    rating: 4,
    age: 17,
    gender: "Female",
    region: "Jakarta",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 7,
    name: "Maya Putri",
    school: "SMA Bandung Barat",
    position: "Point Guard",
    rating: 3,
    age: 16,
    gender: "Female",
    region: "West Java",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

const positions = ["All Positions", "Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"];
const regions = ["All Regions", "Jakarta", "West Java", "East Java", "Central Java", "North Sumatra"];
const genders = ["All Genders", "Male", "Female"];
const ages = ["All Ages", "16", "17", "18"];

interface Player {
  id: number;
  rank?: number;
  name: string;
  school: string;
  position: string;
  rating: number;
  age: number;
  gender: string;
  region: string;
  avatar: string;
}

interface PlayerRankingsProps {
  onPlayerClick?: (player: Player) => void;
  userRole?: 'user' | 'scout' | 'trainer';
  enableSearch?: boolean;
}

export function PlayerRankings({ onPlayerClick, userRole, enableSearch }: PlayerRankingsProps) {
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedPosition, setSelectedPosition] = useState("All Positions");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedGender, setSelectedGender] = useState("All Genders");
  const [selectedAge, setSelectedAge] = useState("All Ages");
  // Always sort players by rating (desc) by default
  const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);

  const filteredPlayers = sortedPlayers.filter(player => {
    const positionMatch = selectedPosition === "All Positions" || player.position === selectedPosition;
    const regionMatch = selectedRegion === "All Regions" || player.region === selectedRegion;
    const genderMatch = selectedGender === "All Genders" || player.gender === selectedGender;
    const ageMatch = selectedAge === "All Ages" || player.age === Number(selectedAge);
    const searchMatch =
      !enableSearch ||
      search.trim() === '' ||
      player.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      player.school.toLowerCase().includes(search.trim().toLowerCase());
    return positionMatch && regionMatch && genderMatch && ageMatch && searchMatch;
  });

  /*
  useEffect(() => {
    const fetchPlayerRankings = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/players/rankings');
        setPlayers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch player rankings.');
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayerRankings();
  }, []);
  */

  if (loading) return <div className="p-8 text-center text-[#6d676e]">Loading player rankings...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#fbfffe] mb-2 md:mb-0">{enableSearch ? 'Player Database' : 'Player Rankings'}</h1>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full md:w-auto">
          {enableSearch && (
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or school..."
              className="px-3 py-2 rounded-md border border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] bg-white min-w-[180px] w-full sm:w-auto transition-shadow focus:shadow-lg"
            />
          )}
          <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger className="w-40 bg-[#fbfffe] border-[#6d676e]">
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40 bg-[#fbfffe] border-[#6d676e]">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="w-32 bg-[#fbfffe] border-[#6d676e]">
                <SelectValue placeholder="Filter by gender" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger className="w-32 bg-[#fbfffe] border-[#6d676e]">
                <SelectValue placeholder="Filter by age" />
              </SelectTrigger>
              <SelectContent>
                {ages.map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Card className="bg-[#fbfffe] border-[#6d676e]/20 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] sm:min-w-[900px]">
            <thead>
              <tr className="border-b border-[#6d676e]/20">
                <th className="text-left p-2 sm:p-4 text-xs sm:text-base font-semibold text-[#1b1b1e]">Rank</th>
                <th className="text-left p-2 sm:p-4 text-xs sm:text-base font-semibold text-[#1b1b1e]">Player</th>
                <th className="text-left p-2 sm:p-4 text-xs sm:text-base font-semibold text-[#1b1b1e]">School</th>
                <th className="text-left p-2 sm:p-4 text-xs sm:text-base font-semibold text-[#1b1b1e]">Position</th>
                <th className="text-left p-2 sm:p-4 text-xs sm:text-base font-semibold text-[#1b1b1e]">
                  Rating
                </th>
                <th className="text-left p-2 sm:p-4 text-xs sm:text-base font-semibold text-[#1b1b1e]">Age</th>
                <th className="text-left p-2 sm:p-4 text-xs sm:text-base font-semibold text-[#1b1b1e]">Gender</th>
                <th className="text-left p-2 sm:p-4 text-xs sm:text-base font-semibold text-[#1b1b1e]">Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-[#6d676e] text-lg">No players found. Try adjusting your filters or search.</td>
                </tr>
              ) : (
                filteredPlayers.map((player, idx) => (
                  <tr key={player.id} className="border-b border-[#6d676e]/10 hover:bg-[#f46036]/10 transition-colors duration-200">
                    <td className="p-2 sm:p-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-[#f46036] text-white rounded-full font-bold">
                        {idx + 1}
                      </div>
                    </td>
                    <td className="p-2 sm:p-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <button
                          className="font-medium text-[#1b1b1e] hover:underline focus:outline-none transition-colors duration-150 focus:ring-2 focus:ring-[#f46036] rounded"
                          style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                          onClick={() => onPlayerClick && onPlayerClick(player)}
                        >
                          {player.name}
                        </button>
                      </div>
                    </td>
                    <td className="p-2 sm:p-4 text-[#1b1b1e]">{player.school}</td>
                    <td className="p-2 sm:p-4">
                      <Badge variant="secondary" className="bg-[#6d676e]/10 text-[#1b1b1e]">
                        {player.position}
                      </Badge>
                    </td>
                    <td className="p-2 sm:p-4 text-[#1b1b1e] font-medium">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} style={{ color: i < (player.rating || 3) ? '#f46036' : '#e0e0e0', fontSize: '1.1em', transition: 'color 0.2s' }}>
                          ★
                        </span>
                      ))}
                    </td>
                    <td className="p-2 sm:p-4 text-[#1b1b1e]">{player.age}</td>
                    <td className="p-2 sm:p-4 text-[#1b1b1e]">{player.gender}</td>
                    <td className="p-2 sm:p-4 text-[#1b1b1e]">{player.region}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}