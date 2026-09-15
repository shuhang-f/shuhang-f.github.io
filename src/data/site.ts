export type CaseStudy = {
  slug: string;
  index: string;
  kicker: string;
  title: string;
  shortTitle: string;
  summary: string;
  timeframe: string;
  proof: Array<{ value: string; label: string }>;
  disciplines: string[];
  problem: string[];
  response: Array<{ label: string; title: string; body: string }>;
  outcome: string[];
  boundaries: string[];
  reflection?: { title: string; paragraphs: string[] };
  visual: "terminal" | "reliability" | "agent";
};

export const featuredProjects = [
  {
    index: "01",
    kind: "Private product",
    name: "Trading Workspace",
    title: "Research markets and review orders in one place.",
    description:
      "I helped build a workspace for Polymarket and Hyperliquid in about three weeks. Users can research markets in plain English, then review and sign manual orders with their wallet. I also built tests for the model's first decision.",
    facts: ["~3 weeks to working MVP", "11-case model test set", "Polymarket + Hyperliquid"],
    links: [{ label: "Read the product case", href: "/work/trading-terminal/", external: false }],
    visual: "trading" as const,
  },
  {
    index: "02",
    kind: "Public project",
    name: "TFT Damage Lab",
    title: "See how a TFT damage calculation works.",
    description:
      "I built this while learning Teamfight Tactics. You can follow the damage calculation from inputs to formulas to results, in English or Chinese.",
    facts: ["Live Next.js app", "English + 中文", "Automated calculation tests"],
    links: [
      { label: "Try the live app", href: "https://tft-damage-lab.vercel.app/", external: true },
      { label: "View the code", href: "https://github.com/shuhang-f/TFT_Damage_Lab", external: true },
    ],
    visual: "tft" as const,
  },
  {
    index: "03",
    kind: "Personal infrastructure",
    name: "OpenClaw at Home",
    title: "A self-hosted AI assistant for everyday use.",
    description:
      "I run a bilingual assistant through Telegram on my own server. Using it day to day has taught me about model quality, updates, credentials, outages, and recovery.",
    facts: ["Daily Telegram use", "English + 中文", "Self-hosted on Hetzner"],
    links: [{ label: "Read the operating story", href: "/work/openclaw-agent-hub/", external: false }],
    visual: "openclaw" as const,
  },
];

