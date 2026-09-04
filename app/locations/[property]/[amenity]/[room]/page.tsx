import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AppShell from '@/components/AppShell';
import PageHeading from '@/components/PageHeading';
import GalleryGrid from '@/components/GalleryGrid';
import { BackLink } from '@/components/Shared';
import { getPropertiesWithAmenities, getProperty } from '@/lib/content';

export function generateStaticParams() {
  return getPropertiesWithAmenities().flatMap((property) =>
    (property.amenities ?? []).flatMap((amenity) =>
      (amenity.subAmenities ?? []).map((sub) => ({
        property: property.slug,
        amenity: amenity.slug,
        room: sub.slug,
      }))
    )
  );
}

function findSubAmenity(propertySlug: string, amenitySlug: string, roomSlug: string) {
  const property = getProperty(propertySlug);
  const amenity = property?.amenities?.find((a) => a.slug === amenitySlug);
  const sub = amenity?.subAmenities?.find((s) => s.slug === roomSlug);
  return { property, amenity, sub };
}

export function generateMetadata({
  params,
}: {
  params: { property: string; amenity: string; room: string };
}): Metadata {
  const { property, amenity, sub } = findSubAmenity(params.property, params.amenity, params.room);
  if (!property || !amenity || !sub) return {};
  return { title: `${property.name} — ${amenity.title} — ${sub.title}` };
}

export default function SubAmenityPage({
  params,
}: {
  params: { property: string; amenity: string; room: string };
}) {
  const { property, amenity, sub } = findSubAmenity(params.property, params.amenity, params.room);
  if (!property || !amenity || !sub) notFound();

  return (
    <AppShell
      crumbs={[
        { label: 'Locations', href: '/locations' },
        { label: property.name, href: `/locations/${property.slug}` },
        { label: amenity.title, href: `/locations/${property.slug}/${amenity.slug}` },
        { label: sub.title },
      ]}
    >
      <BackLink href={`/locations/${property.slug}/${amenity.slug}`}>
        Back to {amenity.title}
      </BackLink>
      <PageHeading title={sub.title} lede={sub.pageDescription} />

      {sub.images && <GalleryGrid images={sub.images} />}

      {sub.infoGroups && sub.infoGroups.length > 0 && (
        <section className="mt-10 pt-8 border-t border-line">
          <div className="font-mono text-[10px] tracking-[.08em] text-ink-soft/70 mb-4">ROOM INFORMATION</div>
          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-[18px]">
            {sub.infoGroups.map((group, i) => (
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
