// Component
const ArrowRightIcon = (props) => {
  const { wh, stroke } = props;

  return (
    <svg
      width={wh || 24}
      height={wh || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-arrow-right"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
};

export default ArrowRightIcon;
