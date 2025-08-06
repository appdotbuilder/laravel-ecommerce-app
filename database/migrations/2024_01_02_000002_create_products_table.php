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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->string('slug')->unique()->comment('URL-friendly product identifier');
            $table->text('description')->nullable()->comment('Product description');
            $table->decimal('price', 10, 2)->comment('Product price');
            $table->string('image')->nullable()->comment('Product image path');
            $table->integer('stock')->default(0)->comment('Available stock quantity');
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->boolean('is_active')->default(true)->comment('Product visibility status');
            $table->boolean('is_featured')->default(false)->comment('Featured product flag');
            $table->timestamps();
            
            $table->index('is_active');
            $table->index('is_featured');
            $table->index('category_id');
            $table->index(['is_active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};