import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");

function extractJsonLdScripts(html) {
  const regex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  const results = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      results.push(JSON.parse(match[1]));
    } catch (err) {
      assert.fail(`Invalid JSON-LD script found in HTML: ${err.message}\n${match[1]}`);
    }
  }
  return results;
}

test("Homepage has valid Person and WebSite JSON-LD structured data", () => {
  const html = fs.readFileSync(path.join(OUT_DIR, "index.html"), "utf-8");
  const schemas = extractJsonLdScripts(html);
  assert.ok(schemas.length >= 2, "Homepage must have at least 2 JSON-LD blocks");

  const person = schemas.find((s) => s["@type"] === "Person");
  assert.ok(person, "Must have a Person schema");
  assert.equal(person.name, "Eshan Roy");
  assert.ok(person.alternateName.includes("eshanized"));
  assert.ok(person.sameAs.some((url) => url.includes("github.com/eshanized")));

  const website = schemas.find((s) => s["@type"] === "WebSite");
  assert.ok(website, "Must have a WebSite schema");
  assert.equal(website.url, "https://eshan.tonmoyinfrastructure.org");
});

test("Research publication pages contain valid ScholarlyArticle JSON-LD", () => {
  const researchDir = path.join(OUT_DIR, "research");
  const htmlFiles = fs.readdirSync(researchDir).filter((f) => f.endsWith(".html"));
  assert.ok(htmlFiles.length >= 4, "Must have at least 4 research detail HTML pages");

  for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(researchDir, file), "utf-8");
    const schemas = extractJsonLdScripts(html);
    const paper = schemas.find((s) => s["@type"] === "ScholarlyArticle");
    assert.ok(paper, `Research page ${file} must have ScholarlyArticle JSON-LD`);
    assert.ok(paper.headline.length > 5, `Paper in ${file} must have a valid headline`);
    assert.ok(paper.description.length > 20, `Paper in ${file} must have a valid description`);
    assert.ok(paper.author.length >= 1, `Paper in ${file} must have at least one author`);
  }
});

test("Journal article pages contain valid TechArticle JSON-LD", () => {
  const journalDir = path.join(OUT_DIR, "journal");
  const htmlFiles = fs.readdirSync(journalDir).filter((f) => f.endsWith(".html"));
  assert.ok(htmlFiles.length >= 6, "Must have at least 6 journal detail HTML pages");

  for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(journalDir, file), "utf-8");
    const schemas = extractJsonLdScripts(html);
    const article = schemas.find((s) => s["@type"] === "TechArticle");
    assert.ok(article, `Journal page ${file} must have TechArticle JSON-LD`);
    assert.ok(article.headline.length > 5, `Article in ${file} must have a valid headline`);
    assert.ok(article.description.length > 20, `Article in ${file} must have a valid description`);
    assert.ok(article.author.name === "Eshan Roy", `Article in ${file} must be authored by Eshan Roy`);
  }
});

test("Project case study pages contain valid SoftwareApplication JSON-LD", () => {
  const projectsDir = path.join(OUT_DIR, "projects");
  const htmlFiles = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".html"));
  assert.ok(htmlFiles.length >= 10, "Must have at least 10 project detail HTML pages");

  for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const schemas = extractJsonLdScripts(html);
    const project = schemas.find((s) => s["@type"] === "SoftwareApplication");
    assert.ok(project, `Project page ${file} must have SoftwareApplication JSON-LD`);
    assert.ok(project.name.length > 1, `Project in ${file} must have a name`);
    assert.ok(project.codeRepository, `Project in ${file} must have codeRepository`);
  }
});
