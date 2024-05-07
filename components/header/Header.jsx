'use server';

// Components
import NavAd from '/components/header/ads/NavAd';
import Nav from '/components/header/nav/Nav';
import BannerAd from '/components/header/ads/BannerAd';

const Header = async ({ adminSettings }) => {
  // Data

  return (
    <>
      <NavAd adminSettings={adminSettings} />

      <Nav />

      <BannerAd adminSettings={adminSettings} />
    </>
  );
};

export default Header;
