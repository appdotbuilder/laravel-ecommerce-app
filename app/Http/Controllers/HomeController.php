<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->featured()
            ->active()
            ->inStock()
            ->limit(8)
            ->get();

        $categories = Category::active()
            ->orderBy('sort_order')
            ->limit(6)
            ->get();

        $newProducts = Product::with('category')
            ->active()
            ->inStock()
            ->latest()
            ->limit(8)
            ->get();

        // If no products exist, show welcome page
        if ($featuredProducts->isEmpty() && $newProducts->isEmpty()) {
            return Inertia::render('welcome');
        }

        return Inertia::render('home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'newProducts' => $newProducts,
        ]);
    }
}