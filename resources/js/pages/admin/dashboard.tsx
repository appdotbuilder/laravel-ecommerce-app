import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { 
    Package, 
    ShoppingCart, 
    Users, 
    TrendingUp, 
    AlertTriangle,
    Plus,
    Eye,
    Edit
} from 'lucide-react';

interface Stats {
    total_products: number;
    active_products: number;
    total_categories: number;
    total_orders: number;
    pending_orders: number;
    total_users: number;
    total_revenue: string;
    active_discount_codes: number;
}

interface Order {
    id: number;
    order_number: string;
    user: {
        name: string;
        email: string;
    };
    total: string;
    status: string;
    created_at: string;
}

interface Product {
    id: number;
    name: string;
    stock: number;
    category: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
    lowStockProducts: Product[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentOrders, lowStockProducts }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🏪 Admin Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your e-commerce store and monitor performance
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_products}</p>
                                <p className="text-xs text-green-600">{stats.active_products} active</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_orders}</p>
                                <p className="text-xs text-yellow-600">{stats.pending_orders} pending</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.total_revenue}</p>
                                <p className="text-xs text-green-600">All time</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Customers</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_users}</p>
                                <p className="text-xs text-blue-600">Registered users</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/admin/products/create">
                            <Button className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Product
                            </Button>
                        </Link>
                        <Link href="/admin/categories/create">
                            <Button variant="outline" className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Category
                            </Button>
                        </Link>
                        <Link href="/admin/discount-codes/create">
                            <Button variant="outline" className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Discount
                            </Button>
                        </Link>
                        <Link href="/admin/products">
                            <Button variant="outline" className="w-full">
                                <Eye className="w-4 h-4 mr-2" />
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                            <Link href="/admin/orders">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </div>
                        
                        {recentOrders.length > 0 ? (
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{order.order_number}</p>
                                            <p className="text-sm text-gray-600">{order.user.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">${order.total}</p>
                                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No recent orders</p>
                        )}
                    </div>

                    {/* Low Stock Products */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                                Low Stock Alert
                            </h2>
                            <Link href="/admin/products">
                                <Button variant="outline" size="sm">Manage Stock</Button>
                            </Link>
                        </div>
                        
                        {lowStockProducts.length > 0 ? (
                            <div className="space-y-4">
                                {lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg border-orange-200 bg-orange-50">
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-600">{product.category.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-orange-600">
                                                {product.stock} left
                                            </p>
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <Button size="sm" variant="outline" className="mt-1">
                                                    <Edit className="w-3 h-3 mr-1" />
                                                    Update
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">All products have sufficient stock</p>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}