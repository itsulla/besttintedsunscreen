/**
 * Fetch Amazon ASINs for each product by running a search and grabbing
 * the first result's ASIN. Writes the results to src/data/asins.json.
 *
 * Direct /dp/ASIN/ links convert 20-30% better than search URLs because
 * they skip the search page and go straight to the product detail page
 * (which means the affiliate cookie gets set immediately and there are no
 * competing products in the way).
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, "..", "src", "data", "asins.json");

const PRODUCTS = [
  { key: "bojAquaFresh",     query: "beauty of joseon relief sun aqua fresh" },
  { key: "bojRice",          query: "beauty of joseon relief sun rice probiotics" },
  { key: "bojDayDew",        query: "beauty of joseon matte sun stick mugwort" },
  { key: "meritUniform",     query: "merit the uniform tinted mineral sunscreen" },
  { key: "skin1004Centella", query: "skin1004 madagascar centella hyalu-cica sun serum" },
  { key: "cosrxUltraLight",  query: "cosrx aloe soothing sun cream spf50" },
  { key: "numbuzin",         query: "numbuzin no 5 vitamin niacinamide sunscreen" },
  { key: "liveTinted",       query: "live tinted hueguard mineral sunscreen" },
  { key: "ceraveMineral",    query: "cerave hydrating mineral sunscreen face spf 50" },
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

async function searchAmazon(query) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&ref=nb_sb_noss`;
  const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

/**
 * Amazon search results include ASINs in several places:
 *   - data-asin="B0CXXXXX" attribute on the result wrapper <div>
 *   - /dp/B0CXXXXX/ in the product link href
 *   - "asin":"B0CXXXXX" inside inline JSON
 *
 * We try each in order — the first `data-asin` with a non-sponsored result is best.
 */
function extractFirstAsin(html) {
  // Best: look for the first non-sponsored search result wrapper with a non-empty data-asin
  // Results have structure like: <div ... data-asin="B0CXXXXX" data-component-type="s-search-result" ...>
  const resultBlocks = [...html.matchAll(
    /data-asin="([A-Z0-9]{10})"[^>]*data-component-type="s-search-result"/g
  )];
  if (resultBlocks.length > 0) {
    // Skip sponsored results by preferring the first non-sponsored match.
    // Sponsored markers live near the block — look for "Sponsored" before the ASIN mention.
    for (const match of resultBlocks) {
      const asin = match[1];
      // Check the ~500 chars before this ASIN for "Sponsored" marker
      const idx = match.index ?? 0;
      const before = html.slice(Math.max(0, idx - 500), idx);
      if (!/Sponsored|\bAD\b/i.test(before.slice(-200))) {
        return asin;
      }
    }
    // If all flagged as sponsored, return the first anyway
    return resultBlocks[0][1];
  }

  // Fallback 1: any data-asin pattern
  const loose = html.match(/data-asin="([A-Z0-9]{10})"/);
  if (loose) return loose[1];

  // Fallback 2: /dp/ASIN/ in any link
  const dp = html.match(/\/dp\/([A-Z0-9]{10})/);
  if (dp) return dp[1];

  return null;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const results = {};
  console.log(`Fetching ASINs for ${PRODUCTS.length} products...\n`);

  for (const product of PRODUCTS) {
    process.stdout.write(`→ ${product.key.padEnd(20)}: `);
    try {
      const html = await searchAmazon(product.query);
      const asin = extractFirstAsin(html);
      if (asin) {
        results[product.key] = asin;
        console.log(asin);
      } else {
        console.log("NOT FOUND");
        results[product.key] = null;
      }
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      results[product.key] = null;
    }
    await sleep(3000);
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(results, null, 2) + "\n");

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  const ok = Object.values(results).filter(Boolean).length;
  const fail = PRODUCTS.length - ok;
  console.log(`Found: ${ok}/${PRODUCTS.length} (${fail} failed)`);
  console.log(`Saved: ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
