// The options for "Where did you hear about us", exactly as the practice
// wants them recorded. `detail` marks the two that ask a follow-up question,
// which reveals a free text box beside the answer.
export const heardAbout = [
  { value: 'Search engines', label: 'Search engines (Google, Bing, Yahoo)' },
  { value: 'Social media', label: 'Social media (Facebook, Instagram, TikTok)' },
  { value: 'Friend or family', label: 'From a friend or family member' },
  { value: 'Another doctor', label: 'From another doctor' },
  { value: 'Newsletter', label: 'Newsletter' },
  { value: 'Text message', label: 'Text message' },
  { value: 'Influencer', label: 'Influencer', detail: 'Which one, or which channel?' },
  { value: 'Radio or podcast', label: 'Radio (including podcast)' },
  { value: 'AI chat', label: 'AI chats (ChatGPT, Gemini, Perplexity)' },
  { value: 'Other', label: 'Other', detail: 'Where did you hear about us?' },
];

// What the enquiry is about, so it reaches the right person without a reply.
export const enquiryTopics = [
  'Breast surgery',
  'Body contouring',
  'Face and skin',
  'Reconstructive surgery',
  'Surgery for men',
  'Non-surgical treatment',
  'An operation I have already had',
  'Something else',
];
