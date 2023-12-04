// Component
const PlusCircleIcon = ({ wh, stroke, modalSwitch }) => (
  <svg
    width={wh || 24}
    height={wh || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="create-team-icon"
    onClick={(e) => modalSwitch('createTeam')}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)

export default PlusCircleIcon
