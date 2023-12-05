module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'i2.wp.com',
      'i1.wp.com',
      'i0.wp.com',
      'secure.gravatar.com',
      'queenballers.club',
      'queenballers.wpcomstaging.com',
      'pbs.twimg.com',
      'upload.wikimedia.org',
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
      { source: '/basketball/tag/wnba-free-agency', destination: '/wnba-free-agency', permanent: true }, // prettier-ignore
      { source: '/basketball/chicago-sky-best-players', destination: '/basketball/tag/chicago-sky', permanent: true, }, // prettier-ignore
    ];
  },
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({});
