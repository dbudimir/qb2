// Component
const CheckIcon = ({ bgColor, done }) => (
  <svg width="18" height="18" viewBox="0 0 22 22" style={{ backgroundColor: `${bgColor}` }}>
    <g stroke="none" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(1.000000, 1.000000)">
        <polyline
          id="Path"
          stroke="#ffffff"
          strokeWidth="3"
          points="15 6 7.30769231 14 5 11.6023976"
        />
        {!done && <circle id="Oval" cx="10" cy="10" r="10" stroke="#80e7d5" strokeWidth="1.5" />}
      </g>
    </g>
  </svg>
)

export default CheckIcon
