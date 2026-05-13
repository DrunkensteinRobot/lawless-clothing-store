import Link from 'next/link';

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderNumber = searchParams.order as string;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-10 rounded-lg max-w-2xl w-full text-center">
        <div className="w-20 h-20 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="font-heading text-4xl tracking-widest text-white mb-4">Payment Successful!</h1>
        <p className="font-sans text-[#9CA3AF] mb-8 text-lg">
          Thank you for your purchase. Your order has been securely processed and is now being prepared for shipping.
        </p>

        {orderNumber && (
          <div className="bg-[#0D0D0D] border border-[#2D2D2D] py-4 px-6 rounded inline-block mb-10">
            <p className="text-sm text-[#9CA3AF] font-sans uppercase tracking-wider mb-1">Order Reference</p>
            <p className="text-2xl font-bold font-sans text-white">{orderNumber}</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-sm font-sans text-[#9CA3AF]">
            We've sent a confirmation email to the address provided.
          </p>
          
          <div className="pt-6">
            <Link href="/" className="inline-block bg-white text-black font-sans font-bold py-3 px-8 uppercase tracking-widest hover:bg-gray-200 transition-colors rounded">
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
