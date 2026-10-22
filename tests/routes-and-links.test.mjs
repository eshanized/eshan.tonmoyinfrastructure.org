import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");

function getAllHtmlFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") {
        getAllHtmlFiles(fullPath, fileList);
      }
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

test("Zero broken internal links across all exported HTML pages", () => {
  const htmlFiles = getAllHtmlFiles(OUT_DIR);
  assert.ok(htmlFiles.length >= 25, `Expected >= 25 HTML files, found ${htmlFiles.length}`);

  const internalLinkRegex = /<a\s+[^>]*?href=["'](\/[^"'#?]*)[^"']*?["']/gi;
  const missingTargets = [];

  for (const htmlFile of htmlFiles) {
    const content = fs.readFileSync(htmlFile, "utf-8");
    let match;

    while ((match = internalLinkRegex.exec(content)) !== null) {
      const targetPath = match[1];

      // Ignore static assets, feeds, and anchor fragments
      if (
        targetPath.startsWith("/_next") ||
        targetPath.endsWith(".xml") ||
        targetPath.endsWith(".txt") ||
        targetPath.endsWith(".png") ||
        targetPath.endsWith(".svg") ||
        targetPath.endsWith(".ico")
      ) {
        continue;
      }

      // Target path /research -> check /research.html OR /research/index.html
      const normalized = targetPath === "/" ? "index" : targetPath.replace(/^\//, "");
      const directHtml = path.join(OUT_DIR, `${normalized}.html`);
      const dirIndexHtml = path.join(OUT_DIR, normalized, "index.html");

      const exists = fs.existsSync(directHtml) || fs.existsSync(dirIndexHtml);
      if (!exists) {
        missingTargets.push({
          sourceFile: path.relative(OUT_DIR, htmlFile),
          targetPath,
        });
      }
    }
  }

  assert.equal(
    missingTargets.length,
    0,
    `Found broken internal links: ${JSON.stringify(missingTargets, null, 2)}`
  );
});

test("Canonical links on all key HTML pages match production domain", () => {
  const htmlFiles = getAllHtmlFiles(OUT_DIR);
  const canonicalRegex = /<link\s+[^>]*?rel=["']canonical["'][^>]*?href=["']([^"']+)["']/i;

  for (const htmlFile of htmlFiles) {
    const relativeName = path.relative(OUT_DIR, htmlFile);
    // 404 does not need canonical
    if (relativeName.includes("404") || relativeName.includes("_not-found")) {
      continue;
    }

    const content = fs.readFileSync(htmlFile, "utf-8");
    const match = canonicalRegex.exec(content);

    assert.ok(
      match,
      `File ${relativeName} is missing canonical link tag!`
    );
    assert.ok(
      match[1].startsWith("https://eshan.tonmoyinfrastructure.org"),
      `File ${relativeName} has non-canonical URL: ${match[1]}`
    );
  }
});
