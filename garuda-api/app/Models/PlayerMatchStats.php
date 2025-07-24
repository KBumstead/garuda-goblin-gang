<?php

// app/Models/PlayerMatchStats.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PlayerMatchStats extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'player_match_stat_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'player_id',
        'match_id',
        'minutes_played',
        'points',
        'assists',
        'rebounds',
        'steals',
        'blocks',
        'field_goals_made',
        'field_goals_attempted',
    ];

    public function player()
    {
        return $this->belongsTo(Player::class, 'player_id');
    }

    public function match()
    {
        return $this->belongsTo(MatchModel::class, 'match_id');
    }
}
