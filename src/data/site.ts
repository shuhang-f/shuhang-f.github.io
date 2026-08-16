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
  visual: "terminal" | "reliability" | "agent";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "trading-terminal",
    index: "01",
    kicker: "AI product · Fintech · 2026",
    title: "From a plain-English request to a wallet-reviewed order.",
    shortTitle: "AI Trading Workspace",
    summary:
      "A workspace for researching live Polymarket and Hyperliquid markets and preparing orders while keeping approval and signing with the user.",
    timeframe: "About three weeks to a working MVP",
    proof: [
      { value: "~3 weeks", label: "Functional MVP for founder testing" },
      { value: "11 cases", label: "Tests for the model's first decision" },
      { value: "2 venues", label: "One normalized research surface" },
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
      "Trading research was spread across separate dashboards, data formats, and order flows. A conversational interface could make that easier, but letting a model approve a financial action would be unsafe.",
      "The product needed to understand plain-English requests while leaving preparation, confirmation, and signing under code-based checks and user control.",
    ],
    response: [
      {
        label: "01 / Interpret",
        title: "Use the model only where rules are not enough.",
        body: "MiniMax reads the request and chooses from an allowed set of tools. TypeScript code handles navigation, market data, and trade steps when rules are safer than inference.",
      },
      {
        label: "02 / Normalize",
        title: "Translate each provider into one shared format.",
        body: "Typed adapters turn different API and SDK responses into shared market, chart, and order formats so the interface behaves consistently across venues.",
      },
      {
        label: "03 / Authorize",
        title: "Keep trade approval outside the model.",
        body: "Manual actions pass through typed validation and explicit confirmation before the connected browser wallet signs. The server prepares intent; it does not hold the user's private key.",
      },
      {
        label: "04 / Evaluate",
        title: "Test the model's first choice.",
        body: "An 11-case test set works across providers and checks tool choice, argument extraction, clarification behavior, and false claims about completed actions. GitHub Actions validates the dataset offline.",
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
      "PostgreSQL, BullMQ, and Redis are part of the team stack; this case covers Shuhang's product, safety, and evaluation work.",
    ],
    visual: "terminal",
  },
  {
    slug: "production-reliability",
    index: "02",
    kicker: "Production operations · QA · 2024–Now",
    title: "Finding failures that testnet missed.",
    shortTitle: "Production Reliability",
    summary:
      "A repeatable process for turning user-reported failures into tests engineers could reproduce, alongside production operations and a zero-data-loss migration.",
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
      "Some user-reported failures could not be recreated through testnet alone. The resulting gap made incidents harder to explain, slower to hand off, and easier to see again.",
      "The team needed a repeatable way to turn an unclear user report into a test engineering could act on, without using production as an uncontrolled test environment.",
    ],
    response: [
      {
        label: "01 / Capture",
        title: "Start with the user's actual failure.",
        body: "Translate reports into a specific sequence, expected behavior, observed behavior, and environmental context instead of forwarding a vague symptom.",
      },
      {
        label: "02 / Reproduce",
        title: "Turn the report into a test case.",
        body: "Recreate the workflow in lower-risk environments first, isolate the failure boundary, and identify where testnet behavior stops matching production reality.",
      },
      {
        label: "03 / Validate",
        title: "Run a small live transaction only when testnet falls short.",
        body: "Use a controlled production check for cases testnet cannot reproduce. The protocol became the team's standard for testnet-to-production gaps.",
      },
      {
        label: "04 / Return",
        title: "Give engineering a reproducible case and verify the fix.",
        body: "Hand off the test steps, confirm the fix, and keep the relevant Sentry and cloud context attached.",
      },
    ],
    outcome: [
      "Established a live-transaction validation protocol adopted as the team standard.",
      "Operated production systems across AWS EC2, OVH Cloud, Render, and Proxmox while managing access for more than ten collaborators.",
      "Executed backups, Docker-volume transfer, wallet and critical-data migration, verification, and secure decommissioning with zero data loss.",
    ],
    boundaries: [
      "Protocol adoption is the supported QA outcome; no measured incident-reduction percentage is claimed.",
      "The team selected the new provider and migration direction. Shuhang executed the migration tasks described here.",
      "A teammate configured Headscale; Shuhang operated remote systems over the resulting mesh.",
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
      { value: "2 models", label: "Quality-first provider fallback" },
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
      "The fastest way to understand an AI assistant's limits was to depend on one. Provider limits, updates, credentials, networking, and failures show up in daily use instead of a staged demo.",
      "The goal is not maximum autonomy. It is a useful daily assistant whose quality, cost, availability, and security can be judged through use.",
    ],
    response: [
      {
        label: "01 / Host",
        title: "Run and maintain it myself.",
        body: "Operate OpenClaw on Hetzner after migrating from DigitalOcean, including Linux maintenance, updates, DNS, OAuth, and continuous troubleshooting.",
      },
      {
        label: "02 / Interface",
        title: "Put the agent where daily work already happens.",
        body: "A Telegram surface and custom English/Mandarin persona make the system useful enough to expose real interaction patterns instead of staged demo prompts.",
      },
      {
        label: "03 / Route",
        title: "Use the best model first, with a cheaper fallback.",
        body: "Claude Opus is the primary model. MiniMax acts as a lower-cost fallback during provider limits or outages, keeping degradation explicit rather than invisible.",
      },
      {
        label: "04 / Harden",
        title: "Fix security mistakes and improve the process.",
        body: "After discovering an API key exposed in shell history, rotate and remove the credential, then tighten the operating practice around secret handling.",
      },
    ],
    outcome: [
      "Uses and maintains a bilingual AI assistant every day instead of treating it as a one-time demo.",
      "Completed a cloud migration while preserving the Telegram-facing workflow.",
      "Built firsthand experience with provider fallback, updates, DNS, OAuth, incident response, and the ongoing cost of self-hosting.",
    ],
    boundaries: [
      "Self-hosting provides control and direct learning, but it also makes patching, secrets, and uptime an operator responsibility.",
      "Fallback improves availability and cost control while accepting a change in model behavior and output quality.",
      "This is a personal setup, not a product used by customers.",
    ],
    visual: "agent",
  },
];

