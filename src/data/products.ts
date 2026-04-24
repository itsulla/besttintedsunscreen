import { AFFILIATE } from "./affiliate.ts";

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
}

export const PRODUCTS: Product[] = [
  {
    rank: 1,
    slug: "beauty-of-joseon-relief-sun-aqua-fresh",
    brand: "Beauty of Joseon",
    name: "Relief Sun: Aqua-Fresh",
    tagline: "Editor's Pick",
    price: "$18",
    spf: "SPF 50+ PA++++",
    finish: "Dewy, invisible",
    best: "Oily & combo skin",
    origin: "Korea",
    notes:
      "A near-weightless chemical SPF that vanishes on skin. No cast, no stickiness. The Korean cult-favorite that restarted the sunscreen conversation.",
    pros: ["Zero white cast", "Lightweight, watery finish", "Under $20"],
    cons: ["Chemical filters (not for purists)", "Smaller 50ml tube"],
    rating: 4.8,
    reviews: "12,400+",
    color: "#F3D5BF",
    image: "/products/boj-aqua-fresh.jpg",
    affiliateKey: "bojAquaFresh",
  },
  {
    rank: 2,
    slug: "merit-the-uniform-tinted-mineral",
    brand: "MERIT",
    name: "The Uniform Tinted Mineral",
    tagline: "Western Champion",
    price: "$38",
    spf: "SPF 45",
    finish: "Satin, tinted",
    best: "All skin tones",
    origin: "USA",
    notes:
      "The rare mineral tint that actually works on deep skin. 12 shades, featherlight, no pilling under foundation.",
    pros: ["True mineral (zinc only)", "12 inclusive shades", "Fragrance-free"],
    cons: ["Pricier per ounce", "Satin — not for oily finishes"],
    rating: 4.6,
    reviews: "3,200+",
    color: "#E8B894",
    image: "/products/merit-uniform.jpg",
    affiliateKey: "meritUniform",
  },
  {
    rank: 3,
    slug: "skin1004-centella-hyalu-cica-water-fit",
    brand: "SKIN1004",
    name: "Centella Hyalu-Cica Water-Fit",
    tagline: "For Sensitive Skin",
    price: "$22",
    spf: "SPF 50+ PA++++",
    finish: "Serum-like, hydrating",
    best: "Sensitive, reactive",
    origin: "Korea",
    notes:
      "Built around Madagascar centella — the anti-redness cult hero. Doubles as a serum. If your skin flinches at everything else, start here.",
    pros: ["Calming centella + cica", "Hydrating serum texture", "No fragrance"],
    cons: ["Not grippy under makeup", "Slightly tacky in humidity"],
    rating: 4.7,
    reviews: "8,100+",
    color: "#D9C4A3",
    image: "/products/skin1004-centella.jpg",
    affiliateKey: "skin1004Centella",
  },
  {
    rank: 4,
    slug: "numbuzin-no3-porcelain-base-skip-tone-up",
    brand: "numbuzin",
    name: "No.3 Porcelain Base-skip Tone Up",
    tagline: "The Makeup Swap",
    price: "$24",
    spf: "SPF 50+ PA++++",
    finish: "Soft-blur, tone-up",
    best: "Dull skin, minimal makeup days",
    origin: "Korea",
    notes:
      "Replaces foundation on low-effort days. Blurs pores, evens tone, and lands SPF 50 in one step.",
    pros: ["Skips a whole makeup step", "Visible soft-focus effect", "Beige undertone flatters most"],
    cons: ["One shade", "Can flash on camera"],
    rating: 4.5,
    reviews: "5,600+",
    color: "#EBCBB0",
    image: "/products/numbuzin-no3.jpg",
    affiliateKey: "numbuzin3",
  },
  {
    rank: 5,
    slug: "live-tinted-hueguard-3-in-1-mineral",
    brand: "Live Tinted",
    name: "Hueguard 3-in-1 Mineral",
    tagline: "The Multitasker",
    price: "$32",
    spf: "SPF 30",
    finish: "Moisturizing, tinted",
    best: "Minimalists, travel",
    origin: "USA",
    notes:
      "Sunscreen + moisturizer + primer in one tube. Made by Deepica Mutyala specifically for deep and melanin-rich skin.",
    pros: ["Three products in one", "No white cast on deep skin", "Travel-friendly"],
    cons: ["Only SPF 30", "Four shades"],
    rating: 4.4,
    reviews: "2,900+",
    color: "#C99775",
    image: "/products/live-tinted-hueguard.jpg",
    affiliateKey: "liveTinted",
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
