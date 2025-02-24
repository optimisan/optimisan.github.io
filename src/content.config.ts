import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import type { MarkdownHeading } from "astro";
/**
 * export interface MarkdownHeading {
    depth: number;
    slug: string;
    text: string;
}

 */
// define zod schema for the heading
const ZodHeading = z.object({
  depth: z.number(),
  slug: z.string(),
  text: z.string(),
});

// import type of headings for the blog post
const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    readingTime: z.string().optional(),
    headings: z.array(ZodHeading).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
