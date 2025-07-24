<?php

// app/Models/ProgramApplication.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProgramApplication extends Model
{
    use HasFactory, HasUuids;
    
    protected $primaryKey = 'application_id';
    public $incrementing = false;
    protected $keyType = 'string';

    const UPDATED_AT = null;

    protected $fillable = [
        'program_id',
        'player_id',
        'status',
    ];

    public function trainingProgram()
    {
        return $this->belongsTo(TrainingProgram::class, 'program_id');
    }

    public function player()
    {
        return $this->belongsTo(Player::class, 'player_id');
    }
}
