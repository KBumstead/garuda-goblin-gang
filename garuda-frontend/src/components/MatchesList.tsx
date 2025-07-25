import React, { useState, useEffect } from "react";
import { fetchMatches } from "../services/apiClient";

interface Match {
  match_id: string;
  match_datetime: string;
  home_team_score: number | null;
  away_team_score: number | null;
  home_club?: { name: string } | null;
  away_club?: { name: string } | null;
  home_school?: { name: string } | null;
  away_school?: { name: string } | null;
}

export function MatchesList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMatches()
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch matches");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-[#fbfffe]">Loading matches...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#fbfffe] mb-4">Matches</h1>
      <div className="bg-[#fbfffe] rounded-lg border border-[#6d676e]/20 p-6">
        <ul className="divide-y divide-[#6d676e]/10">
          {matches.map((match) => {
            const homeName =
              match.home_club?.name || match.away_club?.name || "Home";
            const awayName =
              match.away_club?.name || match.away_school?.name || "Away";
            return (
              <li
                key={match.match_id}
                className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <span>
                  {match.match_datetime?.slice(0, 10)}: {homeName} vs {awayName}
                </span>
                <span className="flex gap-2 items-center text-lg font-bold">
                  <span className="text-[#1b1b1e]">{homeName}</span>
                  <span className="text-[#f46036]">
                    {match.home_team_score ?? "-"}
                  </span>
                  <span className="text-[#6d676e]">-</span>
                  <span className="text-[#f46036]">
                    {match.away_team_score ?? "-"}
                  </span>
                  <span className="text-[#1b1b1e]">{awayName}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
