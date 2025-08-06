<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->comment('Unique order identifier');
            $table->foreignId('user_id')->constrained();
            $table->decimal('subtotal', 10, 2)->comment('Order subtotal');
            $table->decimal('discount_amount', 10, 2)->default(0)->comment('Applied discount amount');
            $table->decimal('total', 10, 2)->comment('Final order total');
            $table->enum('status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending')->comment('Order status');
            $table->string('shipping_name')->comment('Shipping recipient name');
            $table->string('shipping_email')->comment('Shipping recipient email');
            $table->text('shipping_address')->comment('Shipping address');
            $table->string('shipping_city')->comment('Shipping city');
            $table->string('shipping_postal_code')->comment('Shipping postal code');
            $table->string('shipping_country')->comment('Shipping country');
            $table->foreignId('discount_code_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};