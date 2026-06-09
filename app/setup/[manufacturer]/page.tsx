import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  allManufacturers,
  bikesByManufacturer,
  type Bike,
} from "@/lib/bikes";
import { PageHero } from "@/components/content/PageHero";
import { BikeCard } from "@/components/setup/BikeCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/schema";

export const dynamicParams = false;

type Params = { manufacturer: string };

export function generateStaticParams(): Params[] {
  return allManufacturers().map((m) => ({ manufacturer: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { manufacturer } = await params;
  const mfg = allManufacturers().find((m) => m.slug === manufacturer);
  if (!mfg) return {};
  const path = `/setup/${manufacturer}`;
  const description = `Motorcycle suspension setup references for every ${mfg.name} sportbike in the Apex Wizard database — adjusters, baseline sag, and tuning, model by model.`;
  return {
    title: `${mfg.name} Suspension Setup Guides | Apex Wizard`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${mfg.name} Suspension Setups`,
      description,
      url: path,
      images: ["/assets/hero 2.png"],
    },
  };
}

function groupByCategory(bikes: Bike[]): [string, Bike[]][] {
  const map = new Map<string, Bike[]>();
  for (const b of bikes) {
    const list = map.get(b.category) ?? [];
    list.push(b);
    map.set(b.category, list);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

export default async function ManufacturerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { manufacturer } = await params;
  const mfg = allManufacturers().find((m) => m.slug === manufacturer);
  if (!mfg) notFound();

  const bikes = bikesByManufacturer(manufacturer).sort((a, b) =>
    a.model.localeCompare(b.model),
  );
  const groups = groupByCategory(bikes);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Setups", path: "/setup" },
          { name: mfg.name, path: `/setup/${manufacturer}` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          bikes.map((b) => ({
            name: `${b.manufacturer} ${b.model}`,
            path: `/setup/${b.manufacturerSlug}/${b.modelSlug}`,
          })),
        )}
      />

      <PageHero
        eyebrow="SETUP DATABASE"
        title={mfg.name}
        accent="Setups"
        updated={`${mfg.count} models`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Setups", href: "/setup" },
          { label: mfg.name },
        ]}
        intro={
          <>
            Suspension setup references for {mfg.count} {mfg.name} models &mdash;
            which adjusters each bike has, where to start, and how to dial it in.
            Pick your bike below.
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-6 pb-24">
        {groups.map(([category, list]) => (
          <section key={category} className="mt-10 first:mt-0">
            <h2 className="mb-4 font-mono text-sm font-extrabold uppercase tracking-widest text-[var(--color-text-muted)]">
              {category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {list.map((bike) => (
                <BikeCard key={bike.modelSlug} bike={bike} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
