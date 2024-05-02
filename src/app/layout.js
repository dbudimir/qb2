// Global styles
import '../../public/static/style.scss';

// Utils
import { GoogleTagManager } from '@next/third-parties/google';
import { getAdminSettings } from '/utils/getReturn';
import StyledComponentsRegistry from '../../lib/registry';

// Components
import NavAd from '../../components/ads/NavAd';
import Nav from '../../components/nav/Nav';
import BannerAd from '../../components/ads/BannerAd';
import Footer from '../../components/Footer';

export const metadata = {
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/static/queen-ballers-icon.png',
        href: '/static/queen-ballers-icon.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/static/queen-ballers-icon-dm.png',
        href: '/static/queen-ballers-icon-dm.png',
      },
    ],
  },
};

export default async function RootLayout({ children }) {
  // Data
  let adminSettings = {};
  try {
    adminSettings = await getAdminSettings().then((res) => res);
  } catch (error) {
    throw new Error(`Failed to fetch data fetching admin settings`);
  }

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <NavAd
            bannerUrl={adminSettings?.bannerUrl}
            bannerText={adminSettings?.bannerText}
          />

          <Nav />

          <BannerAd bannerAd={adminSettings?.bannerAd} />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>

      <GoogleTagManager gtmId="GTM-MNGJZC9" />
    </html>
  );
}
