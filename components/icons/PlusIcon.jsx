// Component
const UserPlusIcon = ({ wh, stroke }) => (
  <svg
    width={wh || 24}
    height={wh || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-plus"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default UserPlusIcon
