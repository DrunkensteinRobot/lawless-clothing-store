'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutClient() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    createAccount: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isBrowser = typeof window !== 'undefined';

  const handleWhatsAppOrder = () => {
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      alert("Please fill in all required delivery details before ordering.");
      return;
    }

    const orderItems = items.map(
      (item) => `- ${item.quantity}x ${item.name} ${item.size ? `(Size: ${item.size})` : ''} ${item.color ? `(Color: ${item.color})` : ''} - R${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `*NEW ORDER FROM LAWLESS WEB*\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Delivery: ${formData.address}, ${formData.city}, ${formData.zipCode}\n\n` +
      `*ORDER ITEMS:*\n${orderItems}\n\n` +
      `*TOTAL: R ${getCartTotal().toFixed(2)}*`;

    const targetNumber = '27646500672';
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

    if (!isBrowser) {
      console.warn('Unable to open WhatsApp on server.');
      return;
    }

    window.open(whatsappUrl, '_blank');
  };

  // Paystack Configuration
  const config = {
    reference: `REF-${new Date().getTime().toString()}`,
    email: formData.email,
    amount: Math.round(getCartTotal() * 100), // Paystack expects lowest currency unit (cents/kobo)
    currency: 'ZAR',
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: `${formData.firstName} ${formData.lastName}`
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: formData.phone
        }
      ]
    }
  };

  const initializePayment = () => {
    if (!isBrowser) {
      console.warn('Paystack payment cannot be initialized on the server.');
      return;
    }

    const PaystackPop = (window as any).PaystackPop;
    if (!PaystackPop) {
      alert('Paystack is not loaded yet. Please try again in a moment.');
      return;
    }

    const handler = PaystackPop.setup({
      key: config.publicKey,
      email: config.email,
      amount: config.amount,
      currency: config.currency,
      ref: config.reference,
      metadata: config.metadata,
      callback: function(response: any) {
        onSuccess(response);
      },
      onClose: function() {
        onClose();
      }
    });
    handler.openIframe();
  };

  const onSuccess = async (reference: any) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: reference.reference,
          formData,
          items,
          total: getCartTotal(),
          createAccount: formData.createAccount
        })
      });

      const data = await response.json();
      
      if (data.success) {
        clearCart();
        router.push(`/checkout/success?order=${data.orderNumber}`);
      } else {
        alert("Payment was successful, but there was an error processing your order. Please contact support with reference: " + reference.reference);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error processing order. Please contact support.");
      setIsProcessing(false);
    }
  };

  const onClose = () => {
    console.log('Payment modal closed');
  };

  const handleWebPayment = () => {
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      alert("Please fill in all required delivery details before ordering.");
      return;
    }

    const amount = Math.round(getCartTotal() * 100);
    if (amount <= 0) {
      alert("Cart total must be greater than zero to start checkout.");
      return;
    }
    
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      alert("Paystack is not configured properly. Missing Public Key.");
      return;
    }

    initializePayment();
  };

  if (!mounted) return null;

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="text-[#9CA3AF] font-sans py-12">
        Your cart is empty. <button onClick={() => router.push('/collections')} className="text-[#C0392B] hover:underline">Continue shopping.</button>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C0392B] mb-6"></div>
        <h2 className="font-heading text-3xl tracking-widest mb-2">Processing Order...</h2>
        <p className="font-sans text-[#9CA3AF]">Please wait while we secure your items. Do not refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Left: Form */}
      <div className="w-full lg:w-3/5 space-y-8">
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-lg">
          <h2 className="font-heading text-2xl tracking-widest mb-6">Delivery Details</h2>
          
          <div className="space-y-4 font-sans">
            <div className="flex gap-4">
              <div className="w-1/2 space-y-2">
                <label className="text-sm text-[#9CA3AF] uppercase tracking-wider">First Name *</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#C0392B] transition-colors" />
              </div>
              <div className="w-1/2 space-y-2">
                <label className="text-sm text-[#9CA3AF] uppercase tracking-wider">Last Name *</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#C0392B] transition-colors" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2 space-y-2">
                <label className="text-sm text-[#9CA3AF] uppercase tracking-wider">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#C0392B] transition-colors" />
              </div>
              <div className="w-1/2 space-y-2">
                <label className="text-sm text-[#9CA3AF] uppercase tracking-wider">Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#C0392B] transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#9CA3AF] uppercase tracking-wider">Street Address *</label>
              <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#C0392B] transition-colors" />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2 space-y-2">
                <label className="text-sm text-[#9CA3AF] uppercase tracking-wider">City *</label>
                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#C0392B] transition-colors" />
              </div>
              <div className="w-1/2 space-y-2">
                <label className="text-sm text-[#9CA3AF] uppercase tracking-wider">Zip Code / Postal Code</label>
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#C0392B] transition-colors" />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#2D2D2D]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="createAccount" checked={formData.createAccount} onChange={handleInputChange} className="w-5 h-5 accent-[#C0392B] bg-[#0D0D0D] border-[#2D2D2D]" />
                <span className="text-[#9CA3AF]">Save my details and create an account for faster checkout next time.</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Summary */}
      <div className="w-full lg:w-2/5">
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-lg sticky top-28">
          <h2 className="font-heading text-2xl tracking-widest mb-6 border-b border-[#2D2D2D] pb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-16 h-16 bg-[#0D0D0D] rounded overflow-hidden flex-shrink-0 border border-[#2D2D2D]">
                  {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}
                  <span className="absolute -top-2 -right-2 bg-[#C0392B] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10 font-sans font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-grow font-sans text-sm">
                  <h3 className="text-white line-clamp-1">{item.name}</h3>
                  <p className="text-[#9CA3AF] mt-1">{item.size && `Size: ${item.size}`} {item.color && `Color: ${item.color}`}</p>
                </div>
                <div className="font-sans font-bold text-white whitespace-nowrap">
                  R {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 font-sans text-sm mb-6 border-t border-[#2D2D2D] pt-4">
            <div className="flex justify-between text-[#9CA3AF]">
              <span>Subtotal</span>
              <span>R {getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#9CA3AF]">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
          </div>

          <div className="flex justify-between font-heading text-3xl mb-8">
            <span>Total</span>
            <span className="text-[#C0392B]">R {getCartTotal().toFixed(2)}</span>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleWebPayment}
              disabled={isProcessing}
              className="w-full py-4 bg-white hover:bg-gray-200 text-black font-sans font-bold tracking-widest uppercase transition-colors rounded disabled:opacity-50"
            >
              Pay Securely with Paystack
            </button>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#2D2D2D]"></div>
              <span className="flex-shrink-0 mx-4 text-[#9CA3AF] font-sans text-xs">OR</span>
              <div className="flex-grow border-t border-[#2D2D2D]"></div>
            </div>
            <button 
              onClick={handleWhatsAppOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-sans font-bold tracking-widest uppercase transition-colors rounded shadow-lg shadow-[#25D366]/20 disabled:opacity-50"
            >
              Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
