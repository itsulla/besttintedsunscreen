# Launch Checklist — Best Tinted Sunscreen

Everything in this document is a step **you** need to take manually. The site
code is done. This is the human-in-the-loop work.

---

## 1. Google Search Console (10 min)

Why: THE most important SEO tool. Tells you every search query that brings
people to your site, your average rank, and whether Google has indexed
each page. Without it you're flying blind.

**Steps:**

1. Go to https://search.google.com/search-console
2. Sign in with any Google account
3. Click **"Add property"** → select **"URL prefix"**
4. Enter: `https://besttintedsunscreen.com`
5. Verification method: choose **"HTML tag"**
6. Copy **only** the `content="..."` value (a string like `abcd1234xyz`)
7. Open `src/data/seo.ts` and paste the value into `googleSiteVerification`:
   ```ts
   googleSiteVerification: "abcd1234xyz",
   ```
8. Rebuild and deploy:
   ```bash
   cd /home/muffinman/sun-lekker
   npm run build
   ```
9. Back in Search Console, click **"Verify"** — should succeed within seconds
10. Submit your sitemap:
    - Navigate to **Sitemaps** in the left sidebar
    - Enter: `sitemap-index.xml`
    - Click **Submit**
11. Request indexing for the pillar page:
    - Use the **URL Inspection** tool (search bar at top)
    - Paste: `https://besttintedsunscreen.com/`
    - Click **"Request Indexing"**

---

## 2. Bing Webmaster Tools (5 min)

Why: Bing indexes differently from Google. More importantly, Bing's index
powers **ChatGPT, Microsoft Copilot, DuckDuckGo, and Yahoo search**.
IndexNow (already set up on your site) pushes URLs to Bing instantly.

**Steps:**

1. Go to https://www.bing.com/webmasters
2. Sign in with a Microsoft account
3. Click **"Add a site"** → enter `https://besttintedsunscreen.com`
4. You'll be offered three verification methods. Pick **"Meta tag"**
5. Copy the `content="..."` value
6. Paste into `src/data/seo.ts`:
   ```ts
   bingSiteVerification: "<value-here>",
   ```
7. Rebuild and redeploy:
   ```bash
   npm run build
   ```
8. Click **Verify** in Bing Webmaster Tools
9. Submit sitemap → enter `https://besttintedsunscreen.com/sitemap-index.xml`

Bing also imports data from Google Search Console automatically, so once GSC
is verified and Bing Webmaster is verified, your GSC data shows up in Bing
within ~24h.

---

## 3. Newsletter (Beehiiv — 15 min)

Why: email captures build a long-term audience you actually own. The
signup forms are already in place on every page — they just need a
provider endpoint.

**Steps:**

1. Go to https://www.beehiiv.com and sign up (free tier up to 2,500 subs)
2. Create a new publication:
   - Name: "Best Tinted Sunscreen"
   - URL slug: `besttintedsunscreen` (or whatever)
   - Category: Beauty / Lifestyle
3. Go to **Settings → Publication → Domain** and connect
   `newsletter.besttintedsunscreen.com` (or similar subdomain) — optional
   but looks premium
4. Create a signup form:
   - **Grow → Forms → Create Form → Inline**
   - Title: "The Korean Sunscreen Cheat Sheet"
   - Subtitle: match your lead magnet copy
5. Once published, click **"Embed"**. You'll get an HTML snippet. Inside
   the snippet, find the `<form>` tag and copy the `action="..."` URL.
   Looks like: `https://embeds.beehiiv.com/PUB_ID/subscribe` or
   `https://beehiiv.com/forms/FORM_ID/subscribe`
6. Open `src/data/newsletter.ts`, paste into `actionUrl`:
   ```ts
   actionUrl: "https://embeds.beehiiv.com/YOUR_PUB_ID/subscribe",
   emailFieldName: "email", // Beehiiv uses "email"
   ```
7. Rebuild:
   ```bash
   npm run build
   ```
8. Test: go to your site, scroll to the yellow newsletter section, enter
   a real email, submit. Should redirect you to Beehiiv's thank-you page.
9. Back in Beehiiv, create a welcome automation:
   - **Automations → Create → On Subscribe → Send Welcome Email**
   - Attach your "Korean Sunscreen Cheat Sheet" PDF (you need to create this)
