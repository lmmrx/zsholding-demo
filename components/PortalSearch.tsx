'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { SearchIcon } from './icons';

export interface SearchEntry {
  title: string;
  subtitle?: string;
  href: string;
  keywords?: string;
}

export default function PortalSearch({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return entries
      .map((entry) => {
        const haystack = `${entry.title} ${entry.subtitle ?? ''} ${entry.keywords ?? ''}`.toLowerCase();
        const title = entry.title.toLowerCase();
        let score = 0;
        if (title === q) score += 100;
        if (title.startsWith(q)) score += 50;
        if (title.includes(q)) score += 25;
        if (haystack.includes(q)) score += 10;
        q.split(/\s+/).forEach((term) => {
          if (haystack.includes(term)) score += 2;
        });
        return { entry, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
      .slice(0, 8)
      .map(({ entry }) => entry);
  }, [entries, query]);

  return (
    <div ref={rootRef} className="relative w-[280px] max-w-[42vw]">
      <div className="flex items-center gap-2 bg-paper border border-line rounded-[9px] px-3 py-2 text-[12.5px] text-ink-soft focus-within:border-steel focus-within:ring-2 focus-within:ring-steel/10 transition">
        <SearchIcon className="w-3.5 h-3.5 opacity-60 shrink-0" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search the portal…"
          aria-label="Search the portal"
          className="w-full bg-transparent outline-none text-ink placeholder:text-ink-soft"
        />
      </div>

      {open && query.trim() && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[360px] max-w-[82vw] bg-paper border border-line rounded-[12px] shadow-xl overflow-hidden z-50">
          {results.length ? (
            <div className="py-1.5">
              {results.map((result) => (
                <Link
                  key={`${result.href}-${result.title}`}
                  href={result.href}
                  onClick={() => {
                    setOpen(false);
                    setQuery('');
                  }}
                  className="block px-4 py-3 hover:bg-bg transition-colors border-b border-line/60 last:border-b-0"
                >
                  <div className="text-[13px] font-semibold text-navy">{result.title}</div>
                  {result.subtitle && (
                    <div className="text-[11.5px] text-ink-soft mt-0.5 line-clamp-1">{result.subtitle}</div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-[12.5px] text-ink-soft">No results for “{query.trim()}”.</div>
          )}
        </div>
      )}
    </div>
  );
}
