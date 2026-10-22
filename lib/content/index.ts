import researchData from "./generated/research.json" with { type: "json" };
import journalData from "./generated/journal.json" with { type: "json" };
import projectsData from "./generated/projects.json" with { type: "json" };
import searchIndexData from "./generated/search-index.json" with { type: "json" };

import type { ResearchPublication, JournalArticle, ProjectCaseStudy } from "./schemas.ts";

export interface SearchIndexEntry {
  type: "research" | "journal" | "project";
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  tags: string[];
  date: string;
}

export function getAllResearch(): (ResearchPublication & { contentHtml: string })[] {
  return researchData as unknown as (ResearchPublication & { contentHtml: string })[];
}

export function getResearchBySlug(slug: string): (ResearchPublication & { contentHtml: string }) | undefined {
  return getAllResearch().find((r) => r.slug === slug);
}

export function getFeaturedResearch(): (ResearchPublication & { contentHtml: string })[] {
  return getAllResearch().filter((r) => r.featured);
}

export function getAllJournalArticles(): (JournalArticle & { contentHtml: string })[] {
  return journalData as unknown as (JournalArticle & { contentHtml: string })[];
}

export function getJournalArticleBySlug(slug: string): (JournalArticle & { contentHtml: string }) | undefined {
  return getAllJournalArticles().find((j) => j.slug === slug);
}

export function getFeaturedJournalArticles(): (JournalArticle & { contentHtml: string })[] {
  return getAllJournalArticles().filter((j) => j.featured);
}

export function getAllProjects(): ProjectCaseStudy[] {
  return projectsData as unknown as ProjectCaseStudy[];
}

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectCaseStudy[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getSearchIndex(): SearchIndexEntry[] {
  return searchIndexData as SearchIndexEntry[];
}
