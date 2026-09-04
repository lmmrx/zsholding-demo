import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AppShell from '@/components/AppShell';
import TileCard from '@/components/TileCard';
import { BackLink } from '@/components/Shared';
import { getPropertiesWithAmenities, getProperty } from '@/lib/content';

export function generateStaticParams() {
  return getPropertiesWithAmenities().map((p) => ({ property: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { property: string };
}): Metadata {
  const property = getProperty(params.property);
  return { title: property?.name ?? 'Property' };
}

export default function PropertyHubPage({
  params,
}: {
  params: { property: string };
}) {
  const property = getProperty(params.property);
  if (!property || !property.amenities || property.amenities.length === 0) {
    notFound();
  }
  const amenities = property!.amenities!;

  return (
    <AppShell
      crumbs={[
        { label: 'Locations', href: '/locations' },
        { label: property.name },
      ]}
    >
      <BackLink href="/locations">Back to Locations</BackLink>

      <div className="relative overflow-hidden rounded-[20px] text-white shadow-md bg-gradient-to-br from-navy to-slate mb-9">
        <Image
          src={property.image}
          alt={`${property.name} exterior`}
          width={1080}
          height={220}
          className="w-full h-[220px] object-cover block"
        />
        <div className="px-8 py-7">
          <div className="font-mono text-[11.5px] tracking-[.1em] uppercase text-amber-soft mb-3.5">
            Property overview
          </div>
          <h1 className="font-serif text-[26px] font-semibold text-white mb-1">
            {property.name}
          </h1>
          <p className="mb-3.5 text-white/90">{property.address}</p>
          <div className="inline-flex items-center gap-2.5 bg-white/[0.08] border border-white/[0.18] rounded-[10px] px-4 py-2.5 font-mono text-xs">
            <span>
              Booking: <b className="text-amber-soft">{property.bookingPhone}</b>
            </span>
          </div>
        </div>
      </div>

      <p className="text-[15.5px] text-ink-soft max-w-[640px] leading-[1.6] mb-[38px]">
        {property.hubLede}
      </p>

      <div className="grid grid-cols-3 max-[900px]:grid-cols-2 gap-[18px]">
        {amenities.map((amenity) => (
          <TileCard
            key={amenity.slug}
            href={`/locations/${property.slug}/${amenity.slug}`}
            image={amenity.tileImage}
            title={amenity.title}
            description={amenity.tileDescription}
            arrowLabel={amenity.tileArrowLabel}
          />
        ))}
      </div>
    </AppShell>
  );
}
