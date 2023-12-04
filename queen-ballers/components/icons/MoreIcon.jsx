// Component
const MoreIcon = (props) => {
  const { stroke } = props

  return (
    <svg width="4px" height="18px" viewBox="0 -3 4 24">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          id="more-vertical"
          transform="translate(1.000000, 1.000000)"
          stroke={stroke}
          strokeWidth="2"
        >
          <circle id="Oval" cx="1" cy="8" r="1"></circle>
          <circle id="Oval" cx="1" cy="1" r="1"></circle>
          <circle id="Oval" cx="1" cy="15" r="1"></circle>
        </g>
      </g>
    </svg>
  )
}

export default MoreIcon
