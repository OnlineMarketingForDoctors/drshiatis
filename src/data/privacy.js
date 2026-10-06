// Details the practice has to supply for the privacy policy to be complete.
// Leave a value empty and the page simply omits that sentence rather than
// printing a gap, so nothing unverified is ever published.
export const legal = {
  // The company named on the footer. The registered number is on the
  // certificate of incorporation and at Companies House.
  controller: 'Eumorphia Ltd',
  tradingAs: 'Andreas Shiatis Plastic Surgery',
  companyNumber: '',
  // Registration with the Information Commissioner's Office is a legal
  // requirement for a practice holding health records. The number is on the
  // ICO's registration certificate.
  icoNumber: '',
  // Only if one has been appointed. A practice this size usually has not, and
  // names a responsible person instead.
  dpoName: '',
  updated: '6 October 2026',
};

// The measurement and advertising tools the practice uses. Drop one from this
// list and it disappears from the policy with it, so the page cannot drift out
// of step with what the site actually loads.
export const trackers = [
  {
    name: 'Google Analytics',
    by: 'Google Ireland Ltd',
    does: 'Counts visits and tells us which pages people read and how they arrived, in aggregate.',
    sets: 'Cookies that give your browser a random identifier',
  },
  {
    name: 'Google Ads',
    by: 'Google Ireland Ltd',
    does: 'Tells us which adverts led to an enquiry, and allows adverts to be shown to you again on other sites.',
    sets: 'Cookies for conversion measurement and remarketing',
  },
  {
    name: 'Meta Ads',
    by: 'Meta Platforms Ireland Ltd',
    does: 'The same for adverts on Facebook and Instagram: which ones led to an enquiry, and building audiences to show adverts to.',
    sets: 'Cookies, and the Meta pixel',
  },
];

export const sections = [
  { id: 'who-we-are', title: 'Who we are' },
  { id: 'what-we-hold', title: 'What we hold' },
  { id: 'why', title: 'Why we hold it' },
  { id: 'clinical-records', title: 'Your clinical records' },
  { id: 'photographs', title: 'Photographs' },
  { id: 'sharing', title: 'Who we share it with' },
  { id: 'retention', title: 'How long we keep it' },
  { id: 'website', title: 'This website' },
  { id: 'cookies', title: 'Cookies and advertising' },
  { id: 'transfers', title: 'Where it is held' },
  { id: 'rights', title: 'Your rights' },
  { id: 'complaints', title: 'How to complain' },
];

// Purpose, what it covers, and the lawful basis under UK GDPR.
export const bases = [
  {
    purpose: 'Answering an enquiry',
    data: 'Your name, contact details and whatever you choose to tell us',
    basis: 'Legitimate interests (Article 6(1)(f)): replying to someone who has asked us a question',
  },
  {
    purpose: 'Arranging and holding a consultation',
    data: 'Contact details, appointment details, the reason for your visit',
    basis: 'Contract (Article 6(1)(b)) and, for anything about your health, the provision of health care (Article 9(2)(h))',
  },
  {
    purpose: 'Your clinical records',
    data: 'History, examination findings, photographs, correspondence, operation notes, follow-up',
    basis: 'Legal obligation and the provision of health care (Articles 6(1)(c) and 9(2)(h))',
  },
  {
    purpose: 'Billing and insurance',
    data: 'Name, address, policy and authorisation numbers, procedure codes',
    basis: 'Contract (Article 6(1)(b)) and the management of health care systems (Article 9(2)(h))',
  },
  {
    purpose: 'The newsletter',
    data: 'Your email address',
    basis: 'Consent (Article 6(1)(a)), withdrawn whenever you like',
  },
  {
    purpose: 'Using your photographs beyond your own record',
    data: 'Clinical photographs, with or without identifying features',
    basis: 'Explicit consent (Article 9(2)(a)), given separately and in writing',
  },
];
