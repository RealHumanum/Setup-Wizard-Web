import { Faq } from "@/components/content/Faq";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, type FaqItem } from "@/lib/schema";

// Visual FAQ accordion + matching FAQPage JSON-LD in one drop-in. Use this on
// content pages instead of <Faq /> so every FAQ also emits structured data.
export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <>
      <Faq items={items} />
      <JsonLd data={faqJsonLd(items)} />
    </>
  );
}
