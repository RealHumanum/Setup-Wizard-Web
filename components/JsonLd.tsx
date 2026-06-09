// Renders a JSON-LD <script> for structured data. Server-rendered and
// static-export safe. The `<` escape prevents a stray "</script>" in the data
// from breaking out of the tag (standard JSON-LD injection guard).
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
