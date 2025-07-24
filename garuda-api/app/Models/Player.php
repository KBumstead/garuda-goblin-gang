<?php

// app/Models/Player.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Player extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'player_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'school_id',
        'height_cm',
        'weight_kg',
        'position',
        'date_of_birth',
        'overall_ranking',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function school()
    {
        return $this->belongsTo(School::class, 'school_id');
    }

    public function clubs()
    {
        return $this->belongsToMany(Club::class, 'player_clubs', 'player_id', 'club_id')->withPivot('join_date');
    }

    public function matchStats()
    {
        return $this->hasMany(PlayerMatchStats::class, 'player_id');
    }

    public function generalReviews()
    {
        return $this->hasMany(PlayerGeneralReview::class, 'player_id');
    }
    
    public function matchReviews()
    {
        return $this->hasMany(PlayerMatchReview::class, 'player_id');
    }

    public function programApplications()
    {
        return $this->hasMany(ProgramApplication::class, 'player_id');
    }
}
