import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 0;

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl tracking-wide uppercase mb-8 text-center">Returns & Exchanges</h1>
          <div className="w-24 h-1.5 bg-[#C0392B] mx-auto mb-12"></div>
          
          <div className="space-y-8 text-[#9CA3AF] font-sans leading-relaxed text-lg">
            <p>
              At <strong className="text-white font-bold">LAWLESS</strong>, we stand behind the quality of every drop. If you are not entirely satisfied with your purchase, we're here to help.
            </p>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">Return Policy</h2>
              <p>
                You have 14 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unworn, unwashed, and in the exact same condition that you received it. Your item must be in the original packaging with all original tags attached.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">Limited Drops & Final Sales</h2>
              <p>
                Due to the highly exclusive nature of our limited drops, certain items may be marked as <strong className="text-white">FINAL SALE</strong>. These items cannot be returned or exchanged unless they arrive defective or damaged.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">How to Initiate a Return</h2>
              <p>
                To initiate a return or exchange, please email our support team at <a href="mailto:Lawlessbrand015@gmail.com" className="text-white hover:text-[#C0392B] underline transition-colors">Lawlessbrand015@gmail.com</a> with your order number and the reason for your return. Our team will provide you with a return authorization and shipping instructions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-white font-heading uppercase mb-4 tracking-wider">Refunds</h2>
              <p>
                Once we receive your item, we will inspect it and notify you. If your return is approved, we will initiate a refund to your original method of payment. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
