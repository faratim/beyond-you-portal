<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Referral>
 */
class ReferralFactory extends Factory
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
            'referred_by' => User::factory(),
            'client_id' => Client::factory(),
            'is_active' => true,
            'is_converted' => false,
            'converted_at' => null,
            'is_paid' => false,
            'paid_at' => null,
        ];
    }

    /**
     * Mark the referral as converted.
     */
    public function converted(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_converted' => true,
            'converted_at' => now(),
        ]);
    }

    /**
     * Mark the referral as paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_paid' => true,
            'paid_at' => now(),
        ]);
    }

    /**
     * Mark the referral as inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}