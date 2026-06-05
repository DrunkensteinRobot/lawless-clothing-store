'use client';

import { InstagramEmbed } from 'react-social-media-embed';
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
  // Only embed actual posts, reels, or IGTV links, not the profile fallback
  const validPosts = posts.filter(post => 
    post.link && (post.link.includes('/p/') || post.link.includes('/reel/') || post.link.includes('/tv/'))
  );

  if (validPosts.length === 0) {
    return (
      <div className="w-full text-center py-20 text-[#9CA3AF] border border-[#2D2D2D] rounded-3xl bg-[#111111]">
        <p className="font-heading text-2xl uppercase tracking-widest text-white mb-2">No Embeddable Posts Found</p>
        <p className="font-sans text-sm">Make sure to paste a direct link to an Instagram post or reel (e.g., instagram.com/p/...) in Sanity to see the embed here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {validPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="w-full flex justify-center bg-white rounded-lg overflow-hidden shadow-lg"
        >
          {/* Default instagram embed width is 328px */}
          <InstagramEmbed url={post.link} width={328} />
        </motion.div>
      ))}
    </div>
  );
}
