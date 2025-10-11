<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
    protected $fillable = [
        'gig_id',
        'name'
    ];

    public function gig()
    {
        $this->belongsTo(Gig::class);
    }
}
