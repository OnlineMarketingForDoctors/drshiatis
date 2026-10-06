// The before and after gallery, generated from the photographs in
// assets/before & after. Folder and angle names come straight from that set;
// the copy is written here.
export const procedures = [
  {
    slug: 'breast-augmentation',
    label: 'Breast augmentation',
    blurb:
      'Harmonising the breast with an implant, chosen by measurement rather than by cup size, and shot from the angles that show what an implant actually does to a shape.',
    cases: [
      { n: 1, dir: '/ba/breast-augmentation/patient-01', angles: ['front', 'side-right'] },
      { n: 2, dir: '/ba/breast-augmentation/patient-02', angles: ['front', 'oblique-left', 'oblique-right'] },
      { n: 3, dir: '/ba/breast-augmentation/patient-03', angles: ['oblique-right'] },
      { n: 4, dir: '/ba/breast-augmentation/patient-04', angles: ['front', 'oblique-right'] },
      { n: 5, dir: '/ba/breast-augmentation/patient-05', angles: ['front', 'oblique-left'] },
      { n: 6, dir: '/ba/breast-augmentation/patient-06', angles: ['front', 'oblique-left', 'side-right'] },
    ],
  },
  {
    slug: 'augmentation-uplift',
    label: 'Breast augmentation with uplift',
    blurb:
      'An uplift and an implant in one operation, for breasts that have lost both volume and position. It asks more of the recovery than either procedure alone.',
    cases: [
      { n: 1, dir: '/ba/augmentation-uplift/patient-01', angles: ['front'] },
      { n: 2, dir: '/ba/augmentation-uplift/patient-02', angles: ['front', 'side-left', 'side-right'], labelled: true },
    ],
  },
  {
    slug: 'breast-lift',
    label: 'Breast lift',
    blurb:
      'Reshaping and lifting through the smallest scar the breast will allow, with the aim of a natural shape rather than an obviously operated one.',
    cases: [
      { n: 1, dir: '/ba/breast-lift/patient-01', angles: ['front', 'oblique-right', 'side-right'] },
    ],
  },
  {
    slug: 'breast-lift-fat',
    label: 'Breast lift with fat transfer',
    blurb:
      'An uplift with the patient’s own fat used to restore fullness at the upper pole, so no implant is needed.',
    cases: [
      { n: 1, dir: '/ba/breast-lift-fat/patient-01', angles: ['front', 'oblique-right'] },
    ],
  },
  {
    slug: 'breast-reduction',
    label: 'Breast reduction',
    blurb:
      'The operation with the highest satisfaction rate in plastic surgery, done here on a drainless day-case protocol and photographed from every angle.',
    cases: [
      { n: 1, dir: '/ba/breast-reduction/patient-01', angles: ['front', 'oblique-left', 'oblique-right', 'side-left', 'side-right'] },
      { n: 2, dir: '/ba/breast-reduction/patient-02', angles: ['front', 'oblique-left', 'side-left', 'side-right'] },
      { n: 3, dir: '/ba/breast-reduction/patient-03', angles: ['front', 'oblique-left', 'oblique-right', 'side-left', 'side-right'] },
    ],
  },
  {
    slug: 'implant-exchange',
    label: 'Implant exchange',
    blurb:
      'Removing and replacing implants placed elsewhere, often years later, and correcting what has changed around them in the meantime.',
    cases: [
      { n: 1, dir: '/ba/implant-exchange/patient-01', angles: ['front', 'side-left', 'side-right'] },
    ],
  },
  {
    slug: 'gynaecomastia',
    label: 'Gynaecomastia',
    blurb:
      'Flattening a male chest that carries glandular tissue, fat or both. A large part of the practice, and one of the operations he is asked for most.',
    note:
      'The after photographs in this set were taken on the day of surgery. Surgical marker pen, dressings and early swelling are still visible, so they show what was removed rather than the settled result.',
    cases: [
      { n: 1, dir: '/ba/gynaecomastia/patient-01', angles: ['front'] },
      { n: 2, dir: '/ba/gynaecomastia/patient-02', angles: ['front'] },
      { n: 3, dir: '/ba/gynaecomastia/patient-03', angles: ['front'] },
      { n: 4, dir: '/ba/gynaecomastia/patient-04', angles: ['front', 'oblique-left', 'oblique-right', 'side-right'] },
      { n: 5, dir: '/ba/gynaecomastia/patient-05', angles: ['front', 'oblique-right'] },
      { n: 6, dir: '/ba/gynaecomastia/patient-06', angles: ['front', 'oblique-left', 'oblique-right', 'side-right'] },
      { n: 7, dir: '/ba/gynaecomastia/patient-07', angles: ['front'] },
    ],
  },
  {
    slug: 'abdominal-sculpting',
    label: '3D abdominal sculpting',
    blurb:
      'Liposuction used to define rather than simply to reduce, taking fat from the lines the muscle already follows.',
    cases: [
      { n: 1, dir: '/ba/abdominal-sculpting/patient-01', angles: ['front'] },
    ],
  },
  {
    slug: 'lipo-360',
    label: '360 liposuction with Renuvion',
    blurb:
      'Liposuction right around the trunk, combined with Renuvion to tighten the skin that is left behind.',
    cases: [
      {
        n: 1, dir: '/ba/lipo-360/patient-01', angles: ['front', 'side-left', 'side-right', 'back'],
        note:
          'The before photographs here were taken by the patient at home, so the light and background differ from the clinic photographs beside them.',
      },
    ],
  },
  {
    slug: 'thigh-lift',
    label: 'Thigh lift',
    blurb:
      'Removing the skin left behind after major weight loss, where diet and training have taken the volume but not the envelope.',
    cases: [
      { n: 1, dir: '/ba/thigh-lift/patient-01', angles: ['front', 'back'] },
    ],
  },
  {
    slug: 'ftm-top-surgery',
    label: 'FTM top surgery',
    blurb:
      'Chest masculinisation, photographed from front, side and oblique.',
    cases: [
      { n: 1, dir: '/ba/ftm-top-surgery/patient-01', angles: ['front', 'oblique-left', 'oblique-right', 'side-right'] },
    ],
  },
];

// Angles are stored as filenames; these are what the caption says.
export const angleLabels = {
  front: 'Front',
  'oblique-left': 'Angled, left',
  'oblique-right': 'Angled, right',
  'side-left': 'Side, left',
  'side-right': 'Side, right',
  back: 'Back',
};

// Flattened in nav order, so the slider and the counters agree.
export const pairsFor = (p) =>
  p.cases.flatMap((c) => c.angles.map((angle) => ({ ...c, angle })));
