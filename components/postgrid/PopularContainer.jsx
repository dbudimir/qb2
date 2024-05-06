// Utils
import { useEffect, useState } from 'react';

// Components
import Popular from '/components/postgrid/Popular';

const PopularContainer = ({ homePage }) => {
  const [adminSettings, setAdminSettings] = useState(null);

  useEffect(() => {
    const getAdminSettings = async () => {
      const [adminSettings] = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/admin-settings`,
        {
          cache: 'no-store',
        }
      ).then((res) => res.json());

      setAdminSettings(adminSettings);
    };

    getAdminSettings();
  }, []);

  return <Popular adminSettings={adminSettings} homePage={homePage} />;
};

export default PopularContainer;
