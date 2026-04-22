/**
 * Fetch product images from Amazon search results.
 *
 * Strategy:
 *  1. Search Amazon for each product name
 *  2. Parse the first result's main image URL
 *  3. Download to public/products/<slug>.jpg
 *
 * Amazon's search result HTML uses standard <img> tags in .s-image class.
 * This is a one-off script — run it whenever you add new products.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "products");

// Product catalog — slug must match affiliate.ts keys
const PRODUCTS = [
  {
    slug: "boj-aqua-fresh",
    query: "beauty of joseon relief sun aqua fresh",
  },
  {
    slug: "boj-rice",
    query: "beauty of joseon relief sun rice probiotics",
  },
  {
    slug: "boj-day-dew",
    query: "beauty of joseon matte sun stick mugwort",
  },
  {
    slug: "merit-uniform",
    query: "merit the uniform tinted mineral sunscreen",
  },
  {
    slug: "skin1004-centella",
    query: "skin1004 madagascar centella hyalu-cica sun serum",
  },
  {
    slug: "cosrx-ultra-light",
    query: "cosrx aloe soothing sun cream spf50",
  },
  {
    slug: "numbuzin",
    query: "numbuzin no 5 vitamin niacinamide sunscreen",
  },
  {
    slug: "live-tinted",
    query: "live tinted hueguard mineral sunscreen",
  },
  {
    slug: "cerave-mineral",
    query: "cerave hydrating mineral sunscreen face spf 50",
  },
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15";

const HEADERS = {
  "User-Agent": UA,
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Upgrade-Insecure-Requests": "1",
};

async function fetchSearchPage(query) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&ref=nb_sb_noss`;
  const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`Search failed: HTTP ${res.status}`);
  return await res.text();
}

function extractFirstProductImage(html) {
  // Amazon search results have <img class="s-image" src="..."> for product thumbnails
  // Try multiple patterns to be resilient
  const patterns = [
    /<img[^>]+class="[^"]*s-image[^"]*"[^>]+src="([^"]+)"/,
    /<img[^>]+src="([^"]+)"[^>]+class="[^"]*s-image/,
    /"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
    /"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
  ];

  for (const re of patterns) {
    const m = html.match(re);
    if (m && m[1]) {
      // Upgrade to larger version if it's a thumbnail
      return m[1]
        .replace(/\._AC_UL\d+_\./, "._AC_SL800_.")
        .replace(/\._AC_UY\d+_\./, "._AC_SL800_.")
        .replace(/\._SR\d+,\d+_\./, "._SL800_.")
        .replace(/\._SS\d+_\./, "._SL800_.");
    }
  }
  return null;
}

async function downloadImage(url, outPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Image fetch failed: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(outPath, buf);
  return buf.length;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  console.log(`Fetching ${PRODUCTS.length} product images...\n`);

  const results = [];
  for (const product of PRODUCTS) {
    process.stdout.write(`→ ${product.slug}: `);
    try {
      const html = await fetchSearchPage(product.query);
      const imgUrl = extractFirstProductImage(html);
      if (!imgUrl) {
        console.log("no image URL found (layout may have changed)");
        results.push({ slug: product.slug, status: "no-image" });
        continue;
      }
      // Determine extension
      const ext = imgUrl.includes(".png") ? "png" : "jpg";
      const outPath = path.join(OUT_DIR, `${product.slug}.${ext}`);
      const bytes = await downloadImage(imgUrl, outPath);
      console.log(`${(bytes / 1024).toFixed(1)}KB`);
      results.push({ slug: product.slug, status: "ok", path: outPath, bytes });
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
      results.push({ slug: product.slug, status: "error", error: e.message });
    }
    // Be respectful
    await sleep(3000);
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  const ok = results.filter((r) => r.status === "ok").length;
  const fail = results.filter((r) => r.status !== "ok").length;
  console.log(`Done: ${ok} succeeded, ${fail} failed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
