import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import PageHeading from '@/components/PageHeading';
import SubTabs from '@/components/SubTabs';
import BadgeCard from '@/components/BadgeCard';
import FaqAccordion from '@/components/FaqAccordion';
import { getSupportContent } from '@/lib/content';

export const metadata: Metadata = { title: 'Help & Support' };

export default function SupportPage() {
  const content = getSupportContent();

  return (
    <AppShell
      crumbs={[
        { label: 'Onboarding Portal', href: '/' },
        { label: 'Help & Support' },
      ]}
    >
      <PageHeading eyebrow={content.eyebrow} title={content.title} lede={content.lede} />

      <SubTabs
        tabs={[
          {
            key: 'contacts',
            label: 'Contacts',
            content: (
              <div className="grid grid-cols-2 max-[900px]:grid-cols-2 gap-[18px]">
                {content.contacts.map((desk) => (
                  <BadgeCard key={desk.code} id={desk.code} accent={desk.accent}>
                    <h3 className="font-serif text-[17.5px] font-semibold mb-1.5 text-navy tracking-[-.005em]">
                      {desk.title}
                    </h3>
                    <p className="text-[13px] text-ink-soft leading-[1.55] mb-3">
                      {desk.description}
                    </p>
                    <span className="inline-block font-mono text-[10.5px] bg-amber-soft text-[#7A5316] px-2 py-[3px] rounded mr-1.5 mb-1">
                      {desk.hours}
                    </span>
                    <div className="flex items-center gap-2 text-[12.5px] text-slate font-medium mt-1">
                      {desk.contactLine}
                    </div>
                  </BadgeCard>
                ))}
              </div>
            ),
          },
          {
            key: 'faqs',
            label: 'FAQs',
            content: <FaqAccordion categories={content.faqCategories} />,
          },
        ]}
      />
    </AppShell>
  );
}
