# Content Authoring & Publication Workflow

This guide details how to author new research publications, engineering journal articles, and project case studies.

---

## 1. Directory Structure

All content is maintained in structured files:

- **Research Publications:** `content/research/*.mdx`
- **Engineering Journal:** `content/journal/*.mdx`
- **Projects & Systems:** `lib/content/projects-data.ts`
- **Compiled Manifests (Generated):** `lib/content/generated/*.json`

---

## 2. Authoring an Engineering Journal Article

Create a new file in `content/journal/[slug].mdx`:

```mdx
---
slug: "your-article-slug"
title: "Article Title Here"
description: "A concise 2-sentence description of the article."
date: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
category: "Systems Engineering" # One of: Systems Engineering, Autonomous Agents, Linux Engineering, Rust & Concurrency, Developer Infrastructure, Applied Machine Learning
tags: ["rust", "systems", "concurrency"]
featured: false # Set true to feature on homepage
draft: false    # Set true while drafting; excluded from production builds
relatedProjectSlug: "m31a" # Optional slug of associated project
author:
  name: "Eshan Roy"
  role: "Principal Systems Architect"
  affiliation: "Tonmoy Infrastructure and Vision"
  url: "https://eshan.tonmoyinfrastructure.org"
  handle: "eshanized"
references:
  - id: "1"
    title: "Reference Paper or Book"
    authors: ["Author Name"]
    year: 2026
    venue: "Journal Name"
    url: "https://example.com"
---

## 1. Heading Two

Your article markdown content goes here.
```

---

## 3. Authoring a Research Publication

Create a new file in `content/research/[slug].mdx`:

```mdx
---
slug: "your-paper-slug"
title: "Full Academic or Technical Title"
identifier: "TIV-RES-2026-005"
type: "Technical Report" # One of: Research Framework, Technical Report, Systems Experiment, Applied ML Report, Architecture Specification
status: "Published"      # One of: Draft, Work in Progress, Technical Report, Published, Archived
area: "Autonomous Systems" # One of: Autonomous Systems, Systems Engineering, Applied Machine Learning, Developer Infrastructure, Operating Systems
date: "YYYY-MM-DD"
version: "1.0"
featured: true
draft: false
projectSlug: "m31a"
repositoryUrl: "https://github.com/eshanized/M31A"
abstract: "A rigorous 100-250 word summary of the paper."
authors:
  - name: "Eshan Roy"
    role: "Principal Systems Architect"
    affiliation: "Tonmoy Infrastructure and Vision"
    url: "https://eshan.tonmoyinfrastructure.org"
    handle: "eshanized"
tags: ["autonomous systems", "runtime"]
bibtex: |
  @techreport{roy2026example,
    title={Full Title},
    author={Roy, Eshan},
    institution={Tonmoy Infrastructure & Vision},
    year={2026}
  }
references:
  - id: "1"
    title: "Prior Art Title"
    authors: ["Author Name"]
    year: 2025
    url: "https://example.com"
---

## 1. Introduction

Full text of the technical paper.
```

---

## 4. Adding or Updating a Project

Add a new object to `PROJECTS_DATA` in `lib/content/projects-data.ts` following `ProjectCaseStudySchema`:

```typescript
{
  slug: "new-system",
  name: "System Name",
  tagline: "One line value proposition",
  category: "Autonomous Systems",
  status: "active",
  statusLabel: "v0.1.0 · Active",
  featured: false,
  primaryLanguage: "Rust",
  languages: ["Rust", "POSIX"],
  repoUrl: "https://github.com/eshanized/new-system",
  summary: "Comprehensive summary...",
  problemStatement: "Problem description...",
  intendedAudience: "Target users...",
  architectureHighlight: "Mental model...",
  verifiedFeatures: ["Feature 1", "Feature 2", "Feature 3"],
  technicalDecisions: [
    { decision: "Decision 1", rationale: "Rationale 1" },
    { decision: "Decision 2", rationale: "Rationale 2" }
  ],
  tradeoffsAndLimitations: ["Trade-off 1", "Trade-off 2"],
  techStack: ["Rust", "Tokio", "SQLite"],
  verificationEvidence: "Verification proof..."
}
```

---

## 5. Local Preview & Publishing

1. **Compile & Preview Locally:**
   ```bash
   pnpm run dev
   ```
   Open `http://localhost:3000` to review formatting, typography, and table of contents.

2. **Validate Before Publishing:**
   ```bash
   pnpm run typecheck
   pnpm run lint
   pnpm test
   ```

3. **Deploy:**
   Commit changes and push to `main`:
   ```bash
   git add content/
   git commit -m "feat(journal): add new article on systems architecture"
   git push origin main
   ```
