/**
 * Affiliate links for Best Tinted Sunscreen.
 *
 * Amazon Associates tag: lekkerandco-20  (amazon.com / US)
 * StyleKorean referral:  still needs to be set (ref=REPLACE placeholders below)
 * YesStyle referral:     still needs to be set
 *
 * Direct /dp/ASIN/ links are used wherever we've verified the ASIN matches
 * the intended product. Links with `/s?k=...` are search fallbacks used
 * when a product is not yet listed on Amazon US (e.g. BoJ Aqua-Fresh) — the
 * tag is still attached so any purchase within 24h earns commission.
 *
 * ASINs were last verified: April 2026. Re-run `node scripts/verify-asins.mjs`
 * if listings change.
 */

const TAG = "lekkerandco-20";
const dp = (asin: string) => `https://www.amazon.com/dp/${asin}/?tag=${TAG}`;
const search = (query: string) =>
  `https://www.amazon.com/s?k=${query.replace(/\s+/g, "+")}&tag=${TAG}`;

export const AFFILIATE = {
  bojAquaFresh: {
    // Not yet listed on Amazon US. Search URL sends users to BoJ's Rice
    // Probiotics + any future Aqua-Fresh stock; 24h cookie still earns.
    amazon: search("beauty of joseon relief sun aqua fresh"),
    stylekorean:
      "https://www.stylekorean.com/shop/goods/goods_search.php?keyword=beauty+of+joseon+aqua+fresh&ref=REPLACE",
    yesstyle:
      "https://www.yesstyle.com/en/list.html/q=beauty+of+joseon+aqua+fresh&ref=REPLACE",
  },
  bojRice: {
    // Verified: "Relief Sun Organic Korean sunscreen SPF50+ PA++++ Rice & Probiotics"
    amazon: dp("B0G4Z5G1NT"),
    stylekorean:
      "https://www.stylekorean.com/shop/goods/goods_search.php?keyword=beauty+of+joseon+rice+probiotics&ref=REPLACE",
  },
  bojDayDew: {
    // Verified: "Matte Sun Stick Mugwort + Camelia Korean Sunscreen Stick"
    // (Used in the Matte Sun Stick comparison row — not the Day Dew sunscreen.)
    amazon: dp("B0D17YFZSZ"),
    stylekorean:
      "https://www.stylekorean.com/shop/goods/goods_search.php?keyword=beauty+of+joseon+matte+sun+stick&ref=REPLACE",
  },
  meritUniform: {
    // Verified: "The Uniform Tinted Mineral Sunscreen Broad Spectrum SPF 45, Fragrance Free"
    amazon: dp("B0F9XHMVVV"),
    merit:
      "https://www.meritbeauty.com/products/the-uniform-tinted-mineral-sunscreen?ref=REPLACE",
  },
  skin1004Centella: {
    // Verified: "SKIN1004 Centella Hyalu-Cica Water-Fit Sun Serum UV, Korean Sunscreen SPF 50"
    amazon: dp("B0FXH5LHN8"),
    stylekorean:
      "https://www.stylekorean.com/shop/goods/goods_search.php?keyword=skin1004+centella+sun+serum&ref=REPLACE",
  },
  numbuzin3: {
    // Verified: "numbuzin No.3 Porcelain Base-skip Tone Up Beige | SPF50+ PA++++"
    // Tone-up tinted sunscreen that doubles as a makeup base.
    amazon: dp("B09HRNCKN4"),
    stylekorean:
      "https://www.stylekorean.com/shop/goods/goods_search.php?keyword=numbuzin+no.3+base+skip&ref=REPLACE",
  },
  numbuzin9: {
    // Verified: "numbuzin No.9 Sunscreen | Super Defense Glow Sunscreen | Broad Spectrum SPF 50"
    amazon: dp("B0F5WFX4L7"),
    stylekorean:
      "https://www.stylekorean.com/shop/goods/goods_search.php?keyword=numbuzin+no.9+sunscreen&ref=REPLACE",
  },
  liveTinted: {
    // Verified: "Live Tinted Hueguard 3-in-1 Mineral Sunscreen, Moisturizer, Primer"
    amazon: dp("B0BG432CRD"),
  },
  bojDailyTinted: {
    // Verified: "Beauty of Joseon Daily Tinted Fluid Sunscreen 12 Shades SPF 40" (US formula)
    amazon: dp("B0DP5ZPRXC"),
    stylekorean:
      "https://www.stylekorean.com/shop/goods/goods_search.php?keyword=beauty+of+joseon+daily+tinted+fluid&ref=REPLACE",
  },
  iliaSerumTint: {
    // Ilia Super Serum Skin Tint SPF 40 — sold via Sephora + brand site + Amazon
    amazon: search("ilia super serum skin tint spf 40"),
    sephora: "https://www.sephora.com/product/ilia-super-serum-skin-tint-spf-40-P508913",
  },
  eltaMDClear: {
    // Verified: "EltaMD UV Clear Broad-Spectrum SPF 46 Tinted Face Sunscreen"
    amazon: dp("B00ZPWR0N8"),
  },
  lrpAnthelios: {
    // Verified: "La Roche-Posay Anthelios Mineral Tinted Ultra-Light Fluid SPF 50"
    amazon: dp("B007U54P36"),
  },
  ceraveMineral: {
    // Verified: "CeraVe 100% Mineral Sunscreen SPF 50, Face sunscreen with Zinc Oxide & Titanium Dioxide"
    amazon: dp("B07KLY4RYG"),
  },
  medicubePDRN: {
    // Verified: "medicube PDRN Pink Peptide Serum with Rose PDRN"
    amazon: dp("B0DCJ7952P"),
  },
  cosrxPDRN: {
    // Search fallback — COSRX PDRN Collagen serum ASIN varies by listing
    amazon: search("COSRX 5 PDRN collagen intense vitalizing serum"),
  },
};
