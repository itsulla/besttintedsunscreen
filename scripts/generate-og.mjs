/**
 * Generate 1200×630 Open Graph share images for every page.
 *
 * Uses satori to lay out a React-like tree into SVG, then @resvg/resvg-js
 * to rasterize to PNG. The output lives in public/og/ and gets served
 * automatically based on each page's pathname (see Base.astro logic).
 *
 * File naming: path `/reviews/beauty-of-joseon-relief-sun-aqua-fresh/`
 *              → `public/og/reviews-beauty-of-joseon-relief-sun-aqua-fresh.png`
 *
 * Run: `node scripts/generate-og.mjs`
 */

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "og");
const MANIFEST_PATH = path.join(OUT_DIR, ".manifest.json");

const FRAUNCES = await fs.readFile(path.join(__dirname, "fonts", "Fraunces-Bold.ttf"));
const INTER = await fs.readFile(path.join(__dirname, "fonts", "Inter-Regular.ttf"));

// ──────────────────────────────────────────────────────────
// Page catalog — one entry per route that needs an OG image
// ──────────────────────────────────────────────────────────

const PAGES = [
  {
    slug: "index",
    eyebrow: "2026 GUIDE",
    title: "The 8 best Korean tinted sunscreens, tested and ranked.",
    subtitle:
      "Beauty of Joseon, Merit, Skin1004, Numbuzin and more. No white cast, no gatekeeping.",
  },
  {
    slug: "reviews",
    eyebrow: "ALL REVIEWS",
    title: "Every Korean sunscreen we've tested.",
    subtitle: "Real 30-day wear trials and honest verdicts.",
  },
  {
    slug: "reviews-beauty-of-joseon-relief-sun-aqua-fresh",
    eyebrow: "REVIEW · BEAUTY OF JOSEON",
    title: "Relief Sun Aqua-Fresh: the best BoJ sunscreen yet.",
    subtitle: "Zero white cast. Watery hydrating SPF50+ PA++++. Four weeks in.",
  },
  {
    slug: "reviews-merit-the-uniform-tinted-mineral",
    eyebrow: "REVIEW · MERIT",
    title: "Merit The Uniform Tinted Mineral: worth the $38?",
    subtitle: "The Western brand that finally got tinted mineral SPF right.",
  },
  {
    slug: "compare",
    eyebrow: "HEAD-TO-HEAD",
    title: "Sunscreen comparisons, tested side by side.",
    subtitle: "When two SPFs both look good on paper, we pick the winner.",
  },
  {
    slug: "compare-boj-aqua-fresh-vs-merit-uniform",
    eyebrow: "COMPARISON",
    title: "BoJ Aqua-Fresh vs Merit The Uniform.",
    subtitle: "A $18 Korean cult classic against a $38 Western newcomer.",
  },
  {
    slug: "guides",
    eyebrow: "GUIDES",
    title: "Sunscreen guides, without the fluff.",
    subtitle: "What we wish existed when we first started obsessing over Korean SPF.",
  },
  {
    slug: "guides-best-korean-sunscreen-australia",
    eyebrow: "GUIDE · AUSTRALIA",
    title: "Best Korean sunscreens you can actually buy in Australia.",
    subtitle: "Chemist Warehouse, Mecca, Adore Beauty — plus what's TGA listed.",
  },
  {
    slug: "guides-what-is-no-white-cast-sunscreen",
    eyebrow: "BEGINNER GUIDE",
    title: 'What "no white cast" actually means.',
    subtitle:
      "Why Korean sunscreens disappear while Western mineral SPFs look chalky.",
  },
  {
    slug: "disclosure",
    eyebrow: "LEGAL",
    title: "Affiliate disclosure.",
    subtitle:
      "How we make money, how we disclose it, and what that means for our rankings.",
  },
  {
    slug: "privacy",
    eyebrow: "LEGAL",
    title: "Privacy policy.",
    subtitle:
      "No cookies, no tracking pixels, no selling your data. Here's what we actually do.",
  },
  {
    slug: "guides-what-is-pdrn-skincare",
    eyebrow: "GUIDE · INGREDIENTS",
    title: "What is PDRN? The K-Beauty ingredient everyone's searching for.",
    subtitle:
      "The science, the products, and whether topical salmon DNA serums actually work.",
  },
];

// ──────────────────────────────────────────────────────────
// Layout definition (React-like tree consumed by satori)
// ──────────────────────────────────────────────────────────

