import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");

const expectedPages = [
  "index.html",
  "404.html",
  "work/trading-terminal/index.html",
  "work/production-reliability/index.html",
  "work/openclaw-agent-hub/index.html",
];

for (const page of expectedPages) {
  assert.ok(existsSync(join(dist, page)), `Missing generated page: ${page}`);
}

function filesUnder(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

function metaContent(html, key, value) {
  const first = new RegExp(`<meta[^>]+${key}=["']${value}["'][^>]+content=["']([^"']+)["']`, "i").exec(html);
  const reversed = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${key}=["']${value}["']`, "i").exec(html);
  return first?.[1] ?? reversed?.[1] ?? null;
}

function localTarget(reference) {
  if (/^(?:https?:|mailto:|tel:|#)/.test(reference)) return null;
  const clean = reference.split(/[?#]/, 1)[0];
  if (!clean) return null;
  const relative = clean.startsWith("/") ? clean.slice(1) : clean;
  let target = join(dist, relative);
  if (!extname(target)) target = join(target, "index.html");
  return target;
}

const htmlFiles = filesUnder(dist).filter((path) => path.endsWith(".html"));
const prohibited = [
  /60%/i,
  /execution tracing/i,
  /MCP\s*\/\s*CLI/i,
  /CI\/CD pipeline/i,
  /ambiguous user problems/i,
  /dependable AI systems/i,
  /evidence over theater/i,
  /open to FDE roles/i,
  /customer-facing product engineer/i,
];

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const relative = file.slice(dist.length + 1).replaceAll("\\", "/");

  assert.match(html, /<title>[^<]+<\/title>/i, `${relative} is missing a title`);
  assert.ok(metaContent(html, "name", "description"), `${relative} is missing a description`);
  assert.ok(metaContent(html, "property", "og:title"), `${relative} is missing og:title`);
  assert.ok(metaContent(html, "property", "og:description"), `${relative} is missing og:description`);
  assert.ok(metaContent(html, "name", "twitter:title"), `${relative} is missing twitter:title`);
  assert.ok(metaContent(html, "name", "twitter:description"), `${relative} is missing twitter:description`);

  for (const pattern of prohibited) {
    assert.doesNotMatch(html, pattern, `${relative} contains prohibited claim language: ${pattern}`);
  }

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const target = localTarget(match[1]);
    if (target) assert.ok(existsSync(target), `${relative} references missing local asset ${match[1]}`);
  }

  for (const match of html.matchAll(/<a\b([^>]*target=["']_blank["'][^>]*)>/gi)) {
    assert.match(match[1], /rel=["'][^"']*noopener[^"']*["']/i, `${relative} has an unsafe target=_blank link`);
  }
}

const home = readFileSync(join(dist, "index.html"), "utf8");
assert.match(home, /https:\/\/shuhang-f\.github\.io\/og\.png/, "Homepage must reference the absolute social card URL");
assert.match(home, /<h1>Hi, I’m Shuhang\.<\/h1>/, "Homepage must lead with the personal introduction");
assert.ok((home.match(/class="brand-icon"/g) ?? []).length >= 5, "Homepage must render GitHub and LinkedIn brand icons at social and repository links");

let previousFeaturedProject = -1;
for (const project of ["Trading Workspace", "TFT Damage Lab", "OpenClaw at Home"]) {
  const currentFeaturedProject = home.indexOf(project);
  assert.ok(currentFeaturedProject > previousFeaturedProject, `Homepage must feature ${project} in the selected order`);
  previousFeaturedProject = currentFeaturedProject;
}

for (const slug of ["trading-terminal", "production-reliability", "openclaw-agent-hub"]) {
  const html = readFileSync(join(dist, "work", slug, "index.html"), "utf8");
  assert.doesNotMatch(html, /og\.png/i, `${slug} must not inherit the site-wide social image`);
  assert.match(html, new RegExp(`https:\\/\\/shuhang-f\\.github\\.io\\/work\\/${slug}\\/`), `${slug} must emit its own canonical URL`);
}

const png = readFileSync(join(dist, "og.png"));
assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "og.png is not a PNG");
assert.equal(png.readUInt32BE(16), 1200, "og.png must be 1200 pixels wide");
assert.equal(png.readUInt32BE(20), 630, "og.png must be 630 pixels tall");

const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
assert.ok(readFileSync(join(dist, "resume.pdf")).subarray(0, 5).equals(Buffer.from("%PDF-")), "resume.pdf is not a PDF");
assert.equal(hash(join(root, "resume.pdf")), hash(join(dist, "resume.pdf")), "Public résumé must remain byte-for-byte unchanged");

console.log(`Validated ${htmlFiles.length} pages, local references, metadata, claim boundaries, social image, and résumé integrity.`);
