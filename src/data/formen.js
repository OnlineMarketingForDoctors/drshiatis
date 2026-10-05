// The men's procedures on the old drshiatis.com. Links point at the old pages
// until the procedure pages are rebuilt here.
const OLD = 'https://www.drshiatis.com/news';

export const procedures = [
  {
    name: 'Gynaecomastia surgery',
    kind: 'Male chest',
    note: 'Flattening a chest that carries excess glandular tissue, fat or both. High volume experience and current techniques keep the scars small and the recovery short, and many cases are now done under local anaesthetic.',
    areas: 'Chest, nipple and the fold beneath it',
    detail: 'Day case, often under local anaesthetic, compression vest for a few weeks',
    img: '/images/men-gynae.webp',
    alt: 'Man photographed from the shoulders down, open knit cardigan over a bare chest, against deep navy',
    href: `${OLD}/gynaecomastia-surgery`,
  },
  {
    name: 'Abdominal 3D liposculpting',
    kind: 'Body contouring',
    note: 'Liposuction used to define rather than simply to remove: fat is taken from the lines the muscle already follows, so the shape underneath reads through the skin. It suits men who train and still carry a layer that will not shift.',
    areas: 'Abdomen, flanks, chest',
    detail: 'Day case, back at a desk within a week, garment for six weeks',
    img: '/images/men-lipo.webp',
    alt: 'Close crop of a man’s midsection in raking side light, against deep navy',
    href: `${OLD}/abdominal-3d-liposculpting-for-men`,
  },
  {
    name: 'Hair loss prevention',
    kind: 'Non-surgical',
    note: 'Treatment aimed at holding on to the hair you still have, which is a far easier job than replacing hair already lost. Worth starting early, while the follicles are thinning rather than gone.',
    areas: 'Scalp, temples and crown',
    detail: 'A course of sessions in clinic, no downtime',
    img: '/images/men-hair.webp',
    alt: 'Close crop of a man’s hairline and temple in soft profile, against deep navy',
    href: `${OLD}/hairloss-prevention-`,
  },
];
