// Viral Content Frameworks for High-Impact Social Media Content
// Based on proven frameworks from top creators like Alex Hormozi, Gary Vee, etc.

export const VIRAL_FRAMEWORKS = {
  // 🔥 Hook-Driven Openers (Proven to stop scroll)
  VIRAL_HOOKS: [
    "Unpopular opinion:",
    "Therapists won't like this but...",
    "Most therapists are broke because no one taught them this:",
    "This one mindset shift made me more than 10 sessions ever could:",
    "If you're still trading hours for dollars, read this twice:",
    "Here's what no one tells therapists about...",
    "I wish someone told me this when I started therapy:",
    "Stop doing this if you want to help more people:",
    "The therapy industry doesn't want you to know this:",
    "This will trigger some therapists but...",
    "Why most therapists fail at business:",
    "The uncomfortable truth about therapy:",
    "I made [$X] in [timeframe] doing this one thing:",
    "Most therapists believe [X], but in reality [Y]:",
    "Everyone wants [desired outcome] but they're doing [wrong thing]:"
  ],

  // 💥 Contrarian Takes (Challenge conventional wisdom)
  CONTRARIAN_ANGLES: [
    "Stop trying to serve everyone. Your niche is your income.",
    "Therapists should sell. Not selling is unethical if you have solutions.",
    "You can help people AND make money. These aren't opposites.",
    "Private practice isn't freedom if your calendar controls your life.",
    "Burnout is optional. You're choosing it.",
    "You're not tired from clients. You're tired from undervaluing yourself.",
    "Therapy sessions are not your only income source.",
    "Working harder isn't the answer. Working smarter is.",
    "Your degree doesn't guarantee success. Your mindset does.",
    "Stop giving away your expertise for free.",
    "Boundaries aren't selfish. They're essential.",
    "You were taught to heal others. Now help yourself."
  ],

  // 🧠 Curiosity Builders (Keep them reading)
  CURIOSITY_PATTERNS: [
    "But what most people miss is...",
    "Here's the part they don't tell you...",
    "The real secret is...",
    "What actually works is...",
    "The twist? [unexpected insight]",
    "Plot twist:",
    "Here's what changed everything:",
    "The breakthrough moment was when...",
    "But then I discovered...",
    "The game-changer was..."
  ],

  // 📊 Specific Number Patterns (Build credibility)
  NUMBER_PATTERNS: [
    "$[X] in [timeframe] with [method]",
    "[X]% of therapists do this wrong",
    "I went from $[X] to $[Y] in [timeframe]",
    "[Number] signs you're undercharging",
    "The [number] mistakes costing you clients",
    "[Number] ways to [outcome] without [pain point]",
    "From [X] to [Y] in [timeframe] - here's how"
  ],

  // 🎯 Identity-Based Hooks (Target specific audience)
  IDENTITY_HOOKS: [
    "For therapists who want more than burnout and paperwork:",
    "If you're tired of being the broke helper:",
    "For practitioners who know their worth:",
    "If you're ready to scale beyond 1:1 sessions:",
    "For therapists who refuse to stay broke:",
    "If you want to help more people AND make more money:",
    "For the therapist who's tired of struggling:"
  ],

  // ⚡ Call-to-Action Patterns
  VIRAL_CTAS: [
    "Save this so you don't forget it when you're stuck.",
    "Agree or disagree? Let's debate in the comments.",
    "Share this with a therapist who needs to see it.",
    "Double-tap if this hit different.",
    "Comment 'YES' if you're ready to change this.",
    "Tag a therapist who needs this reminder.",
    "Save this post. You'll thank me later.",
    "Which point resonated most? Tell me below.",
    "What's your take? Am I wrong about this?"
  ]
};

export const VIRAL_CONTENT_TYPES = {
  // 🔥 Viral Hook Templates
  VIRAL_HOOK: {
    structure: "Hook + Contrarian Take + Proof + Call to Action",
    examples: [
      "Most therapists are broke because they think helping people and making money are opposites. I made $15K last month helping MORE people than ever. Here's how...",
      "Unpopular opinion: Your low prices aren't helping anyone. When you undercharge, you attract clients who don't value change. Raise your rates. Watch your impact grow.",
      "Therapists won't like this but... Your degree doesn't guarantee success. Your marketing does. I know therapists with PhDs making $30K and others with certificates making $200K."
    ]
  },

  // 💣 Truth Bomb Content  
  TRUTH_BOMB: {
    structure: "Bold Statement + Why It's True + Personal Example + Action Step",
    examples: [
      "Burnout is optional. You're choosing it every time you say yes to the wrong clients, undercharge for your expertise, and work weekends. I used to be there. Here's how I escaped...",
      "Stop giving away your expertise for free. Every 'quick question' answered for free trains people that your knowledge has no value. I started charging for everything. Revenue doubled."
    ]
  },

  // 📈 Success Story Format
  SUCCESS_STORY: {
    structure: "Where I started + What changed + Results + How you can do it",
    examples: [
      "6 months ago: Seeing 40 clients/week, making $60K/year, completely burned out. Today: 15 clients/week, $180K/year, working 3 days. The difference? I stopped trading time for money.",
      "From broke therapist to 6-figure coach in 18 months. The secret wasn't more sessions. It was creating one digital product that helped 1000+ people while I slept."
    ]
  }
};

export const generateViralContent = (template, topic, tone) => {
  const hooks = VIRAL_FRAMEWORKS.VIRAL_HOOKS;
  const contrarian = VIRAL_FRAMEWORKS.CONTRARIAN_ANGLES;
  const curiosity = VIRAL_FRAMEWORKS.CURIOSITY_PATTERNS;
  const ctas = VIRAL_FRAMEWORKS.VIRAL_CTAS;

  // Select random elements for variety
  const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
  const randomContrarian = contrarian[Math.floor(Math.random() * contrarian.length)];
  const randomCuriosity = curiosity[Math.floor(Math.random() * curiosity.length)];
  const randomCTA = ctas[Math.floor(Math.random() * ctas.length)];

  return {
    hook: randomHook,
    contrarian: randomContrarian,
    curiosity: randomCuriosity,
    cta: randomCTA
  };
};

// Content Quality Filters (Anti-Fluff Checklist)
export const CONTENT_QUALITY_FILTERS = [
  "Is this scroll-stopping?",
  "Would someone DM you about this?", 
  "Does it challenge a common belief?",
  "Can it spark emotion (anger, hope, clarity)?",
  "Would you pause if you saw this in your feed?",
  "Does it make a specific claim?",
  "Is there a clear takeaway?",
  "Would this start a conversation?"
];

export const ALGORITHM_LEVERAGE_TIPS = [
  "Encourage saves with 'Save this so you don't forget'",
  "Ask for comments with controversial but respectful takes",
  "Use specific numbers and timeframes",
  "Create cliffhangers that make people want more",
  "Post content that people will share to their stories",
  "Use platform-native features (Reels, Polls, etc.)",
  "Create content that sparks healthy debate"
];