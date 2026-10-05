// The reconstructive work on the old drshiatis.com. Three procedures, so one
// flat list rather than areas. Links point at the old pages until the
// procedure pages are rebuilt here.
const OLD = 'https://www.drshiatis.com/news';

export const procedures = [
  {
    name: 'Breast reconstruction',
    kind: 'After mastectomy',
    note: 'Rebuilding the breast after cancer surgery, either at the same operation or later, using an implant or your own tissue. Which route suits you depends on your treatment plan, your build and what you want the result to do.',
    areas: 'Breast, immediate or delayed',
    detail: 'Planned alongside your oncology team, usually in more than one stage',
    img: '/images/rc-breast.webp',
    alt: 'Woman in an ivory linen robe in soft profile to window light, against a deep navy wall',
    href: `${OLD}/breast-reconstruction`,
  },
  {
    name: 'Reconstruction after skin cancer',
    kind: 'After excision',
    note: 'Closing and rebuilding the area once a skin cancer has been removed, with the aim of restoring the shape of a feature and placing the scar where the face already has a line.',
    areas: 'Face, scalp, ears, hands, trunk',
    detail: 'Local flaps and grafts, most often as a day case',
    img: '/images/rc-skin.webp',
    alt: 'Close crop of a temple, cheekbone and hairline against deep navy',
    href: `${OLD}/reconstruction-after-skin-cancer`,
  },
  {
    name: 'Breast symmetrisation',
    kind: 'Balancing the other side',
    note: 'Surgery on the unaffected breast so the two match in size, position and shape. It is the step that makes a reconstruction look right in clothes as well as out of them.',
    areas: 'The opposite breast',
    detail: 'Reduction, uplift or augmentation, usually a later stage',
    img: '/images/rc-symmetry.webp',
    alt: 'Two lengths of ivory silk draped side by side against deep navy',
    href: `${OLD}/breast-symmetrisation-procedures`,
  },
];
