import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.drshiatis.com',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
