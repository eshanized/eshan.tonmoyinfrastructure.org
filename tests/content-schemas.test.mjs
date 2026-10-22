import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  ResearchPublicationSchema,
  JournalArticleSchema,
  ProjectCaseStudySchema,
} from "../lib/content/schemas.ts";
import { PROJECTS_DATA } from "../lib/content/projects-data.ts";

const ROOT_DIR = process.cwd();
const RESEARCH_DIR = path.join(ROOT_DIR, "content", "research");
const JOURNAL_DIR = path.join(ROOT_DIR, "content", "journal");

test("Research publications satisfy Zod schema and have unique valid slugs", () => {
  const files = fs.readdirSync(RESEARCH_DIR).filter((f) => f.endsWith(".mdx"));
  assert.ok(files.length >= 4, "Must have at least 4 research publications");

  const slugs = new Set();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(RESEARCH_DIR, file), "utf-8");
    const parsed = matter(raw);
    const result = ResearchPublicationSchema.safeParse(parsed.data);

    assert.ok(
      result.success,
      `Research paper ${file} failed schema validation: ${JSON.stringify(result.error?.format())}`
    );

    const slug = result.data.slug;
    assert.ok(!slugs.has(slug), `Duplicate slug detected: ${slug}`);
    slugs.add(slug);
    assert.ok(parsed.content.length > 200, `Paper ${file} content is too short`);
  }
});

test("Journal articles satisfy Zod schema and have unique valid slugs", () => {
  const files = fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".mdx"));
  assert.ok(files.length >= 6, "Must have at least 6 journal articles");

  const slugs = new Set();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf-8");
    const parsed = matter(raw);
    const result = JournalArticleSchema.safeParse(parsed.data);

    assert.ok(
      result.success,
      `Journal article ${file} failed schema validation: ${JSON.stringify(result.error?.format())}`
    );

    const slug = result.data.slug;
    assert.ok(!slugs.has(slug), `Duplicate slug detected: ${slug}`);
    slugs.add(slug);
    assert.ok(parsed.content.length > 200, `Article ${file} content is too short`);
  }
});

test("Projects dataset satisfies ProjectCaseStudySchema and has unique slugs", () => {
  assert.ok(PROJECTS_DATA.length >= 10, "Must have at least 10 project case studies");
  const slugs = new Set();

  for (const project of PROJECTS_DATA) {
    const result = ProjectCaseStudySchema.safeParse(project);
    assert.ok(
      result.success,
      `Project ${project.slug} failed schema validation: ${JSON.stringify(result.error?.format())}`
    );

    assert.ok(!slugs.has(project.slug), `Duplicate project slug: ${project.slug}`);
    slugs.add(project.slug);
    assert.ok(project.verifiedFeatures.length >= 3, `Project ${project.slug} needs >= 3 features`);
    assert.ok(project.technicalDecisions.length >= 2, `Project ${project.slug} needs >= 2 decisions`);
    assert.ok(project.tradeoffsAndLimitations.length >= 2, `Project ${project.slug} needs >= 2 trade-offs`);
  }
});

test("Draft exclusion invariant: Drafts must not be compiled into public manifest", () => {
  const researchManifest = JSON.parse(
    fs.readFileSync(path.join(ROOT_DIR, "lib", "content", "generated", "research.json"), "utf-8")
  );
  const journalManifest = JSON.parse(
    fs.readFileSync(path.join(ROOT_DIR, "lib", "content", "generated", "journal.json"), "utf-8")
  );

  for (const item of researchManifest) {
    assert.equal(item.draft, false, `Draft research ${item.slug} found in public manifest!`);
  }
  for (const item of journalManifest) {
    assert.equal(item.draft, false, `Draft journal ${item.slug} found in public manifest!`);
  }
});
