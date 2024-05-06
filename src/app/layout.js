// Global styles
import '../../public/static/style.scss';

// Utils
import { GoogleTagManager } from '@next/third-parties/google';
import StyledComponentsRegistry from '../../lib/registry';

// Components
import Header from '/components/header/Header';
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
      <GoogleTagManager gtmId="GTM-MNGJZC9" />
      <body>
        <StyledComponentsRegistry>
          <Header />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
