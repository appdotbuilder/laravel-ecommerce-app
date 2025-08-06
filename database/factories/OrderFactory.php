<?php

namespace Database\Factories;

use App\Models\DiscountCode;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 20, 500);
        $discountAmount = fake()->randomFloat(2, 0, $subtotal * 0.3);
        $total = $subtotal - $discountAmount;
        
        return [
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'user_id' => User::factory(),
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'total' => $total,
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'delivered']),
            'shipping_name' => fake()->name(),
            'shipping_email' => fake()->email(),
            'shipping_address' => fake()->address(),
            'shipping_city' => fake()->city(),
            'shipping_postal_code' => fake()->postcode(),
            'shipping_country' => fake()->country(),
            'discount_code_id' => fake()->optional(0.3)->randomElement(DiscountCode::pluck('id')->toArray()),
        ];
    }
}