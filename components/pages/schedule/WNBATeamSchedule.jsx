'use client';

// Components
import HeaderText from '/components/shared/HeaderText';
import Schedule from '/components/Schedule';

// Styles // import order matters
import ScheduleContainer from '/components/style/ScheduleContainer';

const WNBATeamSchedule = ({ title, teamSchedule }) => {
  return (
    <ScheduleContainer className="page-container">
      <HeaderText titleContent={<h1>{title}</h1>} />
      <Schedule teamSchedule={teamSchedule} />
    </ScheduleContainer>
  );
};

export default WNBATeamSchedule;
