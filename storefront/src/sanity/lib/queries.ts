import { groq } from 'next-sanity';

export const heroBannerQuery = groq`
  *[_type == "heroBanner"] {
    _id,
    title,
    subtitle,
    ctaText,
    ctaLink,
    "imageUrl": image.asset->url
  }
`;

export const newArrivalsQuery = groq`
  *[_type == "product" && isNewArrival == true][0...4] {
    _id,
    name,
    "slug": slug.current,
    price,
    shortDescription,
    "imageUrl": images[0].asset->url,
    isNewArrival,
    isBestSeller,
    stock
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    shortDescription,
    "imageUrl": images[0].asset->url,
    isNewArrival,
    isBestSeller,
    stock
  }
`;

export const instagramPostsQuery = groq`
  *[_type == "instagramPost"] | order(publishedAt desc)[0...12] {
    _id,
    title,
    caption,
    instagramUrl,
    publishedAt,
    "imageUrl": image.asset->url
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    shortDescription,
    details,
    "images": images[].asset->url,
    sizes,
    colors,
    stock,
    isNewArrival,
    isBestSeller
  }
`;
