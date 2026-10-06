// Everything on the breast augmentation page. Facts come from the practice's
// own page at drshiatis.com/news/breast-augmentation; the writing is ours.
import { procedures } from './beforeafter.js';

export const hero = {
  eyebrow: 'Breast augmentation',
  title: 'Breast augmentation',
  titleEm: 'in London',
  lead: 'Breast harmonisation through traditional augmentation and the latest tissue preservation technique, planned by measurement rather than by cup size.',
  points: [
    'Implant chosen by measurement, not by cup size',
    'Round, teardrop, and the Preserve tissue preservation technique',
    'Day case under general anaesthetic, often home the same evening',
    'Two consultations with Mr Shiatis before any decision',
    'Back to a desk in one to two weeks',
  ],
};

// The section bar across the top of the page.
export const sections = [
  { id: 'before-after', label: 'Before & after' },
  { id: 'overview', label: 'Overview' },
  { id: 'at-a-glance', label: 'At a glance' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'implants', label: 'Implants' },
  { id: 'placement', label: 'Placement' },
  { id: 'journey', label: 'Journey' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'risks', label: 'Risks' },
  { id: 'surgeon', label: 'Surgeon' },
  { id: 'cost', label: 'Cost' },
  { id: 'faqs', label: 'FAQs' },
];

export const gallery = procedures.find((p) => p.slug === 'breast-augmentation');

// Icon names map to the inline set in the AtAGlance component.
export const glance = [
  { icon: 'clock', label: 'Operating time', value: 'About 1.5 hours' },
  { icon: 'moon', label: 'Anaesthetic', value: 'General anaesthetic' },
  { icon: 'home', label: 'Hospital stay', value: 'Day case, or one night' },
  { icon: 'case', label: 'Time off work', value: '1 to 2 weeks' },
  { icon: 'car', label: 'Driving', value: 'After 2 weeks' },
  { icon: 'activity', label: 'Exercise', value: 'Nothing for 4 weeks' },
  { icon: 'shield', label: 'Support bra', value: 'Worn for 6 weeks' },
  { icon: 'check', label: 'Follow up', value: 'Dressings at 1 week, then Mr Shiatis at 2 to 3 weeks' },
  { icon: 'pin', label: 'Where', value: 'Fitzrovia Hospital, London' },
  { icon: 'tag', label: 'From', value: '£6,000' },
];

export const benefits = [
  { title: 'Proportion', text: 'Fuller breasts in proportion to your frame, chosen against your own measurements rather than a cup size on a label.' },
  { title: 'Volume returned', text: 'Volume lost to pregnancy, breastfeeding, weight change or time, put back where it used to be.' },
  { title: 'Clothes that fit', text: 'The practical change most patients mention first: how clothes and swimwear sit afterwards.' },
  { title: 'Evenness', text: 'Most breasts differ a little and some differ a lot. Different implants on each side correct it.' },
  { title: 'Confidence', text: 'Harder to measure and the reason most people come. It is a reasonable thing to want.' },
];

export const candidates = {
  yes: [
    'You are in good general health and a healthy, stable weight',
    'You have finished growing, and ideally finished having children',
    'Your breasts are small, uneven, or have lost volume you would like back',
    'You do not smoke, or you can stop well before and after surgery',
    'You want this for yourself, and you are clear about what you are asking for',
  ],
  no: [
    'You are pregnant or breastfeeding, which changes the breast and the plan',
    'You are in the middle of significant weight change',
    'You have a breast lump or a screening result still being investigated',
    'Your breasts sag enough that an implant alone will not lift them, in which case an uplift is discussed instead',
    'Somebody else wants this more than you do',
  ],
};

export const steps = [
  { n: 1, title: 'Enquiry', text: 'Tell us what you are considering. Our concierge experience lets you set out your main areas of interest and your concerns, so the consultation is built around you.' },
  { n: 2, title: 'First consultation', text: 'Meet Mr Shiatis at your preferred discreet location. You talk first, fully dressed, then he examines and measures. Implant sizers are used so you can see rather than imagine.' },
  { n: 3, title: 'Thinking time', text: 'Written information follows by email, and you are offered a second consultation. Nothing is booked or paid for on the day you first meet.' },
  { n: 4, title: 'Preparing', text: 'Pre-operative checks, a date, and clear instructions on medicines, fasting and what to bring. Stop smoking now if you have not already.' },
  { n: 5, title: 'Surgery day', text: 'You are marked up standing, in daylight, before theatre. About an hour and a half under general anaesthetic. Most patients go home the same evening; a night in the facility is available if it suits you better.' },
  { n: 6, title: 'The first fortnight', text: 'Support bra day and night, no lifting, no driving. Dressings clinic at a week. Most people are back at a desk inside two.' },
  { n: 7, title: 'Settling', text: 'Mr Shiatis sees you at two to three weeks, then again as the shape settles. Implants drop and soften over about three months.' },
];

