import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.drshiatis.com',
  output: 'static',
  // The page styles go into the document rather than into four separate
  // stylesheets. Each one was a render-blocking round trip on a phone, which
  // cost more than the bytes do inline.
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
