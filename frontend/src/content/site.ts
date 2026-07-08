/**
 * Single source of truth for all site copy.
 *
 * EDIT THIS FILE to change what the visitor reads. All headlines, services,
 * founder bio, and contact details live here. Gold-italic emphasis inside a
 * serif heading is stored as { lead, em, tail } and rendered in JSX.
 *
 * Functional form config (field options, validation) lives separately in
 * src/lib/discovery-schema.ts and src/lib/contact-schema.ts.
 */

export const site = {
  name: "Clarked Strategy",
  domain: "clarkedstrategygroup.com",
  email: "hello@clarkedstrategygroup.com",
  phone: "", // TODO: real phone number (HTML had placeholder (713) 000-0000)
  location: "Houston, TX. Serving clients nationally.",
  tagline: "Marketing & Communications",

  // Primary conversion: the light contact form on the homepage.
  cta: { label: "Get Clarked", href: "#contact" },
  // The deeper 6-step intake, kept available for serious leads.
  discovery: { label: "Start a Discovery Session", href: "/discovery" },

  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "B2B", href: "#b2b" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Clarked Strategy · Marketing & Communications",
    title: { lead: "Your brand's moment to", em: "make noise", tail: "is right now." },
    subtitle:
      "From media relations to B2B demand generation, we help ambitious brands cut through the clutter, own their narrative, and win in the marketplace.",
    primaryCta: { label: "Explore Our Services", href: "#services" },
    secondaryCta: { label: "Get Clarked Today", href: "#contact" },
    scrollCue: "Scroll to explore",
  },

  capabilities: [
    "Media Relations",
    "B2B Marketing",
    "Social Media Strategy",
    "Crisis Communications",
    "Digital Advertising",
    "Brand Strategy",
  ],

  about: {
    eyebrow: "Who We Are",
    title: "Built for brands that refuse to be ignored.",
    body: [
      "Clarked Strategy is a full-service marketing and communications firm built to help brands advance their presence across every channel that matters. We don't just craft campaigns, we build momentum.",
      "Whether you're navigating a crisis, launching a new product, or trying to break through in a crowded market, we bring the strategy, relationships, and execution to get you there.",
    ],
    stats: [
      { value: "Full.", label: "Service Firm" },
      { value: "360°", label: "Brand Coverage" },
      { value: "Always.", label: "In Your Corner" },
      { value: "Zero.", label: "Fluff. All Strategy." },
    ],
    quote: {
      lead: "The brands that win aren't the loudest, they're the most",
      em: "intentional",
      tail: ".",
      attribution: "The Clarked Strategy Philosophy",
    },
  },

  founder: {
    eyebrow: "Meet the Founder",
    name: "Diamond Dixon-Clark",
    title: "Founder & Principal Strategist, Clarked Strategy",
    photo: "/diamond.png",
    photoAlt: "Diamond Dixon-Clark, Founder of Clarked Strategy",
    bio: [
      "Diamond Dixon-Clark is a marketing and communications strategist with a passion for helping brands find their voice, and amplify it. She founded Clarked Strategy on a simple belief: that every brand, from emerging startups to established enterprises, deserves marketing that is intentional, data-informed, and built to last.",
      "With deep expertise across media relations, B2B marketing, social strategy, crisis communications, and digital advertising, Diamond brings a full-funnel perspective to every client engagement. She's equal parts strategist and storyteller, focused not just on what brands say, but on how the right message, in the right place, at the right time creates real business momentum.",
      "Based in Houston, TX, Diamond works with clients nationally across industries including technology, engineering, construction, energy, nonprofits, and healthcare.",
    ],
    signature: "Diamond Dixon-Clark",
  },

  services: {
    eyebrow: "What We Do",
    title: "The full toolkit to advance your brand.",
    subtitle:
      "Every service we offer is built around one goal: positioning your brand where it needs to be, in the press, in the feed, in the conversation, and in the market.",
    items: [
      {
        icon: "Newspaper",
        name: "Media Relations",
        body: "We cultivate the journalist relationships and press strategies that earn your brand coverage in the outlets that matter to your audience.",
      },
      {
        icon: "Share2",
        name: "Social Media Strategy",
        body: "Platform-native content strategies, community management, and influencer partnerships designed to grow your audience and deepen engagement.",
      },
      {
        icon: "ShieldAlert",
        name: "Crisis Communications",
        body: "When the stakes are highest, our seasoned crisis team helps you respond swiftly, protect your reputation, and emerge stronger.",
      },
      {
        icon: "Target",
        name: "Digital Advertising",
        body: "Data-driven paid media across search, social, and programmatic channels, built to drive measurable ROI and real business outcomes.",
      },
      {
        icon: "PenLine",
        name: "Content & Copywriting",
        body: "Brand voice development, editorial calendars, campaign copy, and thought leadership content that positions you as the authority in your space.",
      },
      {
        icon: "BarChart3",
        name: "Brand Strategy",
        body: "From positioning to visual identity, we help you build the strategic foundation that makes every other marketing effort more powerful.",
      },
    ],
  },

  b2b: {
    eyebrow: "B2B Marketing",
    title: "Marketing that speaks to decision-makers, not just audiences.",
    body: [
      "B2B marketing demands a different level of precision. Your buyers are sophisticated, the sales cycles are longer, and the stakes are higher. At Clarked Strategy, we specialize in B2B demand generation and brand building that moves prospects through the funnel and drives real pipeline growth.",
      "We bridge the gap between brand awareness and revenue, ensuring your company is top of mind when it's time to buy.",
    ],
    industriesLabel: "Industries We Serve",
    industries: ["Technology", "Engineering", "Construction", "Energy", "Nonprofits", "Healthcare"],
    pillars: [
      {
        icon: "Crosshair",
        name: "Account-Based Marketing",
        body: "Hyper-targeted campaigns designed around your ideal customer profile, reaching the right companies and the right contacts within them.",
      },
      {
        icon: "Megaphone",
        name: "Thought Leadership & PR",
        body: "Position your executives and brand as the go-to authority in your industry through earned media, speaking opportunities, and editorial content.",
      },
      {
        icon: "Users",
        name: "LinkedIn & B2B Social",
        body: "Strategic LinkedIn programs, organic content, paid campaigns, and executive brand-building that keep you visible where your buyers live.",
      },
      {
        icon: "TrendingUp",
        name: "Demand Generation",
        body: "Full-funnel campaigns, from awareness to conversion, built to fill your pipeline with qualified prospects and shorten the path to revenue.",
      },
      {
        icon: "FileText",
        name: "Content Marketing",
        body: "White papers, case studies, email sequences, and sales enablement content that educates your buyers and builds confidence in your solution.",
      },
    ],
  },

  approach: {
    eyebrow: "How We Work",
    title: "Strategy first. Execution always.",
    steps: [
      {
        no: "01",
        title: "Discovery",
        body: "We immerse ourselves in your brand, your market, your competitors, and your goals, so every recommendation is grounded in reality.",
      },
      {
        no: "02",
        title: "Strategy",
        body: "We build a tailored roadmap of messaging architecture, channel mix, and campaign cadence, aligned to where your business needs to go.",
      },
      {
        no: "03",
        title: "Execution",
        body: "We execute with precision across every channel: media, digital, social, and beyond, turning strategy into real-world results.",
      },
      {
        no: "04",
        title: "Optimization",
        body: "We track, report, and refine continuously, ensuring your investment compounds over time and your brand keeps gaining ground.",
      },
    ],
  },

  ctaBand: {
    lead: "Ready to get",
    em: "Clarked",
    tail: "? Let's build something remarkable.",
    button: { label: "Start the Conversation", href: "#contact" },
  },

  contact: {
    eyebrow: "Get In Touch",
    title: "Let's talk about your brand.",
    body: "Whether you have a specific challenge in mind or you're just starting to think through your strategy, we'd love to hear from you. No pitch, no pressure, just a real conversation.",
    detailsLabel: { email: "Email", phone: "Phone", location: "Based In" },
    // The deeper 6-step intake offered as an alternative to the quick form.
    discoveryPrompt: "Prefer a deeper dive?",
    discoveryLink: "Start a Discovery Session",
  },

  footer: {
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ],
    copyright: "© 2025 Clarked Strategy LLC. All rights reserved.",
  },
} as const;

export type Site = typeof site;
