const homePageRedirectUrls = [
  '/basketball-analysis-package',
  '/basketball/gianna-bryant',
  '/basketball/why-does-nobody-watch-the-wnba',
  '/basketball/sue-bird-twitter',
  '/basketball/wnba-predictions',
  '/basketball/chicago-sky-best-players',
  '/basketball/wnba-free-agency',
  '/basketball/wnba-top-scorers',
  '/basketball/best-womens-basketball-socks',
  '/basketball/best-pool-basketball-hoops',
  '/basketball/best-portable-basketball-hoops',
  '/basketball/best-basketball-net-backstops',
  '/basketball/best-massage-guns-for-basketball-players',
  '/basketball/wilson-evolution-basketball',
  '/basketball/wilson-sporting-goods-retail-stores',
  '/basketball/basketball-mothers-day-gifts',
  '/basketball/custom-basketballs',
  '/basketball/seattle-storm-announcers',
  '/basketball/best-gym-duffle-bags',
  '/basketball/best-backpacks',
  '/basketball/best-basketball-pumps',
  '/basketball/candace-parker-draymond-green-show',
  '/basketball/basketball-arcade-games',
  '/basketball/valentines-gifts',
  '/basketball/sue-bird-autographed-memorabilia',
  '/basketball/best-basketball-trainers-on-instagram',
];

const homePageRedirects = homePageRedirectUrls.map((url) => ({
  source: url,
  destination: '/',
  permanent: true,
}));

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
      ...homePageRedirects,
      {
        source: '/:category*/:slug*/amp',
        destination: '/:category*/:slug*',
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
