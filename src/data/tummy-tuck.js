// Everything on the tummy tuck page. The copy is the client's, supplied for
// this page; the structure follows the breast augmentation template.
import { procedures } from './beforeafter.js';

export const hero = {
  eyebrow: 'Tummy tuck',
  title: 'Abdominoplasty (Tummy Tuck)',
  titleEm: 'London',
  lead:
    'Abdominoplasty (tummy tuck) in London with Mr Andreas Shiatis removes loose abdominal skin and excess fat to create a smoother, firmer contour. The procedure can include the repair of separated abdominal muscles and is planned around the changes you want to address after pregnancy, weight loss or ageing.',
  points: [
    'UK-trained Consultant Plastic Surgeon with extensive breast and body surgery expertise',
    'A full range of tummy tuck techniques tailored to your body and goals',
    'Precise abdominal reshaping with careful attention to waist definition and scar placement',
    'Personal care from Mr Shiatis, from your first consultation through to recovery',
  ],
};

export const byline = 'Andreas Shiatis Plastic Surgery · Last updated October 2026';

export const sections = [
  { id: 'before-after', label: 'Before & after' },
  { id: 'at-a-glance', label: 'At a glance' },
  { id: 'overview', label: 'Overview' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'candidates', label: 'Suitability' },
  { id: 'types', label: 'Types' },
  { id: 'journey', label: 'Your surgery' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'cost', label: 'Cost' },
  { id: 'surgeon', label: 'Surgeon' },
  { id: 'faqs', label: 'FAQs' },
];

// The nearest abdominal set in the gallery. Swap the slug when a tummy tuck
// set of its own is added.
export const gallery = procedures.find((p) => p.slug === 'abdominal-sculpting');

export const glance = [
  { icon: 'moon', label: 'Anaesthetic', value: 'General anaesthetic' },
  { icon: 'clock', label: 'Operating time', value: 'Approximately 2 hours, depending on the procedure' },
  { icon: 'home', label: 'Hospital stay', value: '1 to 2 nights' },
  { icon: 'drop', label: 'Drains', value: 'Not routinely used' },
  { icon: 'case', label: 'Time off work', value: '1 to 2 weeks for some non-physical roles; longer may be needed' },
  { icon: 'activity', label: 'Exercise', value: 'Avoid strenuous exercise for 6 weeks' },
  { icon: 'shield', label: 'Support garment', value: 'Compression garment for 6 weeks' },
  { icon: 'check', label: 'Follow-up', value: 'Dressings clinic at 1 week; appointment with Mr Shiatis at 2 weeks' },
  { icon: 'car', label: 'Driving', value: 'Around 2 weeks, once comfortable and safe to drive' },
  { icon: 'tag', label: 'Price', value: 'From £6,900' },
  { icon: 'pin', label: 'Location', value: 'Fitzrovia, London' },
];

export const overview = {
  paragraphs: [
    'A tummy tuck, or abdominoplasty, removes excess skin and fat from the abdomen and can tighten the tissue supporting separated abdominal muscles. It addresses loose skin and changes in abdominal shape that can remain after pregnancy or significant weight loss. The extent of skin removal and any muscle repair depend on your anatomy and the type of tummy tuck performed.',
  ],
  caption:
    'A tummy tuck removes loose abdominal skin and excess fat, with muscle repair included where needed to create a smoother, firmer abdominal contour.',
};

export const benefitsLead =
  'Loose abdominal skin can affect the way clothes fit and cause rubbing beneath a fold. A tummy tuck removes this excess and reshapes the abdomen, with muscle repair or liposuction included where appropriate.';

export const benefits = [
  { title: 'A smoother abdominal contour', text: 'Removing loose skin reduces folds and overhang across the treated area.' },
  { title: 'A firmer abdominal wall', text: 'Repairing separated muscles can address bulging associated with that separation.' },
  { title: 'Improved waist definition', text: 'Skin removal and, where suitable, liposuction can reshape the abdomen and waist.' },
  { title: 'Greater physical comfort', text: 'Removing an overhang can reduce rubbing and irritation beneath the skin fold.' },
  { title: 'A more comfortable clothing fit', text: 'A change in abdominal shape can make fitted clothing easier to wear.' },
];

export const suitability =
  'Tummy tuck surgery is suitable for men and women with loose abdominal skin, an overhang or separated abdominal muscles, particularly after pregnancy or significant weight loss. You should be in good general health, at a stable, healthy weight and comfortable with the scars involved. Mr Shiatis will assess your suitability and discuss the timing of surgery if you are planning another pregnancy or further substantial weight loss.';

