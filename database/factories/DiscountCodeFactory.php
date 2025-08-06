<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DiscountCode>
 */
class DiscountCodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['percentage', 'fixed']);
        
        return [
            'code' => strtoupper(fake()->bothify('SAVE##??')),
            'type' => $type,
            'value' => $type === 'percentage' ? fake()->numberBetween(5, 50) : fake()->randomFloat(2, 5, 100),
            'minimum_amount' => fake()->optional(0.3)->randomFloat(2, 20, 200),
            'usage_limit' => fake()->optional(0.5)->numberBetween(10, 1000),
            'used_count' => 0,
            'expires_at' => fake()->optional(0.7)->dateTimeBetween('+1 week', '+1 year'),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the discount code is expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'expires_at' => fake()->dateTimeBetween('-1 year', '-1 day'),
        ]);
    }
}