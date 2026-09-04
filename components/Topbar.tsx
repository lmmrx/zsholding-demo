import Link from 'next/link';
import PortalSearch, { type SearchEntry } from './PortalSearch';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Topbar({ crumbs, searchEntries }: { crumbs: Crumb[]; searchEntries: SearchEntry[] }) {
  return (
    <div className="sticky top-0 z-10 bg-bg/[0.86] backdrop-blur-sm border-b border-line px-11 py-[17px] flex items-center justify-between gap-6">
      <div className="font-mono text-xs text-ink-soft tracking-[.03em] min-w-0 truncate">
        {crumbs.map((crumb, i) => (
          <span key={i}>
            {i > 0 && ' / '}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-ink">
                {crumb.label}
              </Link>
            ) : i === crumbs.length - 1 ? (
              <b className="text-ink font-semibold">{crumb.label}</b>
            ) : (
              crumb.label
            )}
          </span>
        ))}
      </div>
      <PortalSearch entries={searchEntries} />
    </div>
  );
}