export const otherProjects = [
  {
    index: "04", name: "Production Reliability", type: "QA + infrastructure",
    description: "I turned user-reported production failures into reproducible test cases and verified the fixes.",
    href: "/work/production-reliability/", label: "Read case study", external: false,
  },
  {
    index: "05", name: "CineSphere v2", type: "Full-stack rebuild",
    description: "A React and Flask movie platform with typed interfaces, CSV import, MongoDB, and automated tests.",
    href: "https://github.com/shuhang-f/Cinematic_synergy", label: "View code", external: true,
  },
  {
    index: "06", name: "LEAP Career Forum v2", type: "Community product",
    description: "A Django rebuild for a nonprofit community, covering authentication, search, discussions, and deployment settings.",
    href: "https://github.com/shuhang-f/LEAP-Career-Forum", label: "View code", external: true,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "trading-terminal",
    index: "01",
    kicker: "AI product · Fintech · 2026",
    title: "Researching markets and preparing orders in plain English.",
    shortTitle: "AI Trading Workspace",
    summary:
      "Users research live Polymarket and Hyperliquid markets in one workspace. The model prepares manual orders; the user reviews and signs them with a connected wallet.",
    timeframe: "About three weeks to a working MVP",
    proof: [
      { value: "~3 weeks", label: "Functional MVP for founder testing" },
      { value: "11 cases", label: "Tests for the model's first decision" },
      { value: "2 venues", label: "Polymarket and Hyperliquid in one workspace" },
    ],
    disciplines: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "LLM tool calling",
      "Agent evaluation",
      "Wallet signing",
    ],
    problem: [
      "Traders had to move between dashboards, interpret different market-data formats, and turn an idea into order parameters. We wanted them to do that work in one conversation.",
      "That required a clear division of responsibility: the model could interpret requests, while application code validated the steps and users authorized financial actions.",
    ],
    response: [
      {
        label: "01 / Interpret",
        title: "Let the model interpret the request.",
        body: "MiniMax reads the request and chooses from an allowed set of tools. TypeScript code handles navigation, market data, and trade steps when rules are safer than inference.",
      },
      {
        label: "02 / Normalize",
        title: "Translate each provider into one shared format.",
        body: "I used typed adapters to convert API and SDK responses into shared market, chart, and order formats. The interface can then handle both venues consistently.",
      },
      {
        label: "03 / Authorize",
        title: "Keep trade approval outside the model.",
        body: "Manual orders pass through typed validation and user confirmation before the connected browser wallet signs. The server prepares the order without holding the user's private key for that flow.",
      },
      {
        label: "04 / Evaluate",
        title: "Test the model's first choice.",
        body: "I built an 11-case test set that works across providers. It checks tool choice, extracted arguments, requests for clarification, and false claims that an action completed. GitHub Actions validates the dataset offline.",
      },
    ],
    outcome: [
      "Delivered a functional MVP in roughly three calendar weeks for founder testing.",
      "Shipped and maintained the production Next.js application on Render.",
      "Replaced informal prompt checks with a versioned 11-case test set.",
    ],
    boundaries: [
      "The tests score only the model's first decision. They do not run tools or test a trade from start to finish.",
      "Manual trades require wallet confirmation. Separately authorized scheduled automations can execute later within configured policy limits.",
      "The team built the PostgreSQL, BullMQ, and Redis worker infrastructure. My work here covered the product, authorization checks, and model evaluation.",
    ],
    reflection: {
      title: "Making delegation explicit.",
      paragraphs: [
        "Working on orders made me more careful about the word 'control.' Researching a market and approving a trade give an agent different responsibilities. People need to see which stage they are in, and the code needs to enforce what can happen next.",
        "Manual orders wait for the user to review and confirm before the wallet signs. Scheduled automations have separate authorization and policy limits, with controls to pause or revoke them. I now try to make that choice explicit in the interface: what someone is handing over, when they can intervene, and what the product will do.",
      ],
    },
    visual: "terminal",
  },
  {
    slug: "production-reliability",
    index: "02",
    kicker: "Production operations · QA · 2024–Now",
    title: "Finding failures that testnet missed.",
    shortTitle: "Production Reliability",
    summary:
      "I developed a process for reproducing user-reported failures and checking fixes. I also operated the production systems and carried out a migration with zero data loss.",
    timeframe: "Used since 2024",
    proof: [
      { value: "Adopted", label: "Live-transaction protocol became team standard" },
      { value: "0 loss", label: "Critical data preserved during migration" },
      { value: "10+", label: "Collaborators supported across systems" },
    ],
    disciplines: [
      "Customer feedback",
      "Production QA",
      "AWS EC2",
      "Docker",
      "Sentry",
      "Access control",
    ],
    problem: [
      "Some failures reported by users did not occur on testnet. Engineers needed a reproducible case to investigate, and a passing testnet check did not always tell us whether a production fix worked.",
      "We needed a repeatable way to investigate those reports, with controlled live checks for the cases testnet could not reproduce.",
    ],
    response: [
      {
        label: "01 / Capture",
        title: "Start with the user's actual failure.",
        body: "I recorded the steps a user took, what they expected, what happened, and the environment they were using.",
      },
      {
        label: "02 / Reproduce",
        title: "Turn the report into a test case.",
        body: "I reproduced the workflow in lower-risk environments first, narrowed down where it failed, and checked where testnet behaved differently from production.",
      },
      {
        label: "03 / Validate",
        title: "Run a small live transaction only when testnet falls short.",
        body: "For cases testnet could not reproduce, I introduced a controlled live-transaction check. The team adopted the protocol as its standard for these gaps.",
      },
      {
        label: "04 / Return",
        title: "Give engineering a reproducible case and verify the fix.",
        body: "I handed engineering the test steps and relevant Sentry and cloud context, then checked the fix against the reported failure.",
      },
    ],
    outcome: [
      "Established a live-transaction validation protocol adopted as the team standard.",
      "Operated production systems across AWS EC2, OVH Cloud, Render, and Proxmox while managing access for more than ten collaborators.",
      "Executed backups, Docker-volume transfer, wallet and critical-data migration, verification, and secure decommissioning with zero data loss.",
    ],
    boundaries: [
      "The team adopted the QA protocol. I do not have a measured incident-reduction figure.",
      "The team chose the new provider and migration plan. I carried out the backups, transfers, verification, and decommissioning.",
      "A teammate configured Headscale. I used that mesh network to operate remote systems.",
    ],
    visual: "reliability",
  },
  {
    slug: "openclaw-agent-hub",
    index: "03",
    kicker: "Personal infrastructure · Daily use · 2026–Now",
    title: "Using a self-hosted AI assistant every day.",
    shortTitle: "OpenClaw at Home",
    summary:
      "A bilingual AI assistant that runs on my own server and works through Telegram, with a backup model when the main one is unavailable.",
    timeframe: "Used daily on my own server",
    proof: [
      { value: "Daily", label: "Used through a Telegram interface" },
      { value: "2 models", label: "Claude Opus with MiniMax as backup" },
      { value: "EN / 中文", label: "Custom bilingual persona" },
    ],
    disciplines: [
      "OpenClaw",
      "Telegram",
      "Hetzner",
      "Linux",
      "Model routing",
      "Security operations",
    ],
    problem: [
      "I wanted to understand what an AI assistant could do by using one every day. Running it myself also meant dealing with provider limits, updates, credentials, networking, and outages.",
      "I use this setup to judge whether the assistant is useful enough to justify its cost and maintenance, and to learn what it takes to keep it available and secure.",
    ],
    response: [
      {
        label: "01 / Host",
        title: "Run and maintain it myself.",
        body: "I run OpenClaw on Hetzner after moving it from DigitalOcean. I handle Linux maintenance, updates, DNS, OAuth, and troubleshooting.",
      },
      {
        label: "02 / Interface",
        title: "Use it through Telegram.",
        body: "I set up a custom English/Mandarin persona and a Telegram interface, so I can use the assistant in daily conversations.",
      },
      {
        label: "03 / Route",
        title: "Keep a backup model available.",
        body: "Claude Opus is the primary model. When provider limits or outages make it unavailable, MiniMax is the lower-cost backup. That switch also changes the quality and behavior of the responses.",
      },
      {
        label: "04 / Harden",
        title: "Fix security mistakes and improve the process.",
        body: "I found an API key in shell history, rotated it, and removed the exposed value. I also tightened how I handle credentials on the server.",
      },
    ],
    outcome: [
      "Use and maintain a bilingual AI assistant every day.",
      "Completed a cloud migration while preserving the Telegram-facing workflow.",
      "Built firsthand experience with provider fallback, updates, DNS, OAuth, incident response, and the ongoing cost of self-hosting.",
    ],
    boundaries: [
      "I am responsible for patching the server, protecting credentials, and keeping the assistant available.",
      "The backup model costs less, but its responses can differ in quality and behavior.",
      "This setup is for my own daily use and has no customers.",
    ],
    visual: "agent",
  },
];

export const experience = [
  {
    dates: "2023 — Now",
    role: "Co-Founder",
    company: "Ordinal Hive",
    description:
      "Started with community and product work, then built AI features, led production QA, and maintained the startup's systems.",
  },
  {
    dates: "2024 — 2025",
    role: "Technical Sales & Product Operations Associate",
    company: "Advance Int’l Trading",
    description:
      "Ran a part-time e-commerce operation end to end, from sourcing and hardware diagnostics to pricing, fulfillment, and customer support.",
  },
  {
    dates: "2023 — 2024",
    role: "IT Specialist & Team Lead",
    company: "LEAP Career Forum",
    description:
      "Led four developers building a nonprofit career platform with React and Django. Also managed hosting and supported community events.",
  },
];
