import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");
const EXPECTED_CANONICAL = "https://eshan.tonmoyinfrastructure.org";

test("Robots.txt exists, allows all agents, and specifies canonical sitemap and host", () => {
  const robotsPath = path.join(OUT_DIR, "robots.txt");
  assert.ok(fs.existsSync(robotsPath), "robots.txt must exist in output");

  const robots = fs.readFileSync(robotsPath, "utf-8");
  assert.ok(robots.includes("User-Agent: *"), "robots.txt must contain User-Agent: *");
  assert.ok(robots.includes("Allow: /"), "robots.txt must allow root");
  assert.ok(
    robots.includes(`Sitemap: ${EXPECTED_CANONICAL}/sitemap.xml`),
    "robots.txt must point to canonical sitemap.xml"
  );
  assert.ok(
    robots.includes(`Host: ${EXPECTED_CANONICAL}`),
    "robots.txt must specify canonical Host"
  );
});

test("Sitemap.xml contains valid canonical URLs and zero draft / preview / localhost URLs", () => {
  const sitemapPath = path.join(OUT_DIR, "sitemap.xml");
  assert.ok(fs.existsSync(sitemapPath), "sitemap.xml must exist in output");

  const sitemap = fs.readFileSync(sitemapPath, "utf-8");
  assert.ok(sitemap.includes("<urlset"), "sitemap.xml must have <urlset> root");

  // Extract all <loc>
  const locRegex = /<loc>(.+?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemap)) !== null) {
    urls.push(match[1]);
  }

  assert.ok(urls.length >= 25, `Sitemap must have >= 25 URLs, found ${urls.length}`);

  for (const url of urls) {
    assert.ok(
      url.startsWith(EXPECTED_CANONICAL),
      `Sitemap URL must start with canonical origin: ${url}`
    );
    assert.ok(!url.includes("localhost"), `Sitemap leaked localhost: ${url}`);
    assert.ok(!url.includes("127.0.0.1"), `Sitemap leaked 127.0.0.1: ${url}`);
    assert.ok(!url.includes(".preview."), `Sitemap leaked preview domain: ${url}`);
  }

  // Key routes must be in sitemap
  assert.ok(urls.includes(EXPECTED_CANONICAL), "Homepage must be in sitemap");
  assert.ok(urls.includes(`${EXPECTED_CANONICAL}/research`), "/research must be in sitemap");
  assert.ok(urls.includes(`${EXPECTED_CANONICAL}/journal`), "/journal must be in sitemap");
  assert.ok(urls.includes(`${EXPECTED_CANONICAL}/projects`), "/projects must be in sitemap");
  assert.ok(urls.includes(`${EXPECTED_CANONICAL}/about`), "/about must be in sitemap");
  assert.ok(urls.includes(`${EXPECTED_CANONICAL}/now`), "/now must be in sitemap");
  assert.ok(urls.includes(`${EXPECTED_CANONICAL}/contact`), "/contact must be in sitemap");
});

test("RSS 2.0 Feeds exist, have valid XML structure, and point to canonical domain", () => {
  for (const feedName of ["feed.xml", "journal-feed.xml", "research-feed.xml"]) {
    const feedPath = path.join(OUT_DIR, feedName);
    assert.ok(fs.existsSync(feedPath), `${feedName} must exist in out/`);

    const xml = fs.readFileSync(feedPath, "utf-8");
    assert.ok(xml.includes("<rss version=\"2.0\""), `${feedName} must be RSS 2.0`);
    assert.ok(xml.includes(`<link>${EXPECTED_CANONICAL}</link>`), `${feedName} must link to canonical domain`);
    assert.ok(xml.includes("<item>"), `${feedName} must have items`);
    assert.ok(!xml.includes("localhost"), `${feedName} must not contain localhost`);
  }
});
