'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/lawless_clothing_v?igsh=MTlzdHU0bmlzeWRkbQ%3D%3D&utm_source=qr',
      icon: 'instagram',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61565032383177',
      icon: 'facebook',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@lawless_clothing.b?_r=1&_d=f2g3ebbg5k38ia&sec_uid=MS4wLjABAAAAkFLWL57wT7Jxh1lvJqj3PAo6UzKvhyTrCdd7uYuLYUsjfgF8HPbZdCgnxiRgS1Mx&share_author_id=7619771842832024597&sharer_language=en&source=h5_m&u_code=f2g3fbejaj2c6h&timestamp=1779136305&user_id=7619771842832024597&sec_user_id=MS4wLjABAAAAkFLWL57wT7Jxh1lvJqj3PAo6UzKvhyTrCdd7uYuLYUsjfgF8HPbZdCgnxiRgS1Mx&item_author_type=1&utm_source=whatsapp&utm_campaign=client_share&utm_medium=android&share_iid=7640774526833559304&share_link_id=22ff8828-a51a-427b-a7ec-5db5a64c43b1&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1',
      icon: 'tiktok',
    },
  ];

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#2D2D2D] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Image 
              src="/logo.png" 
              alt="Lawless Clothing" 
              width={160} 
              height={45} 
              className="w-36 h-auto object-contain mb-4"
            />
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
                <a href="mailto:Lawlessbrand015@gmail.com" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/returns" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Shipping
                </Link>
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
                  {link.name === 'Facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  )}
                  {link.name === 'TikTok' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.498 3h-3.5v9.268c0 .622-.506 1.125-1.128 1.125-.622 0-1.128-.503-1.128-1.125V6.75h-3.5v5.518c0 2.179 1.775 3.954 3.954 3.954 2.179 0 3.954-1.775 3.954-3.954V6.75c.755.507 1.675.817 2.652.817v-3.5c-1.5 0-2.866-.578-3.854-1.517z" />
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
