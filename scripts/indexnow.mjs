/**
 * IndexNow publisher.
 *
 * IndexNow is a protocol supported by Bing, Yandex, Seznam, and Naver that
 * lets you push new/updated URLs to search engines instead of waiting for
 * their crawlers to discover them. Instant indexing on Bing (which also
 * powers ChatGPT, Copilot, and DuckDuckGo search results).
 *
 * Google does NOT support IndexNow. For Google, use Search Console's
 * "URL Inspection" → "Request Indexing" feature manually, or the URL
 * Inspection API if you want to automate it.
 *
 * Usage:
 *   node scripts/indexnow.mjs                     # submit all known URLs
 *   node scripts/indexnow.mjs /reviews/foo/       # submit a single URL
 *
 * Run this on every deploy after `npm run build`.
 */

// Must match the value in src/data/seo.ts and the filename of the
// key-verification file under public/. Keep these three in sync.
const HOST = "besttintedsunscreen.com";
const KEY = "a8f9e2c7d1b4f6e8a2c5d9f3b7e1a4c8";

// Full list of URLs to submit. Keep in sync with /src/pages/.
const URLS = [
  "/",
  "/disclosure/",
  "/privacy/",
  "/reviews/",
  "/reviews/beauty-of-joseon-relief-sun-aqua-fresh/",
  "/reviews/merit-the-uniform-tinted-mineral/",
  "/compare/",
  "/compare/boj-aqua-fresh-vs-merit-uniform/",
  "/guides/",
  "/guides/best-korean-sunscreen-australia/",
  "/guides/what-is-no-white-cast-sunscreen/",
  "/guides/what-is-pdrn-skincare/",
];

async function submit(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls.map((u) => `https://${HOST}${u}`),
  };

  console.log(`Submitting ${urls.length} URL(s) to IndexNow...`);

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // Per spec: 200 or 202 = accepted. Other codes indicate issues.
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ Accepted (HTTP ${res.status})`);
    console.log(`  Bing, Yandex, Seznam, and Naver will crawl these URLs shortly.`);
  } else if (res.status === 400) {
    console.log(`✗ 400 — bad request. Check URL list and host matches.`);
  } else if (res.status === 403) {
    console.log(`✗ 403 — key file not found or invalid.`);
    console.log(`  Make sure /${KEY}.txt is reachable at https://${HOST}/${KEY}.txt`);
  } else if (res.status === 422) {
    console.log(`✗ 422 — URLs don't match the host or have other validation errors.`);
  } else if (res.status === 429) {
    console.log(`✗ 429 — rate limit. Retry later.`);
  } else {
    console.log(`✗ HTTP ${res.status}`);
    console.log(await res.text());
  }
}

const args = process.argv.slice(2);
const toSubmit = args.length > 0 ? args : URLS;

await submit(toSubmit);
