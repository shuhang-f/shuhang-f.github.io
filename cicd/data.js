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

// Chinese short descriptions for each term (keyed by term id)
const TERMS_ZH = {
  1: { short: "自动标记代码中的错误、漏洞和风格问题。" },
  2: { short: "每次开发者推送代码时，自动构建并测试。" },
  3: { short: "自动将每个通过构建的版本发布到生产或预发环境。" },
  4: { short: "在合并之前，由同事检查提议的代码变更。" },
  5: { short: "在隔离环境中测试单个函数或类。" },
  6: { short: "测试多个组件协同工作的情况。" },
  7: { short: "在不运行代码的情况下检查代码缺陷。" },
  8: { short: "测试套件执行的代码百分比。" },
  9: { short: "先将新版本发布给少量用户，验证后再全面推广。" },
  10: { short: "在不重新部署代码的情况下，在运行时开关功能。" },
  11: { short: "将所有项目/服务存储在单一版本控制仓库中。" },
  12: { short: "所有开发者直接提交到主干，使用极短生命周期的分支。" },
  13: { short: "运行两套相同的生产环境，通过流量切换实现即时回滚。" },
  14: { short: "用版本控制的配置文件管理服务器、数据库和网络。" },
  15: { short: "在每次 git 提交之前自动运行的脚本。" },
  16: { short: "衡量软件交付效能的 4 个关键指标。" },
  17: { short: "将测试、安全和质量检查提前到开发流程的早期阶段。" },
  18: { short: "主动注入故障，在真实事故发生前发现系统弱点。" },
};

const CATEGORY_LABELS_ZH = {
  'cicd': 'CI/CD',
  'code-quality': '代码质量',
  'testing': '测试',
  'deployment': '部署',
  'version-control': '版本控制',
  'infrastructure': '基础设施',
  'metrics': '指标',
  'collaboration': '协作'
};

const MATCH_PAIRS_ZH = [
  { term: "Linting", def: "无需运行程序即可自动发现代码风格错误" },
  { term: "Canary Release", def: "先向 1–5% 的用户部署新版本，尽早发现问题" },
  { term: "Feature Flag", def: "无需重新部署即可在生产环境中开关功能" },
  { term: "Blue/Green Deploy", def: "维护两套相同环境，通过切换流量实现即时回滚" },
  { term: "Chaos Engineering", def: "故意破坏生产系统以发现潜在弱点" },
  { term: "Static Analysis", def: "不执行代码即可扫描漏洞和代码异味" },
  { term: "Trunk-Based Dev", def: "所有工程师每天提交到主分支，无长期特性分支" },
  { term: "DORA Metrics", def: "4 项指标：部署频率、前置时间、失败率、恢复时间" },
  { term: "Monorepo", def: "整个公司的代码存储在一个版本控制仓库中" },
  { term: "IaC", def: "用像源代码一样管理的配置文件定义服务器和网络" },
];

