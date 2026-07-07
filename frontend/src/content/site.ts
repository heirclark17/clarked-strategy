/**
 * Single source of truth for all site copy.
 *
 * ⚑ EDIT THIS FILE to make the site say what you want. Everything the visitor
 * reads — headlines, services, process steps, contact details — lives here.
 * The placeholder copy positions Clarked Strategy as a cybersecurity + program
 * strategy consultancy; swap in your real messaging any time.
 */

export const site = {
  name: "Clarked Strategy",
  domain: "clarkedstrategy.com",
  tagline: "Security strategy that moves the business forward.",

  nav: [
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Cybersecurity & Program Strategy",
    title: "Turn security complexity into an executable advantage.",
    subtitle:
      "Clarked Strategy helps leaders translate risk, compliance, and technology objectives into programs that ship — governance that enables growth instead of slowing it down.",
    primaryCta: { label: "Book a consultation", href: "#contact" },
    secondaryCta: { label: "See how we work", href: "#approach" },
    stats: [
      { value: "10+ yrs", label: "Program leadership" },
      { value: "NIST · ISO 27001", label: "Framework fluency" },
      { value: "End-to-end", label: "Strategy to delivery" },
    ],
  },

  services: {
    eyebrow: "What we do",
    title: "Advisory built for measurable outcomes.",
    subtitle:
      "Engagements are scoped to your risk posture and business goals — not a generic checklist.",
    items: [
      {
        title: "Security Program Strategy",
        body: "Stand up or mature a security program with a clear roadmap, governance model, and executive reporting that survives audits and board scrutiny.",
      },
      {
        title: "Risk & Compliance Advisory",
        body: "Navigate NIST CSF, ISO 27001, HIPAA, and FedRAMP with practical control mapping, gap assessments, and remediation you can actually execute.",
      },
      {
        title: "Technical Program Management",
        body: "Break complex security and technology objectives into executable workstreams, aligning cross-functional stakeholders from kickoff to delivery.",
      },
      {
        title: "Vulnerability & Risk Remediation",
        body: "Prioritize findings by real business impact using CVSS-based scoring, then drive timely mitigation across cloud and enterprise systems.",
      },
      {
        title: "Fractional Security Leadership",
        body: "Interim CISO / security-lead capacity to steady a program, brief the board, and build the team you need for what comes next.",
      },
      {
        title: "Executive & Board Enablement",
        body: "Translate technical risk into the language of the business so leadership can make confident, well-informed decisions quickly.",
      },
    ],
  },

  approach: {
    eyebrow: "How we work",
    title: "A deliberate path from ambiguity to results.",
    steps: [
      {
        no: "01",
        title: "Discover",
        body: "We map your current state — risks, controls, stakeholders, and constraints — to understand what actually stands between you and your goals.",
      },
      {
        no: "02",
        title: "Design",
        body: "Together we build a prioritized roadmap with clear ownership, measurable milestones, and governance aligned to the frameworks that matter to you.",
      },
      {
        no: "03",
        title: "Deliver",
        body: "We drive execution across teams, remove blockers, and report progress in terms leadership understands — turning the plan into shipped outcomes.",
      },
      {
        no: "04",
        title: "Sustain",
        body: "We leave behind the structures, metrics, and playbooks your team needs to keep the program resilient long after the engagement ends.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "Strategy grounded in the realities of delivery.",
    body: [
      "Clarked Strategy is an independent advisory practice focused on cybersecurity program management and technology strategy. We partner with organizations that need to move fast without losing control of their risk.",
      "Our work blends hands-on program leadership with framework fluency — NIST, ISO 27001, HIPAA, FedRAMP — so recommendations are never theoretical. Every engagement is built to produce measurable outcomes and to leave your team stronger than we found it.",
    ],
    points: [
      "Outcome-driven engagements with quantifiable impact",
      "Framework-fluent across regulated and federal-aligned environments",
      "Executive communication that builds trust with the board",
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk about what you're trying to build.",
    subtitle:
      "Tell us where you are and where you need to be. We'll follow up within one business day.",
    email: "derrick88clark@yahoo.com",
    location: "Houston, TX · Remote-friendly",
  },

  footer: {
    blurb:
      "Cybersecurity and program strategy advisory for leaders who need to move with confidence.",
  },
} as const;

export type Site = typeof site;
