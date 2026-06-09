// Central source of truth for the site's structured data (JSON-LD).
//
// One canonical Person/Organization/WebSite entity anchors the brand so search
// engines can disambiguate "Apex Wizard" (the motorcycle suspension app) from
// Oracle APEX, APEX Medical, Apex Waste, etc. Builders below produce complete
// JSON-LD documents to feed <JsonLd data={...} />.

import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  PATREON_URL,
  CONTACT_EMAIL,
} from "@/lib/constants";

export const SITE_URL = "https://www.apex-wizard.com";
export const SITE_NAME = "Apex Wizard";
const REDDIT_URL = "https://www.reddit.com/r/ApexWizard/";
const LOGO_URL = `${SITE_URL}/assets/favicon.png`;
const SHARE_IMAGE = `${SITE_URL}/assets/hero%202.png`;

const PERSON_ID = `${SITE_URL}/#adrian-dokoza`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type Node = Record<string, unknown>;

/** Resolve a site-relative path (or pass through an absolute URL). */
export function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Wrap one node, or an array of nodes, into a complete @context document. */
function doc(node: Node | Node[]): Node {
  const nodes = Array.isArray(node) ? node : [node];
  return nodes.length === 1
    ? { "@context": "https://schema.org", ...nodes[0] }
    : { "@context": "https://schema.org", "@graph": nodes };
}

// ---------------------------------------------------------------------------
// Canonical entity nodes (no @context — composed into graphs / referenced by @id)
// ---------------------------------------------------------------------------

const personNode: Node = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Adrian Dokoza",
  url: `${SITE_URL}/about`,
  jobTitle: "Founder & Developer",
  worksFor: { "@id": ORG_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nussbaumen",
    addressCountry: "CH",
  },
  knowsAbout: [
    "Motorcycle suspension tuning",
    "Track day setup",
    "Motorcycle telemetry",
    "Vehicle dynamics",
  ],
  sameAs: [APP_STORE_URL, PLAY_STORE_URL],
};

const organizationNode: Node = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: "Apex Wizard — Moto Performance",
  url: SITE_URL,
  logo: LOGO_URL,
  image: SHARE_IMAGE,
  email: CONTACT_EMAIL,
  founder: { "@id": PERSON_ID },
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nussbaumen",
      addressCountry: "CH",
    },
  },
  // Verified off-site profiles — the disambiguation anchor for the entity.
  sameAs: [APP_STORE_URL, PLAY_STORE_URL, PATREON_URL, REDDIT_URL],
};

const websiteNode: Node = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
  about: {
    "@type": "Thing",
    name: "Motorcycle suspension tuning and track day setup",
  },
};

const appNode: Node = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#app`,
  name: SITE_NAME,
  alternateName: "Apex Wizard: Moto Performance",
  description:
    "A motorcycle suspension logbook, symptom-based setup troubleshooter and track-day companion. Log clickers and sag, compare sessions, and get data-driven tuning recommendations for 115+ bikes.",
  applicationCategory: "SportsApplication",
  applicationSubCategory: "Motorcycle suspension setup",
  operatingSystem: "iOS, Android",
  url: SITE_URL,
  downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
  installUrl: APP_STORE_URL,
  screenshot: SHARE_IMAGE,
  author: { "@id": PERSON_ID },
  publisher: { "@id": ORG_ID },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Suspension setup logbook (clickers, sag, spring rates, ride height)",
    "Symptom-based suspension troubleshooter by corner phase",
    "Tire wear and pressure-gain analysis",
    "Track session telemetry logbook",
    "Fuel load calculator",
    "115+ motorcycle database with factory-accurate clicker limits",
  ],
  // aggregateRating is intentionally omitted: no verified rating data is
  // available, and fabricated review markup is a manual-action risk.
};

// ---------------------------------------------------------------------------
// Ready-to-use documents
// ---------------------------------------------------------------------------

/** Site-wide identity graph. Inject once in the root layout. */
export const siteJsonLd = doc([personNode, organizationNode, websiteNode]);

/** The app entity. Inject on the homepage. */
export const appJsonLd = doc(appNode);

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: Crumb[]): Node {
  return doc({
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  });
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqJsonLd(items: FaqItem[]): Node {
  return doc({
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  });
}

export interface ArticleMeta {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  section?: string;
}

export function articleJsonLd(meta: ArticleMeta): Node {
  return doc({
    "@type": "TechArticle",
    headline: meta.title,
    description: meta.description,
    url: abs(meta.path),
    mainEntityOfPage: abs(meta.path),
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.datePublished,
    inLanguage: "en",
    image: SHARE_IMAGE,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    ...(meta.section ? { articleSection: meta.section } : {}),
  });
}

export interface ItemListEntry {
  name: string;
  path: string;
}

/** ItemList for hub/index pages (guides hub, setup index, manufacturer index). */
export function itemListJsonLd(items: ItemListEntry[]): Node {
  return doc({
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
  });
}
