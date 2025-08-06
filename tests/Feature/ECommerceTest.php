<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;

test('home page displays welcome when no products exist', function () {
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('welcome'));
});

test('home page displays products when they exist', function () {
    $category = Category::factory()->create();
    Product::factory()->featured()->create(['category_id' => $category->id]);
    
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('home'));
});

test('products index page works', function () {
    $response = $this->get('/products');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('products/index'));
});

test('first registered user becomes admin', function () {
    $response = $this->post('/register', [
        'name' => 'Admin User',
        'email' => 'admin@test.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);
    
    $user = User::where('email', 'admin@test.com')->first();
    
    expect($user->role)->toBe('admin');
    $response->assertRedirect('/dashboard');
});

test('second registered user is regular user', function () {
    User::factory()->admin()->create();
    
    $response = $this->post('/register', [
        'name' => 'Regular User',
        'email' => 'user@test.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);
    
    $user = User::where('email', 'user@test.com')->first();
    
    expect($user->role)->toBe('user');
    $response->assertRedirect('/dashboard');
});

test('admin can access admin dashboard', function () {
    $admin = User::factory()->admin()->create();
    
    $response = $this->actingAs($admin)->get('/admin');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('admin/dashboard'));
});

test('regular user cannot access admin dashboard', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user)->get('/admin');
    
    $response->assertStatus(403);
});

test('cart requires authentication', function () {
    $response = $this->get('/cart');
    
    $response->assertRedirect('/login');
});

test('authenticated user can view cart', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user)->get('/cart');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('cart/index'));
});