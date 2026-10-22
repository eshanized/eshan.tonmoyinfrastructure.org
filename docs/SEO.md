# Technical SEO Specification & Discoverability Guide

**Canonical Production Origin:** `https://eshan.tonmoyinfrastructure.org`  
**Identity:** Eshan Roy (`eshanized`)  
**Publisher:** Tonmoy Infrastructure and Vision

---

## 1. Canonical Domain & Host Standardization

All internal links, sitemap entries, RSS feeds, OpenGraph meta tags, and JSON-LD structured data use the canonical origin:

```
https://eshan.tonmoyinfrastructure.org
```

- **Trailing-slash policy**: False (clean URLs without trailing slash: `/research`, `/journal`, `/projects`).
- **Protocol**: Mandatory HTTPS (enforced via HSTS header and CDN edge policy).
- **Environment Variable**: `NEXT_PUBLIC_SITE_URL="https://eshan.tonmoyinfrastructure.org"`.

---

## 2. URL Migration & Equity Preservation Table

The table below maps historical URLs from the previous portfolio (`https://eshanized.is-a.dev`) and repository sites to their canonical destinations:

| Existing / Historical URL | New Canonical URL | Migration Action | Content Retained & Verified | Status |
| :--- | :--- | :--- | :--- | :--- |
| `https://eshanized.is-a.dev/` | `https://eshan.tonmoyinfrastructure.org/` | 301 Permanent Redirect | Editorial introduction, flagship projects, positioning | Active Target |
| `https://eshanized.is-a.dev/#m31a` | `https://eshan.tonmoyinfrastructure.org/projects/m31a` | 301 / Deep Link | Full M31A architecture, DAG runner, Ratatui TUI | Verified |
| `https://eshanized.is-a.dev/#snigdha-os` | `https://eshan.tonmoyinfrastructure.org/projects/snigdha-os` | 301 / Deep Link | Arch Linux distribution ecosystem, kernel switcher | Verified |
| `https://eshanized.is-a.dev/#portfolio` | `https://eshan.tonmoyinfrastructure.org/projects` | 301 / Deep Link | 10 verified projects: Polaris, Veda, Octate, SLMGen, etc. | Verified |
| `https://eshanized.is-a.dev/#philosophy` | `https://eshan.tonmoyinfrastructure.org/about` | 301 / Deep Link | 9 engineering principles and systems invariants | Verified |
| `https://eshanized.is-a.dev/#contact` | `https://eshan.tonmoyinfrastructure.org/contact` | 301 / Deep Link | Direct PGP/email, verified handles, inquiry guide | Verified |
| `https://eshanized.is-a.dev/sitemap.xml` | `https://eshan.tonmoyinfrastructure.org/sitemap.xml` | 301 Permanent Redirect | Full canonical multi-section sitemap | Verified |
| `https://eshanized.github.io/` | `https://eshan.tonmoyinfrastructure.org/` | Canonical Header + CNAME | All historical narrative chapters upgraded to full publication | Verified |

---

## 3. Structured Data (Schema.org JSON-LD)

The website serializes rich JSON-LD entities on every page without conflicting duplicates:

1. **`Person` Entity (`/#person`)**:
   - `name`: "Eshan Roy"
   - `alternateName`: `["eshanized", "Eshan Roy (eshanized)"]`
   - `worksFor`: Tonmoy Infrastructure and Vision
   - `sameAs`: GitHub (`eshanized`), Hugging Face, Twitter, Crates.io, Snigdha OS, Tonmoy Infrastructure
2. **`WebSite` Entity (`/#website`)**:
   - Canonical home URL, author and publisher pointers to `/#person`.
3. **`ScholarlyArticle` Entity** (`/research/[slug]`):
   - Headline, identifier, abstract, authors with institutional affiliations, version, publication date.
4. **`TechArticle` Entity** (`/journal/[slug]`):
   - Headline, description, author, publication date, category, reading time.
5. **`SoftwareApplication` Entity** (`/projects/[slug]`):
   - Name, tagline, operatingSystem, applicationCategory, codeRepository, offers.

---

## 4. Crawling & Indexing Directives

### `robots.txt`
```txt
User-Agent: *
Allow: /

Host: https://eshan.tonmoyinfrastructure.org
Sitemap: https://eshan.tonmoyinfrastructure.org/sitemap.xml
```

### `sitemap.xml`
- Auto-generated during static export with actual content publication / modification dates (`lastmod`).
- Zero draft items or private staging URLs.
- Change frequency and priority calibrated by section depth.

---

## 5. Webmaster Tools Verification

### Google Search Console
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Choose **URL prefix**: `https://eshan.tonmoyinfrastructure.org`.
3. Recommended verification method: **DNS TXT Record** on `tonmoyinfrastructure.org` zone:
   - Host: `eshan` (or `@` if using domain property)
   - Value: `google-site-verification=XXXXXXXXXXXXXXXXXXXX`
4. Alternative verification: Meta tag in `app/layout.tsx` or HTML verification file in `public/`.
5. Submit sitemap: Navigate to **Sitemaps** > Enter `https://eshan.tonmoyinfrastructure.org/sitemap.xml` > Submit.

### Bing Webmaster Tools
1. Log in to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Import verified property directly from Google Search Console, or add DNS CNAME / TXT record.
3. Submit sitemap: `https://eshan.tonmoyinfrastructure.org/sitemap.xml`.

---

## 6. RSS & Atom Feeds

For search discovery and news aggregators, three RSS 2.0 feeds are available:
- Combined Publication Feed: `/feed.xml`
- Journal Feed: `/journal-feed.xml`
- Research Feed: `/research-feed.xml`
