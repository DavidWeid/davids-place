// // 1. Import utilities from `astro:content`
// import { z, defineCollection } from "astro:content";

// // 2. Define a `type` and `schema` for each collection
// const blogCollection = defineCollection({
//   type: "content", // v2.5.0 and later
//   schema: z.object({
//     title: z.string(),
//     tags: z.array(z.string()),
//     image: z.string().optional()
//   })
// });

// // 3. Export a single `collections` object to register your collection(s)
// export const collections = {
//   blog: blogCollection
// };

// const blogCollection = defineCollection({
//   type: "content",
//   schema: z.object({
//     /* ... */
//   })
// });
// const newsletter = defineCollection({
//   type: "content",
//   schema: z.object({
//     /* ... */
//   })
// });
// const authors = defineCollection({
//   type: "data",
//   schema: z.object({
//     /* ... */
//   })
// });

// export const collections = {
//   blog: blogCollection,
//   newsletter: newsletter,
//   authors: authors
// };
