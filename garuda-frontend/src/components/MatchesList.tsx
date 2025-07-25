import React from "react";

const mockMatches = [
  {
    id: 1,
    date: "2024-06-01",
    homeTeam: "SMA Jakarta Utara",
    awayTeam: "SMA Bandung Raya",
    homeScore: 78,
    awayScore: 65,
  },
  {
    id: 2,
    date: "2024-06-02",
    homeTeam: "SMA Surabaya",
    awayTeam: "SMA Medan Central",
    homeScore: 82,
    awayScore: 80,
  },
];

export function MatchesList() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#fbfffe] mb-4">Matches</h1>
      <div className="bg-[#fbfffe] rounded-lg border border-[#6d676e]/20 p-6">
        <ul className="divide-y divide-[#6d676e]/10">
          {mockMatches.map((match) => (
            <li
              key={match.id}
              className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <span>
                {match.date}: {match.homeTeam} vs {match.awayTeam}
              </span>
              <span className="flex gap-2 items-center text-lg font-bold">
                <span className="text-[#1b1b1e]">{match.homeTeam}</span>
                <span className="text-[#f46036]">{match.homeScore}</span>
                <span className="text-[#6d676e]">-</span>
                <span className="text-[#f46036]">{match.awayScore}</span>
                <span className="text-[#1b1b1e]">{match.awayTeam}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
