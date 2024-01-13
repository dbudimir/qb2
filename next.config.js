/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i2.wp.com', pathname: '**' },
      { protocol: 'https', hostname: 'i1.wp.com', pathname: '**' },
      { protocol: 'https', hostname: 'i0.wp.com', pathname: '**' },
      { protocol: 'https', hostname: 'secure.gravatar.com', pathname: '**' },
      { protocol: 'https', hostname: 'queenballers.club', pathname: '**' },
      { protocol: 'https', hostname: 'queenballers.wpcomstaging.com', pathname: '**', }, // prettier-ignore
      { protocol: 'https', hostname: 'pbs.twimg.com', pathname: '**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:category*/:slug*/amp',
        destination: '/:category*/:slug*',
        permanent: true,
      },
      {
        source: '/basketball-analysis-package',
        destination: '/',
        permanent: true,
      },
      {
        source: '/basketball/sue-bird-autographed-memorabilia',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wnba-draft-2021',
        destination: '/wnba-draft/2021',
        permanent: true,
      },
      {
        source: '/wnba-draft/2021',
        destination: '/wnba-draft',
        permanent: true,
      },
      {
        source: '/basketball/tag/wnba-finals',
        destination: '/wnba-finals',
        permanent: true,
      },
      {
        source: '/basketball/tag/wnba-free-agency',
        destination: '/wnba-free-agency',
        permanent: true,
      },
      {
        source: '/basketball/chicago-sky-best-players',
        destination: '/basketball/tag/chicago-sky',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({});
