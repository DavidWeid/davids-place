// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const cookbookCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    image: z
      .object({
        url: z.string(),
        alt: z.string()
      })
      .optional(),
    tags: z.array(z.string()).optional(),
    ingredients: z.array(z.string()).optional(),
    instructions: z.array(z.string()).optional()
  })
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  cookbook: cookbookCollection
};
