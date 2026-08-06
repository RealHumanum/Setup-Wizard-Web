import type { MetadataRoute } from "next";

const SITE_URL = "https://www.apex-wizard.com";

export const dynamic = "force-static";

// AI training / answer-engine crawlers, listed explicitly.
//
// These are allowed deliberately, not by default. The site's whole content
// strategy — entity markup, structured guides, llms.txt — is aimed at being
// quotable by answer engines, and blocking their crawlers would work against
// that. Stating it here means the decision is visible and reversible rather
// than an accident of the wildcard rule.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI
  "OAI-SearchBot", // OpenAI search
  "ChatGPT-User", // OpenAI on-demand fetch
  "ClaudeBot", // Anthropic
  "Claude-User", // Anthropic on-demand fetch
  "PerplexityBot", // Perplexity
  "Google-Extended", // Gemini / Vertex grounding
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
