/**
 * Schema.org JSON-LD generators. Each function returns a plain object that
 * Schema.astro stringifies into a <script type="application/ld+json"> tag.
 */

import { SITE } from "../data/seo.ts";

const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? path : "/" + path}`;

// ──────────────────────────────────────────────────────────
// Organization / WebSite (emitted on every page via Base.astro)
//
// Hoisted to module-level constants because they're identical on every page
// and would otherwise be rebuilt 13+ times per full build. Zero allocation
// per page render.
// ──────────────────────────────────────────────────────────

const orgSameAs: string[] = [];
if (SITE.social.twitter)
  orgSameAs.push(`https://twitter.com/${SITE.social.twitter.replace("@", "")}`);
if (SITE.social.instagram)
  orgSameAs.push(`https://instagram.com/${SITE.social.instagram}`);
if (SITE.social.pinterest)
  orgSameAs.push(`https://pinterest.com/${SITE.social.pinterest}`);

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: abs(SITE.logo),
  },
  foundingDate: SITE.founded,
  ...(orgSameAs.length > 0 && { sameAs: orgSameAs }),
} as const;

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}#website`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: { "@id": `${SITE.url}#organization` },
  inLanguage: "en",
} as const;

// ──────────────────────────────────────────────────────────
// Breadcrumbs (helper for nav trails)
// ──────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  path: string; // e.g. "/reviews/beauty-of-joseon-relief-sun-aqua-fresh/"
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

// ──────────────────────────────────────────────────────────
// Review (for individual product review pages)
// ──────────────────────────────────────────────────────────

export interface ReviewInput {
  productName: string;
  brand: string;
  image: string;
  description: string;
  rating: number; // 1-5
  reviewBody: string;
  datePublished: string; // YYYY-MM-DD
  author?: string;
  url: string;
  offers?: {
    price: string;
    priceCurrency?: string;
    availability?: string;
    url: string;
  };
}

export function reviewSchema(r: ReviewInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: r.productName,
      brand: { "@type": "Brand", name: r.brand },
      image: abs(r.image),
      description: r.description,
      ...(r.offers && {
        offers: {
          "@type": "Offer",
          price: r.offers.price.replace(/[^0-9.]/g, ""),
          priceCurrency: r.offers.priceCurrency ?? "USD",
          availability: r.offers.availability ?? "https://schema.org/InStock",
          url: r.offers.url,
        },
      }),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Organization",
      name: r.author ?? SITE.name,
    },
    publisher: { "@id": `${SITE.url}#organization` },
    datePublished: r.datePublished,
    reviewBody: r.reviewBody,
    url: abs(r.url),
  };
}

// ──────────────────────────────────────────────────────────
// ItemList (for pillar pages with ranked products)
// ──────────────────────────────────────────────────────────

export interface ListProduct {
  name: string;
  brand: string;
  image: string;
  description: string;
  url: string; // affiliate or review URL
}

export function itemListSchema(name: string, products: ListProduct[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: { "@type": "Brand", name: p.brand },
        image: abs(p.image),
        description: p.description,
        url: p.url,
      },
    })),
  };
}

// ──────────────────────────────────────────────────────────
// FAQPage (unlocks expandable Q&A in SERPs)
// ──────────────────────────────────────────────────────────

export interface FAQItem {
  q: string;
  a: string; // plain text, not HTML
}

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// ──────────────────────────────────────────────────────────
// Article (for guides + comparison pages)
// ──────────────────────────────────────────────────────────

export interface ArticleInput {
  headline: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  articleSection?: string;
}

export function articleSchema(a: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    image: abs(a.image),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: {
      "@type": "Organization",
      name: a.author ?? SITE.name,
    },
    publisher: { "@id": `${SITE.url}#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": abs(a.url),
    },
    ...(a.articleSection && { articleSection: a.articleSection }),
  };
}
