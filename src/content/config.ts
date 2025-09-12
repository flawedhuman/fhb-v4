import { defineCollection, z } from 'astro:content';

const artworkCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    publishDate: z.date(),
  }),
});

export const collections = {
  artwork: artworkCollection,
};