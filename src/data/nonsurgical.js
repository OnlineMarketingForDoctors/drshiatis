// The four non-surgical treatments on the old drshiatis.com, grouped by the
// area each one actually treats. Links point at the old pages until the
// treatment pages are rebuilt here.
const OLD = 'https://www.drshiatis.com/news';

export const areas = [
  {
    slug: 'face',
    label: 'Face',
    title: 'Skin quality and expression',
    img: '/images/ns-face.webp',
    alt: 'Close crop of a face in soft profile, eyes closed, against deep navy',
    intro:
      'Three treatments that work on the skin itself and on the muscles beneath it. None of them add volume or change the shape of your face.',
    items: [
      {
        name: 'Anti-wrinkle injections',
        note: 'Botulinum toxin, relaxing the muscles that fold the skin, so lines soften and new ones are slower to form.',
        areas: 'Forehead, frown lines, crow’s feet',
        detail: 'Fifteen to thirty minutes, no downtime, three to four months',
        href: `${OLD}/anti-wrinkle-injections`,
      },
      {
        name: 'Profhilo',
        note: 'Injectable hyaluronic acid that spreads through the skin rather than sitting under it, so it hydrates and firms without adding volume or altering your contours.',
        areas: 'Face, neck, décolletage, hands',
        detail: 'Two sessions a month apart, little to no downtime',
        href: `${OLD}/profhilo`,
      },
      {
        name: 'Polynucleotides',
        note: 'Natural biopolymers that work at cell level to stimulate collagen and restore hydration, improving the texture and elasticity of thin or tired skin.',
        areas: 'Face, under the eyes, neck',
        detail: 'A short course, spaced a few weeks apart',
        href: `${OLD}/polynucleotides`,
      },
    ],
  },
  {
    slug: 'body',
    label: 'Body',
    title: 'Comfort rather than appearance',
    img: '/images/ns-body.webp',
    alt: 'Close crop of a shoulder and collarbone against deep navy',
    intro:
      'One treatment, for a problem that is about how you live rather than how you look.',
    items: [
      {
        name: 'Anti-sweat injections',
        note: 'Botulinum toxin for hyperhidrosis, reducing excessive sweating in the areas where it interferes most with work, clothing and confidence.',
        areas: 'Underarms, palms, soles, face',
        detail: 'A short appointment, back to normal the same day, several months of relief',
        href: `${OLD}/anti--sweat-(hyperhidrosis)injections`,
      },
    ],
  },
];
