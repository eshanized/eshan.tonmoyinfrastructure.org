# Eshan Roy (`eshanized`) — Research-First Engineering Portfolio & Publication

> **“I build the systems beneath the software.”**  
> An independent engineering research publication and systems portfolio for **Eshan Roy**, known online as **`eshanized`**.

**Canonical Production Origin:** [`https://eshan.tonmoyinfrastructure.org`](https://eshan.tonmoyinfrastructure.org)  
**Primary Focus:** Systems Engineering, Autonomous AI Coding Systems, Linux Engineering, Developer Infrastructure, and Applied Machine Learning.

---

## 1. Executive Overview

This repository houses the complete source code, technical publications, engineering essays, and project case studies for Eshan Roy. Rather than a generic developer portfolio with marketing gradients, this site is engineered as an **editorial research publication combined with an enterprise systems portfolio**.

### Core Pillars
1. **Research Publications (`/research`)**: Rigorous technical reports and frameworks on autonomous software engineering runtimes, empirical verification, cgroups v2 process sandboxing, and NUMA-aware work-stealing concurrency.
2. **Engineering Journal (`/journal`)**: Architectural deep-dives into M31A, Snigdha OS, Kyro, Tree-sitter AST policy gates, lock-free Rust concurrency, and self-hosted email infrastructure.
3. **Systems Portfolio (`/projects`)**: Ten curated case studies covering flagship systems (M31A, Snigdha OS, Kyro, Runstead, SLMGen, Polaris, Veda, Octate, OpenMail, and i3wm Workstation).
4. **Interactive Runtimes**: Live terminal cockpit simulations for M31A and interactive system dependency topologies directly in the browser.

---

## 2. Technology & Architecture

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19 (Server Components by default)
- **Language**: Strict TypeScript (`tsc --noEmit` clean, zero `any` suppressions)
- **Styling & Design Tokens**: Tailwind CSS 4 with custom editorial variables (dark charcoal default, warm off-white light, signature coral red accent)
- **Theme Engine**: `next-themes` (Zero hydration flash, persisted preference)
- **Content Engine**: MDX / Markdown with `gray-matter`, `remark-gfm`, and Zod frontmatter schema validation
- **Search System**: Client-side instant fuzzy search across all 20 publications and systems (`Cmd+K`)
- **Feeds & SEO**: RSS 2.0 XML feeds (`/feed.xml`, `/journal-feed.xml`, `/research-feed.xml`), canonical XML sitemap with dynamic `lastmod`, and Schema.org JSON-LD (`Person`, `WebSite`, `ScholarlyArticle`, `TechArticle`, `SoftwareApplication`)
- **Static Export**: Pre-rendered to `out/` with zero server runtime dependencies

---

## 3. Directory Layout

```
├── app/
│   ├── about/page.tsx             # Biography & 9 Engineering Principles
│   ├── contact/page.tsx           # Direct verified email & channels
│   ├── journal/                   # Engineering Journal index & [slug]
│   ├── now/page.tsx               # Current verified technical focus
│   ├── privacy/page.tsx           # Zero-telemetry privacy policy
│   ├── projects/                  # Systems Portfolio & [slug] case studies
│   ├── research/                  # Research Papers index & [slug] reading view
│   ├── globals.css                # Editorial styling, tokens, and prose
│   ├── layout.tsx                 # Root layout with JSON-LD & theme provider
│   ├── not-found.tsx              # Editorial 404 with route recovery
│   ├── page.tsx                   # Editorial narrative homepage
│   ├── robots.ts                  # Robots.txt route
│   └── sitemap.ts                 # Dynamic XML sitemap route
├── components/
│   ├── contact/                   # Interactive copy-address contact card
│   ├── icons/                     # Brand SVG icons (GitHub, Twitter)
│   ├── journal/                   # Reading progress indicator
│   ├── layout/                    # Navbar, Footer, SkipLink
│   ├── research/                  # BibTeX citation copy component
│   ├── search/                    # Global search modal (Cmd+K)
│   ├── theme/                     # ThemeProvider & ThemeToggle
│   └── visuals/                   # M31ACockpit, SystemTopology, EcosystemMatrix
├── content/
│   ├── journal/                   # Authored technical articles (.mdx)
│   └── research/                  # Authored research publications (.mdx)
├── docs/
│   ├── AUTHORING.md               # Content authoring workflow
│   ├── DEPLOYMENT.md              # Production deployment & DNS guide
│   └── SEO.md                     # Technical SEO & Discoverability guide
├── lib/
│   ├── content/                   # Zod schemas, project data & typed loaders
│   └── seo/                       # Canonical config & Schema.org JSON-LD generators
├── scripts/
│   └── compile-content.mjs        # Build-time content compiler & feed generator
└── tests/                         # Node native test runner test suite
```

---

## 4. Getting Started Locally

### Prerequisites
- Node.js `20+` or `22+`
- `pnpm` (version `12.11.2` or compatible)

### Development Workflow
```bash
# 1. Clone repository
git clone https://github.com/eshanized/eshan.tonmoyinfrastructure.org.git
cd eshan.tonmoyinfrastructure.org

# 2. Install dependencies
pnpm install

# 3. Start local development server
pnpm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## 5. Quality Assurance & Verification

All checks can be executed with standard npm/pnpm scripts:

```bash
# 1. Run ESLint across application code
pnpm run lint

# 2. Run TypeScript strict typecheck
pnpm run typecheck

# 3. Compile content and build static export (out/)
pnpm run build

# 4. Execute the automated test suite (13 unit & integration tests)
pnpm test
```

### Automated Test Coverage
- `tests/content-schemas.test.mjs`: Zod schema validation across all papers, articles, and projects; draft exclusion invariant.
- `tests/seo-integrity.test.mjs`: Sitemap, robots.txt, canonical origin validation, and RSS feeds.
- `tests/json-ld.test.mjs`: Structured data validation for `Person`, `WebSite`, `ScholarlyArticle`, `TechArticle`, and `SoftwareApplication`.
- `tests/routes-and-links.test.mjs`: Crawls all exported HTML files in `out/` to verify zero broken internal links.

---

## 6. Production Deployment

The website deploys to `https://eshan.tonmoyinfrastructure.org` via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages or directly to an Apache / Cloudflare edge host.

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for complete DNS, server configuration, and rollback procedures.

---

## 7. License

Dual-licensed under the **MIT License** and the **Apache License 2.0** where applicable.
