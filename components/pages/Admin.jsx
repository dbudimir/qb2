'use client';

import { useState, useContext } from 'react';
import { AppContext } from 'src/app/context';

// Components
import BannerDropdown from '/components/admin/BannerDropdown';
import BannerAd from '/components/admin/BannerAd';
import PopularPosts from '/components/admin/PopularPosts';
import PlayerImages from '/components/admin/PlayerImages';

import styled from 'styled-components';

const AdminPageContainer = styled.div`
  .credential-input {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .button {
    background: #000000;
    color: #ffffff;
    padding: 16px 24px;
    cursor: pointer;
    margin-right: 12px;
    width: max-content;
  }

  .manage-player-image-toggle {
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
  }

  .build-site {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;

    img {
      height: 60px;
    }

    a {
      padding: 16px 24px;
      background: #33e733;
      color: #ffffff;
      text-decoration: none;
    }
  }

  .admin-option {
    background: #eeeef1;
    width: max-content;
    padding: 12px;
    display: flex;
    flex-direction: column;
    width: 600px;
    max-width: 100%;
    margin-bottom: 24px;

    .checkbox-container {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      input {
        width: max-content;
        margin: 6px;
      }
    }

    input {
      border-radius: 4px;
      font-size: 18px;
      padding: 4px;
      margin-bottom: 12px;
      box-sizing: border-box;
      width: 100%;
    }
  }
`;

const Admin = ({}) => {
  // Data
  const adminSettings = useContext(AppContext);

  // Page state
  const [password, setPassword] = useState('');
  const [settings, setSettings] = useState(adminSettings);
  const [showManagePlayerImages, setShowManagePlayerImages] = useState(false);
  const [showContents, setShowContents] = useState(false);

  const showAdmin = () => {
    if (password === 'qbmm') setShowContents(true);
    else alert('Wrong password');
  };

  const updateAdminSettings = async () => {
    try {
      const response = await fetch('/api/admin-settings', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (data === 'Success') {
        alert('It worked, refresh the page to see changes');
      }
    } catch (error) {
      console.log(error);
      alert('Could not update admin settings try again or check with David');
    }
  };

  return (
    <AdminPageContainer className="page-container">
      <h1>Admin</h1>
      {showContents ? (
        <>
          <div className="manage-player-image-toggle">
            <span
              className="button"
              onClick={() => setShowManagePlayerImages(!showManagePlayerImages)}
            >
              Manage Player Images
            </span>

            {/* Manage player images */}
            {showManagePlayerImages && <PlayerImages />}
          </div>

          {settings && (
            <>
              {/* Update top banner */}
              <BannerDropdown
                settings={settings}
                setSettings={setSettings}
                updateAdminSettings={updateAdminSettings}
              />
              {/* Update banner advertisement */}
              <BannerAd
                settings={settings}
                setSettings={setSettings}
                updateAdminSettings={updateAdminSettings}
              />
              {/* Update popular reads / trending */}
              <PopularPosts
                settings={settings}
                setSettings={setSettings}
                updateAdminSettings={updateAdminSettings}
              />
            </>
          )}
        </>
      ) : (
        <div className="credential-input">
          <input
            type="text"
            name="bannerUrl"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="button" onClick={showAdmin}>
            Enter
          </span>
        </div>
      )}
    </AdminPageContainer>
  );
};

export default Admin;