const QUIZ_QUESTIONS_ZH = [
  {
    q: "CI 在软件开发中代表什么？",
    options: ["代码检查", "持续集成", "编译器插桩", "代码基础设施"],
    answer: 1,
    explanation: "CI 代表持续集成——每次开发者向共享仓库推送代码时，自动构建并测试代码。"
  },
  {
    q: "Google 内部代码库 'g3' 大约包含多少行代码？",
    options: ["1亿行", "5亿行", "20亿行", "100亿行"],
    answer: 2,
    explanation: "Google 的 Monorepo 包含约 20 亿行代码，由 35,000 多名工程师共同使用。"
  },
  {
    q: "“金丝雀发布”的名称来源于：",
    options: ["仪表盘上的黄色警告颜色", "矿工将金丝雀带入煤矿作为早期预警系统", "一位名叫 Canary 的 Google 工程师", "程序启动时发出的鸣叫"],
    answer: 1,
    explanation: "矿工用金丝雀探测有毒气体。同理，金丝雀发布是小范围早期部署，在影响所有用户之前发现问题。"
  },
  {
    q: "提交前钩子的主要目的是什么？",
    options: ["在提交前备份代码", "在提交记录前自动运行检查（如代码检查、测试）", "向团队发送通知", "压缩代码以节省空间"],
    answer: 1,
    explanation: "提交前钩子在 git 记录提交之前自动运行脚本，尽早发现问题——如代码风格错误或意外提交的密钥。"
  },
  {
    q: "在 DORA 指标中，“变更失败率”衡量的是：",
    options: ["开发者忘记推送代码的频率", "导致生产事故的部署比例", "被拒绝的代码审查数量", "部署后服务器的 CPU 使用率"],
    answer: 1,
    explanation: "变更失败率 = 导致服务降级或需要补救措施的部署比例。优秀团队的目标是低于 15%。"
  },
  {
    q: "持续交付与持续部署的主要区别是什么？",
    options: ["持续交付仅适用于移动应用", "持续交付需要人工批准发布；持续部署则完全自动化", "两者完全相同", "持续部署跳过测试"],
    answer: 1,
    explanation: "持续交付保持软件随时可发布，但需人工批准每次发布。持续部署去掉了这道门槛——每个通过的构建都自动上线。"
  },
  {
    q: "特性开关允许团队：",
    options: ["用优先级标签标记代码", "将代码部署到生产同时隐藏功能，实现渐进式发布", "将代码标记为待删除", "强制执行代码风格规则"],
    answer: 1,
    explanation: "特性开关将部署与发布解耦。代码上线后隐藏在开关后面，可针对特定用户启用，无需重新部署。"
  },
  {
    q: "Netflix 的“混沌猴”是什么工具？",
    options: ["随机更改代码风格", "随机终止生产服务器实例以测试系统弹性", "生成随机测试数据", "监控异常用户行为"],
    answer: 1,
    explanation: "混沌猴随机终止生产 EC2 实例，确保系统能在任意时刻优雅处理故障。"
  },
  {
    q: "静态分析在何时检查代码？",
    options: ["代码在生产环境运行时", "不执行代码的情况下", "仅在测试环境中", "用户报告 Bug 后"],
    answer: 1,
    explanation: "静态分析在不执行代码的情况下读取源代码，在开发早期发现 Bug、安全问题和代码异味。"
  },
  {
    q: "在蓝绿部署中，“回滚”意味着：",
    options: ["从头重写新版本", "即时将负载均衡器切换回上一个环境", "删除失败的部署", "永久同时运行新旧两个版本"],
    answer: 1,
    explanation: "蓝绿部署保持两个环境同时运行。回滚只需将负载均衡器切换回之前的（蓝色）环境，非常迅速。"
  },
  {
    q: "主干开发要求开发者：",
    options: ["无论需要多长时间，每个任务都创建新分支", "至少每天向主分支提交一次，使用极短生命周期的分支", "只在周五提交代码", "始终将所有提交压缩为一个"],
    answer: 1,
    explanation: "主干开发通过频繁合并到主分支来减少集成痛苦。特性开关隐藏未完成的工作，代替长期分支。"
  },
  {
    q: "Google 的“70/20/10 测试金字塔”意味着：",
    options: ["70% 手动，20% 自动，10% 探索性测试", "70% 单元测试，20% 集成测试，10% 端到端测试", "70% 前端，20% 后端，10% 基础设施测试", "70% 通过，20% 不稳定，10% 失败是可接受的"],
    answer: 1,
    explanation: "Google 建议 70% 的测试为快速单元测试，20% 为集成测试，仅 10% 为慢速端到端测试。"
  }
];

