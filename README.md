# ZS Holdings — Employee Onboarding Portal

Next.js (static export) + Tailwind CSS + Markdown content. This is a rebuild of the
original static HTML/CSS/JS onboarding site on a stack that's much easier to update
and extend.

## Stack

- **Framework:** [Next.js](https://nextjs.org) 14, App Router, `output: 'export'` —
  builds to a plain static `/out` folder you can host anywhere (GitHub Pages, S3,
  Netlify, Vercel, etc.), same as the original site.
- **Styling:** [Tailwind CSS](https://tailwindcss.com) utility classes in the markup.
  The handful of effects that aren't expressible as utilities (the badge-card notch,
  org-chart connector lines, FAQ chevron) live in `app/globals.css`.
- **Content:** Markdown files with YAML frontmatter in `/content`, parsed at build
  time with `gray-matter`. No database, no CMS — content lives in the repo and ships
  with the code.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

## Building for production

```bash
npm run build      # outputs a static site to /out
npm run start       # preview the built /out folder locally
```

Deploy the `/out` folder to any static host. For GitHub Pages under a repo (project)
site, set `basePath` / `assetPrefix` in `next.config.js` first (see the comments
there).

## Project structure

```
app/                          Next.js App Router — one folder per route
├── layout.tsx                 Root layout: fonts, <html>/<body>
├── page.tsx                   Home (/)
├── locations/
│   ├── page.tsx                Locations grid (all 7 properties)
│   └── [property]/
│       ├── page.tsx             Property hub — only rendered for
│       │                        properties that have `amenities` in
│       │                        their content file
│       └── [amenity]/page.tsx   Amenity detail (rooms / gallery)
├── learning-portal/page.tsx
└── support/page.tsx

components/                   Reusable UI: Sidebar, Topbar, AppShell,
                               BadgeCard, Hero, SubTabs, OrgChart, etc.

content/                      *** Edit this to change what's on the site ***
├── home.md                    Mission/vision/values, org chart, priorities
├── learning-portal.md         Training list + video tutorials
├── support.md                 Contact desks + categorized FAQs
└── properties/
    ├── hinton-express.md
    ├── hinton-holiday-inn.md
    ├── edson-express.md
    ├── reddeer-staybridge.md
    ├── reddeer-south.md
    ├── reddeer-express.md
    └── reddeer-north-express.md   Has an `amenities:` list — this is
                                    the one property with a full hub +
                                    rooms/meetings/breakfast/fitness/
                                    pool/parking breakdown

lib/
├── content.ts                 Reads & parses the files in /content
├── types.ts                   TypeScript shapes for all content
└── site-config.ts             Nav items + onboarding progress bar
                                (site chrome, not editorial content)

public/images/                 All photos, organized the same way as
                                the content that references them
```

## Editing content

Everything a non-developer would want to change lives in `/content` as plain YAML
frontmatter — no HTML, no JSX, no touching component code.

- **Fix a phone number, address, or add/remove a value/priority card:** edit the
  relevant `.md` file directly.
- **Add an FAQ:** add a `question`/`answer` pair under the right category in
  `content/support.md`. Add a new category by adding a new `- category: ...` block.
- **Add a training item or video:** add an entry to the relevant array in
  `content/learning-portal.md`.

## Adding a new property

1. Create a new file in `content/properties/`, e.g. `content/properties/hinton-suites.md`:

   ```yaml
   ---
   name: "Example Hotel Name"
   address: "123 Example St, City, Alberta, T0T 0T0 Canada"
   bookingPhone: "1-000-000-0000"
   fax: "1-000-000-0001"
   image: "/images/properties/example-exterior.jpg"
   order: 8
   accent: steel
   ---
   ```

2. Drop the exterior photo into `public/images/properties/`.
3. That's it — it now shows up on the Locations page automatically, sorted by `order`.

## Giving a property the same rooms/meetings/breakfast/fitness/pool/parking
## breakdown that Red Deer North has

Add an `amenities:` list to that property's content file — see
`content/properties/reddeer-north-express.md` for the full example. Each amenity is
either:

- `type: rooms` — a list of `rooms:` (title, image, description), rendered as cards, or
- `type: gallery` — a list of `images:` (src, alt), rendered as a photo grid.

As soon as `amenities:` is non-empty, that property automatically:
- becomes a clickable card on the Locations page,
- gets its own hub page at `/locations/<slug>`,
- gets one page per amenity at `/locations/<slug>/<amenity-slug>`.

No route files to create by hand — `generateStaticParams` in
`app/locations/[property]/page.tsx` and `app/locations/[property]/[amenity]/page.tsx`
picks up every property/amenity combination from the content files at build time.

Put the property's photos in `public/images/<slug>/<amenity-slug>/`.

## Design tokens

Colors and fonts are defined once in `tailwind.config.ts` (ported 1:1 from the
original `css/style.css` `:root` variables) — change a hex value there and it updates
everywhere the corresponding Tailwind class (`bg-navy`, `text-amber`, etc.) is used.
