<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gig>
 */
class GigFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'date' => fake()->date(),
            'place' => fake()->city(),
            'open_time' => fake()->time('H:i'),
            'start_time' => fake()->time('H:i'),
            'adv_price' => fake()->numberBetween(1000, 4000),
            'day_price' => fake()->numberBetween(1500, 5000)
        ];
    }
}