function makeTree({ eyebrow, title, subtitle }) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        backgroundColor: "#FBF9F4",
        padding: "90px",
        fontFamily: "Inter",
        position: "relative",
      },
      children: [
        // Decorative sun glow in the upper right
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-180px",
              right: "-180px",
              width: "600px",
              height: "600px",
              borderRadius: "600px",
              background:
                "radial-gradient(closest-side, rgba(251, 170, 58, 0.65), rgba(251, 170, 58, 0))",
              display: "flex",
            },
          },
        },
        // Sun circle badge + brand wordmark
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "auto",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "38px",
                    height: "38px",
                    borderRadius: "38px",
                    background:
                      "linear-gradient(135deg, #FBAA3A, #D66F0A)",
                    display: "flex",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "26px",
                    fontWeight: 700,
                    color: "#1A1814",
                    letterSpacing: "-0.02em",
                    fontFamily: "Fraunces",
                    display: "flex",
                  },
                  children: [
                    "Best",
                    {
                      type: "span",
                      props: {
                        style: { color: "#D66F0A" },
                        children: "Tinted",
                      },
                    },
                    "Sunscreen",
                  ],
                },
              },
            ],
          },
        },
        // Eyebrow
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "36px",
                    height: "2px",
                    backgroundColor: "#D66F0A",
                    display: "flex",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#A6530B",
                    letterSpacing: "0.22em",
                    display: "flex",
                  },
                  children: eyebrow,
                },
              },
            ],
          },
        },
        // Title (Fraunces serif)
        {
          type: "div",
          props: {
            style: {
              fontSize: "62px",
              fontWeight: 700,
              color: "#1A1814",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: "980px",
              fontFamily: "Fraunces",
              display: "flex",
              marginBottom: "28px",
            },
            children: title,
          },
        },
        // Subtitle (Inter)
        {
          type: "div",
          props: {
            style: {
              fontSize: "26px",
              fontWeight: 400,
              color: "#5A5044",
              lineHeight: 1.4,
              maxWidth: "900px",
              display: "flex",
            },
            children: subtitle,
          },
        },
        // Footer URL
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "70px",
              left: "90px",
              fontSize: "20px",
              color: "#7A6E5E",
              letterSpacing: "0.02em",
              display: "flex",
            },
            children: "besttintedsunscreen.com",
          },
        },
      ],
    },
  };
}

// ──────────────────────────────────────────────────────────
// Generate + render pipeline
// ──────────────────────────────────────────────────────────

async function renderPage(page) {
  const tree = makeTree(page);

  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Fraunces", data: FRAUNCES, weight: 700, style: "normal" },
      { name: "Inter", data: INTER, weight: 400, style: "normal" },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    background: "#FBF9F4",
  });
  const pngData = resvg.render().asPng();
  const outPath = path.join(OUT_DIR, `${page.slug}.png`);
  await fs.writeFile(outPath, pngData);
  return { outPath, bytes: pngData.length };
}

function pageHash(page) {
  return crypto
    .createHash("sha1")
    .update(JSON.stringify([page.eyebrow, page.title, page.subtitle]))
    .digest("hex");
}

async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const manifest = await loadManifest();
  let rendered = 0;
  let skipped = 0;

  console.log(`Checking ${PAGES.length} OG images...\n`);

  for (const page of PAGES) {
    const hash = pageHash(page);
    const outPath = path.join(OUT_DIR, `${page.slug}.png`);

    // Skip if content is unchanged AND the output file still exists
    if (manifest[page.slug] === hash) {
      try {
        await fs.access(outPath);
        console.log(`  ${page.slug.padEnd(50)}: cached`);
        skipped++;
        continue;
      } catch {
        // Output file missing — fall through to regenerate
      }
    }

    process.stdout.write(`→ ${page.slug.padEnd(50)}: `);
    try {
      const { bytes } = await renderPage(page);
      console.log(`${(bytes / 1024).toFixed(1)}KB`);
      manifest[page.slug] = hash;
      rendered++;
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  // Mirror the index image as the default OG + logo fallback.
  try {
    const buf = await fs.readFile(path.join(OUT_DIR, "index.png"));
    await Promise.all([
      fs.writeFile(path.join(__dirname, "..", "public", "og-default.png"), buf),
      fs.writeFile(path.join(__dirname, "..", "public", "logo-og.png"), buf),
    ]);
  } catch {
    // index.png missing — silently skip
  }

  console.log(`\nDone. ${rendered} rendered, ${skipped} cached.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
