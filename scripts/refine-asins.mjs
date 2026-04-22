/**
 * Refine specific ASINs with more targeted queries + title-matching.
 * For each product we want, we search Amazon and look through multiple
 * results to find one whose title actually matches the product name.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASIN_FILE = path.join(__dirname, "..", "src", "data", "asins.json");

// Each target: a query + a "must-include-word-or-phrase" filter.
// The filter is applied against each result's title until we find a match.
const REFINE = [
  {
    key: "bojAquaFresh",
    query: "beauty of joseon aqua fresh",
    mustInclude: ["aqua"],
    mustAllInclude: ["joseon"],
  },
  {
    key: "meritUniform",
    query: "merit uniform tinted mineral sunscreen",
    mustInclude: ["merit"],
    mustAllInclude: ["uniform"],
  },
  {
    key: "cosrxUltraLight",
    query: "cosrx ultra light invisible sunscreen",
    mustInclude: ["ultra light"],
    mustAllInclude: ["cosrx"],
  },
  {
    key: "skin1004Centella",
    query: "skin1004 hyalu cica water fit sun serum",
    mustInclude: ["water-fit", "water fit", "hyalu"],
    mustAllInclude: ["skin1004"],
  },
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15";

async function searchAmazon(query) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&ref=nb_sb_noss`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

/**
 * Parse Amazon search results into a list of { asin, title } pairs.
 * Looks for each s-search-result block and pulls its data-asin + the first
 * h2/alt text inside it.
 */
function parseResults(html) {
  const results = [];
  const blocks = [...html.matchAll(
    /data-asin="([A-Z0-9]{10})"[^>]*data-component-type="s-search-result"[^>]*>/g
  )];

  for (const m of blocks) {
    const asin = m[1];
    const idx = m.index ?? 0;

    // Grab ~3KB of HTML after this marker — should contain the title
    const chunk = html.slice(idx, idx + 3000);

    // Try multiple title patterns
    let title = null;
    const alt = chunk.match(/alt="([^"]{20,200})"/);
    if (alt) title = alt[1];
    if (!title) {
      const span = chunk.match(
        /<span[^>]+class="[^"]*a-text-normal[^"]*"[^>]*>([^<]{20,200})<\/span>/
      );
      if (span) title = span[1];
    }
    if (!title) {
      const h2 = chunk.match(/<h2[^>]*>[^<]*<a[^>]*>([^<]{20,200})</);
      if (h2) title = h2[1];
    }

    if (title) {
      results.push({ asin, title: title.replace(/&amp;/g, "&").trim() });
    }
  }
  return results;
}

function titleMatches(title, target) {
  const t = title.toLowerCase();
  // All "mustAllInclude" must be present, AND at least one "mustInclude"
  for (const word of target.mustAllInclude ?? []) {
    if (!t.includes(word.toLowerCase())) return false;
  }
  for (const word of target.mustInclude ?? []) {
    if (t.includes(word.toLowerCase())) return true;
  }
  return false;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const asins = JSON.parse(await fs.readFile(ASIN_FILE, "utf8"));

  console.log(`Refining ${REFINE.length} ASINs with targeted queries...\n`);

  for (const target of REFINE) {
    console.log(`━ ${target.key}`);
    console.log(`  query: "${target.query}"`);
    try {
      const html = await searchAmazon(target.query);
      const results = parseResults(html);
      console.log(`  parsed ${results.length} results`);

      let picked = null;
      for (const r of results.slice(0, 10)) {
        if (titleMatches(r.title, target)) {
          picked = r;
          break;
        }
      }

      if (picked) {
        asins[target.key] = picked.asin;
        console.log(`  ✓ ${picked.asin}`);
        console.log(`    → ${picked.title.slice(0, 90)}`);
      } else {
        console.log(`  ✗ no match found. Top candidates:`);
        results.slice(0, 5).forEach((r, i) =>
          console.log(`    ${i + 1}. ${r.asin}: ${r.title.slice(0, 75)}`)
        );
      }
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
    console.log();
    await sleep(3000);
  }

  await fs.writeFile(ASIN_FILE, JSON.stringify(asins, null, 2) + "\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Final ASINs:");
  console.log(JSON.stringify(asins, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
