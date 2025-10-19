<?php

namespace Database\Factories;

use App\Models\Gig;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Band>
 */
class BandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'gig_id' => Gig::factory(),
            'name' => fake()->company()
        ];
    }
}
