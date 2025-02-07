<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Client;
use App\Models\Referral;
use Illuminate\Database\Eloquent\Factories\Factory;

class NoteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'client_id' => Client::factory(),
            'referral_id' => fn() => fake()->boolean(70) ? Referral::factory() : null,
            'title' => fn() => fake()->boolean(80) ? fake()->sentence(3) : null,
            'note' => fake()->paragraph(fake()->numberBetween(1, 4)),
            'status' => fake()->randomElement(['active', 'active', 'active', 'archived', 'deleted']), // weighted towards active
            'visibility' => fake()->randomElement(['standard', 'standard', 'private', 'shared']), // weighted towards standard
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fn(array $attributes) => fake()->dateTimeBetween($attributes['created_at'], 'now')
        ];
    }

    // State methods for common scenarios
    public function active()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active'
        ]);
    }

    public function archived()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'archived'
        ]);
    }

    public function deleted()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'deleted'
        ]);
    }

    public function private()
    {
        return $this->state(fn (array $attributes) => [
            'visibility' => 'private'
        ]);
    }

    public function forClient(Client $client)
    {
        return $this->state(fn (array $attributes) => [
            'client_id' => $client->id
        ]);
    }
}