import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AppShell from '@/components/AppShell';
import PageHeading from '@/components/PageHeading';
import BadgeCard from '@/components/BadgeCard';
import GalleryGrid from '@/components/GalleryGrid';
import TileCard from '@/components/TileCard';
import { BackLink } from '@/components/Shared';
import { getPropertiesWithAmenities, getProperty } from '@/lib/content';

export function generateStaticParams() {
  return getPropertiesWithAmenities().flatMap((property) =>
    (property.amenities ?? []).map((amenity) => ({
      property: property.slug,
      amenity: amenity.slug,
    }))
  );
}

function findAmenity(propertySlug: string, amenitySlug: string) {
  const property = getProperty(propertySlug);
  const amenity = property?.amenities?.find((a) => a.slug === amenitySlug);
  return { property, amenity };
}

export function generateMetadata({
  params,
}: {
  params: { property: string; amenity: string };
}): Metadata {
  const { property, amenity } = findAmenity(params.property, params.amenity);
  if (!property || !amenity) return {};
  return { title: `${property.name} — ${amenity.title}` };
}

export default function AmenityPage({
  params,
}: {
  params: { property: string; amenity: string };
}) {
  const { property, amenity } = findAmenity(params.property, params.amenity);
  if (!property || !amenity) notFound();

  const hasSubAmenities = amenity.subAmenities && amenity.subAmenities.length > 0;

  return (
    <AppShell
      crumbs={[
        { label: 'Locations', href: '/locations' },
        { label: property.name, href: `/locations/${property.slug}` },
        { label: amenity.title },
      ]}
    >
      <BackLink href={`/locations/${property.slug}`}>
        Back to {property.name}
      </BackLink>
      <PageHeading title={amenity.title} lede={amenity.pageDescription} />

      {hasSubAmenities ? (
        <div className="grid grid-cols-3 max-[900px]:grid-cols-2 gap-[18px]">
          {amenity.subAmenities!.map((sub) => (
            <TileCard
              key={sub.slug}
              href={`/locations/${property.slug}/${amenity.slug}/${sub.slug}`}
              image={sub.tileImage}
              title={sub.title}
              description={sub.tileDescription}
              arrowLabel={sub.tileArrowLabel}
            />
          ))}
        </div>
      ) : amenity.type === 'rooms' && amenity.rooms ? (
        <div className="grid grid-cols-2 max-[900px]:grid-cols-2 gap-[18px]">
          {amenity.rooms.map((room, i) => (
            <BadgeCard
              key={room.title}
              id={`ROOM · ${String(i + 1).padStart(2, '0')}`}
              accent={i % 2 === 0 ? 'steel' : 'amber'}
              image={room.image}
              imageAlt={room.title}
            >
              <h3 className="font-serif text-[17.5px] font-semibold mb-1.5 text-navy tracking-[-.005em]">
                {room.title}
              </h3>
              {room.beds && (
                <p className="text-[12px] font-semibold text-steel mb-2">Beds: {room.beds}</p>
              )}
              <p className="text-[13px] text-ink-soft leading-[1.55]">
                {room.description}
              </p>
            </BadgeCard>
          ))}
        </div>
      ) : (
        amenity.images && <GalleryGrid images={amenity.images} />
      )}

      {amenity.infoGroups && amenity.infoGroups.length > 0 && (
        <section className="mt-10 pt-8 border-t border-line">
          <div className="font-mono text-[10px] tracking-[.08em] text-ink-soft/70 mb-4">ROOM INFORMATION</div>
          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-[18px]">
            {amenity.infoGroups.map((group, i) => (
              <div key={group.title} className="relative bg-paper border border-line rounded-[14px] px-5 py-5 shadow-sm">
                <div className={`absolute top-0 left-3.5 right-3.5 h-1 rounded-b ${i % 2 === 0 ? 'bg-steel' : 'bg-amber'}`} />
                <h3 className="font-serif text-[17px] font-semibold text-navy mb-3">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-[12.5px] text-ink-soft leading-[1.45] flex gap-2">
                      <span className="text-steel mt-[1px]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
