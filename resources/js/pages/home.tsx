import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    image: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
    newProducts: Product[];
    [key: string]: unknown;
}

export default function Home({ featuredProducts, categories, newProducts }: Props) {
    return (
        <AppShell>
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            Welcome to ShopEasy 🛒
                        </h1>
                        <p className="text-xl mb-8 opacity-90">
                            Discover amazing products, enjoy exclusive deals, and experience 
                            shopping like never before.
                        </p>
                        <Link href="/products">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🏷️ Shop by Category
                        </h2>
                        <p className="text-lg text-gray-600">
                            Explore our wide range of product categories
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="text-center group cursor-pointer">
                                <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {category.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <div className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                ⭐ Featured Products
                            </h2>
                            <p className="text-lg text-gray-600">
                                Hand-picked products just for you
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                                        {product.image ? (
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-6xl">📦</span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center mb-2">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm text-gray-600 ml-1">Featured</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-blue-600">
                                                ${product.price}
                                            </span>
                                            <Link href={`/products/${product.slug}`}>
                                                <Button size="sm">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* New Products */}
            {newProducts.length > 0 && (
                <div className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                🆕 New Arrivals
                            </h2>
                            <p className="text-lg text-gray-600">
                                Check out our latest products
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {newProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                                        {product.image ? (
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-6xl">📦</span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center mb-2">
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                New
                                            </span>
                                            <span className="text-sm text-gray-600 ml-2">
                                                {product.category.name}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-blue-600">
                                                ${product.price}
                                            </span>
                                            <Link href={`/products/${product.slug}`}>
                                                <Button size="sm">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/products">
                                <Button variant="outline" size="lg">
                                    View All Products
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            🎉 Ready to Start Shopping?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of happy customers and discover amazing deals today!
                        </p>
                        <Link href="/products">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}