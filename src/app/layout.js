// Global styles
import '../../public/static/style.scss';
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

// Utils
import { GoogleTagManager } from '@next/third-parties/google';
import StyledComponentsRegistry from '../../lib/registry';
import AppContext from './context';
// Components
import NavAd from '../../components/ads/NavAd';
import Nav from '../../components/nav/Nav';
import BannerAd from '../../components/ads/BannerAd';
import Footer from '../../components/Footer';

async function getData() {
  try {
    const adminSettings = await fetch(
      `${process.env.DOMAIN}/api/admin-settings`,
      { cache: 'no-store' }
    ).then((res) => res.json());

    return { ...adminSettings[0] };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

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
  const adminSettings = await getData();

  return (
    <html lang="en">
      <body>
        <AppContext adminSettings={adminSettings}>
          <StyledComponentsRegistry>
            <NavAd
              bannerUrl={adminSettings.bannerUrl}
              bannerText={adminSettings.bannerText}
            />

            <Nav />

            <BannerAd bannerAd={adminSettings.bannerAd} />
            {children}
            <Footer />
          </StyledComponentsRegistry>
        </AppContext>
      </body>

      <GoogleTagManager gtmId="GTM-MNGJZC9" />
    </html>
  );
}
