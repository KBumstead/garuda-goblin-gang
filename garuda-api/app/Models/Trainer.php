<?php

// app/Models/Trainer.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Trainer extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'trainer_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'specialization',
        'bio',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function trainingPrograms()
    {
        return $this->hasMany(TrainingProgram::class, 'trainer_id');
    }
}
