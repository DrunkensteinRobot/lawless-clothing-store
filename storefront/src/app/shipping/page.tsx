import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 0;

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl tracking-wide uppercase mb-8 text-center">Shipping Information</h1>
          <div className="w-24 h-1.5 bg-[#C0392B] mx-auto mb-12"></div>
          
          <div className="space-y-8 text-[#9CA3AF] font-sans leading-relaxed text-lg">
            <p>
              We know you want your gear as soon as possible. Here is everything you need to know about how and when your <strong className="text-white font-bold">LAWLESS</strong> order will arrive.
            </p>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">Processing Time</h2>
              <p>
                All standard orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped. 
              </p>
              <p className="mt-2 text-sm text-[#C0392B]">
                *Note: During major drops or high-volume periods, processing times may be extended.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">Domestic Shipping (South Africa)</h2>
              <p>
                We offer nationwide shipping across South Africa. Shipping charges for your order will be calculated and displayed at checkout. Standard domestic delivery typically takes between 2 to 5 business days from the date of dispatch.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">Order Tracking</h2>
              <p>
                When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 24-48 hours for the tracking information to become available in the courier's system.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">Lost or Damaged Items</h2>
              <p>
                Lawless Clothing is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">Support</h2>
              <p>
                If you have any further questions or haven't received your order within 7 days of receiving your shipping confirmation email, please contact us at <a href="mailto:Lawlessbrand015@gmail.com" className="text-white hover:text-[#C0392B] underline transition-colors">Lawlessbrand015@gmail.com</a> with your name and order number, and we will look into it for you.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