export const typesLead =
  'The type of tummy tuck depends on how much loose skin is present and whether it affects the lower abdomen, the whole abdomen or the sides of the waist. Mr Shiatis will explain the approach he recommends, the scars involved and the techniques he uses to reshape and close the abdomen.';

export const types = [
  { title: 'Full tummy tuck', text: 'A full tummy tuck treats loose skin above and below the belly button through an incision across the lower abdomen. The abdominal wall can be tightened where needed, excess skin is removed, and a new opening is made for the belly button in the remaining skin. This leaves a lower abdominal scar and a scar around the navel.' },
  { title: 'Mini tummy tuck', text: 'A mini tummy tuck focuses on a smaller amount of excess skin below the belly button. It usually involves a shorter lower abdominal incision, without an incision around the navel. Its effect is more limited than a full tummy tuck, so it will not adequately address substantial loose skin higher on the abdomen.' },
  { title: 'Extended tummy tuck', text: 'An extended tummy tuck carries the lower abdominal incision further around the sides to remove excess skin affecting the waist as well as the front of the abdomen. It can be appropriate after significant weight loss when a standard tummy tuck would leave loose skin at the sides. The resulting horizontal scar is longer.' },
  { title: 'Fleur-de-lis tummy tuck', text: 'A fleur-de-lis tummy tuck removes excess skin in two directions using both a lower horizontal incision and a vertical incision down the centre of the abdomen. It can address extensive skin laxity after major weight loss, including excess that a horizontal incision alone cannot correct. The additional vertical scar is an important part of the decision.' },
];

export const techniques = [
  { title: 'Tummy tuck with liposuction', text: 'Liposuction can be combined with abdominoplasty when fatty deposits also contribute to abdominal or waist fullness. Liposuction removes fat, while the tummy tuck removes loose skin and allows muscle repair where needed. Mr Shiatis will assess whether combining the procedures would improve the contour and is appropriate for your health and surgical plan.' },
  { title: 'Lock and glue abdominoplasty', text: 'The lock and glue technique uses an internal tissue adhesive to help hold the tissue layers together. This can form part of a plan to reduce fluid accumulation and avoid drains. Mr Shiatis will explain whether it is suitable for your procedure, including the aftercare you will still need.' },
  { title: 'Quilting sutures', text: 'Quilting sutures are internal stitches that secure the lifted abdominal tissue to the underlying layer. They reduce the space between those surfaces and help distribute tension during closure. They can reduce fluid collection, although a seroma can still develop and may require treatment.' },
];

export const statement =
  'Mr Andreas Shiatis combines extensive breast and body surgery experience with personalised planning and continued care throughout your tummy tuck recovery.';

export const journeyLead =
  'Your treatment starts with an assessment of the skin, fat and abdominal wall, followed by a discussion of the change you want to achieve. Mr Shiatis uses those findings to recommend an approach and explain how the extent of surgery affects your scars, recovery and result.';

export const steps = [
  { n: 1, title: 'Your tummy tuck consultation', text: 'Mr Shiatis will examine your abdomen, assess any muscle separation and review your health, previous surgery and weight history. You will discuss the proposed skin removal, any liposuction or muscle repair, and the risks and likely outcome. A second consultation gives you time to consider the plan and ask further questions before surgery.' },
  { n: 2, title: 'Your tummy tuck procedure', text: 'Before surgery, Mr Shiatis reviews the plan with you and marks the areas to be treated. Under general anaesthetic, he makes the agreed incisions, removes excess skin and fat and repairs muscle separation where needed. Liposuction, quilting sutures or tissue adhesive are used according to your plan before the incisions are closed and dressings and a compression garment are applied.' },
  { n: 3, title: 'Your tummy tuck results', text: 'Your abdomen will change shape when excess tissue is removed, but swelling and a bent posture can initially obscure the result. The contour becomes clearer as healing progresses, while scars take longer to soften and fade. Maintaining a stable weight helps preserve the change, although pregnancy, ageing and weight fluctuations can affect your abdomen later.' },
];

export const recoveryLead =
  'Expect swelling, bruising and tightness across the abdomen during early recovery. We will explain how to manage discomfort, care for your dressings and wear your compression garment. Arrange help at home, particularly with children, shopping and tasks that involve lifting or stretching.';

