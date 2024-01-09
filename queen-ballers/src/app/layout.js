// Global styles
import '../../public/static/style.scss'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Utils
import { GoogleTagManager } from '@next/third-parties/google'
import StyledComponentsRegistry from '../../lib/registry'
import AppContext from './context'
// Components
import NavAd from '../../components/ads/NavAd'
import Nav from '../../components/nav/Nav'
import BannerAd from '../../components/ads/BannerAd'
import Footer from '../../components/Footer'

async function getData () {
  const res = await fetch('https://queenballers.club/api/admin')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function RootLayout ({ children }) {
  const adminSettings = await getData()

  const viewOptions = {}

  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppContext adminSettings={adminSettings}>
          <StyledComponentsRegistry>
            <NavAd
              bannerUrl={adminSettings.bannerUrl}
              bannerText={adminSettings.bannerText}
            />

            <Nav viewOptions={viewOptions || {}} />

            <BannerAd bannerAd={adminSettings.bannerAd} />
            {children}
            <Footer />
          </StyledComponentsRegistry>
        </AppContext>
      </body>

      <GoogleTagManager gtmId='GTM-MNGJZC9' />
    </html>
  )
}
