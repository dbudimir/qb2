'use server';

// Components
import NavAd from '/components/header/ads/NavAd';
import Nav from '/components/header/nav/Nav';
import BannerAd from '/components/header/ads/BannerAd';

const Header = async ({}) => {
  // Data
  const [adminSettings] = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin-settings`,
    {
      cache: 'no-store',
    }
  ).then((res) => res.json());

  return (
    <>
      <NavAd adminSettings={adminSettings} />

      <Nav />

      <BannerAd adminSettings={adminSettings} />
    </>
  );
};

export default Header;
