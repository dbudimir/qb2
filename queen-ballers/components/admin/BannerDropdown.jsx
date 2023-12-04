import axios from 'axios'

const BannerDropdown = ({ settings, setSettings }) => {
  const updateBanner = async () => {
    try {
      await axios.post('/api/admin', settings).then((response) => response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="admin-option">
      <span>Banner Text</span>
      <input
        type="text"
        name="bannerText"
        value={settings.bannerText}
        onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
      />
      <span>Banner URL</span>
      <input
        type="text"
        name="bannerUrl"
        value={settings.bannerUrl}
        onChange={(e) => setSettings({ ...settings, bannerUrl: e.target.value })}
      />
      <span className="button" onClick={(e) => updateBanner()}>
        Update Banner
      </span>
    </div>
  )
}

export default BannerDropdown
