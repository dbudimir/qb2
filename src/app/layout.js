// Global styles
import '../../public/static/style.scss';

// Utils
import { Suspense } from 'react';

// import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import StyledComponentsRegistry from '../../lib/registry';

// Components
import {
  HeaderContainer,
  HeaderContainerSkeleton,
} from '/components/header/HeaderContainer';
import Footer from '/components/Footer';

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
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Suspense fallback={<HeaderContainerSkeleton />}>
            <HeaderContainer />
          </Suspense>
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
      {/* <GoogleTagManager gtmId="GTM-MNGJZC9" /> */}
      <GoogleAnalytics gaId="G-R5EZHH3CVM" />
    </html>
  );
}
