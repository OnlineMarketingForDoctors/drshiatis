// The main menu, with each category's procedures hanging off it. The lists are
// read from the same data the pages are built from, so the menu cannot drift
// out of step with them, and every procedure link still points at the old site
// until those pages are rebuilt here.
import { nav } from './site.js';
import { areas } from './surgical.js';
import { treatments } from './nonsurgical.js';
import { procedures as reconstructive } from './reconstructive.js';
import { procedures as formen } from './formen.js';

const flat = (items) => [{ items: items.map((t) => ({ name: t.name, href: t.href })) }];

// Keyed by the top-level href. A column carries an optional heading, which only
// the surgical menu needs because it is the one list long enough to need
// dividing up.
const children = {
  '/surgical': areas.map((a) => ({
    title: a.label,
    items: a.items.map((p) => ({ name: p.name, href: p.href })),
  })),
  '/non-surgical': flat(treatments),
  '/reconstructive': flat(reconstructive),
  '/for-men': flat(formen),
};

export const menu = nav.map((item) => ({
  ...item,
  columns: children[item.href] ?? null,
}));
