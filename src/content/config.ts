// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const cookbookCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      source: z.nullable(z.string()),
      pubDate: z.nullable(z.date()),
      author: z.string(),
      image: z.nullable(
        z.object({
          url: image(),
          alt: z.string(),
        }),
      ),
      tags: z.array(z.string()),
      servings: z.string(),
      prepTime: z.string(),
      cookTime: z.string(),
      totalTime: z.string(),
      ingredients: z.array(
        z.object({ category: z.string(), items: z.array(z.string()) }),
      ),
      instructions: z.array(z.string()),
    }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.nullable(z.date()),
      author: z.string(),
      image: z.nullable(
        z.object({
          url: image(),
          alt: z.string(),
        }),
      ),
      tags: z.array(z.string()),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  cookbook: cookbookCollection,
  blog: blogCollection,
};
