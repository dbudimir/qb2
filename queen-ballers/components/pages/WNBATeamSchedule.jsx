'use client';

// Utils
import qbParser from '/utils/qbParser';

// Components
import HeaderText from '/components/shared/HeaderText';
import TagsRow from '/components/shared/TagsRow';

// Styles // import order matters
import ScheduleContainer from '/components/style/ScheduleContainer';

const WNBATeamSchedule = ({ teamName }) => {
  return (
    <ScheduleContainer className="page-container">
      <HeaderText
        titleContent={<h1>2024 {formattedTeamName} SEASON SCHEDULE</h1>}
      />
    </ScheduleContainer>
  );
};

export default WNBATeamSchedule;