// UI string translations
const CICD_T = {
  en: {
    'nav-terms': 'Terms', 'nav-match': 'Match Game', 'nav-quiz': 'Quiz',
    'hero-h1': 'Software Engineering<br><span>Best Practices & CI/CD</span>',
    'hero-p': 'Learn the terms that top engineers at Google, Netflix, Amazon, and Meta use every day. Click any card to dig deeper.',
    'btn-match': 'Play Match Game', 'btn-quiz': 'Take the Quiz',
    'stat-terms': 'Key Terms', 'stat-cats': 'Categories', 'stat-cos': 'Companies Featured', 'stat-qs': 'Quiz Questions',
    'section-title': 'All Terms', 'section-sub': 'Click a card to expand the full explanation + real company examples.',
    'filter-all': 'All', 'filter-cicd': 'CI/CD', 'filter-code-quality': 'Code Quality', 'filter-testing': 'Testing',
    'filter-deployment': 'Deployment', 'filter-version-control': 'Version Control',
    'filter-infrastructure': 'Infrastructure', 'filter-metrics': 'Metrics',
    'card-tools': 'Tools/Examples:', 'card-used-at': 'Used at:',
    'index-footer': 'Built to make DevOps concepts approachable. Inspired by Google, Netflix, Amazon, Meta & Microsoft engineering blogs.',
    'game-title': 'Term Matching Game', 'score-lbl': 'Score', 'streak-lbl': 'Streak 🔥',
    'terms-col': 'Terms', 'defs-col': 'Definitions',
    'instr-1': 'Click a <strong>Term</strong> on the left',
    'instr-2': 'Click its <strong>Definition</strong> on the right',
    'instr-3': 'Match all pairs as fast as you can!',
    'instr-pts': '✅ Correct = +10 pts | ❌ Wrong = -3 pts',
    'btn-restart': 'Restart', 'btn-newgame': '↺ New Game', 'btn-takequiz': 'Take the Quiz →',
    'game-footer': 'Match the term to its definition before time runs out!',
    'quiz-title': 'DevOps Knowledge Quiz',
    'quiz-sub': 'Test how well you know CI/CD, linting, deployment strategies, and practices from top engineering teams. 12 questions, one chance to get each right.',
    'choose-diff': 'Choose difficulty:',
    'diff-all': 'All 12', 'diff-all-desc': 'Full quiz',
    'diff-quick': 'Quick 5', 'diff-quick-desc': '5 questions',
    'diff-random': 'Random 8', 'diff-random-desc': 'Shuffled selection',
    'btn-start': 'Start Quiz →', 'btn-retake': 'Retake Quiz',
    'btn-playmatch': 'Play Match Game', 'btn-review': 'Review Terms',
    'lbl-correct': 'Correct', 'lbl-wrong': 'Wrong', 'lbl-accuracy': 'Accuracy',
    'answer-review': 'Answer Review',
    'quiz-footer': 'Quiz covers 12 key DevOps & CI/CD concepts from top engineering teams.',
  },
  zh: {
    'nav-terms': '术语', 'nav-match': '配对游戏', 'nav-quiz': '测验',
    'hero-h1': '软件工程<br><span>最佳实践与 CI/CD</span>',
    'hero-p': '学习 Google、Netflix、Amazon 和 Meta 的顶尖工程师每天使用的术语。点击任意卡片深入了解。',
    'btn-match': '玩配对游戏', 'btn-quiz': '参加测验',
    'stat-terms': '核心术语', 'stat-cats': '分类', 'stat-cos': '收录公司', 'stat-qs': '测验题目',
    'section-title': '所有术语', 'section-sub': '点击卡片展开完整解释和真实公司案例。',
    'filter-all': '全部', 'filter-cicd': 'CI/CD', 'filter-code-quality': '代码质量', 'filter-testing': '测试',
    'filter-deployment': '部署', 'filter-version-control': '版本控制',
    'filter-infrastructure': '基础设施', 'filter-metrics': '指标',
    'card-tools': '工具/示例：', 'card-used-at': '使用公司：',
    'index-footer': '致力于让 DevOps 概念更易理解。灵感来自 Google、Netflix、Amazon、Meta 和 Microsoft 的工程博客。',
    'game-title': '术语配对游戏', 'score-lbl': '分数', 'streak-lbl': '连击 🔥',
    'terms-col': '术语', 'defs-col': '定义',
    'instr-1': '点击左侧的<strong>术语</strong>',
    'instr-2': '点击右侧对应的<strong>定义</strong>',
    'instr-3': '尽快完成所有配对！',
    'instr-pts': '✅ 正确 = +10 分 | ❌ 错误 = -3 分',
    'btn-restart': '重新开始', 'btn-newgame': '↺ 新游戏', 'btn-takequiz': '参加测验 →',
    'game-footer': '在时间用完之前，将术语与定义配对！',
    'quiz-title': 'DevOps 知识测验',
    'quiz-sub': '测验你对 CI/CD、代码检查、部署策略以及顶尖工程团队实践的掌握程度。共 12 道题，每题只有一次机会。',
    'choose-diff': '选择难度：',
    'diff-all': '全部 12 题', 'diff-all-desc': '完整测验',
    'diff-quick': '快速 5 题', 'diff-quick-desc': '5 道题目',
    'diff-random': '随机 8 题', 'diff-random-desc': '随机抽取',
    'btn-start': '开始测验 →', 'btn-retake': '重新测验',
    'btn-playmatch': '玩配对游戏', 'btn-review': '复习术语',
    'lbl-correct': '正确', 'lbl-wrong': '错误', 'lbl-accuracy': '正确率',
    'answer-review': '答题回顾',
    'quiz-footer': '测验涵盖顶尖工程团队的 12 个核心 DevOps 与 CI/CD 概念。',
  }
};

let cicdLang = (localStorage.getItem('cicd-lang') || 'en');
function _T(k) { return (CICD_T[cicdLang] || CICD_T.en)[k] || k; }
function getMatchPairs() { return cicdLang === 'zh' ? MATCH_PAIRS_ZH : MATCH_PAIRS; }
function getQuizQuestions() { return cicdLang === 'zh' ? QUIZ_QUESTIONS_ZH : QUIZ_QUESTIONS; }

document.addEventListener('keydown', () => {
  document.documentElement.classList.add('keyboard-input');
}, { capture: true });

document.addEventListener('pointerdown', () => {
  document.documentElement.classList.remove('keyboard-input');
}, { capture: true });
