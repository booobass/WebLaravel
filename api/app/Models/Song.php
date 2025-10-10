<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'album_id',
        'title',
        'track_number'
    ];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}
