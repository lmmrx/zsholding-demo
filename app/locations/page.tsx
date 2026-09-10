import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import PageHeading from '@/components/PageHeading';
import BadgeCard from '@/components/BadgeCard';
import { getAllProperties } from '@/lib/content';

export const metadata: Metadata = { title: 'Locations' };

export default function LocationsPage() {
  const properties = getAllProperties();

  return (
    <AppShell crumbs={[{ label: 'Onboarding Portal', href: '/' }, { label: 'Locations' }]}>
      <PageHeading
        eyebrow="Our properties"
        title="Locations"
        lede="ZS Holdings operates seven properties across Alberta. Find the address and direct contact details for each below."
      />

      <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 gap-[18px]">
        {properties.map((property, i) => {
          const hasHub = property.amenities && property.amenities.length > 0;
          return (
            <BadgeCard
              key={property.slug}
              id={`PROPERTY · ${String(i + 1).padStart(2, '0')}`}
              accent={property.accent}
              image={property.image}
              imageAlt={`${property.name} exterior`}
              href={hasHub ? `/locations/${property.slug}` : undefined}
            >
              <h3 className="font-serif text-[17.5px] font-semibold mb-1.5 text-ink tracking-[-.005em]">
                {property.name}
              </h3>
              <p className="text-[13px] text-ink-soft leading-[1.55] mb-3">
                {property.address}
              </p>
              <div className="flex items-center gap-2 text-[12.5px] text-steel font-medium mt-1">
                Booking: {property.bookingPhone}
              </div>
              {hasHub ? (
                <div className="flex items-center gap-2 text-[12.5px] font-semibold text-amber mt-1">
                  View property &rarr;
                </div>
              ) : (
                property.fax && (
                  <div className="flex items-center gap-2 text-[12.5px] text-steel font-medium mt-1">
                    Hotel Fax: {property.fax}
                  </div>
                )
              )}
            </BadgeCard>
          );
        })}
      </div>
    </AppShell>
  );
}
