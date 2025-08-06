<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Models\Cart;
use App\Models\DiscountCode;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index()
    {
        $cartItems = Cart::with(['product'])
            ->where('user_id', auth()->id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        $subtotal = $cartItems->sum(function ($item) {
            return (float) $item->product->price * $item->quantity;
        });

        return Inertia::render('checkout/index', [
            'cartItems' => $cartItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product' => $item->product,
                    'quantity' => $item->quantity,
                    'subtotal' => (float) $item->product->price * $item->quantity,
                ];
            }),
            'subtotal' => $subtotal,
        ]);
    }

    /**
     * Process the checkout.
     */
    public function store(CheckoutRequest $request)
    {
        $data = $request->validated();
        
        $cartItems = Cart::with(['product'])
            ->where('user_id', auth()->id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        DB::beginTransaction();
        
        try {
            $subtotal = $cartItems->sum(function ($item) {
                return (float) $item->product->price * $item->quantity;
            });

            $discountAmount = 0;
            $discountCodeId = null;

            // Apply discount code if provided
            if (!empty($data['discount_code'])) {
                $discountCode = DiscountCode::where('code', $data['discount_code'])
                    ->valid()
                    ->first();

                if ($discountCode && ($discountCode->minimum_amount === null || $subtotal >= (float) $discountCode->minimum_amount)) {
                    if ($discountCode->type === 'percentage') {
                        $discountAmount = $subtotal * ((float) $discountCode->value / 100);
                    } else {
                        $discountAmount = min((float) $discountCode->value, $subtotal);
                    }
                    
                    $discountCodeId = $discountCode->id;
                    $discountCode->increment('used_count');
                }
            }

            $total = $subtotal - $discountAmount;

            // Create order
            $order = Order::create([
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'user_id' => auth()->id(),
                'subtotal' => $subtotal,
                'discount_amount' => $discountAmount,
                'total' => $total,
                'status' => 'pending',
                'shipping_name' => $data['shipping_name'],
                'shipping_email' => $data['shipping_email'],
                'shipping_address' => $data['shipping_address'],
                'shipping_city' => $data['shipping_city'],
                'shipping_postal_code' => $data['shipping_postal_code'],
                'shipping_country' => $data['shipping_country'],
                'discount_code_id' => $discountCodeId,
            ]);

            // Create order items and update stock
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product->id,
                    'product_name' => $cartItem->product->name,
                    'price' => $cartItem->product->price,
                    'quantity' => $cartItem->quantity,
                    'total' => (float) $cartItem->product->price * $cartItem->quantity,
                ]);

                // Update product stock
                $cartItem->product->decrement('stock', $cartItem->quantity);
            }

            // Clear cart
            Cart::where('user_id', auth()->id())->delete();

            DB::commit();

            return redirect()->route('orders.show', $order)
                ->with('success', 'Order placed successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Something went wrong. Please try again.']);
        }
    }
}