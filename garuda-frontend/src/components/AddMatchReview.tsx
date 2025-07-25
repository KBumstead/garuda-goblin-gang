import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  fetchMatches,
  getPlayersForMatch,
  addMatchReview,
} from "../services/apiClient";

interface Match {
  match_id: string;
  match_datetime: string;
  home_club?: { name: string } | null;
  away_club?: { name: string } | null;
  home_school?: { name: string } | null;
  away_school?: { name: string } | null;
  home_team_score: number | null;
  away_team_score: number | null;
}

interface Player {
  player_id: string;
  user?: { full_name: string };
}

export function AddMatchReview() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [playersByMatch, setPlayersByMatch] = useState<
    Record<string, Player[]>
  >({});
  const [reviews, setReviews] = useState<
    Record<string, { playerId: string; notes: string }>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMatches()
      .then(async (matches) => {
        setMatches(matches);
        // Fetch players for each match
        const playersMap: Record<string, Player[]> = {};
        await Promise.all(
          matches.map(async (match) => {
            try {
              const players = await getPlayersForMatch(match.match_id);
              playersMap[match.match_id] = players;
            } catch {
              playersMap[match.match_id] = [];
            }
          })
        );
        setPlayersByMatch(playersMap);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch matches");
        setLoading(false);
      });
  }, []);

  const handleReviewChange = (
    matchId: string,
    field: string,
    value: string
  ) => {
    setReviews((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], [field]: value },
    }));
  };

  const handleSubmit = async (matchId: string) => {
    setSubmitting(matchId);
    setSuccess(null);
    setError(null);
    const review = reviews[matchId];
    try {
      await addMatchReview({
        match_id: matchId,
        player_id: review.playerId,
        comment: review.notes,
      });
      setSuccess("Review submitted!");
      setReviews((prev) => ({
        ...prev,
        [matchId]: { playerId: "", notes: "" },
      }));
    } catch (e: any) {
      setError(e.message || "Failed to submit review");
    } finally {
      setSubmitting(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-[#fbfffe]">Loading matches and players...</div>
    );
  }
  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[#fbfffe] mb-4">
        Add Match Reviews
      </h1>
      {matches.map((match: Match) => {
        const homeName =
          match.home_club?.name || match.home_school?.name || "Home";
        const awayName =
          match.away_club?.name || match.away_school?.name || "Away";
        const players = playersByMatch[match.match_id] || [];
        const review = reviews[match.match_id] || { playerId: "", notes: "" };
        return (
          <Card
            key={match.match_id}
            className="bg-[#fbfffe] border-[#6d676e]/20"
          >
            <CardHeader>
              <CardTitle className="text-xl text-[#1b1b1e]">
                {homeName} vs {awayName}{" "}
                <span className="text-sm text-[#6d676e]">
                  ({match.match_datetime?.slice(0, 10)})
                </span>
              </CardTitle>
              <div className="flex gap-2 items-center mt-1 text-lg font-bold">
                <span className="text-[#1b1b1e]">{homeName}</span>
                <span className="text-[#f46036]">
                  {match.home_team_score ?? "-"}
                </span>
                <span className="text-[#6d676e]">-</span>
                <span className="text-[#f46036]">
                  {match.away_team_score ?? "-"}
                </span>
                <span className="text-[#1b1b1e]">{awayName}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#1b1b1e] font-medium">
                    Select Player
                  </Label>
                  <Select
                    value={review.playerId}
                    onValueChange={(val) =>
                      handleReviewChange(match.match_id, "playerId", val)
                    }
                  >
                    <SelectTrigger className="bg-white border-[#6d676e]/30">
                      <SelectValue placeholder="Choose a player" />
                    </SelectTrigger>
                    <SelectContent>
                      {players.length === 0 && (
                        <SelectItem value="" disabled>
                          No players
                        </SelectItem>
                      )}
                      {players.map((player) => (
                        <SelectItem
                          key={player.player_id}
                          value={player.player_id}
                        >
                          {player.user?.full_name || player.player_id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1b1b1e] font-medium">Notes</Label>
                  <Input
                    placeholder="Add notes..."
                    value={review.notes}
                    onChange={(e) =>
                      handleReviewChange(
                        match.match_id,
                        "notes",
                        e.target.value
                      )
                    }
                    className="bg-white border-[#6d676e]/30"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSubmit(match.match_id)}
                  disabled={
                    !review.playerId ||
                    !review.notes?.trim() ||
                    submitting === match.match_id
                  }
                  className="bg-[#f46036] hover:bg-[#f46036]/90 text-white"
                >
                  {submitting === match.match_id
                    ? "Submitting..."
                    : "Submit Review"}
                </Button>
              </div>
              {success && <div className="text-green-600 mt-2">{success}</div>}
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
