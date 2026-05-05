import { AFFILIATE } from "./affiliate.ts";

export interface ReviewQuote {
  text: string;
  reviewer: string;
  context: string;   // e.g. "oily skin, brown skin tone" or "combination skin, Verified Purchase"
  source: string;    // e.g. "Amazon" or "YesStyle"
  stars: number;
}

export interface Product {
  rank: number;
  slug: string;
  brand: string;
  name: string;
  tagline: string;
  price: string;
  spf: string;
  finish: string;
  best: string;
  origin: string;
  notes: string;
  pros: string[];
  cons: string[];
  rating: number;
  reviews: string;
  color: string;
  image?: string;
  affiliateKey: keyof typeof AFFILIATE;
  quotePositive?: ReviewQuote;
  quoteCritical?: ReviewQuote;
}

export const PRODUCTS: Product[] = [
  {
    rank: 1,
    slug: "beauty-of-joseon-relief-sun-aqua-fresh",
    brand: "Beauty of Joseon",
    name: "Relief Sun: Aqua-Fresh",
    tagline: "Editor's Pick",
    price: "$13.50",
    spf: "SPF 50+ PA++++",
    finish: "Dewy, invisible",
    best: "Oily & combo skin",
    origin: "Korea",
    notes:
      "A near-weightless chemical SPF that vanishes on skin. No cast, no stickiness. The Korean cult-favorite that restarted the sunscreen conversation.",
    pros: ["Zero white cast", "Lightweight, watery finish", "Under $20"],
    cons: ["Chemical filters (not for purists)", "Smaller 50ml tube"],
    rating: 4.8,
    reviews: "6,503",
    color: "#F3D5BF",
    image: "/products/boj-aqua-fresh.jpg",
    affiliateKey: "bojAquaFresh",
    quotePositive: {
      text: "I love beauty of joseon sunscreen so I was very excited to try the aqua fresh version of it and I love it! As always, it didn't leave a white cast, which is so important to me as a brown skin girlie. The formula of the aqua fresh feels a lot lighter than the original sunscreen formula, it's kinda semi matte vs the original being more dewy!",
      reviewer: "Khushi",
      context: "brown skin, oily skin",
      source: "YesStyle",
      stars: 5,
    },
    quoteCritical: {
      text: "I like it, no white cast and it leaves a matte finish. My only issue is it leaves a bit of a film on the skin that can pill but otherwise it's great. No breakouts, stinging of the eyes or itchiness so I'm not too bothered by the pilling.",
      reviewer: "Divine",
      context: "oily skin, Verified Purchase",
      source: "YesStyle",
      stars: 4,
    },
  },
  {
    rank: 2,
    slug: "merit-the-uniform-tinted-mineral",
    brand: "MERIT",
    name: "The Uniform Tinted Mineral",
    tagline: "Western Champion",
    price: "$45",
    spf: "SPF 45",
    finish: "Satin, tinted",
    best: "All skin tones",
    origin: "USA",
    notes:
      "The rare mineral tint that actually works on deep skin. 12 shades, featherlight, no pilling under foundation.",
    pros: ["True mineral (zinc only)", "12 inclusive shades", "Fragrance-free"],
    cons: ["Pricier per ounce", "Satin — not for oily finishes"],
    rating: 4.6,
    reviews: "1,256",
    color: "#E8B894",
    image: "/products/merit-uniform.jpg",
    affiliateKey: "meritUniform",
    quotePositive: {
      text: "I'm loving The Uniform! Easy addition to my Merit makeup routine! The formula goes on easily with my hands and adds just a touch of evenness to my complexión without feeling heavy. The color match was near perfect too.",
      reviewer: "Martha S.",
      context: "Verified Buyer",
      source: "MERIT Beauty",
      stars: 5,
    },
    quoteCritical: {
      text: "Leaves skin looking chalky and dry. I have tried to persist with it to give it a good go but I had to stop using and go back to another brand. Waste of money unfortunately, I had big hopes for it but it hasn't lived up to the hype.",
      reviewer: "Verified Buyer",
      context: "2 stars",
      source: "MERIT Beauty",
      stars: 2,
    },
  },
  {
    rank: 3,
    slug: "skin1004-centella-hyalu-cica-water-fit",
    brand: "SKIN1004",
    name: "Centella Hyalu-Cica Water-Fit",
    tagline: "For Sensitive Skin",
    price: "$18.99",
    spf: "SPF 50+ PA++++",
    finish: "Serum-like, hydrating",
    best: "Sensitive, reactive",
    origin: "Korea",
    notes:
      "Built around Madagascar centella — the anti-redness cult hero. Doubles as a serum. If your skin flinches at everything else, start here.",
    pros: ["Calming centella + cica", "Hydrating serum texture", "No fragrance"],
    cons: ["Not grippy under makeup", "Slightly tacky in humidity"],
    rating: 4.6,
    reviews: "400",
    color: "#D9C4A3",
    image: "/products/skin1004-centella.jpg",
    affiliateKey: "skin1004Centella",
    quotePositive: {
      text: "This is the only sunscreen I've been able to tolerate on my face and plays well with other skincare, makeup, primers etc! It's lightweight, moisturizing, but also not greasy/oily! Once it's on, I forget I'm even wearing it, which is a first for me. I now will wear the most important skincare item, because it hasn't caused breakouts.",
      reviewer: "LittleLisa",
      context: "Verified Purchase",
      source: "Amazon",
      stars: 5,
    },
    quoteCritical: {
      text: "This sunscreen is creamy but not oily or heavy and does not leave my skin shiny. It's not my favorite sunscreen but it is in my top 3. It comes at a fair price so I would recommend it.",
      reviewer: "Irene",
      context: "combination skin, Verified Purchase",
      source: "Amazon",
      stars: 4,
    },
  },
  {
    rank: 4,
    slug: "numbuzin-no3-porcelain-base-skip-tone-up",
    brand: "numbuzin",
    name: "No.3 Porcelain Base-skip Tone Up",
    tagline: "The Makeup Swap",
    price: "$19.59",
    spf: "SPF 50+ PA++++",
    finish: "Soft-blur, tone-up",
    best: "Dull skin, minimal makeup days",
    origin: "Korea",
    notes:
      "Replaces foundation on low-effort days. Blurs pores, evens tone, and lands SPF 50 in one step.",
    pros: ["Skips a whole makeup step", "Visible soft-focus effect", "Beige undertone flatters most"],
    cons: ["One shade (runs warm)", "Can flash on camera"],
    rating: 4.2,
    reviews: "3,056",
    color: "#EBCBB0",
    image: "/products/numbuzin-no3.jpg",
    affiliateKey: "numbuzin3",
    quotePositive: {
      text: "This is the best sunscreen I have ever bought!! It has great coverage, and can act as a light foundation for your makeup. It looks a little greasy when you first put it on, but after about 5 to 10 minutes it takes on a more matted finish.",
      reviewer: "Annaliese",
      context: "Verified Purchase",
      source: "Amazon",
      stars: 5,
    },
    quoteCritical: {
      text: "Ok, for what it is, it's not bad. It definitely has a good amount of sun protection, and a fair amount of pigment as well. Where this struggles is in the color of that pigment. It calls itself beige, it looks beige coming out of the tube. It is not beige. Not even a little.",
      reviewer: "Kathareen McKnight",
      context: "Verified Purchase",
      source: "Amazon",
      stars: 4,
    },
  },
  {
    rank: 5,
    slug: "live-tinted-hueguard-3-in-1-mineral",
    brand: "Live Tinted",
    name: "Hueguard 3-in-1 Mineral",
    tagline: "The Multitasker",
    price: "$36",
    spf: "SPF 30",
    finish: "Moisturizing, tinted",
    best: "Minimalists, travel",
    origin: "USA",
    notes:
      "Sunscreen + moisturizer + primer in one tube. Made by Deepica Mutyala specifically for deep and melanin-rich skin.",
    pros: ["Three products in one", "No white cast on deep skin", "Travel-friendly"],
    cons: ["Only SPF 30", "Four shades"],
    rating: 4.2,
    reviews: "505",
    color: "#C99775",
    image: "/products/live-tinted-hueguard.jpg",
    affiliateKey: "liveTinted",
    quotePositive: {
      text: "The absolute best! I was a huge fan of Elta MD UV clear (tinted and original formulas). This has about as much tint as the Elta tinted. It's perfectly light, hydrating, non-greasy, and skin beautifying. No white cast, it feels like a moisturizer, plays nicely with other products, and the light scent is dreamy.",
      reviewer: "Mama to Max",
      context: "dry, mature, fair skin — Verified Purchase",
      source: "Amazon",
      stars: 5,
    },
    quoteCritical: {
      text: "I got this as a sample from Ulta and liked it so much I bought the big bottle. Does not work the same. I see a white cast and my rosacea does not like it. Disappointed because I am looking for a sunscreen that doesn't aggravate my skin, but also doesn't make me look pasty white. May work for some, but not for me.",
      reviewer: "Kelly",
      context: "rosacea-prone skin — Verified Purchase",
      source: "Amazon",
      stars: 1,
    },
  },
  {
    rank: 6,
    slug: "beauty-of-joseon-daily-tinted-fluid",
    brand: "Beauty of Joseon",
    name: "Daily Tinted Fluid Sunscreen",
    tagline: "The Shade Upgrade",
    price: "$16",
    spf: "SPF 40 (US formula)",
    finish: "Dewy, natural glow",
    best: "Dry to normal, 12 shades",
    origin: "Korea",
    notes:
      "Beauty of Joseon's first-ever mineral-tinted formula. 12 shades with true neutral and cool options — the rare K-beauty SPF that actually works on cool-toned skin.",
    pros: ["12 shades including cool neutrals", "BOJ brand trust + quality", "Under $20"],
    cons: ["US formula uses chemical filters (differs from Korean version)", "Dewy — oily skin will shine"],
    rating: 4.0,
    reviews: "1,796",
    color: "#E8D5B9",
    image: "/products/boj-daily-tinted.jpg",
    affiliateKey: "bojDailyTinted",
    quotePositive: {
      text: "I am something of a sunscreen connoisseur and have tried many tinted sunscreens, from luxury brands to drugstore brands to k-beauty and c-beauty. When you apply most of these tinted sunscreens in the proper amount, they look streaky, don't ever really dry, or look like a mask.",
      reviewer: "ItsJess",
      context: "Color #LP110, Verified Purchase",
      source: "Amazon",
      stars: 5,
    },
    quoteCritical: {
      text: "I REALLY wanted to love this. I got 2 shades to try out and I found that mixed together, they were a good shade match. The coverage is not bad for a tinted sunscreen. Not a huge fan of how it applies — it feels really greasy and felt awful on my skin in 90 degree NYC humid weather.",
      reviewer: "youarecosmic",
      context: "Color #LP110, Verified Purchase",
      source: "Amazon",
      stars: 2,
    },
  },
  {
    rank: 7,
    slug: "ilia-super-serum-skin-tint",
    brand: "ILIA",
    name: "Super Serum Skin Tint SPF 40",
    tagline: "The Cult Classic",
    price: "$48",
    spf: "SPF 40",
    finish: "Dewy, glass-skin",
    best: "All skin types, 30 shades",
    origin: "USA",
    notes:
      "The product that arguably started the skin-tint category. 30 shades, 100% mineral zinc oxide, hyaluronic acid, niacinamide, squalane — and 15,000+ verified reviews to prove it.",
    pros: ["30 inclusive shades", "100% mineral zinc oxide", "Fragrance-free + non-comedogenic"],
    cons: ["Dewy — not transfer-proof", "Can pill over silicone-based skincare", "Dropper can be inconsistent"],
    rating: 4.5,
    reviews: "15,242",
    color: "#D4B896",
    image: "/products/ilia-super-serum.jpg",
    affiliateKey: "iliaSerumTint",
    quotePositive: {
      text: "Let me preface by saying this review is unincentivized. I am on my eighth bottle, and do not ever intend on stopping. I found about the Serum Skin Tint a few years ago, and was absolutely blown away by the effects. At that time, I'd tried and failed to find a mineral sunscreen that was non-comedogenic, nourishing, fragrance-free, and didn't make me look as if I rolled about in dry clay.",
      reviewer: "Rubi",
      context: "combination skin, age 25–34, Verified Buyer",
      source: "ILIA Beauty",
      stars: 5,
    },
    quoteCritical: {
      text: "I've been using this foundation for a long time and overall love it, but my most recent order the foundation is hard to get out with the dropper and it comes out clumpy. I've tried shaking it and nothing works. This has never happened and not sure if they gave me an old one.",
      reviewer: "Holly B.",
      context: "dry skin, Verified Buyer",
      source: "ILIA Beauty",
      stars: 3,
    },
  },
  {
    rank: 8,
    slug: "eltamd-uv-clear-tinted-spf-46",
    brand: "EltaMD",
    name: "UV Clear Tinted SPF 46",
    tagline: "Derm's #1 Pick",
    price: "$47",
    spf: "SPF 46",
    finish: "Matte, invisible",
    best: "Acne-prone, rosacea, sensitive",
    origin: "USA",
    notes:
      "The sunscreen dermatologists actually recommend. 5% niacinamide, oil-free, fragrance-free — clinically designed for acne and rosacea skin. One universal warm tint with 20,000+ ratings.",
    pros: ["#1 derm-recommended brand in the US", "5% niacinamide for acne + rosacea", "Over 20,000 verified ratings"],
    cons: ["One shade only (warm/golden — not for very fair or cool-toned skin)", "Hybrid formula (zinc oxide + octinoxate)"],
    rating: 4.6,
    reviews: "20,894",
    color: "#C8A882",
    image: "/products/eltamd-uv-clear-tinted.jpg",
    affiliateKey: "eltaMDClear",
    quotePositive: {
      text: "This is the BEST sunscreen I have ever used. I have rosacea and cystic acne prone skin. This sunscreen doesn't make either of them flare up. It's lightweight and goes on very nicely. My skin is so uneven from sun damage, acne and rosacea and this sunscreen evens all that out. My skin has never looked better using this product.",
      reviewer: "Danielle",
      context: "rosacea + acne-prone skin, Verified Purchase",
      source: "Amazon",
      stars: 5,
    },
    quoteCritical: {
      text: "It is a good sunscreen but I ordered a tinted one, it gives yellowish skin tone. It will fit someone who already has a tan, not me with my pale skin.",
      reviewer: "Liza Sukhanova",
      context: "pale/fair skin, Verified Purchase",
      source: "Amazon",
      stars: 4,
    },
  },
  {
    rank: 9,
    slug: "la-roche-posay-anthelios-mineral-tinted",
    brand: "La Roche-Posay",
    name: "Anthelios Mineral Tinted SPF 50",
    tagline: "The Pharmacy Staple",
    price: "$39.99",
    spf: "SPF 50",
    finish: "Matte, soft",
    best: "All skin types, 4 shades",
    origin: "France",
    notes:
      "31,000 Amazon ratings and counting. The French pharmacy formula trusted by dermatologists worldwide — pure titanium dioxide mineral, water-resistant 40 min, zero white cast.",
    pros: ["31,000+ Amazon ratings", "100% mineral (titanium dioxide)", "Water-resistant 40 min, Skin Cancer Foundation seal"],
    cons: ["Only 4 shades", "Can feel slightly heavy in intense heat"],
    rating: 4.5,
    reviews: "31,035",
    color: "#C8B5A0",
    image: "/products/lrp-anthelios-tinted.jpg",
    affiliateKey: "lrpAnthelios",
    quotePositive: {
      text: "The tinted Anthelios is my go to sunscreen for summer. It is light, easy to apply, and dries quickly to a soft matte finish. There is no white cast, no discernible sunscreen odor. It softens facial imperfections without the weigh down of makeup. It just leaves a natural fresh look. My skin but better.",
      reviewer: "JMCDN",
      context: "Verified Purchase, March 2026",
      source: "Amazon",
      stars: 5,
    },
    quoteCritical: {
      text: "It is a fine sunscreen. But the question is does it worth that amount of money? The answer is NO. I won't buy it again unless it comes down to a lower price. It does not do anything special. It only glides nicely on skin and is light. Nothing else.",
      reviewer: "MM",
      context: "Verified Purchase",
      source: "Amazon",
      stars: 3,
    },
  },
];

