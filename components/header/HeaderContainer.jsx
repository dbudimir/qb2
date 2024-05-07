'use server';

// Components
import Header from '/components/header/Header';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getAdminSettings = async () => {
  // await timeout(3000);
  const [adminSettings] = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin-settings`,
    {
      cache: 'no-store',
    }
  ).then((res) => res.json());

  return adminSettings;
};

export async function HeaderContainer({}) {
  // Data
  const adminSettings = await getAdminSettings();

  return <Header adminSettings={adminSettings} className="content" />;
}

export async function HeaderContainerSkeleton({}) {
  // Data
  let adminSettings = { bannerAd: { bannerAdUrl: '' } };

  return <Header adminSettings={adminSettings} className="content" />;
}
