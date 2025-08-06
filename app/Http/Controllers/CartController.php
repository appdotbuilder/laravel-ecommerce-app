<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddToCartRequest;
use App\Models\Cart;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display the cart.
     */
    public function index()
    {
        $cartItems = Cart::with(['product.category'])
            ->where('user_id', auth()->id())
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product' => $item->product,
                    'quantity' => $item->quantity,
                    'subtotal' => (float) $item->product->price * $item->quantity,
                ];
            });

        $total = $cartItems->sum('subtotal');

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    /**
     * Add product to cart.
     */
    public function store(AddToCartRequest $request)
    {
        $data = $request->validated();
        
        $product = Product::findOrFail($data['product_id']);
        
        // Check if product is in stock
        if ($product->stock < $data['quantity']) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $cartItem = Cart::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'product_id' => $data['product_id'],
            ],
            [
                'quantity' => \DB::raw('quantity + ' . $data['quantity']),
            ]
        );

        return back()->with('success', 'Product added to cart successfully.');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, Cart $cart)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        // Ensure user owns this cart item
        if ($cart->user_id !== auth()->id()) {
            abort(403);
        }

        // Check if product has enough stock
        if ($cart->product->stock < $request->quantity) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $cart->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Cart updated successfully.');
    }

    /**
     * Remove cart item.
     */
    public function destroy(Cart $cart)
    {
        // Ensure user owns this cart item
        if ($cart->user_id !== auth()->id()) {
            abort(403);
        }

        $cart->delete();

        return back()->with('success', 'Item removed from cart.');
    }
}