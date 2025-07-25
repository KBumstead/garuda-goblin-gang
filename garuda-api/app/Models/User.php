<?php

// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'profile_picture_url',
        'bio',
        'age',
        'gender',
        'height',
        'user_type',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }

    public function player()
    {
        return $this->hasOne(Player::class, 'user_id');
    }

    public function trainer()
    {
        return $this->hasOne(Trainer::class, 'user_id');
    }

    public function generalReviews()
    {
        return $this->hasMany(PlayerGeneralReview::class, 'user_id');
    }

    public function matchReviews()
    {
        return $this->hasMany(PlayerMatchReview::class, 'user_id');
    }
}
