# Production Deployment & Domain Configuration Guide

**Production Domain:** `https://eshan.tonmoyinfrastructure.org`  
**Host Architecture:** Next.js Static Export (`output: 'export'`)  
**CDN & Edge:** GitHub Pages / Cloudflare / Apache StackCDN

---

## 1. Hosting Architecture & Rationale

The portfolio is compiled as a fully static, pre-rendered production website using Next.js App Router (`output: 'export'`).

### Rationale
- **Zero Server-Side Attack Surface**: No database connection strings, no runtime Node.js vulnerabilities, no remote code execution vectors.
- **Microsecond Time-to-First-Byte (TTFB)**: All 32 pages, feeds, sitemaps, and assets are served directly from global edge caches.
- **Maximum Availability & Resilience**: The static distribution can be hosted on GitHub Pages, Cloudflare Pages, Netlify, or Apache without infrastructure drift.

---

## 2. Environment Variables

Store runtime environment variables in `.env.local` for local development and in your CI/CD repository secrets:

```bash
# Canonical production site origin (no trailing slash)
NEXT_PUBLIC_SITE_URL="https://eshan.tonmoyinfrastructure.org"

# Build environment
NODE_ENV="production"
```

---

## 3. Build & Local Verification Pipeline

Run the verified build commands locally or in CI:

```bash
# 1. Install dependencies using pnpm
pnpm install

# 2. Run static lint check
pnpm run lint

# 3. Strict TypeScript type check
pnpm run typecheck

# 4. Compile content & build production export
pnpm run build

# 5. Execute automated test suite (13 unit & integration tests)
pnpm test
```

The compiled website will be placed into the `out/` directory.

---

## 4. GitHub Pages Deployment

The repository includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

### Deployment Steps
1. Push to the `main` branch:
   ```bash
   git push origin main
   ```
2. GitHub Actions runs:
   - Dependency installation via `pnpm`
   - ESLint and strict TypeScript typechecking
   - Content compilation (`scripts/compile-content.mjs`)
   - Next.js static build (`out/`)
   - Automated unit & integration tests
   - GitHub Pages artifact upload and deployment
3. The custom domain is automatically assigned via `public/CNAME`:
   ```
   eshan.tonmoyinfrastructure.org
   ```

---

## 5. DNS Configuration for `eshan.tonmoyinfrastructure.org`

To route `eshan.tonmoyinfrastructure.org` to the static deployment:

### Option A: GitHub Pages Custom Domain (Recommended)
Configure the following DNS record in the authoritative DNS zone for `tonmoyinfrastructure.org`:

| Record Type | Hostname / Subdomain | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `eshan` | `eshanized.github.io.` | `300` (or Automatic) |

### Option B: Cloudflare / Apache CDN Direct Origin
If proxying through Tonmoy Infrastructure edge nodes:

| Record Type | Hostname / Subdomain | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `eshan` | IP address of edge web server | `300` |
| **AAAA** | `eshan` | IPv6 address of edge web server | `300` |

Configure Apache VirtualHost:
```apache
<VirtualHost *:443>
    ServerName eshan.tonmoyinfrastructure.org
    DocumentRoot /var/www/eshan.tonmoyinfrastructure.org/out
    
    SSLEngine on
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "DENY"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    <Directory /var/www/eshan.tonmoyinfrastructure.org/out>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
        TryFiles $uri $uri.html $uri/ /index.html =404
    </Directory>
</VirtualHost>
```

---

## 6. Production Verification Checklist

Run these commands against the live production origin:

```bash
# 1. Verify HTTP status and HTTPS HSTS header
curl -sIL https://eshan.tonmoyinfrastructure.org

# 2. Verify robots.txt and sitemap reference
curl -sL https://eshan.tonmoyinfrastructure.org/robots.txt

# 3. Verify sitemap.xml returns valid XML
curl -sL https://eshan.tonmoyinfrastructure.org/sitemap.xml | head -n 20

# 4. Verify RSS feed integrity
curl -sL https://eshan.tonmoyinfrastructure.org/feed.xml | head -n 20

# 5. Verify flagship case studies
curl -sIL https://eshan.tonmoyinfrastructure.org/projects/m31a
curl -sIL https://eshan.tonmoyinfrastructure.org/projects/snigdha-os
curl -sIL https://eshan.tonmoyinfrastructure.org/projects/kyro
```

---

## 7. Rollback Procedure

If a deployment contains an error:
1. Revert the commit in Git:
   ```bash
   git revert HEAD
   git push origin main
   ```
2. The GitHub Actions CI/CD pipeline will automatically recompile and deploy the previous known good state within 90 seconds.
3. If using Apache/manual hosting, point the symlink back to the previous release folder:
   ```bash
   ln -sfn /var/www/releases/eshan-prev /var/www/eshan.tonmoyinfrastructure.org/out
   sudo systemctl reload apache2
   ```
