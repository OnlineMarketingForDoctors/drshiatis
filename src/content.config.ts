import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Posts are Markdown files in src/content/blog. Add one and it appears on the
// blog index and at /blog/<its filename>; nothing else has to be touched.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Shown on the card and used as the meta description.
      summary: z.string(),
      date: z.coerce.date(),
      // Groups posts on the index. Keep the list short.
      category: z.enum(['Before you book', 'Surgery', 'Recovery', 'The practice']),
      // Minutes, as a reader sees it rather than a word count.
      readingTime: z.number().int().positive(),
      cover: image(),
      coverAlt: z.string(),
      // Set true to keep a post out of the build while it is being written.
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
