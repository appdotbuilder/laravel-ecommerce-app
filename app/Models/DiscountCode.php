<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\DiscountCode
 *
 * @property int $id
 * @property string $code
 * @property string $type
 * @property string $value
 * @property string|null $minimum_amount
 * @property int|null $usage_limit
 * @property int $used_count
 * @property \Illuminate\Support\Carbon|null $expires_at
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Order> $orders
 * @property-read int|null $orders_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode query()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereMinimumAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereUsageLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereUsedCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode active()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode valid()
 * @method static \Database\Factories\DiscountCodeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DiscountCode extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'type',
        'value',
        'minimum_amount',
        'usage_limit',
        'used_count',
        'expires_at',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'value' => 'decimal:2',
        'minimum_amount' => 'decimal:2',
        'usage_limit' => 'integer',
        'used_count' => 'integer',
        'expires_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Get the orders that used this discount code.
     *
     * @return HasMany
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Scope a query to only include active discount codes.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include valid discount codes.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeValid($query)
    {
        return $query->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->where(function ($query) {
                $query->whereNull('usage_limit')
                    ->orWhereRaw('used_count < usage_limit');
            });
    }
}