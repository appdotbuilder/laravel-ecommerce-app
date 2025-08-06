<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'shipping_name' => 'required|string|max:255',
            'shipping_email' => 'required|email|max:255',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string|max:255',
            'shipping_postal_code' => 'required|string|max:20',
            'shipping_country' => 'required|string|max:255',
            'discount_code' => 'nullable|string|exists:discount_codes,code',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'shipping_name.required' => 'Shipping name is required.',
            'shipping_email.required' => 'Shipping email is required.',
            'shipping_email.email' => 'Please provide a valid email address.',
            'shipping_address.required' => 'Shipping address is required.',
            'shipping_city.required' => 'Shipping city is required.',
            'shipping_postal_code.required' => 'Shipping postal code is required.',
            'shipping_country.required' => 'Shipping country is required.',
            'discount_code.exists' => 'Invalid discount code.',
        ];
    }
}