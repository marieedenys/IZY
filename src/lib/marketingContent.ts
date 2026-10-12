export const PERSONA = {
  name: "Camille",
  age: 31,
  role: "Management consultant",
  location: "Mexico City",
  summary:
    "Camille travels for work two to three times a month and treats a great meal as the reward for a long week. She already knows good food when she tastes it, she just doesn't trust strangers' star ratings to find it.",
  painPoints: [
    "Generic review averages don't reflect her own taste, just the crowd's.",
    "New cities mean starting her search for a good table from zero, every time.",
    "She wants a recommendation she can trust in under a minute, not twenty open tabs.",
  ],
  wants: [
    "A taste profile that travels with her, city to city.",
    "Recommendations she can act on immediately, without second-guessing.",
    "A community of people who take fine dining as seriously as she does.",
  ],
};

export const BRAND_SYSTEM = {
  colors: [
    { name: "Bordeaux", hex: "#6B1E23" },
    { name: "Cream", hex: "#F5E6D3" },
    { name: "Black", hex: "#000000" },
  ],
  typography: "A serif typeface throughout, used for headlines, body copy, and UI alike.",
  tone: "Warm, refined, never snobbish.",
  tagline: "fine dining has never been easier.",
};

export const LANDING_COPY = {
  headline: "Fine dining has never been easier.",
  subheadline:
    "IZY learns your taste and turns it into recommendations, reservations, and a community you can actually trust.",
  benefits: [
    {
      title: "Personalized, not generic",
      description:
        "Your recommendations come from your own taste profile, not an aggregate star rating.",
    },
    {
      title: "Instant answers",
      description:
        "Ask Izy any time and get a recommendation built for your craving, mood, and budget.",
    },
    {
      title: "A community that gets it",
      description:
        "Connect with people who eat the way you do, not random crowd reviews.",
    },
  ],
  cta: "Start your taste profile, free.",
};

export const SOCIAL_POSTS: string[] = [
  "Google reviews told us to go there. Our taste told us to leave. Let IZY learn what you actually like, not what the crowd rated.",
  "Your taste isn't generic. Your recommendations shouldn't be either. Meet IZY.",
  "Ask Izy: \"Romantic, Italian, €€€.\" Izy: here's your table. That's it. That's the app.",
  "We built the taste profile reviews always promised and never delivered.",
  "Stop scrolling through reviews. Start tasting.",
  "Fine dining has never been easier. Literally, it's in our name.",
  "New city, new cravings, same great recommendations, wherever you land.",
  "Your taste, your table, no guesswork.",
  "The trattoria your friend raved about might not be your thing. IZY only recommends what fits you.",
  "Join a community that argues about the best mole in Roma Norte, not the best filter for their food photos.",
];

export type VideoScript = {
  title: string;
  duration: string;
  beats: { time: string; action: string; voiceover: string }[];
};

export const VIDEO_SCRIPTS: VideoScript[] = [
  {
    title: "The Review Problem",
    duration: "30s",
    beats: [
      {
        time: "0:00-0:05",
        action: "Close-up on someone scrolling reviews, frustrated, café noise.",
        voiceover: "Four stars. Five hundred reviews. Still no idea if it's actually for you.",
      },
      {
        time: "0:05-0:15",
        action: "Cut to phone screen: opens IZY, selects Romantic, Italian, €€€.",
        voiceover: "IZY doesn't do averages. It does you.",
      },
      {
        time: "0:15-0:25",
        action: "Recommendation card appears; she walks into a cozy, candlelit trattoria.",
        voiceover: "One match, built from your taste, not the crowd's.",
      },
      {
        time: "0:25-0:30",
        action: "Logo and tagline on cream background.",
        voiceover: "IZY. Fine dining has never been easier.",
      },
    ],
  },
  {
    title: "The Traveler",
    duration: "30s",
    beats: [
      {
        time: "0:00-0:06",
        action: "A traveler lands in a new city, suitcase in hand, checking her phone.",
        voiceover: "New city. Same taste.",
      },
      {
        time: "0:06-0:16",
        action: "She opens IZY, selects Mexican, Casual, €€, gets an instant recommendation.",
        voiceover: "Izy already knows what you like, wherever you are.",
      },
      {
        time: "0:16-0:25",
        action: "She's seated at a lively spot, enjoying a meal with someone from the IZY community.",
        voiceover: "And the table, and the company, to match.",
      },
      {
        time: "0:25-0:30",
        action: "Logo and tagline.",
        voiceover: "IZY. Fine dining has never been easier.",
      },
    ],
  },
  {
    title: "Ask Izy in 3 Taps",
    duration: "30s",
    beats: [
      {
        time: "0:00-0:05",
        action: "Fast cuts: cuisine, atmosphere, and budget dropdowns being tapped.",
        voiceover: "Three taps.",
      },
      {
        time: "0:05-0:12",
        action: "Ask Izy button pressed; a recommendation sentence animates onto the screen.",
        voiceover: "One answer, written for you, not the internet.",
      },
      {
        time: "0:12-0:22",
        action: "Quick montage: saving the result, scrolling a dashboard of past recommendations.",
        voiceover: "Save it. Revisit it. Build a taste profile that actually gets better.",
      },
      {
        time: "0:22-0:30",
        action: "Logo, tagline, and call-to-action text.",
        voiceover: "Ask Izy. Fine dining has never been easier.",
      },
    ],
  },
];

export const CAMPAIGN_CALENDAR = [
  { day: 1, channel: "Instagram", content: "Launch post: brand video \"The Review Problem\"", goal: "Awareness" },
  { day: 2, channel: "TikTok", content: "Product demo clip: \"Ask Izy in 3 Taps\"", goal: "Engagement" },
  { day: 3, channel: "Email", content: "Welcome email to waitlist with landing page copy", goal: "Activation" },
  { day: 4, channel: "Instagram Stories", content: "Behind-the-scenes: building a taste profile", goal: "Engagement" },
  { day: 5, channel: "TikTok", content: "Social post: \"Stop scrolling through reviews. Start tasting.\"", goal: "Awareness" },
  { day: 6, channel: "Instagram", content: "Persona spotlight: Camille's story", goal: "Trust & relatability" },
  { day: 7, channel: "Email", content: "Product explainer: \"3 taps to your table\"", goal: "Activation" },
  { day: 8, channel: "TikTok", content: "Brand video: \"Ask Izy in 3 Taps\"", goal: "Conversion" },
  { day: 9, channel: "Instagram", content: "Community post: best mole in Roma Norte", goal: "Community" },
  { day: 10, channel: "Instagram Stories", content: "Poll: which headline do you prefer?", goal: "Feedback" },
  { day: 11, channel: "Email", content: "Pricing teaser: Free vs Plus vs Concierge", goal: "Conversion" },
  { day: 12, channel: "TikTok", content: "Brand video: \"The Traveler\"", goal: "Awareness" },
  { day: 13, channel: "Instagram", content: "Social post: new city, new cravings", goal: "Awareness" },
  { day: 14, channel: "Email + Instagram", content: "Campaign recap and CTA: Ask Izy now", goal: "Conversion" },
];
