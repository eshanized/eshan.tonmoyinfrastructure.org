import { SITE_CONFIG } from "./site-config.ts";
import type { ResearchPublication, JournalArticle, ProjectCaseStudy } from "../content/schemas.ts";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.canonicalOrigin}/#person`,
    name: SITE_CONFIG.name,
    alternateName: [SITE_CONFIG.handle, "eshanized", "Eshan Roy (eshanized)"],
    url: SITE_CONFIG.canonicalOrigin,
    email: SITE_CONFIG.email,
    jobTitle: SITE_CONFIG.role,
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.organization.name,
      url: SITE_CONFIG.organization.url,
    },
    sameAs: [
      SITE_CONFIG.socialLinks.github,
      SITE_CONFIG.socialLinks.huggingface,
      SITE_CONFIG.socialLinks.twitter,
      SITE_CONFIG.socialLinks.crates,
      SITE_CONFIG.socialLinks.snigdhaOs,
      SITE_CONFIG.socialLinks.tiverse,
      SITE_CONFIG.socialLinks.tonmoy,
      "https://eshanized.is-a.dev",
    ],
    knowsAbout: [
      "Systems Engineering",
      "Autonomous Software Engineering Runtimes",
      "Operating Systems & Linux Kernel",
      "Rust Programming Language",
      "Process Sandboxing (cgroups v2, Seatbelt)",
      "Applied Machine Learning & Small Language Models",
      "Distributed Compute Orchestration",
    ],
    description: SITE_CONFIG.description,
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.canonicalOrigin}/#website`,
    name: SITE_CONFIG.title,
    url: SITE_CONFIG.canonicalOrigin,
    description: SITE_CONFIG.description,
    author: {
      "@id": `${SITE_CONFIG.canonicalOrigin}/#person`,
    },
    publisher: {
      "@id": `${SITE_CONFIG.canonicalOrigin}/#person`,
    },
    inLanguage: "en-US",
  };
}

export function getJournalArticleJsonLd(article: JournalArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_CONFIG.canonicalOrigin}/journal/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    url: `${SITE_CONFIG.canonicalOrigin}/journal/${article.slug}`,
    datePublished: article.date,
    dateModified: article.updatedAt || article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      url: SITE_CONFIG.canonicalOrigin,
    },
    publisher: {
      "@id": `${SITE_CONFIG.canonicalOrigin}/#person`,
    },
    inLanguage: "en-US",
    keywords: article.tags.join(", "),
    articleSection: article.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.canonicalOrigin}/journal/${article.slug}`,
    },
  };
}

export function getResearchPublicationJsonLd(pub: ResearchPublication) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${SITE_CONFIG.canonicalOrigin}/research/${pub.slug}#paper`,
    headline: pub.title,
    description: pub.abstract,
    url: `${SITE_CONFIG.canonicalOrigin}/research/${pub.slug}`,
    datePublished: pub.date,
    dateModified: pub.updatedAt || pub.date,
    version: pub.version,
    author: pub.authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      affiliation: {
        "@type": "Organization",
        name: author.affiliation || SITE_CONFIG.organization.name,
      },
    })),
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.organization.name,
      url: SITE_CONFIG.organization.url,
    },
    inLanguage: "en-US",
    about: pub.area,
    keywords: pub.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.canonicalOrigin}/research/${pub.slug}`,
    },
  };
}

export function getProjectJsonLd(project: ProjectCaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_CONFIG.canonicalOrigin}/projects/${project.slug}#software`,
    name: project.name,
    headline: project.tagline,
    description: project.summary,
    applicationCategory: project.category,
    operatingSystem: "Linux, macOS, POSIX",
    url: `${SITE_CONFIG.canonicalOrigin}/projects/${project.slug}`,
    codeRepository: project.repoUrl,
    author: {
      "@id": `${SITE_CONFIG.canonicalOrigin}/#person`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
