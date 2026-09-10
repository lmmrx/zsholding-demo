'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  HomeIcon,
  LocationIcon,
  LearningIcon,
  SupportIcon,
} from './icons';

import {
  NAV_ITEMS,
  SITE_TAGLINE,
} from '@/lib/site-config';

const ICONS = {
  home: HomeIcon,
  location: LocationIcon,
  learning: LearningIcon,
  support: SupportIcon,
};

function isNavActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="
        hidden
        max-[640px]:flex

        fixed
        bottom-0
        left-0
        right-0
        z-30

        items-stretch
        justify-around

        bg-navy
        text-white
        shadow-[0_-1px_0_rgba(255,255,255,0.08)]
      "
    >
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const isActive = isNavActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`
              flex flex-1 flex-col items-center justify-center gap-1
              py-2.5
              text-[10px] font-medium

              ${isActive ? 'text-white' : 'text-white/55'}
            `}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
    <aside
      className="
        sticky
        top-0
        z-20
        flex
        h-screen
        w-[264px]
        shrink-0
        flex-col

        bg-navy
        text-white

        shadow-[1px_0_0_rgba(255,255,255,0.05)]

        max-[900px]:w-[220px]
        max-[640px]:hidden
      "
    >
      {/* =================================================
          BRAND
      =================================================
       white BG <div className="mb-4 rounded-lg bg-white px-4 py-3.5"> */}

      <div className="border-b border-white/[0.08] px-6 pb-6 pt-7">
        <div className="mb-4 max-w-[150px] mx-auto">
          <Image
            src="/images/logo/logo-zsholdings.avif"
            alt="ZS Holdings"
            width={216}
            height={60}
            className="block h-auto w-full"
            priority
          />
        </div>

        <div
          className="
            font-mono
            text-[9.5px]
            font-medium
            uppercase
            tracking-[.13em]
            text-white/45
            text-center
          "
        >
          {SITE_TAGLINE}
        </div>
      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav
        className="flex-1 overflow-y-auto px-3 py-5"
        aria-label="Main navigation"
      >
        <div className="mb-3 px-3">
          <span
            className="
              font-mono
              text-[9px]
              font-medium
              uppercase
              tracking-[.13em]
              text-white/30
            "
          >
            Navigation
          </span>
        </div>

        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];

            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-3

                  text-[13.5px]
                  font-medium

                  transition-all
                  duration-150

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-amber/50
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-navy

                  ${
                    isActive
                      ? `
                        bg-white/[0.085]
                        text-white
                      `
                      : `
                        text-white/55
                        hover:bg-white/[0.045]
                        hover:text-white/90
                      `
                  }
                `}
              >
                {/* Active indicator */}

                <span
                  className={`
                    absolute
                    -left-3
                    top-1/2
                    h-6
                    w-[3px]
                    -translate-y-1/2
                    rounded-r-full
                    bg-amber
                    transition-opacity
                    duration-150

                    ${isActive ? 'opacity-100' : 'opacity-0'}
                  `}
                />

                <Icon
                  className={`
                    h-[18px]
                    w-[18px]
                    shrink-0

                    transition-opacity
                    duration-150

                    ${
                      isActive
                        ? 'opacity-100'
                        : 'opacity-70 group-hover:opacity-90'
                    }
                  `}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

    </aside>
    <MobileNav />
    </>
  );
}
