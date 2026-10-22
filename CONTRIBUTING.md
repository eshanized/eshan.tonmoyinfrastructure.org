# Contributing to Eshan Roy's Engineering Portfolio & Publication

Thank you for your interest in contributing to this engineering publication. We maintain strict standards of technical accuracy, empirical evidence, and code quality.

---

## 1. Principles of Contribution

1. **Empirical Accuracy Over Hype**: We document working systems and empirical benchmarks. Never manufacture project metrics, affiliations, or performance statistics.
2. **Strict Type Safety**: All TypeScript must compile without errors using strict mode (`tsc --noEmit`). No `any` used merely to suppress type errors.
3. **WCAG 2.2 AA Accessibility**: All interactive controls, themes, navigation, and code snippets must remain accessible via keyboard and screen readers.
4. **Zero Dead Links**: All internal routes must resolve to valid pages.

---

## 2. Contribution Workflow

1. **Fork and Clone:**
   ```bash
   git clone https://github.com/eshanized/eshan.tonmoyinfrastructure.org.git
   cd eshan.tonmoyinfrastructure.org
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Create a Feature Branch:**
   ```bash
   git checkout -b feat/your-improvement
   ```

4. **Run Verification Commands:**
   Before submitting a pull request, ensure all checks pass:
   ```bash
   pnpm run lint
   pnpm run typecheck
   pnpm run build
   pnpm test
   ```

---

## 3. Reporting Issues & Corrections

If you discover a typo, a factual discrepancy, or an accessibility barrier:
- Submit an issue on GitHub at `https://github.com/eshanized/eshan.tonmoyinfrastructure.org/issues`.
- Or send an email to `m.eshanized@gmail.com`.
