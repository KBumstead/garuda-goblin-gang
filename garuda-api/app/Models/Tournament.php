<?php

// app/Models/Tournament.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Tournament extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'tournament_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'description',
        'age_category',
        'location',
    ];

    public function clubs()
    {
        return $this->belongsToMany(Club::class, 'tournament_clubs', 'tournament_id', 'club_id');
    }

    public function schools()
    {
        return $this->belongsToMany(School::class, 'tournament_schools', 'tournament_id', 'school_id');
    }

    public function matches()
    {
        return $this->hasMany(MatchModel::class, 'tournament_id');
    }
}
