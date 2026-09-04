import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar, { type Crumb } from './Topbar';
import { getAllProperties } from '@/lib/content';
import type { SearchEntry } from './PortalSearch';

function getSearchEntries(): SearchEntry[] {
  const entries: SearchEntry[] = [
    { title: 'Home', subtitle: 'ZS Holdings onboarding portal', href: '/', keywords: 'welcome mission vision values organization priorities' },
    { title: 'Locations', subtitle: 'Hotels and properties', href: '/locations', keywords: 'hotels properties red deer hinton edson' },
    { title: 'Learning Portal', subtitle: 'Training, guides, and videos', href: '/learning-portal', keywords: 'training learning courses videos' },
    { title: 'Support', subtitle: 'Help desk contacts and FAQs', href: '/support', keywords: 'help faq questions contacts policies' },
  ];

  for (const property of getAllProperties()) {
    entries.push({
      title: property.name,
      subtitle: property.address,
      href: property.amenities?.length ? `/locations/${property.slug}` : '/locations',
      keywords: `${property.address} ${property.bookingPhone}`,
    });
    for (const amenity of property.amenities ?? []) {
      entries.push({
        title: `${amenity.title} — ${property.name}`,
        subtitle: amenity.tileDescription,
        href: `/locations/${property.slug}/${amenity.slug}`,
        keywords: `${amenity.pageDescription} ${(amenity.rooms ?? []).map((r) => `${r.title} ${r.description} ${r.beds ?? ''}`).join(' ')}`,
      });
      for (const room of amenity.rooms ?? []) {
        entries.push({
          title: `${room.title} — ${property.name}`,
          subtitle: room.beds ? `Beds: ${room.beds}` : room.description,
          href: `/locations/${property.slug}/${amenity.slug}`,
          keywords: `${room.description} ${room.beds ?? ''}`,
        });
      }
      for (const sub of amenity.subAmenities ?? []) {
        entries.push({
          title: `${sub.title} — ${property.name}`,
          subtitle: sub.tileDescription,
          href: `/locations/${property.slug}/${amenity.slug}/${sub.slug}`,
          keywords: `${amenity.title} ${sub.pageDescription}`,
        });
      }
    }
  }
  return entries;
}

export default function AppShell({
  crumbs,
  children,
}: {
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Topbar crumbs={crumbs} searchEntries={getSearchEntries()} />
        <section className="px-12 pt-11 pb-[90px] max-w-[1080px]">
          {children}
        </section>
        <footer className="px-12 py-6 border-t border-line max-w-[1080px]">
          <p className="font-mono text-[11px] text-ink-soft/60">
            © {new Date().getFullYear()} Zainul & Shazma Holdings Ltd. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
