<?php

// app/Models/School.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class School extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'school_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'city',
        'ranking',
    ];

    public function players()
    {
        return $this->hasMany(Player::class, 'school_id');
    }

    public function tournaments()
    {
        return $this->belongsToMany(Tournament::class, 'tournament_schools', 'school_id', 'tournament_id');
    }
    
    public function homeMatches()
    {
        return $this->hasMany(MatchModel::class, 'home_school_id');
    }

    public function awayMatches()
    {
        return $this->hasMany(MatchModel::class, 'away_school_id');
    }
}
