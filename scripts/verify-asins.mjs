/**
 * Verify each ASIN by fetching its /dp/ page and printing the title.
 * Flags any mismatches so we can fix them manually.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASIN_FILE = path.join(__dirname, "..", "src", "data", "asins.json");

const EXPECTED = {
  bojAquaFresh:     "aqua fresh",
  bojRice:          "rice",
  bojDayDew:        "matte sun stick",
  meritUniform:     "uniform",
  skin1004Centella: "centella",
  cosrxUltraLight:  "cosrx",
  numbuzin:         "numbuzin",
  liveTinted:       "hueguard",
  ceraveMineral:    "cerave",
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15";

async function fetchTitle(asin) {
  const url = `https://www.amazon.com/dp/${asin}/`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
  });
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const html = await res.text();

  // Try #productTitle or og:title
  const m1 = html.match(/<span[^>]+id="productTitle"[^>]*>([^<]+)<\/span>/);
  if (m1) return { title: m1[1].trim() };
  const m2 = html.match(/<meta name="title" content="([^"]+)"/);
  if (m2) return { title: m2[1].trim() };
  const m3 = html.match(/<title>([^<]+)<\/title>/);
  if (m3) return { title: m3[1].replace(/Amazon\.com[:\s]*/, "").trim() };
  return { error: "no title extracted" };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const asins = JSON.parse(await fs.readFile(ASIN_FILE, "utf8"));
  console.log(`Verifying ${Object.keys(asins).length} ASINs...\n`);

  const issues = [];
  for (const [key, asin] of Object.entries(asins)) {
    process.stdout.write(`${key.padEnd(20)} ${asin}: `);
    const { title, error } = await fetchTitle(asin);
    if (error) {
      console.log(`⚠ ${error}`);
      issues.push({ key, asin, problem: error });
    } else {
      const expected = EXPECTED[key];
      const match = title.toLowerCase().includes(expected);
      const status = match ? "✓" : "✗ MISMATCH";
      console.log(`${status}\n${" ".repeat(24)}→ ${title.slice(0, 80)}`);
      if (!match) {
        issues.push({ key, asin, title, expected });
      }
    }
    await sleep(2500);
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  if (issues.length === 0) {
    console.log("✓ All ASINs verified");
  } else {
    console.log(`✗ ${issues.length} issue(s):`);
    issues.forEach((i) =>
      console.log(`  ${i.key}: ${i.problem || `expected "${i.expected}" in title`}`)
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
