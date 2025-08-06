import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
    id: number;
    product: {
        id: number;
        name: string;
        slug: string;
        price: string;
        image: string;
        category: {
            name: string;
        };
    };
    quantity: number;
    subtotal: number;
}

interface Props {
    cartItems: CartItem[];
    total: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, total }: Props) {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🛒 Shopping Cart
                    </h1>
                    <p className="text-gray-600">
                        Review your items and proceed to checkout
                    </p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border">
                                {cartItems.map((item, index) => (
                                    <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b' : ''}`}>
                                        <div className="flex items-start space-x-4">
                                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                                {item.product.image ? (
                                                    <img 
                                                        src={item.product.image} 
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <span className="text-2xl">📦</span>
                                                )}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 mb-1">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {item.product.category.name}
                                                </p>
                                                <p className="text-lg font-semibold text-blue-600">
                                                    ${item.product.price}
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Minus className="w-4 h-4" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button variant="outline" size="sm">
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">
                                                    ${item.subtotal.toFixed(2)}
                                                </p>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 mt-1">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Order Summary
                                </h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">Free</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-semibold">Total</span>
                                            <span className="text-lg font-semibold text-blue-600">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <Link href="/checkout">
                                    <Button size="lg" className="w-full">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                                
                                <Link href="/products" className="block mt-4">
                                    <Button variant="outline" size="lg" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                        <p className="text-gray-600 mb-6">
                            Looks like you haven't added any products to your cart yet.
                        </p>
                        <Link href="/products">
                            <Button size="lg">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}