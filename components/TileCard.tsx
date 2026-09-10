import Image from 'next/image';
import Link from 'next/link';

export default function TileCard({
  href,
  image,
  title,
  description,
  arrowLabel,
}: {
  href: string;
  image: string;
  title: string;
  description: string;
  arrowLabel: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-paper border border-line rounded-[14px] overflow-hidden relative shadow-sm transition-shadow transition-transform duration-[180ms] hover:shadow-md hover:-translate-y-0.5"
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={150}
        className="w-full h-[150px] object-cover block"
      />
      <div className="px-[18px] pt-4 pb-[18px]">
        <h3 className="font-serif text-base mb-1 text-ink">{title}</h3>
        <p className="text-[12.5px] text-ink-soft">{description}</p>
        <span className="font-mono text-xs text-amber font-semibold mt-2 inline-block">
          {arrowLabel} &rarr;
        </span>
      </div>
    </Link>
  );
}
