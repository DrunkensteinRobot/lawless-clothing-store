import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 flex-grow">
        <h1 className="font-heading text-5xl mb-4">About Lawless</h1>
        <p className="text-[#9CA3AF] max-w-2xl leading-relaxed">
          Lawless Clothing is a premium streetwear brand. Be Fearless. Be Lawless.
          <br /><br />
          This page is currently under construction.
        </p>
      </main>
    </>
  );
}
