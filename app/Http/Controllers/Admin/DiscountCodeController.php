<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiscountCode;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DiscountCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $discountCodes = DiscountCode::withCount('orders')
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/discount-codes/index', [
            'discountCodes' => $discountCodes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/discount-codes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:50|unique:discount_codes,code',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'minimum_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date|after:now',
            'is_active' => 'boolean',
        ]);

        $discountCode = DiscountCode::create($request->all());

        return redirect()->route('admin.discount-codes.show', $discountCode)
            ->with('success', 'Discount code created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DiscountCode $discountCode)
    {
        $discountCode->loadCount('orders');

        return Inertia::render('admin/discount-codes/show', [
            'discountCode' => $discountCode,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DiscountCode $discountCode)
    {
        return Inertia::render('admin/discount-codes/edit', [
            'discountCode' => $discountCode,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DiscountCode $discountCode)
    {
        $request->validate([
            'code' => 'required|string|max:50|unique:discount_codes,code,' . $discountCode->id,
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'minimum_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date|after:now',
            'is_active' => 'boolean',
        ]);

        $discountCode->update($request->all());

        return redirect()->route('admin.discount-codes.show', $discountCode)
            ->with('success', 'Discount code updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DiscountCode $discountCode)
    {
        $discountCode->delete();

        return redirect()->route('admin.discount-codes.index')
            ->with('success', 'Discount code deleted successfully.');
    }
}