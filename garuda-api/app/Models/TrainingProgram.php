<?php

// app/Models/TrainingProgram.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class TrainingProgram extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'program_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'trainer_id',
        'title',
        'description',
        'skill_level',
        'age_range',
        'cost',
        'participant',
        'city',
    ];

    public function trainer()
    {
        return $this->belongsTo(Trainer::class, 'trainer_id');
    }

    public function applications()
    {
        return $this->hasMany(ProgramApplication::class, 'program_id');
    }
}
