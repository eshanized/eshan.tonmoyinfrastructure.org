import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { fileURLToPath } from "url";
import {
  ResearchPublicationSchema,
  JournalArticleSchema,
  ProjectCaseStudySchema,
} from "../lib/content/schemas.ts";
import { PROJECTS_DATA } from "../lib/content/projects-data.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const RESEARCH_DIR = path.join(ROOT_DIR, "content", "research");
const JOURNAL_DIR = path.join(ROOT_DIR, "content", "journal");
const GENERATED_DIR = path.join(ROOT_DIR, "lib", "content", "generated");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eshan.tonmoyinfrastructure.org";

function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

function extractTableOfContents(rawMarkdown) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(rawMarkdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/\*\*/g, "").replace(/`/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ level, text, id });
  }

  return toc;
}

async function markdownToHtml(rawMarkdown) {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(rawMarkdown);
  return processed.toString();
}

async function compileAll() {
  console.log("🔨 [compile-content] Starting content compilation...");

  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // 1. Compile Research Publications
  const researchFiles = fs.existsSync(RESEARCH_DIR)
    ? fs.readdirSync(RESEARCH_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    : [];

  const researchItems = [];
  const researchSlugs = new Set();

  for (const file of researchFiles) {
    const fullPath = path.join(RESEARCH_DIR, file);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const parsed = matter(fileContent);

    const validation = ResearchPublicationSchema.safeParse(parsed.data);
    if (!validation.success) {
      console.error(`❌ Validation failed for research: ${file}`, validation.error.format());
      throw new Error(`Schema validation error in ${file}`);
    }

    const data = validation.data;
    if (researchSlugs.has(data.slug)) {
      throw new Error(`Duplicate research slug: "${data.slug}" in ${file}`);
    }
    researchSlugs.add(data.slug);

    if (data.draft) {
      console.log(`⏩ Skipping draft research: ${data.slug}`);
      continue;
    }

    const html = await markdownToHtml(parsed.content);
    const readingTime = estimateReadingTime(parsed.content);
    const toc = extractTableOfContents(parsed.content);

    researchItems.push({
      ...data,
      rawContent: parsed.content,
      contentHtml: html,
      readingTime,
      toc,
    });
  }

  researchItems.sort((a, b) => b.date.localeCompare(a.date));
  fs.writeFileSync(
    path.join(GENERATED_DIR, "research.json"),
    JSON.stringify(researchItems, null, 2)
  );
  console.log(`✓ Compiled ${researchItems.length} research publications.`);

  // 2. Compile Journal Articles
  const journalFiles = fs.existsSync(JOURNAL_DIR)
    ? fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    : [];

  const journalItems = [];
  const journalSlugs = new Set();

  for (const file of journalFiles) {
    const fullPath = path.join(JOURNAL_DIR, file);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const parsed = matter(fileContent);

    const validation = JournalArticleSchema.safeParse(parsed.data);
    if (!validation.success) {
      console.error(`❌ Validation failed for journal: ${file}`, validation.error.format());
      throw new Error(`Schema validation error in ${file}`);
    }

    const data = validation.data;
    if (journalSlugs.has(data.slug)) {
      throw new Error(`Duplicate journal slug: "${data.slug}" in ${file}`);
    }
    journalSlugs.add(data.slug);

    if (data.draft) {
      console.log(`⏩ Skipping draft article: ${data.slug}`);
      continue;
    }

    const html = await markdownToHtml(parsed.content);
    const readingTime = estimateReadingTime(parsed.content);
    const toc = extractTableOfContents(parsed.content);

    journalItems.push({
      ...data,
      rawContent: parsed.content,
      contentHtml: html,
      readingTime,
      toc,
    });
  }

  journalItems.sort((a, b) => b.date.localeCompare(a.date));
  fs.writeFileSync(
    path.join(GENERATED_DIR, "journal.json"),
    JSON.stringify(journalItems, null, 2)
  );
  console.log(`✓ Compiled ${journalItems.length} journal articles.`);

  // 3. Compile Project Case Studies
  const projectItems = [];
  const projectSlugs = new Set();

  for (const project of PROJECTS_DATA) {
    const validation = ProjectCaseStudySchema.safeParse(project);
    if (!validation.success) {
      console.error(`❌ Validation failed for project: ${project.slug}`, validation.error.format());
      throw new Error(`Schema validation error in project: ${project.slug}`);
    }
    if (projectSlugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: "${project.slug}"`);
    }
    projectSlugs.add(project.slug);
    projectItems.push(validation.data);
  }

  fs.writeFileSync(
    path.join(GENERATED_DIR, "projects.json"),
    JSON.stringify(projectItems, null, 2)
  );
  console.log(`✓ Compiled ${projectItems.length} project case studies.`);

  // 4. Generate Unified Search Index
  const searchIndex = [
    ...researchItems.map((r) => ({
      type: "research",
      title: r.title,
      slug: `/research/${r.slug}`,
      subtitle: `${r.type} · ${r.identifier}`,
      excerpt: r.abstract,
      tags: r.tags,
      date: r.date,
    })),
    ...journalItems.map((j) => ({
      type: "journal",
      title: j.title,
      slug: `/journal/${j.slug}`,
      subtitle: `${j.category} · ${j.readingTime} min read`,
      excerpt: j.description,
      tags: j.tags,
      date: j.date,
    })),
    ...projectItems.map((p) => ({
      type: "project",
      title: p.name,
      slug: `/projects/${p.slug}`,
      subtitle: `${p.category} · ${p.statusLabel}`,
      excerpt: p.summary,
      tags: p.techStack,
      date: "2026-10-01",
    })),
  ];

  fs.writeFileSync(
    path.join(GENERATED_DIR, "search-index.json"),
    JSON.stringify(searchIndex, null, 2)
  );
  console.log(`✓ Generated search index with ${searchIndex.length} items.`);

  // 5. Generate RSS 2.0 Feeds
  generateRssFeeds(journalItems, researchItems);
}

