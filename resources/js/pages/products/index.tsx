import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Filter } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    image: string;
    stock: number;
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
}

interface Props {
    products: {
        data: Product[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    categories: Category[];
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories }: Props) {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🛍️ All Products
                    </h1>
                    <p className="text-gray-600">
                        Discover our amazing collection of products
                    </p>
                </div>

                {/* Categories Filter */}
                {categories.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Filter className="w-5 h-5 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-700">Filter by Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                                All Categories
                            </Button>
                            {categories.map((category) => (
                                <Button key={category.id} variant="outline" size="sm">
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {products.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.data.map((product) => (
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
                                    <div className="mb-2">
                                        <span className="text-sm text-blue-600 font-medium">
                                            {product.category.name}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-lg font-bold text-blue-600">
                                            ${product.price}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/products/${product.slug}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                View Details
                                            </Button>
                                        </Link>
                                        {product.stock > 0 && (
                                            <Button size="sm" className="flex-1">
                                                <ShoppingCart className="w-4 h-4 mr-1" />
                                                Add to Cart
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                        <p className="text-gray-600">
                            We couldn't find any products matching your criteria.
                        </p>
                    </div>
                )}

                {/* Pagination would go here if needed */}
            </div>
        </AppShell>
    );
}