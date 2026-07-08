/**
 * Single source of truth for all site copy.
 *
 * ⚑ EDIT THIS FILE to change what the visitor reads — headlines, services,
 * case studies, testimonials, contact details all live here. Placeholders that
 * need real data are marked with `TODO:` comments.
 *
 * Functional form config (field options, validation) lives separately in
 * src/lib/discovery-schema.ts — this file is prose only.
 */

export const site = {
  name: "Clarked Strategy",
  domain: "clarkedstrategygroup.com",
  email: "hello@clarkedstrategygroup.com",
  tagline: "Marketing strategy that actually ships.",

  // Primary conversion action, repeated at every decision point.
  cta: { label: "Start a Discovery Session", href: "/discovery" },

  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
  ],

  hero: {
    eyebrow: "Marketing strategy studio",
    titleLead: "Turn a fuzzy brand idea into",
    // Cycled in the hero headline — each is the payoff half of the sentence.
    kineticWords: [
      "a strategy that ships.",
      "a launch that lands.",
      "a pipeline that grows.",
      "a brand people repeat.",
    ],
    subtitle:
      "Clarked Strategy is a marketing studio for founders who are done guessing. We build the positioning, the plan, and the campaigns that move your product from “nobody knows us” to “how did we miss them.”",
    primaryCta: { label: "Start a Discovery Session", href: "/discovery" },
    secondaryCta: { label: "See our work", href: "/#work" },
  },

  trust: {
    heading: "Trusted by founders from pre-seed through Series B",
    // Quiet credibility strip — swap for real client logos when available.
    signals: [
      "Pre-seed → Series B",
      "B2B SaaS & consumer",
      "Product & category launches",
      "Founder-led teams",
      "US · UK · Remote",
    ],
  },

  stats: {
    eyebrow: "Proof, not adjectives",
    title: "The numbers behind the work.",
    // TODO: replace with real, defensible metrics before launch.
    items: [
      { value: 240, suffix: "+", label: "Campaigns launched" },
      { value: 3.4, suffix: "×", decimals: 1, label: "Avg. qualified-pipeline lift" },
      { value: 18, suffix: "K+", label: "Qualified leads generated" },
      { value: 21, suffix: " days", label: "Avg. strategy-to-launch" },
    ],
  },

  services: {
    eyebrow: "What we do",
    title: "One team, from the first idea to the first result.",
    subtitle:
      "We scope to where you actually are — not a generic retainer. Most engagements combine a few of these.",
    items: [
      {
        title: "Brand strategy",
        body: "The story, the point of view, and the reason you win — turned into a foundation your whole team can build on.",
      },
      {
        title: "Positioning & messaging",
        body: "Claim a category you can own. We sharpen who it’s for, why it’s different, and the words that make it obvious.",
      },
      {
        title: "Go-to-market",
        body: "A concrete plan with owners, channels, and a sequence — so launch day is execution, not improvisation.",
      },
      {
        title: "Content & organic",
        body: "A content engine that compounds: the formats, cadence, and distribution that build an audience you keep.",
      },
      {
        title: "Paid acquisition",
        body: "Creative and channels tested against real economics — scaling what pays back, killing what doesn’t.",
      },
      {
        title: "Launch planning",
        body: "The full moment: narrative, assets, press, and a rollout that turns a release into a milestone people notice.",
      },
    ],
  },

  work: {
    eyebrow: "Selected work",
    title: "Work as proof.",
    subtitle:
      "Every engagement is a problem, an approach, and an outcome we can point to. A few we can talk about:",
    // TODO: replace all three with real case studies (client name, real metrics, image).
    caseStudies: [
      {
        client: "Northwind",
        category: "B2B SaaS · Repositioning",
        problem:
          "A genuinely better finance-ops platform that buyers filed under “yet another dashboard.” Great product, invisible category.",
        approach:
          "Repositioned around a category they could own, rebuilt the launch narrative, and stood up a demand engine tied to real buying triggers.",
        outcome: "3.4× qualified pipeline in two quarters",
        metric: "3.4×",
        metricLabel: "qualified pipeline",
        tint: "primary",
      },
      {
        client: "Tidepool",
        category: "Consumer app · Growth",
        problem:
          "Loyal users and strong retention, but flat installs and a cost-per-install that made paid a dead end.",
        approach:
          "Reframed the value proposition around the moment that mattered, then went creator-led on paid with tightly-tested creative.",
        outcome: "CAC down 38%, 22K installs in launch month",
        metric: "−38%",
        metricLabel: "cost to acquire",
        tint: "accent",
      },
      {
        client: "Field & Forge",
        category: "DTC marketplace · Launch",
        problem:
          "Launching a maker marketplace into a crowded space with no audience and a small budget.",
        approach:
          "Built a founder-story brand and a waitlist campaign that made the first drop feel like an event worth showing up for.",
        outcome: "11K waitlist, first drop sold out in 48 hours",
        metric: "48h",
        metricLabel: "to sell out",
        tint: "violet",
      },
    ],
  },

  process: {
    eyebrow: "How we work",
    title: "Discovery-first, always.",
    subtitle:
      "We don’t start with tactics. We start by understanding your product, your buyer, and what winning actually looks like — which is exactly what the Discovery Session kicks off.",
    steps: [
      {
        no: "01",
        title: "Discover",
        body: "We map the product, the audience, the goals, and the competition — so strategy is built on your reality, not a template.",
      },
      {
        no: "02",
        title: "Strategize",
        body: "Positioning, messaging, and a prioritized plan with clear owners and a sequence you can actually run.",
      },
      {
        no: "03",
        title: "Build",
        body: "We produce the assets — narrative, creative, pages, and campaigns — ready to ship, not stuck in review.",
      },
      {
        no: "04",
        title: "Launch",
        body: "We put it live with a coordinated rollout across the channels where your buyers actually pay attention.",
      },
      {
        no: "05",
        title: "Measure",
        body: "We track what moved, cut what didn’t, and hand you the playbook to keep compounding after we’re done.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "A studio, not an agency machine.",
    body: [
      "Clarked Strategy is a small, senior marketing studio. You work with the people doing the work — no account layers, no hand-offs to a junior team you never met on the pitch call.",
      "We started this because most founders don’t have a marketing problem — they have a clarity problem. The product is real. The story isn’t sharp yet. We exist to fix that, then build the engine that turns a sharp story into growth you can measure.",
    ],
    points: [
      "Senior operators on every engagement — no bait-and-switch",
      "Opinionated strategy, backed by what the numbers say",
      "We leave you with a playbook, not a dependency",
    ],
  },

  testimonials: {
    eyebrow: "In their words",
    title: "The founders we’ve worked with.",
    // TODO: replace with real quotes + attribution before launch.
    quotes: [
      {
        quote:
          "They found the story we’d been fumbling for two years in about three weeks. Our pipeline finally reflects how good the product actually is.",
        name: "Founder & CEO",
        role: "Seed-stage B2B SaaS",
      },
      {
        quote:
          "Most agencies sell you a retainer. Clarked sold us a plan we could actually run — and then ran it with us. Our best launch by a wide margin.",
        name: "Co-founder",
        role: "Consumer mobile app",
      },
      {
        quote:
          "Senior people, sharp opinions, zero fluff. They made decisions we’d been avoiding and the numbers moved within the first month.",
        name: "Head of Growth",
        role: "Series A marketplace",
      },
    ],
  },

  finalCta: {
    title: "Let’s find the story that makes your product obvious.",
    subtitle:
      "Start with a Client Discovery Session. It’s where we learn your product, your buyer, and your goals — and where the best engagements begin.",
    primaryCta: { label: "Start a Discovery Session", href: "/discovery" },
  },

  contact: {
    email: "hello@clarkedstrategygroup.com",
    location: "Houston, TX · Remote-friendly",
  },

  footer: {
    blurb:
      "A senior marketing studio that turns fuzzy brand ideas into strategy, launches, and growth you can measure.",
    // TODO: point at real profiles.
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Instagram", href: "https://www.instagram.com/" },
      { label: "X", href: "https://x.com/" },
    ],
  },
} as const;

export type Site = typeof site;
