import type { Metadata } from 'next';

import AppShell from '@/components/AppShell';
import Hero from '@/components/Hero';
import SubTabs from '@/components/SubTabs';
import PageHeading from '@/components/PageHeading';
import PriorityCard from '@/components/PriorityCard';
import OrgChart from '@/components/OrgChart';
import { SectionLabel } from '@/components/Shared';
import { getHomeContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  const home = getHomeContent();

  return (
    <AppShell
      crumbs={[
        {
          label: 'Onboarding Portal',
        },
        {
          label: 'Home',
        },
      ]}
    >
      {/* =================================================
          HERO
      ================================================= */}

<Hero
  eyebrow={home.heroEyebrow}
  className="
    mb-9
    w-full
    px-8
    py-7
  "
  topRight={
    <>
      <img
        src="/images/brand/ihg-white.avif"
        alt="IHG Hotels & Resorts"
        className="h-6 w-auto max-w-full object-contain opacity-90"
      />
      <img
        src="/images/brand/holiday-inn-express-white.avif"
        alt="Holiday Inn Express"
        className="h-7 w-auto max-w-full object-contain opacity-95"
      />
      <img
        src="/images/brand/holiday-inn-suites-white.avif"
        alt="Holiday Inn & Suites"
        className="h-6 w-auto max-w-full object-contain opacity-95"
      />
      <img
        src="/images/brand/staybridge-white.avif"
        alt="Staybridge Suites"
        className="h-6 w-auto max-w-full object-contain opacity-95"
      />
    </>
  }
>
  <h1
    className="
      max-w-[640px]

      font-serif
      text-[26px]
      font-semibold
      leading-[1.15]
      tracking-[-.01em]

      text-white

      mb-1
    "
  >
    {home.heroTitle}
  </h1>

  <p
    className="
      max-w-[640px]
      mb-3.5

      text-[14px]
      leading-[1.6]

      text-white/80
    "
  >
    {home.heroLede}
  </p>

  <div
    className="
      inline-flex
      items-center

      bg-white/[0.08]
      border
      border-white/[0.18]
      rounded-[10px]

      px-4
      py-2.5

      font-mono
      text-xs

      text-white/60
    "
  >
    {home.stampLabel}

    <span className="mx-2 text-white/25">
      /
    </span>

    <span className="text-amber-soft">
      {home.stampValue}
    </span>
  </div>
</Hero>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <SubTabs
        tabs={[
          {
            key: 'who',
            label: 'Who We Are',

            content: (
              <section>
                <PageHeading
                  eyebrow={home.overviewEyebrow}
                  title={home.overviewTitle}
                  lede={home.overviewLede}
                  titleSize="small"
                />

                {/* Welcome video */}

                <div
                  className="
                    welcome-video
                    mb-12
                    mt-8
                    aspect-video
                    max-w-[820px]
                  "
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={home.welcomeVideoUrl}
                    title="Welcome video"
                    loading="lazy"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="block"
                  />
                </div>

                {/* Mission / Vision */}

                <div
                  className="
                    mb-12
                    grid
                    grid-cols-2
                    gap-5

                    max-[640px]:grid-cols-1
                  "
                >
                  <PriorityCard
                    label={home.mission.label}
                    title={home.mission.title}
                    description={home.mission.description}
                  />

                  <PriorityCard
                    label={home.vision.label}
                    title={home.vision.title}
                    description={home.vision.description}
                  />
                </div>

                {/* Core Values */}

                <SectionLabel first>
                  Core Values
                </SectionLabel>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-5

                    max-[900px]:grid-cols-2
                    max-[640px]:grid-cols-1
                  "
                >
                  {home.values.map((value, index) => {
                    const accent = value.accent === 'amber' ? 'bg-amber' : 'bg-steel';

                    return (
                      <div
                        key={value.title}
                        className="relative overflow-hidden rounded-[14px] border border-line bg-paper px-5 pt-6 pb-5 shadow-sm transition-shadow transition-transform duration-[180ms] hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className={`absolute left-3.5 right-3.5 top-0 h-1 rounded-b ${accent}`} />

                        <div className="mb-2.5 font-mono text-[10px] tracking-[.06em] text-ink-soft/70">
                          VALUE · {String(index + 1).padStart(2, '0')}
                        </div>

                        <h3 className="mb-2 font-serif text-[18.5px] font-semibold tracking-[-.005em] text-navy">
                          {value.title}
                        </h3>

                        <p className="text-[13.5px] leading-[1.6] text-ink-soft">
                          {value.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ),
          },

          {
            key: 'org',
            label: 'Organizational Chart',

            content: (
              <section>
                <PageHeading
                  eyebrow={home.orgEyebrow}
                  title={home.orgTitle}
                  lede={home.orgLede}
                  titleSize="small"
                />

                <div className="mt-8">
                  <OrgChart
                    leadership={home.orgLeadership}
                    directors={home.orgDirectors}
                    generalManagers={
                      home.orgGeneralManagers
                    }
                  />
                </div>
              </section>
            ),
          },

          {
            key: 'priorities',
            label: 'Our Priorities',

            content: (
              <section>
                <PageHeading
                  eyebrow={home.prioritiesEyebrow}
                  title={home.prioritiesTitle}
                  lede={home.prioritiesLede}
                  titleSize="small"
                />

                <div
                  className="
                    mt-8
                    grid
                    grid-cols-3
                    gap-5

                    max-[900px]:grid-cols-2
                    max-[640px]:grid-cols-1
                  "
                >
                  {home.priorities.map((priority) => (
                    <PriorityCard
                      key={priority.label}
                      label={priority.label}
                      title={priority.title}
                      description={priority.description}
                    />
                  ))}
                </div>
              </section>
            ),
          },
        ]}
      />
    </AppShell>
  );
}