10. **Actually create the lead-magnet PDF.** Simplest version:
    - Open Canva → create a new 1080×1350 design
    - Title: "The Korean Sunscreen Cheat Sheet 2026"
    - 8 rows: product name, SPF, finish, best for, price, "where to buy" link
    - Export as PDF
    - Upload to Beehiiv welcome email as attachment

**Alternative: Kit (ConvertKit)** — free up to 10k subs. Same setup pattern,
different URL format: `https://app.convertkit.com/forms/FORM_ID/subscriptions`
with `emailFieldName: "email_address"`.

---

## 4. Amazon Associates — make sure you're active (5 min)

Why: without Associates approval, your tracking tag earns $0. New associates
get 180 days to generate 3 qualifying sales or the account gets closed.

**Steps:**

1. Go to https://affiliate-program.amazon.com
2. Sign in → **My Account** → **Manage Your Tracking IDs**
3. Verify `lekkerandco-20` is listed and status is **Active** (not Pending or Closed)
4. Check the **180-day countdown** at the top of the dashboard — that's
   how long you have to make your first 3 affiliate sales. Plan accordingly.
5. If you want to also earn on UK/CA/AU traffic, enable
   **OneLink**: Settings → OneLink. This auto-redirects international
   visitors to their local Amazon with your tracking ID.

---

## 5. Submit to Reddit and Pinterest (when you have 3+ articles)

Beauty affiliate traffic comes mostly from these two sources. But you need
to NOT look spammy, which means:

**Pinterest:**
1. Create a business account at https://business.pinterest.com
2. Verify the domain (similar meta tag flow)
3. Paste your verification code into `src/data/seo.ts` as
   `pinterestVerification`
4. Create 3-5 pins per article, each with a different title variation
5. Pin them to themed boards: "Korean Skincare", "Sunscreen Reviews", etc.

**Reddit:**
- `r/AsianBeauty`, `r/SkincareAddiction`, `r/AusSkincare`, `r/SkincareAddictionUK`
- Don't post your link directly. Instead, answer real product questions
  with a line like: "I put together a breakdown of the top 8 at
  [site] if you want to compare" — contributing value, not just spamming
- Wait until you have at least 3 articles so you look legitimate
- Read each subreddit's rules on self-promotion first

---

## 6. First content pass: buy and test the products

This is the **single biggest long-term SEO lever**. Google's Helpful Content
Update specifically targets review sites that regurgitate information without
hands-on experience. Sites with real photos, real testing, and personal
anecdotes rank dramatically better.

Budget for 3-4 samples: ~$80-120. My picks in priority order:

1. **Beauty of Joseon Relief Sun Aqua-Fresh** ($18) — your editor's pick
2. **Merit The Uniform Tinted Mineral** ($38) — your Western champion
3. **Skin1004 Madagascar Centella** ($22) — sensitive skin angle
4. **Numbuzin No.3 Porcelain Base-skip Tone Up** ($24) — tone-up angle

Buy them, use them for 2 weeks each, take your own photos (even phone photos
in good light), and rewrite the review bodies with your real observations.

---

## The dashboard you'll actually check daily

Once everything is set up:

1. **Umami** — realtime visitor count, top pages, referrers
2. **Google Search Console → Performance** — impressions, clicks, positions
3. **Amazon Associates → Reports** — earnings by link
4. **Beehiiv → Audience** — subscriber growth

Bookmark all four in one folder. Check them every morning for the first
month to see what's working.

---

## Rebuild + deploy workflow

Whenever you make a content change:

```bash
cd /home/muffinman/sun-lekker
npm run build          # Rebuilds dist/
node scripts/indexnow.mjs   # Pings Bing/Yandex of the update
# nginx serves dist/ automatically, no reload needed
```

When you add a new page:
1. Create the `.astro` file under `src/pages/`
2. Add its URL to the `URLS` array in `scripts/indexnow.mjs`
3. Add its slug to the `PAGES` array in `scripts/generate-og.mjs`
4. Run `node scripts/generate-og.mjs` to create its OG image
5. Run `npm run build` and `node scripts/indexnow.mjs`

---

## Renewal reminders

- **SSL certs** auto-renew via certbot cron (already set up). Should Just Work.
- **Amazon Associates** — first 3 sales needed within 180 days of first click
- **Domain** — Namecheap auto-renew if you set it up. Otherwise expires ~1 year.

---

Questions? Everything is in this repo at `/home/muffinman/sun-lekker/`.
