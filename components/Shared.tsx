import Link from 'next/link';

export function SectionLabel({
  children,
  first = false,
}: {
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className={`font-serif text-[20.5px] text-navy font-semibold tracking-[-.01em] ${
        first ? 'mt-0' : 'mt-[38px]'
      } mb-4`}
    >
      {children}
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11.5px] tracking-[.1em] uppercase mb-2.5">
      <Link href={href} className="text-amber font-semibold">
        &larr; {children}
      </Link>
    </p>
  );
}
