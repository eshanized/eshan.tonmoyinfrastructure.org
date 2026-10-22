import { z } from "zod";

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const IsoDateSchema = z.string().refine((val) => {
  if (!ISO_DATE_REGEX.test(val)) return false;
  const [yearStr, monthStr, dayStr] = val.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}, {
  message: "Date must be a valid ISO calendar date in YYYY-MM-DD format",
});

export const SlugSchema = z.string()
  .min(2, "Slug must be at least 2 characters")
  .max(128, "Slug cannot exceed 128 characters")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must consist of lowercase alphanumeric words separated by single hyphens");

export const SafeUrlOrPathSchema = z.string().refine((val) => {
  if (!val || typeof val !== "string") return false;
  const trimmed = val.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}, {
  message: "Must be an absolute path starting with / or a valid http/https URL",
});

// Author Schema
export const AuthorSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  affiliation: z.string().optional(),
  url: SafeUrlOrPathSchema.optional(),
  handle: z.string().optional(),
});

// Reference Schema
export const ReferenceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  authors: z.array(z.string()).min(1),
  year: z.union([z.number().int(), z.string()]),
  venue: z.string().optional(),
  url: SafeUrlOrPathSchema.optional(),
});

// Research Publication Schema
export const ResearchPublicationSchema = z.object({
  slug: SlugSchema,
  title: z.string().min(5),
  identifier: z.string().min(3), // e.g. TIV-RES-2026-001 or M31A-SPEC-001
  type: z.enum([
    "Research Framework",
    "Technical Report",
    "Systems Experiment",
    "Applied ML Report",
    "Architecture Specification",
    "Work in Progress",
  ]),
  status: z.enum(["Draft", "Work in Progress", "Technical Report", "Published", "Archived"]),
  area: z.enum([
    "Autonomous Systems",
    "Systems Engineering",
    "Applied Machine Learning",
    "Developer Infrastructure",
    "Operating Systems",
  ]),
  abstract: z.string().min(30),
  date: IsoDateSchema,
  updatedAt: IsoDateSchema.optional(),
  version: z.string().default("1.0"),
  authors: z.array(AuthorSchema).min(1),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  projectSlug: z.string().optional(),
  pdfUrl: SafeUrlOrPathSchema.optional(),
  repositoryUrl: SafeUrlOrPathSchema.optional(),
  datasetUrl: SafeUrlOrPathSchema.optional(),
  bibtex: z.string().optional(),
  references: z.array(ReferenceSchema).default([]),
});

export type ResearchPublication = z.infer<typeof ResearchPublicationSchema> & {
  content: string;
  readingTime: number;
  toc: Array<{ level: number; text: string; id: string }>;
};

// Journal Article Schema
export const JournalArticleSchema = z.object({
  slug: SlugSchema,
  title: z.string().min(5),
  description: z.string().min(20),
  date: IsoDateSchema,
  updatedAt: IsoDateSchema.optional(),
  category: z.enum([
    "Systems Engineering",
    "Autonomous Agents",
    "Linux Engineering",
    "Rust & Concurrency",
    "Developer Infrastructure",
    "Applied Machine Learning",
  ]),
  tags: z.array(z.string()).min(1),
  author: AuthorSchema,
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  coverImage: SafeUrlOrPathSchema.optional(),
  relatedProjectSlug: z.string().optional(),
  references: z.array(ReferenceSchema).default([]),
});

export type JournalArticle = z.infer<typeof JournalArticleSchema> & {
  content: string;
  readingTime: number;
  toc: Array<{ level: number; text: string; id: string }>;
};

// Project Status Enum
export const ProjectStatusSchema = z.enum(["active", "rolling", "stable", "experimental", "maintained", "archived"]);

// Project Case Study Schema
export const ProjectCaseStudySchema = z.object({
  slug: SlugSchema,
  name: z.string().min(2),
  tagline: z.string().min(10),
  category: z.enum([
    "Autonomous Systems",
    "Operating Systems",
    "Systems & Infrastructure",
    "AI & Tooling",
    "Commercial Software",
    "Developer Environment",
  ]),
  status: ProjectStatusSchema,
  statusLabel: z.string().min(2),
  featured: z.boolean().default(false),
  primaryLanguage: z.string().min(1),
  languages: z.array(z.string()).min(1),
  repoUrl: SafeUrlOrPathSchema,
  docsUrl: SafeUrlOrPathSchema.optional(),
  websiteUrl: SafeUrlOrPathSchema.optional(),
  releaseUrl: SafeUrlOrPathSchema.optional(),
  summary: z.string().min(30),
  problemStatement: z.string().min(30),
  intendedAudience: z.string().min(10),
  architectureHighlight: z.string().min(30),
  verifiedFeatures: z.array(z.string()).min(3),
  technicalDecisions: z.array(z.object({
    decision: z.string().min(5),
    rationale: z.string().min(10),
  })).min(2),
  tradeoffsAndLimitations: z.array(z.string()).min(2),
  techStack: z.array(z.string()).min(3),
  quickstartCommands: z.array(z.string()).optional(),
  verificationEvidence: z.string().min(10),
  relatedResearchSlug: z.string().optional(),
  relatedJournalSlug: z.string().optional(),
});

export type ProjectCaseStudy = z.infer<typeof ProjectCaseStudySchema>;
