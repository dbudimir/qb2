const BannerDropdown = ({ settings, setSettings, updateAdminSettings }) => {
  return (
    <div className="admin-option">
      <span>Banner Text</span>
      <input
        type="text"
        name="bannerText"
        value={settings.bannerText}
        onChange={(e) =>
          setSettings({ ...settings, bannerText: e.target.value })
        }
      />
      <span>Banner URL</span>
      <input
        type="text"
        name="bannerUrl"
        value={settings.bannerUrl}
        onChange={(e) =>
          setSettings({ ...settings, bannerUrl: e.target.value })
        }
      />
      <span className="button" onClick={(e) => updateAdminSettings()}>
        Update Banner
      </span>
    </div>
  );
};

export default BannerDropdown;