export const selectedBuilds = [
  {
    index: "A",
    name: "TFT Damage Lab",
    type: "Live interactive model",
    description:
      "A bilingual, test-backed ability-damage calculator that exposes every input and intermediate result instead of hiding the model.",
    tags: ["Next.js", "TypeScript", "Vitest", "i18n"],
    live: "https://tft-damage-lab.vercel.app/",
    code: "https://github.com/shuhang-f/TFT_Damage_Lab",
  },
  {
    index: "B",
    name: "CineSphere v2",
    type: "Full-stack rebuild",
    description:
      "A typed React and Flask modernization with MongoDB, CSV import, Docker, and automated tests.",
    tags: ["React 19", "TypeScript", "Flask", "MongoDB"],
    code: "https://github.com/shuhang-f/Cinematic_synergy",
  },
  {
    index: "C",
    name: "LEAP Career Forum v2",
    type: "Community product",
    description:
      "A Django 5.2 rebuild with corrected email authentication, search, discussions, production security settings, and CI.",
    tags: ["Django REST", "PostgreSQL", "Security", "CI"],
    code: "https://github.com/shuhang-f/LEAP-Career-Forum",
  },
];

export const experience = [
  {
    dates: "2023 — Now",
    role: "Co-Founder",
    company: "Ordinal Hive",
    description:
      "AI product delivery, agent evaluation, production QA, infrastructure operations, and customer/community systems at a seed-stage AI and Bitcoin startup.",
  },
  {
    dates: "2024 — 2025",
    role: "Technical Sales & Product Operations Associate",
    company: "Advance Int’l Trading",
    description:
      "Ran a one-person e-commerce operation across sourcing, hardware diagnostics, pricing, fulfillment, and customer support; grew peak monthly revenue from $1K to $6K on roughly ten hours per week.",
  },
  {
    dates: "2023 — 2024",
    role: "IT Specialist & Team Lead",
    company: "LEAP Career Forum",
    description:
      "Led four developers across React, Django REST, infrastructure, Figma collaboration, and user/event operations for a nonprofit career community.",
  },
];

export const capabilityGroups = [
  {
    index: "01",
    title: "Customer & delivery",
    items: ["Problem discovery", "Requirements translation", "Failure reproduction", "Technical walkthroughs", "Cross-functional handoff"],
  },
  {
    index: "02",
    title: "AI systems",
    items: ["LLM tool calling", "Deterministic routing", "Agent evaluation", "Human-in-the-loop flows", "Provider fallbacks"],
  },
  {
    index: "03",
    title: "Product engineering",
    items: ["TypeScript", "Python", "React / Next.js", "Node / NestJS", "Django REST", "PostgreSQL / Redis"],
  },
  {
    index: "04",
    title: "Production operations",
    items: ["GitHub Actions", "Docker", "AWS EC2", "Render", "Linux", "Sentry", "Access control"],
  },
];
