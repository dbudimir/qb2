import styled from 'styled-components'
import Image from 'next/image'

// Utils
import getTeam from '../utils/getTeam'

const PlayerRowContainer = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  padding: 24px 24px;
  border-bottom: 1px solid #eeeef1;

  &:nth-of-type(even) {
    background: #f2f3f4;
  }

  .team-logo {
    padding: 6px !important;

    &.undrafted {
      text-align: center;
      font-size: 16px;
    }
  }

  .profile {
    display: flex;
    width: 225px;

    .image-outer {
      display: flex;
      align-items: center;
      position: relative;

      .pick-number {
        background: #393939;
        color: #ffffff;
        position: absolute;
        left: -12px;
        bottom: 0;
        z-index: 1;
        margin: unset;
        font-size: 20px;
        height: 24px;
        border: 2px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 6px;
        border-radius: 100px;
        line-height: 0;
      }

      img {
        border-radius: 100px;
        border: 2px solid #b49bd3 !important;
        min-width: 66px;
      }
    }

    .copy {
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      min-width: max-content;

      .name {
        font-weight: 600;
        font-size: 20px;
      }

      .school,
      .position {
        font-size: 16px;

        span {
          margin-right: 6px;
        }
      }
    }
  }

  .stats {
    display: flex;
    align-items: center;
    width: 220px;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      min-width: 22.5%;
      text-align: center;
      border: 1px solid #393939;
      border-radius: 4px;
      background: #ffffff;

      .label {
        width: 100%;
        font-size: 14px;
        background: #393939;
        color: #ffffff;
        padding: 2px 6px;
      }

      .metric {
        font-weight: 600;
        padding: 4px 8px;
      }
    }
  }

  .declaration {
    width: 100px;
    text-align: center;
    border: 1px solid #b565f3;
    color: #393939;
    border-radius: 4px;
    padding: 6px;
    text-decoration: none;

    &:hover {
      color: #ffffff;
      background: #b565f3;
    }
  }

  @media screen and (max-width: 1200px) {
    .declaration {
      display: none;
    }
  }

  @media screen and (max-width: 1024px) {
    flex-direction: row-reverse;
    justify-content: space-around;
    .stats {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    position: relative;
    > div:first-of-type {
      position: absolute !important;
      opacity: 0.4;
      left: 0;

      img {
        max-height: 60px;
      }
    }

    .name {
      font-size: 16px !important;
    }
  }
`

const PlayerRow = ({ player }) => {
  const { title, image, school, position, height, pick_number, drafted_by, draft_declaration } =
    player
  const stats = [
    { label: 'PPG', stat: player.points_per_game },
    { label: 'RPG', stat: player.rebounds_per_game },
    { label: 'APG', stat: player.assists_per_game },
    { label: 'SPG', stat: player.steals_per_game },
  ]
  const imageSrc = image || '/static/images/placeholder-image.png'

  return (
    <PlayerRowContainer>
      {pick_number ? (
        <Image
          className="team-logo"
          src={getTeam(drafted_by).logoUrl}
          width={100}
          height={100}
          alt={`${drafted_by} Logo`}
        />
      ) : (
        <div className="team-logo undrafted">
          Not <br /> Drafted
        </div>
      )}

      <div className="profile">
        <div className="image-outer">
          {pick_number && <p className="pick-number">{pick_number}</p>}
          <Image src={imageSrc} alt={title.rendered} width={64} height={64} />
        </div>

        <div className="copy">
          <span className="name">{title.rendered}</span>
          <span className="school">{school}</span>
          <span className="position">
            {height && <span>{height}</span>}
            {position && <span>{position}</span>}
          </span>
        </div>
      </div>

      <div className="stats">
        {stats.map(({ label, stat }, i) => (
          <div key={`label${i}`}>
            <span className="label">{label}</span>
            <span className="metric">{stat || 'n/a'}</span>
          </div>
        ))}
      </div>
      {!pick_number && (
        <a className="declaration" href={draft_declaration} target="_blank" rel="noreferrer">
          Draft Declaration
        </a>
      )}
    </PlayerRowContainer>
  )
}

export default PlayerRow
