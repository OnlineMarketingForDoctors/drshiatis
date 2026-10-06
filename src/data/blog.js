// Everything the blog pages agree on, in one place.
export const categories = ['Before you book', 'Surgery', 'Recovery', 'The practice'];

export const formatDate = (d) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

// Newest first, drafts out. Astro keeps drafts out of the build only if we do.
export const published = (posts) =>
  posts.filter((p) => !p.data.draft).sort((a, b) => b.data.date - a.data.date);

export const categorySlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Only the categories that have something in them, newest-heavy first so the
// sidebar leads with where the writing actually is.
export const categoryCounts = (posts) =>
  categories
    .map((name) => ({ name, slug: categorySlug(name), count: posts.filter((p) => p.data.category === name).length }))
    .filter((c) => c.count > 0);
