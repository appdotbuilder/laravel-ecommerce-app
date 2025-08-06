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
        Schema::create('discount_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique()->comment('Discount code');
            $table->enum('type', ['percentage', 'fixed'])->comment('Discount type');
            $table->decimal('value', 10, 2)->comment('Discount value');
            $table->decimal('minimum_amount', 10, 2)->nullable()->comment('Minimum order amount');
            $table->integer('usage_limit')->nullable()->comment('Maximum usage limit');
            $table->integer('used_count')->default(0)->comment('Current usage count');
            $table->timestamp('expires_at')->nullable()->comment('Expiration date');
            $table->boolean('is_active')->default(true)->comment('Discount code status');
            $table->timestamps();
            
            $table->index('code');
            $table->index('is_active');
            $table->index('expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discount_codes');
    }
};