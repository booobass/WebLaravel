<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Track extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'describe',
        'audio_path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $appends = ['audio_url'];

    protected function getAudioUrlAttribute()
    {
        if (!$this->audio_path) {
            return null;
        }
        return Storage::disk('s3')->url($this->audio_path);
    }
}
