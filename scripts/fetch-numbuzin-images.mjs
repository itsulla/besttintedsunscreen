/**
 * Fetch product images for the two Numbuzin sunscreens using their ASINs
 * directly (not search). Fetches the /dp/ page and extracts the primary image.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "products");

const PRODUCTS = [
  { slug: "numbuzin-no3", asin: "B09HRNCKN4" },
  { slug: "numbuzin-no9", asin: "B0F5WFX4L7" },
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15";

async function fetchProductPage(asin) {
  const url = `https://www.amazon.com/dp/${asin}/`;
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

function extractPrimaryImage(html) {
  // Product detail pages have the main image in several places:
  // 1. "hiRes" in the JSON blob
  // 2. data-old-hires attribute
  // 3. id="landingImage"
  const patterns = [
    /"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
    /data-old-hires="([^"]+)"/,
    /id="landingImage"[^>]*src="([^"]+)"/,
    /"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m && m[1]) {
      return m[1]
        .replace(/\\u002F/g, "/")
        .replace(/\._AC_UL\d+_\./, "._AC_SL800_.")
        .replace(/\._SL\d+_\./, "._SL800_.");
    }
  }
  return null;
}

async function downloadImage(url, outPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(outPath, buf);
  return buf.length;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`Fetching ${PRODUCTS.length} Numbuzin product images...\n`);

  for (const p of PRODUCTS) {
    process.stdout.write(`→ ${p.slug} (${p.asin}): `);
    try {
      const html = await fetchProductPage(p.asin);
      const imgUrl = extractPrimaryImage(html);
      if (!imgUrl) {
        console.log("NO IMAGE");
        continue;
      }
      const outPath = path.join(OUT_DIR, `${p.slug}.jpg`);
      const bytes = await downloadImage(imgUrl, outPath);
      console.log(`${(bytes / 1024).toFixed(1)}KB`);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
