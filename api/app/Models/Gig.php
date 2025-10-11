<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gig extends Model
{
    protected $fillable = [
        'user_id',
        'date',
        'place',
        'open_time',
        'start_time',
        'adv_price',
        'day_price'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bands()
    {
        return $this->hasMany(Band::class);
    }

    public function djs()
    {
        return $this->hasMany(Dj::class);
    }
}