export const recovery = [
  { when: 'First 48 hours', text: 'Tight and sore across the chest, much like a hard gym session. Pain relief is prescribed and works. Somebody should be with you the first night.' },
  { when: 'Week one', text: 'Support bra day and night. No lifting, no reaching above your head, no driving. Dressings are checked at the end of the week.' },
  { when: 'Weeks two to three', text: 'Most people are back at desk work. Mr Shiatis reviews you. Light walking is encouraged; nothing that bounces.' },
  { when: 'Weeks four to six', text: 'Gentle exercise returns at about four weeks, upper body last. The support bra comes off at six.' },
  { when: 'Three months', text: 'Implants have dropped and softened into their final position. This is the point at which the result is the result.' },
  { when: 'A year', text: 'Scars continue to fade for a year or more. Keep them out of the sun.' },
];

export const risks = {
  common: ['Bruising, swelling and tightness for the first weeks', 'Temporary changes in nipple sensation', 'Scars at the fold beneath the breast, which fade but never vanish'],
  uncommon: ['Bleeding or infection needing a return to theatre', 'Capsular contracture, where scar tissue tightens around the implant', 'Rippling you can see or feel, more likely with little natural tissue', 'Asymmetry or a position you would like changed, needing revision'],
  rare: ['Implant rupture, which modern implants resist but none prevent forever', 'Blood clot in the leg or lung', 'BIA-ALCL, a rare lymphoma associated with textured implants, which is why implant choice and records matter'],
};

export const faqs = [
  { q: 'How do I know what size to have?', a: 'By measurement and by trying. Mr Shiatis measures your chest width, breast base and skin quality, which narrows the range considerably, then you try sizers in a bra so you can see the result rather than imagine it. Cup size is not a measurement; two women wearing the same bra size often need different implants.' },
  { q: 'Will I be able to breastfeed afterwards?', a: 'Usually yes. The approach used here does not cut through the milk ducts or the gland. No surgeon can promise it, and some women cannot breastfeed regardless of surgery, but augmentation is not generally a barrier.' },
  { q: 'Do implants need replacing after ten years?', a: 'No. There is no expiry date and no routine ten-year swap. Implants are replaced when something changes, such as rupture, capsular contracture or a change in what you want. Many last far longer than a decade.' },
  { q: 'Will it affect breast screening?', a: 'Tell the mammography unit you have implants and they will use a technique that moves the implant aside. Implants under the muscle interfere less than implants above it. Screening remains effective.' },
  { q: 'Can I have an augmentation and an uplift at the same time?', a: 'Yes, and for breasts that have lost both volume and position it is often the right answer. It asks more of the recovery than either operation alone, and Mr Shiatis will tell you plainly which you need.' },
  { q: 'What is the Preserve technique?', a: 'A tissue preservation approach to augmentation, used alongside traditional techniques where it suits the patient. Mr Shiatis will explain whether it applies to you at consultation.' },
  { q: 'How long until I look normal in clothes?', a: 'Around two weeks for most people in ordinary clothes, though you will be in a support bra for six. The settled shape comes at about three months.' },
  { q: 'What if I am unhappy with the result?', a: 'Say so, early. Most concerns raised at six weeks are swelling that has not finished settling. Where a revision is genuinely needed, it is discussed openly, including what it costs.' },
];

export const cost = {
  from: '£6,000',
  includes: [
    'Both consultations with Mr Shiatis before surgery',
    'The implants themselves',
    'Surgeon, anaesthetist and facility fees',
    'Your dressings and the post-surgical support bra',
    'All routine follow-up appointments',
  ],
  notes: 'A written quotation follows your consultation, specific to your plan. Where a revision is needed for a complication, what is and is not covered is set out in writing before you commit to anything.',
};

export const why = [
  { title: 'A breast surgeon first', text: 'Breast and body surgery is most of this practice, not a sideline to it. Augmentation is an operation he does weekly.' },
  { title: 'On the Specialist Register', text: 'FRCS (Plast), the UK specialist fellowship in plastic surgery, and on the GMC Specialist Register for Plastic Surgery since 2021.' },
  { title: 'Reconstructive training behind it', text: 'An NHS consultant at Barts Health doing microsurgical breast reconstruction, which is where the detail in aesthetic breast surgery comes from.' },
  { title: 'He operates, and he follows up', text: 'The surgeon you meet is the surgeon in theatre and the surgeon at every follow-up appointment.' },
  { title: 'Two consultations, no pressure', text: 'Nothing is booked on the day you first meet. No deposits to hold a date, no discount that expires.' },
];