export const QUIZ_QUESTIONS = [
  {
    q: "What's your skin doing today?",
    options: [
      { label: "Oily by noon",      value: "oily",      icon: "💧" },
      { label: "Dry & tight",       value: "dry",       icon: "🌵" },
      { label: "Red or reactive",   value: "sensitive", icon: "🌸" },
      { label: "Normal-ish",        value: "normal",    icon: "✨" },
    ],
  },
  {
    q: "What finish do you want?",
    options: [
      { label: "Invisible, no trace",      value: "invisible", icon: "◦" },
      { label: "Lit-from-within glow",     value: "dewy",      icon: "◉" },
      { label: "Soft blur, tone-up",       value: "blur",      icon: "◍" },
      { label: "Matte, no shine",          value: "matte",     icon: "◎" },
    ],
  },
  {
    q: "Mineral or chemical filters?",
    options: [
      { label: "Mineral only",          value: "mineral",  icon: "🪨" },
      { label: "Chemical is fine",      value: "chemical", icon: "🧪" },
      { label: "Whichever works best",  value: "either",   icon: "🤷" },
    ],
  },
  {
    q: "Your budget per bottle?",
    options: [
      { label: "Under $20", value: "low",  icon: "$"   },
      { label: "$20–$35",   value: "mid",  icon: "$$"  },
      { label: "$35+",      value: "high", icon: "$$$" },
    ],
  },
];

