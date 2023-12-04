import axios from 'axios'

const BannerDropdown = ({ settings, setSettings }) => {
  const updateBannerAd = async () => {
    try {
      await axios.post('/api/admin', settings).then((response) => response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="admin-option">
      <div className="checkbox-container">
        <input
          type="checkbox"
          name="bannerAdVisible"
          checked={settings.bannerAd?.bannerAdVisible}
          onChange={(e) =>
            setSettings({
              ...settings,
              bannerAd: { ...settings.bannerAd, bannerAdVisible: e.target.checked },
            })
          }
        />
        <span>Show Banner Ad</span>
      </div>
      <span>Image URL</span>
      <input
        type="text"
        name="bannerAdImageUrl"
        value={settings.bannerAd?.bannerAdImageUrl}
        onChange={(e) =>
          setSettings({
            ...settings,
            bannerAd: { ...settings.bannerAd, bannerAdImageUrl: e.target.value },
          })
        }
      />
      <span>Destination URL</span>
      <input
        type="text"
        name="bannerAdUrl"
        value={settings.bannerAd?.bannerAdUrl}
        onChange={(e) =>
          setSettings({
            ...settings,
            bannerAd: { ...settings.bannerAd, bannerAdUrl: e.target.value },
          })
        }
      />
      <span className="button" onClick={(e) => updateBannerAd()}>
        Update Banner Ad
      </span>
    </div>
  )
}

export default BannerDropdown
