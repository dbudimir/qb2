// Component
const GrabIcon = ({ stroke, showMenu, setShowMenu }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="hamburger-menu-icon feather-menu"
    onClick={(e) => setShowMenu(!showMenu)}
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export default GrabIcon
