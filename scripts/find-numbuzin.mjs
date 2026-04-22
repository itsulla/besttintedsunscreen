/**
 * Research Numbuzin's real sunscreen lineup on Amazon US.
 * Prints title + ASIN for every Numbuzin sunscreen result.
 */

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15";

async function search(query) {
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

function parseResults(html) {
  const results = [];
  const blocks = [...html.matchAll(
    /data-asin="([A-Z0-9]{10})"[^>]*data-component-type="s-search-result"[^>]*>/g
  )];
  for (const m of blocks) {
    const asin = m[1];
    const idx = m.index ?? 0;
    const chunk = html.slice(idx, idx + 3000);
    let title = null;
    const alt = chunk.match(/alt="([^"]{20,250})"/);
    if (alt) title = alt[1];
    if (title) results.push({ asin, title: title.replace(/&amp;/g, "&").trim() });
  }
  return results;
}

const queries = [
  "numbuzin sunscreen",
  "numbuzin spf",
  "numbuzin tone up sunscreen",
  "numbuzin skin softening sun serum",
];

for (const q of queries) {
  console.log(`━━ "${q}" ━━`);
  try {
    const html = await search(q);
    const results = parseResults(html);
    const numbuzin = results.filter((r) =>
      /numbuzin/i.test(r.title) && /(sunscreen|sun|spf|uv)/i.test(r.title)
    );
    console.log(`${numbuzin.length} numbuzin sunscreen results`);
    numbuzin.slice(0, 8).forEach((r, i) =>
      console.log(`  ${i + 1}. ${r.asin}: ${r.title.slice(0, 100)}`)
    );
  } catch (e) {
    console.log(`  ERROR: ${e.message}`);
  }
  console.log();
  await new Promise((r) => setTimeout(r, 3000));
}
