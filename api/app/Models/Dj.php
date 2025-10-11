<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dj extends Model
{
    protected $fillable = [
        'gig_id',
        'name',
    ];

    public function gig()
    {
        return $this->belongsTo(Gig::class);
    }
}