function escapeXml(unsafe) {
  return (unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRssFeeds(journalItems, researchItems) {
  const buildRssXml = (title, description, feedPath, items) => {
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(title)}</title>
  <link>${SITE_URL}</link>
  <description>${escapeXml(description)}</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${SITE_URL}${feedPath}" rel="self" type="application/rss+xml" />
  ${items
    .map(
      (item) => `
  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${SITE_URL}${item.urlPath}</link>
    <guid isPermaLink="true">${SITE_URL}${item.urlPath}</guid>
    <description>${escapeXml(item.description)}</description>
    <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    <author>m.eshanized@gmail.com (Eshan Roy)</author>
  </item>`
    )
    .join("")}
</channel>
</rss>`;
  };

  // 1. Combined Feed
  const combinedItems = [
    ...journalItems.map((j) => ({
      title: `[Journal] ${j.title}`,
      urlPath: `/journal/${j.slug}`,
      description: j.description,
      date: j.date,
    })),
    ...researchItems.map((r) => ({
      title: `[Research] ${r.title}`,
      urlPath: `/research/${r.slug}`,
      description: r.abstract,
      date: r.date,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "feed.xml"),
    buildRssXml(
      "Eshan Roy — Engineering Journal & Research Publications",
      "Systems engineering, autonomous AI coding runtimes, Linux engineering, and open-source infrastructure.",
      "/feed.xml",
      combinedItems
    )
  );

  // 2. Journal Feed
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "journal-feed.xml"),
    buildRssXml(
      "Eshan Roy — Engineering Journal",
      "Technical deep-dives into systems engineering, Rust concurrency, Linux kernels, and AI agents.",
      "/journal-feed.xml",
      journalItems.map((j) => ({
        title: j.title,
        urlPath: `/journal/${j.slug}`,
        description: j.description,
        date: j.date,
      }))
    )
  );

  // 3. Research Feed
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "research-feed.xml"),
    buildRssXml(
      "Eshan Roy — Research Publications & Technical Reports",
      "Peer-reviewed frameworks, systems experiments, and technical reports on autonomous development systems.",
      "/research-feed.xml",
      researchItems.map((r) => ({
        title: r.title,
        urlPath: `/research/${r.slug}`,
        description: r.abstract,
        date: r.date,
      }))
    )
  );

  console.log("✓ Generated XML RSS feeds (/feed.xml, /journal-feed.xml, /research-feed.xml).");
}

compileAll().catch((err) => {
  console.error("Compilation error:", err);
  process.exit(1);
});
