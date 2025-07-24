<?php

// app/Models/Match.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

// Renamed to MatchModel to avoid conflict with PHP reserved keyword 'match'
class MatchModel extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'matches';
    protected $primaryKey = 'match_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'tournament_id',
        'home_club_id',
        'away_club_id',
        'home_school_id',
        'away_school_id',
        'match_datetime',
        'venue',
        'home_team_score',
        'away_team_score',
    ];
    
    protected $casts = [
        'match_datetime' => 'datetime',
    ];

    public function tournament()
    {
        return $this->belongsTo(Tournament::class, 'tournament_id');
    }

    public function homeClub()
    {
        return $this->belongsTo(Club::class, 'home_club_id');
    }

    public function awayClub()
    {
        return $this->belongsTo(Club::class, 'away_club_id');
    }

    public function homeSchool()
    {
        return $this->belongsTo(School::class, 'home_school_id');
    }

    public function awaySchool()
    {
        return $this->belongsTo(School::class, 'away_school_id');
    }

    public function playerStats()
    {
        return $this->hasMany(PlayerMatchStats::class, 'match_id');
    }
    
    public function playerReviews()
    {
        return $this->hasMany(PlayerMatchReview::class, 'match_id');
    }
}
