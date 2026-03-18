const TERMS = [
  {
    id: 1,
    term: "Linting",
    emoji: "🔍",
    category: "code-quality",
    categoryLabel: "Code Quality",
    short: "Automatically flag programming errors, bugs, and stylistic issues in source code.",
    detail: "A linter is a static analysis tool that reads your code without executing it and warns you about potential bugs (like using an undefined variable), style violations (like inconsistent indentation), or suspicious constructs. The name comes from the Unix 'lint' tool from 1978.",
    examples: ["ESLint for JavaScript", "Pylint / Flake8 for Python", "RuboCop for Ruby", "golangci-lint for Go"],
    companies: [
      { name: "Google", cls: "g", note: "Uses internal linters enforced in code review (Critique)" },
      { name: "Meta", cls: "m", note: "Lint runs automatically on every diff in Phabricator" },
      { name: "Airbnb", cls: "g", note: "Published the famous eslint-config-airbnb as open source" }
    ]
  },
  {
    id: 2,
    term: "CI — Continuous Integration",
    emoji: "🔄",
    category: "cicd",
    categoryLabel: "CI/CD",
    short: "Automatically build and test code every time a developer pushes a change.",
    detail: "CI means merging developer changes into a shared mainline frequently (at least daily) and running an automated build + test suite on each merge. It catches integration bugs early rather than letting them accumulate until release day. Martin Fowler coined the practice; Google and Amazon popularized it at scale.",
    examples: ["GitHub Actions", "Jenkins", "CircleCI", "GitLab CI", "Google Cloud Build"],
    companies: [
      { name: "Google", cls: "g", note: "Runs billions of test cases per day via TAP (Test Automation Platform)" },
      { name: "Netflix", cls: "n", note: "Every commit triggers a full pipeline including canary analysis" },
      { name: "Amazon", cls: "a", note: "Deploys thousands of times per day using automated CI pipelines" }
    ]
  },
  {
    id: 3,
    term: "CD — Continuous Delivery/Deployment",
    emoji: "🚀",
    category: "cicd",
    categoryLabel: "CI/CD",
    short: "Automatically release every passing build to production (or staging).",
    detail: "Continuous Delivery means the software is always in a releasable state — a human still presses 'deploy'. Continuous Deployment goes one step further: every green build is automatically shipped to users without manual approval. Amazon famously deploys to production every 11.6 seconds on average.",
    examples: ["Spinnaker (Netflix OSS)", "Argo CD", "Flux", "AWS CodeDeploy"],
    companies: [
      { name: "Amazon", cls: "a", note: "Deploy every ~11.6 seconds across all services" },
      { name: "Netflix", cls: "n", note: "Built Spinnaker, now open source, for multi-cloud CD" },
      { name: "Google", cls: "g", note: "Borg-based internal system pushes hundreds of services per hour" }
    ]
  },
  {
    id: 4,
    term: "Code Review",
    emoji: "👀",
    category: "collaboration",
    categoryLabel: "Collaboration",
    short: "A peer examines proposed code changes before they're merged.",
    detail: "Code review is the process of a colleague (or automated tool) reading your diff and providing feedback. It catches bugs, shares knowledge, enforces standards, and improves code quality. At Google every change must be reviewed by at least one other engineer and approved by an owner of the affected code.",
    examples: ["GitHub Pull Requests", "GitLab Merge Requests", "Phabricator (Meta)", "Critique (Google)"],
    companies: [
      { name: "Google", cls: "g", note: "Critique tool; mandatory review by code owner before merge" },
      { name: "Meta", cls: "m", note: "Phabricator (open-sourced); every diff reviewed before landing" },
      { name: "Microsoft", cls: "ms", note: "Azure DevOps pull request policies with required approvers" }
    ]
  },
  {
    id: 5,
    term: "Unit Testing",
    emoji: "🧪",
    category: "testing",
    categoryLabel: "Testing",
    short: "Test individual functions or classes in isolation.",
    detail: "A unit test verifies a single piece of code (a function, method, or class) independently from the rest of the system. Fast to run (milliseconds), easy to pinpoint failures, and form the wide base of the 'testing pyramid'. Google calls for 70% of all tests to be unit tests.",
    examples: ["Jest (JS)", "JUnit (Java)", "pytest (Python)", "Go's testing package"],
    companies: [
      { name: "Google", cls: "g", note: "70/20/10 testing pyramid: 70% unit, 20% integration, 10% E2E" },
      { name: "Netflix", cls: "n", note: "All services must have unit tests before CD can run" }
    ]
  },
  {
    id: 6,
    term: "Integration Testing",
    emoji: "🔗",
    category: "testing",
    categoryLabel: "Testing",
    short: "Test how multiple components work together.",
    detail: "Integration tests verify that separate modules or services interact correctly. Unlike unit tests, they may touch a real database, message queue, or API. They sit in the middle of the testing pyramid: slower and more expensive than unit tests but more realistic.",
    examples: ["Testcontainers", "Spring Boot Test", "Supertest (Node.js)", "pytest with real DB"],
    companies: [
      { name: "Google", cls: "g", note: "Uses 'medium tests' that can make network calls but mock external services" },
      { name: "Amazon", cls: "a", note: "Service-level integration tests gate every release" }
    ]
  },
  {
    id: 7,
    term: "Static Analysis",
    emoji: "📊",
    category: "code-quality",
    categoryLabel: "Code Quality",
    short: "Inspect code for defects without running it.",
    detail: "Static analysis tools read source code or compiled bytecode and find potential bugs, security vulnerabilities, code smells, and dead code — all without ever executing the program. Linting is a lightweight form of static analysis; tools like SonarQube go deeper by tracking metrics like cyclomatic complexity.",
    examples: ["SonarQube", "Coverity", "CodeQL (GitHub)", "Semgrep", "Checkstyle"],
    companies: [
      { name: "Google", cls: "g", note: "Error Prone & Clang-Tidy run on every commit in CI" },
      { name: "GitHub", cls: "gh", note: "CodeQL scans for security vulnerabilities on push" },
      { name: "Microsoft", cls: "ms", note: "SDL (Security Development Lifecycle) mandates static analysis tools" }
    ]
  },
  {
    id: 8,
    term: "Code Coverage",
    emoji: "📈",
    category: "testing",
    categoryLabel: "Testing",
    short: "Percentage of code executed by your test suite.",
    detail: "Coverage measures which lines, branches, or paths in your code are exercised by tests. 80%+ line coverage is a common industry target. Google's internal tools show per-commit coverage changes in code review. High coverage doesn't guarantee correctness, but low coverage reliably signals untested risk.",
    examples: ["Istanbul/nyc (JS)", "coverage.py", "JaCoCo (Java)", "gcov (C/C++)"],
    companies: [
      { name: "Google", cls: "g", note: "Critique shows line-by-line coverage diff on every code review" },
      { name: "Meta", cls: "m", note: "Sapienz automatically generates tests to hit uncovered paths" }
    ]
  },
  {
    id: 9,
    term: "Canary Release",
    emoji: "🐦",
    category: "deployment",
    categoryLabel: "Deployment",
    short: "Roll out a new version to a small slice of users first.",
    detail: "Named after the 'canary in a coal mine', this strategy deploys a new release to 1–5% of traffic. Metrics like error rate, latency, and CPU are monitored. If they look healthy, the rollout continues; if not, it's automatically rolled back before most users are affected.",
    examples: ["Spinnaker automated canary analysis", "AWS CodeDeploy canary", "Kubernetes canary with Argo Rollouts"],
    companies: [
      { name: "Google", cls: "g", note: "All Search/Maps changes go through canary before full rollout" },
      { name: "Netflix", cls: "n", note: "ACA (Automated Canary Analysis) compares canary vs baseline in Spinnaker" },
      { name: "Amazon", cls: "a", note: "One-box deployments: route 1 server's worth of traffic first" }
    ]
  },
  {
    id: 10,
    term: "Feature Flags",
    emoji: "🚩",
    category: "deployment",
    categoryLabel: "Deployment",
    short: "Toggle features on/off at runtime without deploying new code.",
    detail: "Feature flags (aka feature toggles) decouple deployment from release. Code ships to production hidden behind a flag. The feature is then 'turned on' for specific users, regions, or percentages of traffic via a config change — no redeployment required. This enables dark launches, A/B testing, and instant rollbacks.",
    examples: ["LaunchDarkly", "Unleash", "Optimizely", "Split.io", "Growthbook"],
    companies: [
      { name: "Meta", cls: "m", note: "GateKeeper system controls feature rollout to billions of users" },
      { name: "Google", cls: "g", note: "Internal flag system used across Search, YouTube, Gmail" },
      { name: "Netflix", cls: "n", note: "A/B tests every UI change via feature flags before full release" }
    ]
  },
  {
    id: 11,
    term: "Monorepo",
    emoji: "🏰",
    category: "version-control",
    categoryLabel: "Version Control",
    short: "Store all projects/services in a single version-controlled repository.",
    detail: "A monorepo keeps all code for an entire company in one giant repo. This makes cross-service refactors easy (one atomic commit), enforces consistent tooling, and simplifies dependency management. Google's internal repo ('g3') contains over 2 billion lines of code.",
    examples: ["Bazel (build system for monorepos)", "Nx (JS monorepo)", "Turborepo", "Rush"],
    companies: [
      { name: "Google", cls: "g", note: "'g3' — ~2B lines of code, 35,000+ engineers, one repo" },
      { name: "Meta", cls: "m", note: "fbsource monorepo with Watchman & Buck for fast builds" },
      { name: "Microsoft", cls: "ms", note: "Windows is a monorepo; uses GVFS (Git Virtual Filesystem)" }
    ]
  },
  {
    id: 12,
    term: "Trunk-Based Development",
    emoji: "🌳",
    category: "version-control",
    categoryLabel: "Version Control",
    short: "All developers commit directly to 'main' with very short-lived branches.",
    detail: "In TBD, engineers integrate into the main branch at least once a day. Long-lived feature branches are avoided because they accumulate merge conflicts and delay integration. Feature flags hide incomplete features. Google's monorepo enforces TBD — most engineers commit to head, not feature branches.",
    examples: ["Feature flags to hide WIP", "Short-lived branches (<1 day)", "Branch by Abstraction pattern"],
    companies: [
      { name: "Google", cls: "g", note: "Required practice — all 35k engineers commit to trunk" },
      { name: "Meta", cls: "m", note: "fbsource trunk; land changes within hours, not days" },
      { name: "Netflix", cls: "n", note: "Trunk-based with automated canary keeps deploy velocity high" }
    ]
  },
  {
    id: 13,
    term: "Blue/Green Deployment",
    emoji: "🔵",
    category: "deployment",
    categoryLabel: "Deployment",
    short: "Run two identical production environments; swap traffic instantly.",
    detail: "You maintain two identical environments: 'blue' (current live) and 'green' (new version). Deploy to green, run smoke tests, then flip the load balancer. Rollback = flip back to blue. Zero downtime and instant rollback are the key benefits.",
    examples: ["AWS Elastic Beanstalk blue/green", "Kubernetes blue/green with Services", "Spinnaker pipelines"],
    companies: [
      { name: "Amazon", cls: "a", note: "Used for critical services like checkout where zero downtime is mandatory" },
      { name: "Netflix", cls: "n", note: "Used alongside canary for database schema migration safety" }
    ]
  },
  {
    id: 14,
    term: "Infrastructure as Code (IaC)",
    emoji: "⚙️",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    short: "Manage servers, databases, and networks with version-controlled config files.",
    detail: "IaC means defining your infrastructure in code (YAML, HCL, Python) and managing it with the same processes as application code: version control, code review, CI. This makes environments reproducible, prevents config drift, and enables disaster recovery via git clone.",
    examples: ["Terraform", "AWS CloudFormation", "Pulumi", "Ansible", "Chef"],
    companies: [
      { name: "Google", cls: "g", note: "All GCP infra managed by internal equivalent of Terraform" },
      { name: "Netflix", cls: "n", note: "Manages thousands of AWS resources via IaC + immutable infra" },
      { name: "Amazon", cls: "a", note: "Created AWS CDK as programmable IaC (TypeScript/Python)" }
    ]
  },
  {
    id: 15,
    term: "Pre-commit Hooks",
    emoji: "🪝",
    category: "code-quality",
    categoryLabel: "Code Quality",
    short: "Scripts that run automatically before each git commit.",
    detail: "Git hooks let you run scripts at key points in the git workflow. Pre-commit hooks run before a commit is recorded. Common uses: run linters, format code, check for secrets in files, or run fast unit tests. The 'pre-commit' framework (by Google engineers) standardizes managing these hooks.",
    examples: ["pre-commit framework", "Husky (Node.js)", "lint-staged", "lefthook"],
    companies: [
      { name: "Google", cls: "g", note: "Requires gofmt/buildifier to run as pre-commit on all Go/Bazel files" },
      { name: "Meta", cls: "m", note: "Phabricator arc lint acts as a pre-commit check before upload" }
    ]
  },
  {
    id: 16,
    term: "DORA Metrics",
    emoji: "📏",
    category: "metrics",
    categoryLabel: "Metrics",
    short: "4 key metrics that measure software delivery performance.",
    detail: "DevOps Research and Assessment (DORA) identified 4 metrics that predict high-performing engineering teams: (1) Deployment Frequency, (2) Lead Time for Changes, (3) Change Failure Rate, (4) Time to Restore Service. Elite teams deploy multiple times per day with <15 min lead time.",
    examples: ["Measured in Accelerate (book)", "Google Cloud's DORA report", "LinearB", "Sleuth"],
    companies: [
      { name: "Google", cls: "g", note: "DORA research originated inside Google Cloud DevOps team" },
      { name: "Microsoft", cls: "ms", note: "Azure DevOps dashboard includes DORA metrics tracking" }
    ]
  },
  {
    id: 17,
    term: "Shift Left",
    emoji: "⬅️",
    category: "testing",
    categoryLabel: "Testing",
    short: "Move testing, security, and quality checks earlier in development.",
    detail: "On a traditional pipeline (dev → test → staging → prod), problems discovered late are expensive to fix. 'Shift left' means running tests and security scans at the earliest possible stage — in the IDE, on commit, in CI — rather than waiting for a dedicated QA phase.",
    examples: ["SAST in IDE (SonarLint)", "Secrets scanning on commit", "Contract testing in CI"],
    companies: [
      { name: "Google", cls: "g", note: "Error Prone finds bugs at compile time, not runtime" },
      { name: "Microsoft", cls: "ms", note: "SDL Threat Modeling happens during design phase, not after release" }
    ]
  },
  {
    id: 18,
    term: "Chaos Engineering",
    emoji: "💥",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    short: "Deliberately inject failures to find weaknesses before they cause outages.",
    detail: "Chaos engineering means intentionally breaking things in a controlled way — killing servers, slowing network traffic, corrupting data — to see how the system responds. Netflix's Chaos Monkey famously terminates random production instances. The goal: build confidence in resilience before real failures occur.",
    examples: ["Chaos Monkey (Netflix OSS)", "Gremlin", "LitmusChaos", "AWS Fault Injection Simulator"],
    companies: [
      { name: "Netflix", cls: "n", note: "Invented the field; Chaos Monkey, Chaos Kong (kills entire AWS region)" },
      { name: "Amazon", cls: "a", note: "Game Days: scheduled chaos exercises before major events like Prime Day" },
      { name: "Google", cls: "g", note: "DiRT (Disaster Recovery Testing) exercises run annually" }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "What does CI stand for in software development?",
    options: ["Code Inspection", "Continuous Integration", "Compiler Instrumentation", "Code Infrastructure"],
    answer: 1,
    explanation: "CI stands for Continuous Integration — automatically building and testing code every time a developer pushes a change to the shared repository."
  },
  {
    q: "Google's internal repo 'g3' contains roughly how many lines of code?",
    options: ["100 million", "500 million", "2 billion", "10 billion"],
    answer: 2,
    explanation: "Google's monorepo contains approximately 2 billion lines of code used by 35,000+ engineers — all in a single repository."
  },
  {
    q: "A 'canary release' gets its name from:",
    options: ["A yellow warning color in dashboards", "The canary bird used in coal mines as an early warning system", "A Google engineer named Canary", "The song a program 'sings' when it starts"],
    answer: 1,
    explanation: "Coal miners used canaries to detect toxic gas. Similarly, a canary release is a small early deployment that detects problems before they affect all users."
  },
  {
    q: "What is the main goal of a pre-commit hook?",
    options: ["Back up your code before committing", "Run checks (linting, tests) automatically before a commit is recorded", "Send a notification to your team", "Compress the code to save space"],
    answer: 1,
    explanation: "Pre-commit hooks run scripts automatically before git records a commit, catching issues early — like linting errors or accidentally committed secrets."
  },
  {
    q: "In the DORA metrics, 'Change Failure Rate' measures:",
    options: ["How often developers forget to push", "What percentage of deployments cause a production incident", "How many code reviews are rejected", "Server CPU usage after deployment"],
    answer: 1,
    explanation: "Change Failure Rate = percentage of deployments that result in a degraded service or require remediation. Elite teams aim for under 15%."
  },
  {
    q: "What differentiates Continuous Delivery from Continuous Deployment?",
    options: ["Continuous Delivery is for mobile apps only", "Continuous Delivery requires a human approval to release; Deployment is fully automatic", "They are the same thing", "Continuous Deployment skips testing"],
    answer: 1,
    explanation: "Continuous Delivery keeps the software release-ready but a human approves each release. Continuous Deployment removes that gate — every green build ships automatically."
  },
  {
    q: "Feature flags allow teams to:",
    options: ["Mark code with priority tags", "Deploy code to production while keeping features hidden, enabling gradual rollout", "Flag code for deletion", "Enforce code style rules"],
    answer: 1,
    explanation: "Feature flags decouple deployment from release. Code ships hidden behind a flag that can be turned on for specific users without redeploying."
  },
  {
    q: "Netflix's 'Chaos Monkey' is a tool that:",
    options: ["Randomly changes code style", "Randomly terminates production server instances to test resilience", "Generates random test data", "Monitors for unusual user behavior"],
    answer: 1,
    explanation: "Chaos Monkey (part of Netflix's Simian Army) randomly kills production EC2 instances to ensure the system can handle failures gracefully at any time."
  },
  {
    q: "Static analysis inspects code:",
    options: ["While the code is running in production", "Without executing the code", "Only in test environments", "After users report bugs"],
    answer: 1,
    explanation: "Static analysis reads source code or bytecode without executing it, finding bugs, security issues, and code smells early in development."
  },
  {
    q: "In Blue/Green deployment, 'rollback' means:",
    options: ["Rewriting the new version from scratch", "Switching the load balancer back to the previous environment instantly", "Deleting the failed deployment", "Running the old and new versions simultaneously forever"],
    answer: 1,
    explanation: "Blue/Green keeps both environments live. Rollback is instant — just point the load balancer back to the previous (blue) environment."
  },
  {
    q: "Trunk-Based Development requires developers to:",
    options: ["Create a new branch for every ticket, no matter how long it takes", "Commit to the main branch at least once per day with very short-lived branches", "Only commit code on Fridays", "Always squash all commits into one"],
    answer: 1,
    explanation: "TBD minimizes integration pain by having everyone merge to main frequently (daily or more). Feature flags hide incomplete work instead of long-lived branches."
  },
  {
    q: "Google's '70/20/10 testing pyramid' means:",
    options: ["70% manual, 20% automated, 10% exploratory", "70% unit tests, 20% integration tests, 10% end-to-end tests", "70% front-end, 20% back-end, 10% infra tests", "70% passing, 20% flaky, 10% failing is acceptable"],
    answer: 1,
    explanation: "Google recommends 70% of tests be fast unit tests, 20% integration tests, and only 10% slow end-to-end tests — keeping the suite fast and maintainable."
  }
];

const MATCH_PAIRS = [
  { term: "Linting", def: "Automatically catch code style bugs without running the program" },
  { term: "Canary Release", def: "Deploy to 1–5% of users first to detect problems early" },
  { term: "Feature Flag", def: "Toggle features on/off in production without redeploying" },
  { term: "Blue/Green Deploy", def: "Maintain two identical environments; swap traffic to roll back instantly" },
  { term: "Chaos Engineering", def: "Deliberately break production systems to find weaknesses" },
  { term: "Static Analysis", def: "Scan code for bugs and security issues without executing it" },
  { term: "Trunk-Based Dev", def: "All engineers commit to main branch daily, no long-lived branches" },
  { term: "DORA Metrics", def: "4 measurements: deploy frequency, lead time, failure rate, restore time" },
  { term: "Monorepo", def: "Entire company's codebase stored in one version-controlled repository" },
  { term: "IaC", def: "Define servers and networks in code files managed like source code" },
];
