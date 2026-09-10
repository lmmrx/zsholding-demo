import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import PageHeading from '@/components/PageHeading';
import SubTabs from '@/components/SubTabs';
import TrainingRow from '@/components/TrainingRow';
import VideoCard from '@/components/VideoCard';
import { SectionLabel } from '@/components/Shared';
import { getLearningPortalContent } from '@/lib/content';

export const metadata: Metadata = { title: 'Learning Portal' };

export default function LearningPortalPage() {
  const content = getLearningPortalContent();

  return (
    <AppShell
      crumbs={[
        { label: 'Onboarding Portal', href: '/' },
        { label: 'Learning Portal' },
      ]}
    >
      <PageHeading eyebrow={content.eyebrow} title={content.title} lede={content.lede} />

      <SubTabs
        tabs={[
          {
            key: 'training',
            label: 'Training Materials',
            content: (
              <div>
                <SectionLabel first>{content.requiredLabel}</SectionLabel>
                {content.requiredTraining.map((item) => (
                  <TrainingRow key={item.title} item={item} />
                ))}

                <SectionLabel>{content.recommendedLabel}</SectionLabel>
                {content.recommendedTraining.map((item) => (
                  <TrainingRow key={item.title} item={item} />
                ))}
              </div>
            ),
          },
          {
            key: 'videos',
            label: 'Video Tutorials',
            content: (
              <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 gap-[18px]">
                {content.videos.map((video) => (
                  <VideoCard key={video.title} video={video} />
                ))}
              </div>
            ),
          },
        ]}
      />
    </AppShell>
  );
}
