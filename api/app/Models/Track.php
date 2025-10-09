<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'describe',
        'audio_path'
    ];
}
