// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const cookbookCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.nullable(z.string()),
    source: z.nullable(z.string()),
    pubDate: z.nullable(z.date()),
    author: z.nullable(z.string()),
    image: z.nullable(
      z.object({
        url: z.nullable(z.string()),
        alt: z.nullable(z.string())
      })
    ),
    tags: z.nullable(z.array(z.string())),
    servings: z.nullable(z.string()),
    prepTime: z.nullable(z.string()),
    cookTime: z.nullable(z.string()),
    totalTime: z.nullable(z.string()),
    ingredients: z.nullable(z.array(z.string())),
    instructions: z.nullable(z.array(z.string()))
  })
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  cookbook: cookbookCollection
};
