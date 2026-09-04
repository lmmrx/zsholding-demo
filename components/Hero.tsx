import type { ReactNode } from 'react';

export default function Hero({
  eyebrow,
  topRight,
  children,
  className = '',
}: {
  eyebrow: string;
  topRight?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] text-white shadow-md bg-gradient-to-br from-navy to-slate before:content-[''] before:absolute before:-right-[60px] before:-top-[60px] before:w-[220px] before:h-[220px] before:rounded-full before:bg-[radial-gradient(circle,rgba(201,138,44,0.25),transparent_70%)] ${className}`}
    >
      <div className="relative">
        <div className="flex items-center justify-between gap-6 mb-3.5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3">
          <div className="font-mono text-[11.5px] tracking-[.1em] uppercase text-amber-soft">
            {eyebrow}
          </div>
          {topRight && (
            <div className="relative z-10 flex items-center gap-5 max-[640px]:gap-3">
              {topRight}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
