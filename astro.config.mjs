// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
// Import my remark plugins
import { remarkModifiedTime } from './remark-modified-time.mjs';
import { remarkReadingTime } from './remark-reading-time.mjs';

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://optimisan.github.io',
  integrations: [expressiveCode({
    defaultProps: { wrap: true }
  }), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime, remarkReadingTime],
  },
});