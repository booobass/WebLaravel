<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'homepage_name',
        'description',
        'background_color'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
