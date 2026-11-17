// The surgical procedures on the old drshiatis.com, in the areas and the order
// that site groups them, with its own wording for each name. Links point at the
// old pages until the procedure pages are rebuilt here; an item with a third
// entry has a page on this site, and that is used instead.
const OLD = 'https://www.drshiatis.com/news';

export const areas = [
  {
    slug: 'breast',
    label: 'Breast',
    title: 'Breast surgery',
    img: '/images/su-breast.webp',
    alt: 'Shoulder and decolletage in an ivory silk camisole against deep navy',
    intro:
      'Most of the practice. Augmentation, reduction and uplift, and the revision work that follows surgery done elsewhere.',
    items: [
      ['Breast Augmentation', 'breast-augmentation', '/breast-augmentation'],
      ['Breast Reduction', 'breast-reduction'],
      ['Mastopexy (Breast Lift)', 'mastopexy-(breast-lift)'],
      ['Augmentation Mastopexy (Breast Lift with Implants)', 'augmentation-mastopexy-(breast-lift-with-implants)'],
      ['Lipomodelling (fat transfer)', 'lipomodelling-(fat-transfer)'],
      ['Breast Asymmetry Surgery', 'breast-asymmetry-surgery'],
      ['Implant Removal & Autoaugmentation', 'implant-removal-%26-autoaugmentation-'],
    ],
  },
  {
    slug: 'body',
    label: 'Body',
    title: 'Body contouring',
    img: '/images/su-body.webp',
    alt: 'Waist and hip in high-waisted ivory silk against deep navy',
    intro:
      'Reshaping after pregnancy or weight loss, and the contouring that refines a shape rather than reduces it.',
    items: [
      ['Abdominoplasty (tummy tuck)', 'abdominoplasty-(tummy-tuck)'],
      ['Body Lift', 'body-lift'],
      ['Liposuction / Liposculpting', 'liposuction%2F-liposculpting-'],
      ['Arm Lift', 'arm-lift'],
      ['Thigh Lift', 'thigh-lift'],
      ['Mummy Makeover', 'mummy-makeover'],
    ],
  },
  {
    slug: 'face',
    label: 'Face',
    title: 'Face and skin',
    img: '/images/su-face.webp',
    alt: 'Close crop of an eye and brow against deep navy',
    intro:
      'Smaller, precise procedures, most of them done under local anaesthetic with you home the same day.',
    items: [
      ['Upper Blepharoplasty', 'upper-blepharoplasty'],
      ['Prominent Ear Correction', 'prominent-ear-correction'],
      ['Earlobe Reduction', 'earlobe-reduction'],
      ['Earlobe Revision', 'earlobe-revision'],
      ['Lip Lift', 'lip-lift'],
      ['Shave / Excision of Moles', 'shave%2F-excision-of-moles'],
      ['Keloid Scar Treatment', 'keloid-scar-treatment-'],
    ],
  },
  {
    slug: 'reconstruction',
    label: 'Reconstruction',
    title: 'Reconstructive surgery',
    img: '/images/su-reconstruction.webp',
    alt: 'A woman’s hands resting quietly in her lap against deep navy',
    intro:
      'The NHS side of the practice, and the training that stands behind every aesthetic decision: rebuilding after cancer, using your own tissue.',
    more: { label: 'More on reconstructive surgery', href: '/reconstructive' },
    items: [
      ['Breast Reconstruction', 'breast-reconstruction'],
      ['Reconstruction after Skin Cancer', 'reconstruction-after-skin-cancer'],
      ['Breast Symmetrisation Procedures', 'breast-symmetrisation-procedures'],
    ],
  },
].map((a) => ({
  ...a,
  items: a.items.map(([name, slug, here]) => ({ name, href: here ?? `${OLD}/${slug}` })),
}));
