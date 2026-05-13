'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/lawlessclothing',
      icon: 'instagram',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/lawlessclothing',
      icon: 'twitter',
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@lawlessclothing',
      icon: 'tiktok',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@lawlessclothing',
      icon: 'youtube',
    },
  ];

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#2D2D2D] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl tracking-wider text-white mb-2">LAWLESS</h3>
            <p className="text-[#9CA3AF] text-sm font-sans">Be Fearless. Be Lawless.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-white mb-4 uppercase text-sm tracking-wide">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/new-arrivals" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans font-bold text-white mb-4 uppercase text-sm tracking-wide">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Shipping
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-sans font-bold text-white mb-4 uppercase text-sm tracking-wide">Follow</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9CA3AF] hover:text-[#C0392B] transition-colors"
                  aria-label={link.name}
                >
                  {link.name === 'Instagram' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z" />
                    </svg>
                  )}
                  {link.name === 'Twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.25 7-7 7-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0323 3z" />
                    </svg>
                  )}
                  {link.name === 'TikTok' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.498 3h-3.5v9.268c0 .622-.506 1.125-1.128 1.125-.622 0-1.128-.503-1.128-1.125V6.75h-3.5v5.518c0 2.179 1.775 3.954 3.954 3.954 2.179 0 3.954-1.775 3.954-3.954V6.75c.755.507 1.675.817 2.652.817v-3.5c-1.5 0-2.866-.578-3.854-1.517z" />
                    </svg>
                  )}
                  {link.name === 'YouTube' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#2D2D2D] pt-8 text-center">
          <p className="text-[#9CA3AF] text-sm font-sans">
            © {currentYear} Lawless Clothing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
