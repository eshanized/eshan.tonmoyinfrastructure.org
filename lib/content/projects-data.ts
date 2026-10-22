import type { ProjectCaseStudy } from "./schemas.ts";

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    slug: "m31a",
    name: "M31A (M31 Autonomous)",
    tagline: "High-assurance autonomous software engineering runtime in terminal.",
    category: "Autonomous Systems",
    status: "active",
    statusLabel: "v0.1.5 · Active Runtime",
    featured: true,
    primaryLanguage: "Rust",
    languages: ["Rust 1.85+", "Ratatui", "SQLite", "POSIX", "NVIDIA NIM"],
    repoUrl: "https://github.com/eshanized/M31A",
    docsUrl: "https://m31a.tonmoyinfrastructure.org",
    websiteUrl: "https://m31a.tonmoyinfrastructure.org",
    releaseUrl: "https://github.com/eshanized/M31A/releases/tag/v0.1.5",
    summary:
      "A Rust-native autonomous software-engineering runtime that executes high-level engineering objectives in your terminal while enforcing non-bypassable policy gates and multi-tier empirical verification.",
    problemStatement:
      "Conventional AI agents execute arbitrary shell commands with ambient credentials, trusting an untrusted LLM to self-police. They frequently cause destructive mutations, leak API secrets, and declare task completion without verifiable proof.",
    intendedAudience:
      "Systems engineers, infrastructure developers, and software teams requiring provably safe, auditable autonomous coding workflows.",
    architectureHighlight:
      "Intelligence is not authority. The LLM acts strictly as an untrusted reasoning engine proposing structured actions; the Rust runtime strictly owns policy evaluation, OS sandboxing (cgroups v2, namespaces, macOS Seatbelt), atomic SQLite checkpoints, and empirical compiler verification passes.",
    verifiedFeatures: [
      "Acyclic DAG Task Planning: Topological wave execution with critical path parallelization",
      "11-Stage Non-Bypassable Policy Gate: Strict ALLOW / DENY / ASK decision matrix",
      "Empirical Verification Engine: Automated compiler diagnostics, test suites, and lint cleanups",
      "Two-Phase Crash Recovery: Atomic SQLite transactions resume safely without work loss",
      "Conversation-First TUI Cockpit: Built on Ratatui with diff inspection and approval prompts",
      "Zero-Leak Telemetry: Automated credential redactor scrubs tokens before persistence",
    ],
    technicalDecisions: [
      {
        decision: "Rust runtime with strict L0–L9 layered architecture",
        rationale: "Ensures that low-level security, sandboxing, and persistence layers never depend on or yield control to higher-level LLM agents or UI modules.",
      },
      {
        decision: "SQLite WAL with two-phase atomic manifest commits",
        rationale: "Guarantees deterministic recovery from sudden crashes or power loss without leaving dirty half-applied repository mutations.",
      },
      {
        decision: "OS-native sandboxing (cgroups v2, namespaces, macOS Seatbelt)",
        rationale: "Enforces true process-level isolation rather than relying on brittle shell string parsing or regex filters.",
      },
    ],
    tradeoffsAndLimitations: [
      "Strict policy gates require human approval for high-risk operations (e.g. out-of-tree file modifications, irreversible git push).",
      "Sandboxing capabilities vary by host OS: full cgroups v2 resource limits are Linux-specific; macOS relies on Seatbelt profiles; Windows uses Job Objects.",
    ],
    techStack: [
      "Rust (Edition 2021 / 1.85+)",
      "Ratatui & Crossterm for terminal UI",
      "SQLite (rusqlite) for atomic transaction persistence",
      "NVIDIA NIM (Nemotron-3-Ultra, Llama-3.3-70b, DeepSeek-R1)",
      "Linux cgroups v2 / POSIX rlimits / macOS Seatbelt",
      "Custom DAG planner with topological wave parallelization",
    ],
    quickstartCommands: [
      "# Clone and build M31A from source",
      "git clone https://github.com/eshanized/M31A.git",
      "cd M31A",
      "cargo build --release",
      "# Run the Ratatui interactive cockpit",
      "./target/release/m31a tui",
    ],
    verificationEvidence:
      "Over 820 deterministic unit and integration tests passing in CI across Linux, macOS, and Windows. Public release v0.1.5 tagged on GitHub.",
    relatedResearchSlug: "empirical-verification-terminal-runtimes",
    relatedJournalSlug: "building-m31a-runtime-architecture",
  },
  {
    slug: "snigdha-os",
    name: "Snigdha OS",
    tagline: "Performance × Elegance: Modern Arch-based Linux ecosystem.",
    category: "Operating Systems",
    status: "rolling",
    statusLabel: "Rolling Release · Active Ecosystem",
    featured: true,
    primaryLanguage: "Rust & Shell",
    languages: ["Linux", "Arch Linux", "Rust", "Shell / Bash", "i3wm", "PKGBUILD"],
    repoUrl: "https://github.com/Snigdha-OS",
    docsUrl: "https://github.com/Snigdha-OS/documentation",
    websiteUrl: "https://github.com/Snigdha-OS",
    releaseUrl: "https://github.com/Snigdha-OS/snigdhaos-core",
    summary:
      "An Arch-based Linux ecosystem engineered for lightweight performance, developer productivity, custom package management, and robust kernel tooling.",
    problemStatement:
      "Modern operating systems are burdened with background bloat, telemetry overhead, and opaque configuration layers that separate developers from low-level systems control.",
    intendedAudience:
      "Linux power users, systems programmers, penetration testers, and developers who demand complete control over their computing stack.",
    architectureHighlight:
      "Modular system architecture spanning minimal base configurations, a kernel switching framework, automated PKGBUILD repositories, and a customized i3wm tiling environment backed by Tonmoy Infrastructure continuous package mirrors.",
    verifiedFeatures: [
      "Modular Core (`snigdhaos-core`): Minimal, highly optimized base operating system footprint",
      "Kernel Switcher (`snigdhaos-kernel-switcher`): Fast tool for toggling between Zen, LTS, and hardened kernels",
      "Blackbox Security Framework: Custom utility suite for penetration testing environments",
      "Snigdha Assistant & Welcome: Streamlined user onboarding and post-install workstation tuning",
      "Automated Packaging: Dedicated PKGBUILD maintenance pipeline for development toolchains",
      "WSL Edition: Native Snigdha OS environment engineered for Windows Subsystem for Linux",
    ],
    technicalDecisions: [
      {
        decision: "Arch Linux base with rolling release updates",
        rationale: "Provides access to the latest upstream Linux kernel releases, hardware drivers, and modern developer toolchains without arbitrary distribution freeze delays.",
      },
      {
        decision: "Rust implementation for core helper utilities",
        rationale: "Replaces brittle shell scripts for kernel toggling and hardware diagnostics with memory-safe, compiled native binaries.",
      },
    ],
    tradeoffsAndLimitations: [
      "Rolling release updates require user familiarity with Arch Linux package management and occasional pacnew file maintenance.",
      "Tiling window manager interface (i3wm) has a learning curve for users accustomed to traditional floating desktop environments.",
    ],
    techStack: [
      "Arch Linux Base with Rolling Release snapshotting",
      "Linux Kernel (Zen / LTS / Custom)",
      "Rust for core system helper utilities",
      "Bash / POSIX Shell for init and automation scripts",
      "i3wm tiling window manager with customized status bar",
      "Tonmoy Infrastructure continuous package mirrors",
    ],
    quickstartCommands: [
      "# Inspect Snigdha OS core repositories",
      "git clone https://github.com/Snigdha-OS/snigdhaos-core.git",
      "# Use the kernel switcher utility",
      "snigdhaos-kernel-switcher --list",
    ],
    verificationEvidence:
      "Active public repositories across GitHub (Snigdha-OS) and GitLab (SnigdhaOS) containing reproducible PKGBUILD manifests, installer scripts, and ISO building recipes.",
    relatedJournalSlug: "snigdha-os-custom-linux-engineering",
  },
  {
    slug: "kyro",
    name: "Kyro",
    tagline: "Local-first autonomous desktop AI agent built with Tauri v2, Rust & React 19.",
    category: "Autonomous Systems",
    status: "active",
    statusLabel: "v0.1.0 · In Development",
    featured: true,
    primaryLanguage: "Rust & TypeScript",
    languages: ["Rust 1.75+", "Tauri v2", "React 19", "TypeScript", "SQLite WAL"],
    repoUrl: "https://github.com/eshanized/Kyro",
    docsUrl: "https://kyro.tonmoyinfrastructure.org/docs",
    websiteUrl: "https://kyro.tonmoyinfrastructure.org",
    releaseUrl: "https://github.com/eshanized/Kyro/releases/tag/v0.1.0",
    summary:
      "A high-performance, local-first autonomous desktop AI agent that bridges natural language reasoning with real computer interaction, zero-trust local privacy, and Model Context Protocol (MCP) integrations.",
    problemStatement:
      "Cloud-wrapped AI assistants upload your sensitive screen captures, clipboard contents, and documents to third-party servers, introducing latency and privacy risks while failing to execute real system workflows.",
    intendedAudience:
      "Engineers, researchers, and privacy-conscious users seeking autonomous desktop automation without third-party data leakage.",
    architectureHighlight:
      "Multi-threaded Rust native core with Tauri v2 and React 19. All conversations, vector embeddings, task histories, and artifacts stay strictly on your local disk in SQLite (WAL mode). API keys and credentials are encrypted using OS Keyring vaults.",
    verifiedFeatures: [
      "Zero-Trust Local Privacy: All task histories and state stored in local SQLite WAL databases",
      "Operating System Keyring Vault: OS-level encryption for API keys and credentials",
      "Screen Understanding: Low-latency local frame capture and vision-language model integration",
      "Model Context Protocol (MCP): Connects with standard MCP servers for local tools and developer workflows",
      "Human-in-the-Loop Verification: Destructive actions require argument-aware user authorization",
    ],
    technicalDecisions: [
      {
        decision: "Tauri v2 + Rust backend rather than Electron",
        rationale: "Reduces memory footprint by 80% (<120MB idle vs >600MB for Electron) while providing direct POSIX API access and memory safety.",
      },
      {
        decision: "Local-first SQLite storage with OS Keyring encryption",
        rationale: "Ensures zero telemetry or confidential file contents ever leave the host machine without explicit operator consent.",
      },
    ],
    tradeoffsAndLimitations: [
      "Desktop vision understanding requires capable local hardware or fast connection to self-hosted/private model endpoints.",
      "Requires OS-level accessibility and screen recording permissions on macOS and Wayland compositors.",
    ],
    techStack: [
      "Rust 1.75+ native backend",
      "Tauri v2 desktop runtime",
      "React 19 & TypeScript frontend",
      "SQLite (WAL mode) with rusqlite",
      "OS Keyring integration (keyring-rs)",
      "Model Context Protocol (MCP) JSON-RPC client",
    ],
    quickstartCommands: [
      "# Clone and run Kyro in development mode",
      "git clone https://github.com/eshanized/Kyro.git",
      "cd Kyro",
      "npm install",
      "npm run tauri dev",
    ],
    verificationEvidence:
      "Public repository at github.com/eshanized/Kyro, official documentation portal at kyro.tonmoyinfrastructure.org, and AppImage releases built on GitHub Actions CI.",
    relatedJournalSlug: "designing-zero-trust-desktop-agents-kyro",
  },
  {
    slug: "runstead",
    name: "Runstead",
    tagline: "Modern operating system for hosting businesses: CRM, billing, and DNS lifecycle.",
    category: "Commercial Software",
    status: "active",
    statusLabel: "Active Development",
    featured: false,
    primaryLanguage: "TypeScript",
    languages: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL"],
    repoUrl: "https://github.com/eshanized/Runstead",
    websiteUrl: "https://tonmoyinfrastructure.org/products",
    summary:
      "A modern, investor-ready SaaS alternative to WHMCS and fragmented hosting management tools, unifying customer management, recurring billing, DNS zones, and support workflows into a single cohesive platform.",
    problemStatement:
      "Traditional web hosting businesses run on legacy PHP systems (such as WHMCS) stitched together with disconnected third-party tools for billing, support ticketing, domain registration, and DNS management.",
    intendedAudience:
      "Hosting providers, infrastructure companies, cloud resellers, and web agencies managing client infrastructure.",
    architectureHighlight:
      "Unified business operating system covering multi-cycle billing, configurable product resource tiers, white-label customer storefronts, and domain DNS zone lifecycle management.",
    verifiedFeatures: [
      "Customer and organization tenancy management",
      "Configurable product catalog with multi-cycle recurring billing",
      "Authoritative DNS zone editor and domain lifecycle tracking",
      "Multi-channel support ticket workflows with staff notes",
      "White-label customer storefronts with real-time branding preview",
      "MRR and customer retention telemetry reporting",
    ],
    technicalDecisions: [
      {
        decision: "Single unified data plane for billing and infrastructure",
        rationale: "Eliminates synchronization errors between payment processing and server provisioning that plague legacy multi-system setups.",
      },
      {
        decision: "Next.js App Router with server-first rendering",
        rationale: "Guarantees sub-second dashboard initial loads and accessible customer checkout flows without client-bundle bloat.",
      },
    ],
    tradeoffsAndLimitations: [
      "Current repository provides the complete frontend architecture and interactive simulation environment; backend infrastructure connectors are staged for private production clusters.",
      "Domain registrar integrations require external API credentials for automated registrar registration and DNS delegation.",
    ],
    techStack: [
      "TypeScript",
      "Next.js App Router",
      "Tailwind CSS",
      "PostgreSQL / Supabase",
    ],
    verificationEvidence:
      "Complete implementation in github.com/eshanized/Runstead with commercial venture positioning under Tonmoy Infrastructure & Vision.",
  },
  {
    slug: "slmgen",
    name: "SLMGen",
    tagline: "Dataset intelligence and fine-tuning infrastructure for Small Language Models.",
    category: "AI & Tooling",
    status: "experimental",
    statusLabel: "Experimental Tooling",
    featured: false,
    primaryLanguage: "TypeScript & Python",
    languages: ["TypeScript", "Python", "PyTorch", "Hugging Face"],
    repoUrl: "https://github.com/eshanized/SLMGen",
    summary:
      "Tooling and pipelines for fine-tuning small language models (SLMs) with dataset analysis, explainable model recommendation, and automated Google Colab notebook synthesis.",
    problemStatement:
      "Fine-tuning compact models (1B–8B parameters) often fails due to bad dataset curation, mismatched hyperparameters, and confusing tooling aimed solely at hyperscalers.",
    intendedAudience:
      "Machine learning engineers, researchers, and indie builders fine-tuning compact language models on consumer or single-GPU hardware.",
    architectureHighlight:
      "Combines an interactive configuration interface with automated Colab notebook generation and dataset validation pipelines.",
    verifiedFeatures: [
      "Dataset Intelligence: Heuristic validation of token distributions and format errors",
      "Model Matching: Explainable scoring for selecting base SLMs (Phi, Llama, Qwen, Gemma)",
      "Automated Colab Artifacts: Ready-to-execute Python notebooks with memory-efficient LoRA/QLoRA recipes",
      "Quantization Configurations: 4-bit and 8-bit NF4 bitsandbytes configurations",
    ],
    technicalDecisions: [
      {
        decision: "Focus on sub-8B parameter models",
        rationale: "Allows practical deployment on edge devices and single developer workstations without multi-million dollar compute budgets.",
      },
      {
        decision: "Heuristic MinHash token deduplication",
        rationale: "Eliminates redundant synthetic sequences before quantization to prevent catastrophic forgetting.",
      },
    ],
    tradeoffsAndLimitations: [
      "Automated notebook generation targets Google Colab and single-node Jupyter environments; distributed multi-node clusters require custom orchestration.",
      "Context window length is bounded by available GPU VRAM (up to 8,192 tokens on 24GB VRAM).",
    ],
    techStack: [
      "TypeScript",
      "Next.js",
      "Python",
      "Hugging Face Transformers & PEFT",
      "Bitsandbytes (QLoRA)",
    ],
    verificationEvidence:
      "Public repository at github.com/eshanized/SLMGen with automated recipe generators.",
    relatedResearchSlug: "parameter-efficient-fine-tuning-slm",
  },
  {
    slug: "polaris",
    name: "Polaris",
    tagline: "Rust-native distributed compute & task orchestration framework.",
    category: "Systems & Infrastructure",
    status: "active",
    statusLabel: "v0.1.0 · crates.io",
    featured: false,
    primaryLanguage: "Rust",
    languages: ["Rust", "Tokio", "Proc Macros", "CLI", "RPC"],
    repoUrl: "https://github.com/eshanized",
    docsUrl: "https://docs.rs/eshanized-polaris",
    summary:
      "A Rust-native distributed task orchestration engine featuring cluster state consensus, declarative procedural macros, and low-latency task scheduling across heterogeneous worker nodes.",
    problemStatement:
      "Writing distributed compute jobs in Rust frequently requires hundreds of lines of boilerplate networking, serialization, and cluster state bookkeeping.",
    intendedAudience:
      "Backend systems engineers building distributed data processing, batch analysis, and worker pipelines in Rust.",
    architectureHighlight:
      "Declarative `#[task]` procedural macros transform standard asynchronous functions into cluster-schedulable jobs with zero boilerplate. The underlying runtime manages node heartbeats, fault tolerance, and work queues.",
    verifiedFeatures: [
      "Declarative Procedural Macros: `#[task]` turns async Rust functions into distributed jobs",
      "Fault-Tolerant Heartbeats: Dynamic worker discovery and dead node failover",
      "Terminal Telemetry CLI: Real-time cluster inspection and batch job submission",
      "Published Crates: Modular crate architecture on crates.io (`eshanized-polaris`, `eshanized-polaris-core`)",
    ],
    technicalDecisions: [
      {
        decision: "Modular crate separation (facade vs core runtime)",
        rationale: "Allows light clients to submit tasks without linking against heavy cluster consensus dependencies.",
      },
      {
        decision: "Asynchronous Tokio engine with zero-copy binary serialization",
        rationale: "Minimizes task packet serialization latency across heterogeneous worker nodes.",
      },
    ],
    tradeoffsAndLimitations: [
      "Targeted at low-latency compute pipelines; large-scale multi-datacenter consensus requires dedicated external coordinators.",
      "Worker nodes must run compatible Rust toolchain builds when executing native binary tasks.",
    ],
    techStack: [
      "Rust (Tokio async runtime)",
      "Syn & Quote (Rust procedural macros)",
      "Crates.io packaging pipeline",
    ],
    verificationEvidence:
      "Published on crates.io as `eshanized-polaris` and documented on docs.rs.",
    relatedJournalSlug: "high-performance-rust-allocators-and-concurrency",
  },
  {
    slug: "veda",
    name: "Veda",
    tagline: "High-performance Rust parallel runtime with adaptive work-stealing.",
    category: "Systems & Infrastructure",
    status: "active",
    statusLabel: "Active Library",
    featured: false,
    primaryLanguage: "Rust",
    languages: ["Rust", "Concurrency", "Work-Stealing", "Lock-Free", "NUMA"],
    repoUrl: "https://github.com/TIVerse/veda-rs",
    summary:
      "A parallel execution runtime in Rust featuring adaptive work-stealing scheduling, lock-free queues, and NUMA-aware thread affinity for compute-intensive pipelines.",
    problemStatement:
      "Standard thread pools bottleneck on task synchronization and cross-core cache invalidation when running millions of micro-tasks across heterogeneous CPU topologies.",
    intendedAudience:
      "Systems programmers writing high-throughput simulation, rendering, and data transformation engines.",
    architectureHighlight:
      "Custom Chase-Lev work-stealing deques combined with NUMA node affinity pinning to keep thread communication within local memory channels.",
    verifiedFeatures: [
      "Adaptive Work-Stealing Scheduling: Minimizes thread contention under uneven task durations",
      "Lock-Free Task Deques: Microsecond-level dispatch latency",
      "NUMA-Aware Affinity: Minimizes cross-socket cache line bouncing",
    ],
    technicalDecisions: [
      {
        decision: "Lock-free deque implementation with atomic primitives",
        rationale: "Eliminates mutex lock contention in critical dispatch loops.",
      },
      {
        decision: "64-byte cache line padding on worker counters",
        rationale: "Prevents false sharing across multi-core CPU architectures.",
      },
    ],
    tradeoffsAndLimitations: [
      "Optimized for compute-bound workloads; heavy I/O tasks should use Tokio or asynchronous runtimes instead.",
      "NUMA thread pinning requires appropriate OS permissions and topology discovery support in the host kernel.",
    ],
    techStack: ["Rust", "Atomic primitives", "POSIX thread affinity", "Benchmark harnesses"],
    verificationEvidence:
      "Public repository in TIVerse organization (`github.com/TIVerse/veda-rs`) with Criterion benchmarks.",
    relatedResearchSlug: "adaptive-work-stealing-numa-rust",
    relatedJournalSlug: "high-performance-rust-allocators-and-concurrency",
  },
  {
    slug: "octate",
    name: "Octate",
    tagline: "Terminal-native AI code-review CLI combining Tree-sitter AST parsing with LLM critics.",
    category: "AI & Tooling",
    status: "active",
    statusLabel: "Active Development",
    featured: false,
    primaryLanguage: "Rust & TypeScript",
    languages: ["Rust", "Tree-sitter", "WASM", "LLMs", "AST Parsing"],
    repoUrl: "https://github.com/eshanized/Octate",
    summary:
      "A terminal-native AI code review CLI that combines local Tree-sitter WASM AST parsing, cross-file reference graphs, and static linter discovery with multi-stage LLM review DAGs and a two-stage critic quality gate.",
    problemStatement:
      "Generic AI code review bots post superficial style comments and hallucinations because they lack whole-repository structural context and AST understanding.",
    intendedAudience:
      "Software engineers and devops leads looking for deterministic, deep code review in terminal and CI workflows.",
    architectureHighlight:
      "Parses diffs into Tree-sitter syntax trees locally before prompting models, grounding code analysis in concrete AST nodes and cross-file symbol references.",
    verifiedFeatures: [
      "Tree-sitter AST Parsing: Syntactic understanding of code modifications",
      "Multi-Stage Critic Gate: Validates comments before reporting to minimize noise",
      "Terminal-Native Diffs: Rich color formatting directly in developer shells",
    ],
    technicalDecisions: [
      {
        decision: "Local Tree-sitter AST parsing before LLM inference",
        rationale: "Prevents LLM hallucinations about code syntax, scope, or missing variables.",
      },
      {
        decision: "Two-stage critic quality gate",
        rationale: "Filters out subjective nitpicks and duplicates before emitting final terminal diff comments.",
      },
    ],
    tradeoffsAndLimitations: [
      "Requires language grammar definitions for each supported programming language.",
      "Large whole-repository cross-file graphs require sufficient local indexing RAM on multi-million line codebases.",
    ],
    techStack: ["Rust", "Tree-sitter", "WASM", "LLM APIs"],
    verificationEvidence:
      "Public repository at github.com/eshanized/Octate.",
    relatedJournalSlug: "deterministic-policy-gates-for-ai-coding",
  },
  {
    slug: "openmail",
    name: "OpenMail",
    tagline: "Modern, beautiful, self-hosted webmail client for organizations.",
    category: "Commercial Software",
    status: "active",
    statusLabel: "Active Project",
    featured: false,
    primaryLanguage: "PHP & TypeScript",
    languages: ["PHP", "Laravel / Livewire", "Tailwind CSS", "IMAP / SMTP"],
    repoUrl: "https://github.com/eshanized/OpenMail",
    summary:
      "A modern, self-hosted webmail client featuring a zero-CLI setup wizard, IMAP/SMTP mail server compatibility, clean typography, and sovereign privacy.",
    problemStatement:
      "Existing open-source webmail clients (Roundcube, Horde) feel dated, clunky on mobile devices, and complex to deploy for non-sysadmin organizations.",
    intendedAudience:
      "Organizations, schools, and self-hosters wanting modern webmail without relying on Big Tech cloud suites.",
    architectureHighlight:
      "Combines modern reactive frontend styling with robust, standard-compliant IMAP/SMTP transport and zero-CLI graphical installation wizard.",
    verifiedFeatures: [
      "Zero-CLI Setup Wizard: Visual web installer for database and mail configuration",
      "Standard IMAP/SMTP Engine: Works with Postfix, Dovecot, and cloud mail servers",
      "Modern Editorial Interface: Fast responsive UI built with Tailwind CSS",
    ],
    technicalDecisions: [
      {
        decision: "Standard IMAP/SMTP RFC compliance",
        rationale: "Ensures compatibility with any existing enterprise or self-hosted mail server without vendor lock-in.",
      },
      {
        decision: "Zero-CLI browser installer with live port probing",
        rationale: "Removes sysadmin configuration friction for non-technical administrators.",
      },
    ],
    tradeoffsAndLimitations: [
      "Designed as a webmail client and UI layer; requires an underlying mail transfer agent (MTA/MDA) for message delivery.",
      "Advanced S/MIME end-to-end encryption requires client-side certificate installation.",
    ],
    techStack: ["PHP", "Livewire", "Tailwind CSS", "IMAP / SMTP protocols"],
    verificationEvidence:
      "Public repository at github.com/eshanized/OpenMail.",
    relatedJournalSlug: "self-hosting-modern-webmail-openmail",
  },
  {
    slug: "i3wm-desktop",
    name: "Linux Desktop & i3 Workstation",
    tagline: "Minimalist, keyboard-driven Linux tiling workflow.",
    category: "Developer Environment",
    status: "stable",
    statusLabel: "Production Environment",
    featured: false,
    primaryLanguage: "Shell",
    languages: ["Shell / Bash", "i3wm", "Polybar / i3status", "Rofi", "Alacritty"],
    repoUrl: "https://github.com/eshanized/i3wm",
    summary:
      "A keyboard-driven Linux workstation configuration tailored for systems development, multi-monitor tiling, low latency, and zero distraction.",
    problemStatement:
      "Modern desktop environments waste GPU cycles and screen space on animations, notifications, and complex window management.",
    intendedAudience:
      "Systems engineers, terminal power users, and developers who write code in Vim/tmux/terminals.",
    architectureHighlight:
      "Deterministic tiling rules, custom status scripts, lightweight compositor rules, and immediate terminal access via hotkeys.",
    verifiedFeatures: [
      "Instant workspace switching and persistent dual-head layout configuration",
      "Minimal system resource footprint (<200MB idle RAM)",
      "Automated dotfile provisioning and shell bootstrap scripts",
    ],
    technicalDecisions: [
      {
        decision: "i3wm over floating window managers",
        rationale: "Eliminates window dragging and resizing, maximizing code screen real estate and keyboard ergonomics.",
      },
      {
        decision: "Alacritty with GPU acceleration and JetBrains Mono",
        rationale: "Provides sub-millisecond input rendering for systems programming sessions.",
      },
    ],
    tradeoffsAndLimitations: [
      "Requires learning keyboard navigation bindings; not suited for mouse-heavy graphical tasks.",
      "Multi-monitor hotplugging requires invoking custom xrandr scripts on dynamic dock connections.",
    ],
    techStack: ["i3wm", "Bash", "X11 / Compositor", "Alacritty / Kitty", "Polybar"],
    verificationEvidence:
      "Public repository at github.com/eshanized/i3wm with detailed config and keybindings.",
    relatedJournalSlug: "snigdha-os-custom-linux-engineering",
  },
];
