<?php

// app/Models/Club.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Club extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'club_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'city',
        'description',
        'logo_url',
        'contact_email',
    ];

    public function players()
    {
        return $this->belongsToMany(Player::class, 'player_clubs', 'club_id', 'player_id')->withPivot('join_date');
    }

    public function tournaments()
    {
        return $this->belongsToMany(Tournament::class, 'tournament_clubs', 'club_id', 'tournament_id');
    }
    
    public function homeMatches()
    {
        return $this->hasMany(MatchModel::class, 'home_club_id');
    }

    public function awayMatches()
    {
        return $this->hasMany(MatchModel::class, 'away_club_id');
    }
}
