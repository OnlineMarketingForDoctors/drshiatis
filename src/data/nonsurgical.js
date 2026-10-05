// The four non-surgical treatments on the old drshiatis.com. Too few to group
// by area, so they stand as one list. Links point at the old pages until the
// treatment pages are rebuilt here.
const OLD = 'https://www.drshiatis.com/news';

export const treatments = [
  {
    name: 'Anti-wrinkle injections',
    kind: 'Botulinum toxin',
    note: 'Relaxes the muscles that fold the skin, so lines soften and new ones are slower to form. It treats the movement that causes a line rather than the line itself.',
    areas: 'Forehead, frown lines, crow’s feet',
    detail: 'Fifteen to thirty minutes, no downtime, lasts three to four months',
    img: '/images/ns-antiwrinkle.webp',
    alt: 'Close crop of a face in soft profile, eyes closed, against deep navy',
    href: `${OLD}/anti-wrinkle-injections`,
  },
  {
    name: 'Profhilo',
    kind: 'Bio-remodelling',
    note: 'Injectable hyaluronic acid that spreads through the skin rather than sitting under it, so it hydrates and firms without adding volume or altering your contours.',
    areas: 'Face, neck, décolletage, hands',
    detail: 'Two sessions a month apart, little to no downtime',
    img: '/images/ns-profhilo.webp',
    alt: 'Close crop of a neck and decolletage with a fine gold chain, against deep navy',
    href: `${OLD}/profhilo`,
  },
  {
    name: 'Polynucleotides',
    kind: 'Skin regeneration',
    note: 'Natural biopolymers that work at cell level to stimulate collagen and restore hydration, improving the texture and elasticity of thin or tired skin.',
    areas: 'Face, under the eyes, neck',
    detail: 'A short course, spaced a few weeks apart',
    img: '/images/ns-polynucleotides.webp',
    alt: 'Extreme close crop of skin at the outer corner of an eye, against deep navy',
    href: `${OLD}/polynucleotides`,
  },
  {
    name: 'Anti-sweat injections',
    kind: 'Hyperhidrosis',
    note: 'Botulinum toxin for excessive sweating, in the areas where it interferes most with work, clothing and confidence. This one is about comfort rather than appearance.',
    areas: 'Underarms, palms, soles, face',
    detail: 'A short appointment, back to normal the same day, several months of relief',
    img: '/images/ns-sweat.webp',
    alt: 'Close crop of a shoulder and upper arm against deep navy',
    href: `${OLD}/anti--sweat-(hyperhidrosis)injections`,
  },
];
