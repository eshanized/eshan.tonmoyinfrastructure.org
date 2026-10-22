import type { MetadataRoute } from "next";
import { getAllResearch, getAllJournalArticles, getAllProjects } from "@/lib/content/index.ts";
import { SITE_CONFIG } from "@/lib/seo/site-config.ts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.canonicalOrigin;
  const now = new Date("2026-10-22T00:00:00Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Research Publications
  const research = getAllResearch();
  const researchRoutes: MetadataRoute.Sitemap = research.map((pub) => ({
    url: `${baseUrl}/research/${pub.slug}`,
    lastModified: new Date(pub.updatedAt || pub.date),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Journal Articles
  const journal = getAllJournalArticles();
  const journalRoutes: MetadataRoute.Sitemap = journal.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Projects
  const projects = getAllProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...researchRoutes, ...journalRoutes, ...projectRoutes];
}
