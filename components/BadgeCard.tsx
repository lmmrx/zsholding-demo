import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface BadgeCardProps {
  id: string;
  accent?: 'steel' | 'amber';
  image?: string;
  imageAlt?: string;
  href?: string;
  children: ReactNode;
}

export default function BadgeCard({
  id,
  accent = 'steel',
  image,
  imageAlt,
  href,
  children,
}: BadgeCardProps) {
  const topbarColor = accent === 'amber' ? 'bg-amber' : 'bg-steel';

  const inner = (
    <>
      <div className={`absolute top-0 left-3.5 right-3.5 h-1 rounded-b ${topbarColor}`} />
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? ''}
          width={400}
          height={150}
          className="w-[calc(100%+40px)] -mx-5 -mt-[22px] mb-3.5 block h-[150px] object-cover rounded-t-[14px]"
        />
      )}
      <div className="font-mono text-[10px] tracking-[.06em] text-ink-soft/70 mb-2.5">
        {id}
      </div>
      {children}
    </>
  );

  const className =
    'badge-card relative bg-paper border border-line rounded-[14px] px-5 pt-[22px] pb-5 shadow-sm transition-shadow transition-transform duration-[180ms]';

  if (href) {
    return (
      <Link href={href} className={`${className} block hover:shadow-md hover:-translate-y-0.5`}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
