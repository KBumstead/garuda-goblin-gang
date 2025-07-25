import React, { useState } from "react";
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

// --- Mock match data ---
const mockMatches = [
  {
    id: 1,
    date: "2024-06-01",
    homeTeam: "SMA Jakarta Utara",
    awayTeam: "SMA Bandung Raya",
    players: [
      { id: 1, name: "Ahmad Rizki", team: "SMA Jakarta Utara" },
      { id: 2, name: "Budi Santoso", team: "SMA Bandung Raya" },
      { id: 3, name: "Charles Wijaya", team: "SMA Jakarta Utara" },
      { id: 4, name: "Dani Kurniawan", team: "SMA Bandung Raya" },
    ],
    homeScore: 78,
    awayScore: 65,
  },
  {
    id: 2,
    date: "2024-06-02",
    homeTeam: "SMA Surabaya",
    awayTeam: "SMA Medan Central",
    players: [
      { id: 5, name: "Eko Prasetyo", team: "SMA Surabaya" },
      { id: 6, name: "Fajar Hidayat", team: "SMA Medan Central" },
      { id: 7, name: "Gilang Saputra", team: "SMA Surabaya" },
      { id: 8, name: "Hendra Wijaya", team: "SMA Medan Central" },
    ],
    homeScore: 82,
    awayScore: 80,
  },
];

export function AddMatchReview() {
  // State for reviews per match
  const [reviews, setReviews] = useState(
    mockMatches.map(() => ({ playerId: "", notes: "", rating: "" }))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleReviewChange = (
    matchIdx: number,
    field: string,
    value: string
  ) => {
    setReviews((prev) => {
      const updated = [...prev];
      updated[matchIdx] = { ...updated[matchIdx], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (matchIdx: number) => {
    const match = mockMatches[matchIdx];
    const review = reviews[matchIdx];
    // Here you would send the review to the backend
    alert(
      `Review submitted for ${match.homeTeam} vs ${match.awayTeam} (Player: ${
        match.players.find((p) => p.id.toString() === review.playerId)?.name ||
        ""
      })\nNotes: ${review.notes}\nRating: ${review.rating}`
    );
    setSubmitted(true);
    // Optionally reset the review for this match
    setReviews((prev) => {
      const updated = [...prev];
      updated[matchIdx] = { playerId: "", notes: "", rating: "" };
      return updated;
    });
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-[#fbfffe] mb-4">
        Add Match Reviews
      </h1>
      {mockMatches.map((match, idx) => (
        <Card key={match.id} className="bg-[#fbfffe] border-[#6d676e]/20">
          <CardHeader>
            <CardTitle className="text-xl text-[#1b1b1e]">
              {match.homeTeam} vs {match.awayTeam}{" "}
              <span className="text-sm text-[#6d676e]">({match.date})</span>
            </CardTitle>
            <div className="flex gap-2 items-center mt-1 text-lg font-bold">
              <span className="text-[#1b1b1e]">{match.homeTeam}</span>
              <span className="text-[#f46036]">{match.homeScore ?? "-"}</span>
              <span className="text-[#6d676e]">-</span>
              <span className="text-[#f46036]">{match.awayScore ?? "-"}</span>
              <span className="text-[#1b1b1e]">{match.awayTeam}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-[#1b1b1e] font-medium">
                  Select Player
                </Label>
                <Select
                  value={reviews[idx].playerId}
                  onValueChange={(val) =>
                    handleReviewChange(idx, "playerId", val)
                  }
                >
                  <SelectTrigger className="bg-white border-[#6d676e]/30">
                    <SelectValue placeholder="Choose a player" />
                  </SelectTrigger>
                  <SelectContent>
                    {match.players.map((player) => (
                      <SelectItem key={player.id} value={player.id.toString()}>
                        {player.name} ({player.team})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[#1b1b1e] font-medium">Notes</Label>
                <Input
                  placeholder="Add notes..."
                  value={reviews[idx].notes}
                  onChange={(e) =>
                    handleReviewChange(idx, "notes", e.target.value)
                  }
                  className="bg-white border-[#6d676e]/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#1b1b1e] font-medium">Rating</Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  placeholder="1-5"
                  value={reviews[idx].rating}
                  onChange={(e) =>
                    handleReviewChange(idx, "rating", e.target.value)
                  }
                  className="bg-white border-[#6d676e]/30"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => handleSubmit(idx)}
                disabled={
                  !reviews[idx].playerId ||
                  !reviews[idx].notes.trim() ||
                  !reviews[idx].rating
                }
                className="bg-[#f46036] hover:bg-[#f46036]/90 text-white"
              >
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