// Slugs for easy lookup
const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug)!;

export function quizResult(answers: Record<string, string>): Product {
  const { skin, finish, filters, budget } = answers;

  // Acne / rosacea → EltaMD is the clinical pick
  if (skin === "sensitive" && filters === "mineral" && budget === "high")
    return bySlug("eltamd-uv-clear-tinted-spf-46");

  // Sensitive skin → SKIN1004 centella
  if (skin === "sensitive")
    return bySlug("skin1004-centella-hyalu-cica-water-fit");

  // Soft-blur / tone-up finish → Numbuzin
  if (finish === "blur")
    return bySlug("numbuzin-no3-porcelain-base-skip-tone-up");

  // Mineral-only filters
  if (filters === "mineral") {
    // Budget under $20 → BOJ Daily Tinted (12 shades, mineral)
    if (budget === "low")
      return bySlug("beauty-of-joseon-daily-tinted-fluid");
    // Wide shade range → Ilia (30 shades, $48)
    if (budget === "high")
      return bySlug("ilia-super-serum-skin-tint");
    // Mid-range → La Roche-Posay (4 shades, pharmacy trust, SPF 50)
    return bySlug("la-roche-posay-anthelios-mineral-tinted");
  }

  // Matte finish → EltaMD (derm matte)
  if (finish === "matte")
    return bySlug("eltamd-uv-clear-tinted-spf-46");

  // Minimalist / multitasker → Live Tinted
  if (finish === "dewy" && budget === "high")
    return bySlug("live-tinted-hueguard-3-in-1-mineral");

  // Budget under $20 → BOJ Aqua-Fresh (oily/combo default)
  if (budget === "low")
    return bySlug("beauty-of-joseon-relief-sun-aqua-fresh");

  // Mid-budget with mineral preference → MERIT
  if (budget === "mid" || budget === "high")
    return bySlug("merit-the-uniform-tinted-mineral");

  // Default → BOJ Aqua-Fresh
  return bySlug("beauty-of-joseon-relief-sun-aqua-fresh");
}
