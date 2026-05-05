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

export function quizResult(answers: Record<string, string>): Product {
  if (answers.skin === "sensitive") return PRODUCTS[2];
  if (answers.finish === "blur")    return PRODUCTS[3];
  if (answers.filters === "mineral") return PRODUCTS[1];
  return PRODUCTS[0];
}