export const recovery = [
  { when: 'The first week', text: 'Rest between short, gentle walks and avoid straining your abdomen. You may find standing fully upright uncomfortable at first. Attend your dressings appointment at around one week so the team can check your incisions.' },
  { when: 'Week two', text: 'Some people can return to non-physical work after one to two weeks, although more extensive surgery or a demanding role may require longer. Mr Shiatis will review you at around two weeks. Driving depends on comfortable movement, safe vehicle control and being free from medication that impairs your reactions.' },
  { when: 'Weeks three to six', text: 'Gradually increase light daily activities as advised, while avoiding strenuous exercise and heavy lifting. Continue wearing your compression garment for the planned six weeks. Swelling can persist even as movement becomes easier.' },
  { when: 'After six weeks', text: 'Mr Shiatis will advise when you can build back towards your usual exercise routine. Continue scar care as directed and allow further time for the abdominal contour and scars to settle.' },
];

export const cost = {
  from: '£6,900',
  notes:
    'Tummy tuck surgery with Mr Shiatis starts from £6,900. The final price depends on the type of abdominoplasty, any additional liposuction and the hospital care required. Following your assessment, we will provide a quotation and explain what it covers, including the arrangements for aftercare, so you can consider the full cost before proceeding.',
};

export const whyLead =
  'Mr Andreas Shiatis is a UK-trained Consultant Plastic Surgeon with extensive experience in aesthetic breast and body surgery and complex reconstruction. His approach to tummy tuck surgery combines precise surgical technique with careful attention to abdominal shape, waist definition and scar placement, creating a treatment plan tailored to your body and the result you want to achieve.';

export const why = [
  { title: 'Extensive breast and body surgery experience', text: 'His practice includes abdominoplasty, liposuction and body contouring after pregnancy and weight loss, with a strong focus on balanced proportions and natural-looking results.' },
  { title: 'Consultant-level expertise', text: 'He holds the FRCS(Plast) qualification, is on the GMC Specialist Register for Plastic Surgery and has more than 15 years’ experience in plastic surgery.' },
  { title: 'Advanced reconstructive training', text: 'A microsurgery fellowship at Imperial College and his NHS consultant role at Barts Health provide a strong foundation in anatomy, tissue handling and surgical precision.' },
  { title: 'A full range of tummy tuck techniques', text: 'Mini, full, extended and fleur-de-lis procedures, alongside liposuction and internal closure techniques, allow him to tailor surgery to your anatomy.' },
  { title: 'Personal attention before surgery', text: 'Two consultations give you time to discuss your priorities directly with Mr Shiatis, understand his recommendations and feel informed about your decision.' },
  { title: 'Continued care throughout recovery', text: 'Your care includes dressing appointments, a postoperative review with Mr Shiatis and further follow-up as needed while you heal.' },
];

export const faqs = [
  { q: 'Can I get a tummy tuck on the NHS?', a: 'A tummy tuck is not usually available on the NHS because it is generally considered cosmetic surgery. If excess abdominal skin causes significant medical problems, your GP can advise whether an assessment or funding application is appropriate under local criteria.' },
  { q: 'Will a tummy tuck help me lose weight?', a: 'A tummy tuck removes some tissue but is intended to reshape the abdomen rather than achieve weight loss. Reaching a stable weight before surgery helps Mr Shiatis assess how much loose skin remains and plan the procedure.' },
  { q: 'Do I need a tummy tuck or liposuction?', a: 'Liposuction addresses excess fat, while a tummy tuck removes loose skin and can repair muscle separation. If you have both fatty deposits and skin laxity, a combination may be appropriate following an assessment.' },
  { q: 'Can a tummy tuck repair diastasis recti?', a: 'Yes, a tummy tuck can include repair of diastasis recti, where the abdominal muscles have separated. The repair uses stitches to tighten the stretched tissue supporting the muscles, and Mr Shiatis will assess whether this should form part of your procedure.' },
  { q: 'Will a tummy tuck remove stretch marks?', a: 'Stretch marks within the skin removed during surgery will be removed with it. Marks outside that area will remain, although their position may change as the remaining skin is brought together.' },
  { q: 'Will I have visible tummy tuck scars?', a: 'Yes, every tummy tuck leaves a scar, with its length and position determined by the technique used. The main scar usually sits low on the abdomen, while a full procedure adds a scar around the navel and a fleur-de-lis procedure adds a vertical scar.' },
  { q: 'Is tummy tuck surgery painful?', a: 'General anaesthetic keeps you asleep during the procedure, but soreness and tightness are expected afterwards, particularly if muscle repair is included. You will receive pain relief and instructions to help you move and rest during early healing.' },
  { q: 'How long do I need to wear a compression garment?', a: 'The planned period is six weeks after surgery. The garment supports your abdomen during healing, and we will explain how to wear it and when to remove it for washing or dressing care.' },
  { q: 'How long do tummy tuck results last?', a: 'The excess tissue removed during surgery is permanently removed, making the change long-lasting. Remaining skin and fat can still change with pregnancy, weight fluctuations and ageing, making stable weight important for maintaining your result.' },
];
