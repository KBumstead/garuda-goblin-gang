import React, { useState } from 'react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockPlayers = [
  {
    id: 1,
    rank: 1,
    name: "Ahmad Rizki",
    school: "SMA Jakarta Utara",
    position: "Point Guard",
    ppg: 18.5,
    region: "Jakarta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    rank: 2,
    name: "Budi Santoso",
    school: "SMA Bandung Raya",
    position: "Shooting Guard",
    ppg: 16.8,
    region: "West Java",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    rank: 3,
    name: "Charles Wijaya",
    school: "SMA Surabaya",
    position: "Small Forward",
    ppg: 15.2,
    region: "East Java",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    rank: 4,
    name: "Dani Kurniawan",
    school: "SMA Medan Central",
    position: "Power Forward",
    ppg: 14.9,
    region: "North Sumatra",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    rank: 5,
    name: "Eko Prasetyo",
    school: "SMA Yogyakarta",
    position: "Center",
    ppg: 13.7,
    region: "Central Java",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f2d?w=150&h=150&fit=crop&crop=face"
  }
];

const positions = ["All Positions", "Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"];
const regions = ["All Regions", "Jakarta", "West Java", "East Java", "Central Java", "North Sumatra"];

export function PlayerRankings() {
  const [selectedPosition, setSelectedPosition] = useState("All Positions");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const filteredPlayers = mockPlayers.filter(player => {
    const positionMatch = selectedPosition === "All Positions" || player.position === selectedPosition;
    const regionMatch = selectedRegion === "All Regions" || player.region === selectedRegion;
    return positionMatch && regionMatch;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#fbfffe]">Player Rankings</h1>
        <div className="flex space-x-4">
          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger className="w-48 bg-[#fbfffe] border-[#6d676e]">
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
            <SelectTrigger className="w-48 bg-[#fbfffe] border-[#6d676e]">
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
        </div>
      </div>

      <Card className="bg-[#fbfffe] border-[#6d676e]/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#6d676e]/20">
                <th className="text-left p-4 font-semibold text-[#1b1b1e]">Rank</th>
                <th className="text-left p-4 font-semibold text-[#1b1b1e]">Player</th>
                <th className="text-left p-4 font-semibold text-[#1b1b1e]">School</th>
                <th className="text-left p-4 font-semibold text-[#1b1b1e]">Position</th>
                <th className="text-left p-4 font-semibold text-[#1b1b1e]">PPG</th>
                <th className="text-left p-4 font-semibold text-[#1b1b1e]">Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="border-b border-[#6d676e]/10 hover:bg-[#6d676e]/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#f46036] text-white rounded-full font-bold">
                      {player.rank}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={player.avatar} alt={player.name} />
                        <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-[#1b1b1e]">{player.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#1b1b1e]">{player.school}</td>
                  <td className="p-4">
                    <Badge variant="secondary" className="bg-[#6d676e]/10 text-[#1b1b1e]">
                      {player.position}
                    </Badge>
                  </td>
                  <td className="p-4 text-[#1b1b1e] font-medium">{player.ppg}</td>
                  <td className="p-4 text-[#6d676e]">{player.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}