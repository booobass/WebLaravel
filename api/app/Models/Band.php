<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
    use HasFactory;

    protected $fillable = [
        'gig_id',
        'name'
    ];

    public function gig()
    {
        $this->belongsTo(Gig::class);
    }
}
