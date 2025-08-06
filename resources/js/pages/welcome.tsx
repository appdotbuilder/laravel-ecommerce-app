import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Package, Users, Star, Zap, Shield } from 'lucide-react';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <AppShell>
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-blue-50 to-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🛒 ShopEasy - Your Ultimate E-Commerce Experience
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Discover amazing products, enjoy seamless shopping, and experience 
                            the future of online retail with our comprehensive e-commerce platform.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {auth?.user ? (
                                <>
                                    <Link href="/products">
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                                            <ShoppingCart className="w-5 h-5 mr-2" />
                                            Start Shopping
                                        </Button>
                                    </Link>
                                    {auth.user.role === 'admin' && (
                                        <Link href="/admin">
                                            <Button variant="outline" size="lg" className="px-8 py-3">
                                                <Package className="w-5 h-5 mr-2" />
                                                Admin Dashboard
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                                            <Users className="w-5 h-5 mr-2" />
                                            Get Started
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button variant="outline" size="lg" className="px-8 py-3">
                                            Sign In
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ✨ Everything You Need for Modern E-Commerce
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our platform provides a complete shopping experience for customers 
                            and powerful management tools for administrators.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Customer Features */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                🛍️ Smart Shopping Cart
                            </h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Add products with quantity control</li>
                                <li>• Real-time price calculations</li>
                                <li>• Stock availability checking</li>
                                <li>• Save items for later</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                📦 Product Catalog
                            </h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Detailed product descriptions</li>
                                <li>• Category-based organization</li>
                                <li>• High-quality product images</li>
                                <li>• Featured products showcase</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                ⚡ Smooth Checkout
                            </h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Streamlined checkout process</li>
                                <li>• Discount code support</li>
                                <li>• Secure order processing</li>
                                <li>• Order confirmation & tracking</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                📊 Order History
                            </h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Complete purchase history</li>
                                <li>• Order status tracking</li>
                                <li>• Detailed receipt information</li>
                                <li>• Reorder favorite items</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
                            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                🔒 Admin Dashboard
                            </h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Product management system</li>
                                <li>• Category organization tools</li>
                                <li>• Discount code creation</li>
                                <li>• Navigation menu control</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border border-teal-200">
                            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                👥 User Management
                            </h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Secure user registration</li>
                                <li>• Role-based permissions</li>
                                <li>• Profile management</li>
                                <li>• Account security features</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            🚀 Ready to Transform Your Shopping Experience?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of satisfied customers and experience the future of online shopping today.
                        </p>
                        
                        {!auth?.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                                        Create Free Account
                                    </Button>
                                </Link>
                                <Link href="/products">
                                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                                        Browse Products
                                    </Button>
                                </Link>
                            </div>
                        )}
                        
                        {auth?.user && (
                            <Link href="/products">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Start Shopping Now
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                            <div className="text-gray-600">Products Available</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                            <div className="text-gray-600">Categories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                            <div className="text-gray-600">Customer Support</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                            <div className="text-gray-600">Uptime Guarantee</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}