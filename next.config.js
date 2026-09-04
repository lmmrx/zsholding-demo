/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` emits a fully static site into /out
  // that can be hosted anywhere (GitHub Pages, S3, Netlify, etc.)
  output: 'export',

  // next/image's default loader needs a server, which static export
  // doesn't have. `unoptimized` keeps <Image> working (as a plain
  // <img> under the hood) without a server.
  images: {
    unoptimized: true,
  },

  // Uncomment and set to your repo name if deploying to
  // https://<user>.github.io/<repo>/ (project pages, not a user/org page).
  // basePath: '/zsholdings-onboarding-portal',
  // assetPrefix: '/zsholdings-onboarding-portal/',

  trailingSlash: true,
};

module.exports = nextConfig;
