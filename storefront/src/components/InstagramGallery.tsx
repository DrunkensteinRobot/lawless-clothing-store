'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  link: string;
}

interface InstagramGalleryProps {
  posts: InstagramPost[];
}

export default function InstagramGallery({ posts }: InstagramGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {posts.map((post, index) => (
        <motion.a
          key={post.id}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative aspect-square overflow-hidden rounded-lg bg-[#1A1A1A]"
        >
          <Image
            src={post.image}
            alt={post.caption}
            fill
            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-end">
            <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-sm line-clamp-2 font-sans">
                {post.caption}
              </p>
              <div className="mt-2 flex items-center gap-1 text-[#C0392B]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.25 7-7 7-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0123 3z" />
                </svg>
                <span className="text-xs">View on Instagram</span>
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
