import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstagramGallery from '@/components/InstagramGallery';
import { client } from '@/sanity/lib/client';
import { instagramPostsQuery } from '@/sanity/lib/queries';

export const metadata = {
  title: 'Instagram Feed - Lawless Clothing',
  description: 'Follow our latest designs and street style inspiration on Instagram',
};

export default async function InstagramPage() {
  const posts = await client.fetch(instagramPostsQuery);
  const displayPosts = posts.map((post: any) => ({
    id: post._id,
    image: post.imageUrl,
    caption: post.caption,
    link: post.instagramUrl || 'https://instagram.com/lawlessclothing',
  }));

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <svg className="w-8 h-8 text-[#C0392B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z" />
                </svg>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl tracking-wide uppercase text-white mb-4">
                @lawlessclothing
              </h1>
              <p className="text-[#9CA3AF] max-w-2xl mx-auto font-sans">
                Follow our latest designs, street style inspiration, and exclusive drops
              </p>
              <a
                href="https://instagram.com/lawlessclothing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-8 py-3 bg-[#C0392B] text-white font-bold uppercase tracking-wider hover:bg-[#E74C3C] transition-colors"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          {displayPosts.length > 0 ? (
            <InstagramGallery posts={displayPosts} />
          ) : (
            <div className="rounded-3xl border border-[#2D2D2D] bg-[#111111] p-12 text-center">
              <p className="text-[#9CA3AF] uppercase tracking-[0.25em] text-xs mb-4">Instagram Feed</p>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
                No posts yet.
              </h2>
              <p className="text-[#B0B5BB] max-w-2xl mx-auto mb-8">
                We’re getting the gallery ready. Publish your first Instagram post in Sanity and it will appear here automatically.
              </p>
              <a
                href="https://your-sanity-studio-url"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#C0392B] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#C0392B] transition hover:bg-[#C0392B] hover:text-white"
              >
                Open Sanity Studio
              </a>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-[#1A1A1A] py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl tracking-wide uppercase mb-4">
              Tag us on Instagram
            </h2>
            <p className="text-[#9CA3AF] font-sans mb-6">
              Use #lawlessclothing to feature your style on our feed
            </p>
            <a
              href="https://instagram.com/lawlessclothing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 border border-[#C0392B] text-[#C0392B] font-bold uppercase tracking-wider hover:bg-[#C0392B] hover:text-white transition-colors"
            >
              Visit Instagram
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
