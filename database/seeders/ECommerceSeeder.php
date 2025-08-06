<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\DiscountCode;
use App\Models\MenuItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class ECommerceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create regular users
        User::factory(10)->create();

        // Create categories
        $categories = [
            ['name' => 'Electronics', 'description' => 'Latest electronic gadgets and devices'],
            ['name' => 'Clothing', 'description' => 'Fashion and apparel for all ages'],
            ['name' => 'Home & Garden', 'description' => 'Everything for your home and garden'],
            ['name' => 'Sports', 'description' => 'Sports equipment and outdoor gear'],
            ['name' => 'Books', 'description' => 'Books, magazines, and educational materials'],
            ['name' => 'Beauty', 'description' => 'Cosmetics and beauty products'],
        ];

        foreach ($categories as $index => $categoryData) {
            Category::factory()->create([
                'name' => $categoryData['name'],
                'slug' => strtolower(str_replace(' ', '-', $categoryData['name'])),
                'description' => $categoryData['description'],
                'sort_order' => $index,
            ]);
        }

        // Create products for each category
        $createdCategories = Category::all();
        foreach ($createdCategories as $category) {
            // Create regular products
            Product::factory(8)->create([
                'category_id' => $category->id,
            ]);
            
            // Create featured products
            Product::factory(2)->featured()->create([
                'category_id' => $category->id,
            ]);
        }

        // Create discount codes
        DiscountCode::factory(10)->create();
        
        // Create some specific discount codes
        DiscountCode::factory()->create([
            'code' => 'SAVE10',
            'type' => 'percentage',
            'value' => 10,
            'minimum_amount' => 50,
            'usage_limit' => 100,
        ]);

        DiscountCode::factory()->create([
            'code' => 'WELCOME20',
            'type' => 'fixed',
            'value' => 20,
            'minimum_amount' => 100,
            'usage_limit' => 50,
        ]);

        // Create menu items
        $menuItems = [
            ['title' => 'Home', 'url' => '/', 'sort_order' => 0],
            ['title' => 'Products', 'url' => '/products', 'sort_order' => 1],
            ['title' => 'Categories', 'url' => '/categories', 'sort_order' => 2],
            ['title' => 'About Us', 'url' => '/about', 'sort_order' => 3],
            ['title' => 'Contact', 'url' => '/contact', 'sort_order' => 4],
        ];

        foreach ($menuItems as $item) {
            MenuItem::factory()->create($item);
        }
    }
}