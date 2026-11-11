import type { ImageMetadata } from "astro";
import hiveLimitTicket from "../assets/hive-terminal/limit-order-ticket.png";
import hiveMarketAnswer from "../assets/hive-terminal/market-answer.png";
import hiveRecurringDraft from "../assets/hive-terminal/recurring-buy-draft.png";
import hiveRobinhoodDiscover from "../assets/hive-terminal/robinhood-discover.png";

export type CaseStudy = {
  slug: string;
  index: string;
  kicker: string;
  title: string;
  shortTitle: string;
  summary: string;
  timeframe: string;
  role: string;
  proof: Array<{ value: string; label: string }>;
  disciplines: string[];
  problem: string[];
  response: Array<{ label: string; title: string; body: string }>;
  screens?: Array<{ image: ImageMetadata; alt: string; title: string; caption: string }>;
  comparison?: {
    title: string;
    intro: string;
    rows: Array<{ request: string; before: string; after: string }>;
  };
  outcome: string[];
  boundaries: string[];
  reflection?: { title: string; paragraphs: string[] };
  visual: "terminal" | "reliability" | "agent";
};

export const featuredProjects = [
  {
    index: "01",
    kind: "Startup product",
    name: "Hive Terminal",
    title: "An AI trading agent with guarded autonomous execution.",
    description:
      "A non-custodial AI trading terminal for Hyperliquid and Robinhood Chain, now in an invite-only pilot. The agent researches markets with live data and drafts trades. Typed code, not the model, authorizes every action. I built most of the agent's grounding and evals, the autonomous execution layer, and the Robinhood Chain trading stack.",
    facts: ["Invite-only pilot", "47 of 48 eval samples pass", "TLA+ model of the order relay"],
    links: [{ label: "Read the case study", href: "/work/trading-terminal/", external: false }],
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
    kicker: "AI agent · Fintech · 2026–Now",
    title: "An AI trading agent where code, not the model, authorizes every trade.",
    shortTitle: "Hive Terminal",
    summary:
      "A non-custodial AI trading terminal in an invite-only pilot. An agent researches Hyperliquid and Robinhood Chain markets with live data and drafts trades. A separate execution layer runs the orders and automations users authorize, without them present.",
    timeframe: "Invite-only pilot",
    role: "Engineer on a team of three",
    proof: [
      { value: "47 / 48", label: "Live eval samples pass (16 cases, 3 runs each)" },
      { value: "3.4M", label: "States checked in a TLA+ model of the order relay" },
      { value: "~130 / 192", label: "Merged backend and frontend PRs that I wrote" },
    ],
    disciplines: [
      "LLM tool calling",
      "Agent evaluation",
      "TypeScript",
      "Next.js",
      "NestJS",
      "TLA+",
      "Wallet signing",
    ],
    problem: [
      "Traders move between venue dashboards, read different data formats, and turn an idea into order parameters by hand. Hive Terminal brings research and order preparation into one conversation across two venues: Hyperliquid and Robinhood Chain, an Ethereum L2 with tokens, NFTs and tokenized stocks.",
      "It began in February 2026 as an MVP built in about three weeks for founder testing. Since then it has added autonomous execution: recurring, timed and price-triggered trades, plus limit and stop orders that fill while the user is away.",
      "That made one rule central to the design: the model interprets and explains, and typed code authorizes every action. Model output never moves funds by itself.",
    ],
    response: [
      {
        label: "01 / Route",
        title: "Deterministic routing first, the LLM second.",
        body: "Known commands like “limit buy $25 of ETH at 2000” go to typed parsers and open the same ticket every time. Questions go to the agent. When the agent can't do something, it answers with the exact command to type instead of pretending to act.",
      },
      {
        label: "02 / Draft",
        title: "Drafts, never actions.",
        body: "Agent tools return quotes and drafts that the user signs in their wallet. The prompt forbids claiming that an order exists unless a tool result confirms it, and a cleanup pass strips offers the agent can't fulfil.",
      },
      {
        label: "03 / Ground",
        title: "Prefetch context, because the model skipped its tools.",
        body: "In pilot QA the model reused old numbers on follow-ups, once quoting SOL at $204 when it traded at $108, and ignored instructions to call a tool. The backend now detects the coins, categories and portfolio questions in each message and attaches fresh data before the model runs. It skips this for direct trade instructions, where I measured that injected data made the model describe drafts it never created.",
      },
      {
        label: "04 / Bound",
        title: "A bounded loop that always answers.",
        body: "Each request gets at most three tool rounds, then a final round with no tools, so it always ends in an answer. Tool failures go back to the model as errors instead of failing the request.",
      },
      {
        label: "05 / Guard",
        title: "Autonomy behind server-side policy.",
        body: "Automations sign with a scoped agent wallet whose key is encrypted at rest and revocable by the user. Each run re-checks trade size, balance, slippage, daily limits, pending jobs and an emergency pause, then fetches a fresh quote. If any check fails, nothing is sent.",
      },
      {
        label: "06 / Split",
        title: "Split trust for onchain orders.",
        body: "Hive's relay decides when a stop order fires, after the price holds past the trigger. An onchain contract enforces the user's signed worst price, so the relay can't fill below it. The relay journals each transaction before sending and fails over to a second RPC provider.",
      },
    ],
    screens: [
      {
        image: hiveMarketAnswer,
        alt: "Hive Terminal chat answering “sol vs hype this week, which looks stronger?” with a table of 7-day and 30-day changes, ranges and funding, followed by a written read and suggested commands.",
        title: "A grounded research answer",
        caption: "The backend attaches a 7-day and 30-day snapshot before the model runs. The answer matches the question's timeframe, converts funding into a yearly rate and a daily cost, gives a lean, and ends with commands the user can type.",
      },
      {
        image: hiveRecurringDraft,
        alt: "A recurring-buy draft listing eight Monday purchases of $20 of ETH, with a review card and a Connect to automate button.",
        title: "A recurring buy from plain English",
        caption: "“buy $20 of eth every monday for 2 months starting next week” becomes a validated schedule of 8 buys with resolved dates. Nothing runs until the user authorizes the delegated wallet.",
      },
      {
        image: hiveLimitTicket,
        alt: "A limit-order ticket for $25 of ETH at a 2000 USDC limit, prefilled with a live reference price and a Connect wallet button.",
        title: "Deterministic routing",
        caption: "A typed “limit buy $25 of ETH at 2000” skips the model and opens the limit-order ticket, prefilled with a live reference price. The user signs it in their wallet.",
      },
      {
        image: hiveRobinhoodDiscover,
        alt: "The Discover panel ranking Robinhood Chain NFT collections beside an agent answer that compares the NVDA and AMD stock tokens.",
        title: "The Robinhood Chain agent",
        caption: "Comparing two tokenized stocks with live data, beside the Discover rankings that ground it. The answer names the liquidity risk and what would change its read.",
      },
    ],
    comparison: {
      title: "Before and after, on real failures.",
      intro: "Same model, live data. Each row is a real failure from the pilot or founder QA, now a case in the multi-turn eval harness.",
      rows: [
        {
          request: "why is hype dumping today",
          before: "“I can't tell without live data… want me to run the scanner?”",
          after: "Day and week change, position in the 24h range, funding, and the next level to watch.",
        },
        {
          request: "sol vs hype this week",
          before: "24h numbers presented as weekly.",
          after: "7-day changes and ranges, a funding read, and a lean plus what would change it.",
        },
        {
          request: "if eth dips under 2400 buy me $25 worth",
          before: "“Conditional buys aren't supported.”",
          after: "Checks the price and gives the exact command: limit buy $25 of ETH at 2400.",
        },
        {
          request: "buy $20 of eth every monday for 2 months starting next week",
          before: "Asks for an ISO timestamp.",
          after: "A weekly draft of 8 buys with resolved start and end dates.",
        },
        {
          request: "The founder's 8-question Robinhood Chain chat",
          before: "0 of 8 turns fetched data. Invented token tables.",
          after: "Every turn grounded in Discover, project data or the wallet.",
        },
      ],
    },
    outcome: [
      "Wrote about 50 of 72 merged backend PRs and 79 of 120 frontend PRs. My areas: agent quality, autonomous execution on Hyperliquid, and nearly all of the Robinhood Chain trading stack.",
      "Built the agent's first eval harness: 16 versioned first-decision cases with deterministic scoring (47 of 48 live samples pass), plus a multi-turn harness I grew from 31 to 46 scripted conversations, including replays of real failing pilot chats.",
      "Wrote a TLA+ model of the relay's transaction journal. It checked 3.4M states, caught 5 deliberately broken variants, and found a nonce-reuse race under RPC lag that a follow-up PR fixed.",
      "Verified the order path in production with a real wallet: a live fill, a fee that matched the onchain receipt, an automatic refund of the unused fee, and notifications in the app and on Telegram.",
      "Built tooling so AI coding agents can check their own work: a skill that runs the full local stack and drives the real UI in a headless browser, and one that maps the TLA+ model to code and flags drift. The screenshots above came from the first.",
    ],
    boundaries: [
      "My teammate built the original agent scaffold and first Hyperliquid tool clients, durable automation persistence and the job queue, notifications and Telegram delivery, and beta access, service auth, rate limits and health monitoring.",
      "The founder set product direction, designed the UI in a prototype that I ported to production, and ran the production QA that drove my bug list.",
      "Agent tools only return quotes and drafts. Automations run without per-order approval, but only after the user authorizes a scoped agent wallet, and only within server-side policy limits.",
      "It is an invite-only pilot. The evidence here is evals, tests and production checks, not adoption numbers.",
      "Screenshots come from a local build with no wallet connected, using live market data from November 11, 2026.",
    ],
    reflection: {
      title: "Making delegation explicit.",
      paragraphs: [
        "Working on orders made me more careful about the word 'control.' Researching a market and approving a trade give an agent different responsibilities. People need to see which stage they are in, and the code needs to enforce what can happen next.",
        "Manual orders wait for the user to review and sign. Automations have their own authorization and policy limits, with controls to pause or revoke them. I try to make that choice explicit in the interface: what someone is handing over, when they can intervene, and what the product will do.",
        "Grounding taught me the same lesson. Telling the model to use its tools did not make it use them reliably, so I moved that guarantee into the backend. When a behavior matters, I would rather enforce it in code than ask for it in a prompt.",
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
    role: "QA and operations",
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
    role: "Owner and operator",
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
    role: "Co-Founder, Engineering",
    company: "Ordinal Hive",
    description:
      "Started with community and product work, then built much of Hive Terminal, an AI trading agent, while leading production QA and maintaining the startup's systems.",
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
    role: "Engineering Lead",
    company: "LEAP Career Forum",
    description:
      "Led four developers building a nonprofit career platform with React and Django. Also managed hosting and supported community events.",
  },
];
