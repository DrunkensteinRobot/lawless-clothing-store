import { NextResponse } from 'next/server';
import { backendClient } from '@/sanity/lib/backendClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference, formData, items, total, createAccount } = body;

    if (!reference || !formData || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Check if user exists by email, or create a new user
    let user;
    const existingUser = await backendClient.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email: formData.email }
    );

    if (existingUser) {
      user = existingUser;
      // Optionally update their details if they changed
      user = await backendClient.patch(existingUser._id).set({
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      }).commit();
    } else {
      user = await backendClient.create({
        _type: 'user',
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      });
    }

    // 2. Format items for the order schema
    const orderItems = items.map((item: any) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: 'reference',
        _ref: item.id,
      },
      quantity: item.quantity,
      size: item.size || null,
      color: item.color || null,
      priceAtPurchase: item.price,
    }));

    // 3. Create the Order document
    // We generate a simple order number, e.g., LWL-XXXXXX
    const orderNumber = `LWL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const order = await backendClient.create({
      _type: 'order',
      orderNumber,
      customer: {
        _type: 'reference',
        _ref: user._id,
      },
      status: 'Paid',
      totalAmount: total,
      items: orderItems,
      paymentMethod: 'Paystack (Card/EFT)',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, orderId: order._id, orderNumber });
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
