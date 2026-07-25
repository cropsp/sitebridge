import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    category: z.enum(['gift-guide', 'edc', 'review', 'comparison', 'listicle', 'how-to']),
    tags: z.array(z.string()),
    isGiftGuide: z.boolean().default(false),
    ownProduct: z.object({
      name: z.string(),
      link: z.string(),
      image: z.string(),
      whyPick: z.string(),
    }).optional(),
    affiliateProducts: z.array(z.object({
      name: z.string(),
      link: z.string(),
      image: z.string(),
      priceRange: z.enum(['$', '$$', '$$$']),
      platform: z.enum(['amazon', 'sovrn', 'sharesale', 'direct']),
    })).optional(),
    priceRange: z.enum(['$', '$$', '$$$']).optional(),
    season: z.enum(['christmas', 'fathers-day', 'valentines', 'evergreen', 'white-elephant']).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
