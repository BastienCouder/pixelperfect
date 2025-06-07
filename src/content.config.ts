import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      category: z.string().optional(),
      readingTime: z.string().optional(),

      publishDate: z.string().transform((str) => new Date(str)),
      updatedDate: z.string().transform((str) => new Date(str)).optional(),

      imageUrl: z.string().url().optional(),

      author: z.object({
        name: z.string(),
        avatar: z.string().url().optional(),
      }),

      headings: z
        .array(
          z.object({
            depth: z.number().int(),
            slug: z.string(),
            text: z.string(),
          })
        )
        .optional(),
    }),
  }),
};