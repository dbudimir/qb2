'use client';

// Utils
import { useEffect, useState } from 'react';
import parseHtmlString from 'utils/parseHtmlString';
import dayjs from 'dayjs';

const year = dayjs().year();

// Components
import HeaderText from '/components/shared/HeaderText';
import TagsRow from '/components/shared/TagsRow';

// Styles // import order matters
import ScheduleContainer from '/components/style/ScheduleContainer';

const WNBASchedule = ({ tags, content, latestPosts }) => {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    !pageContent && setPageContent(parseHtmlString(content));
  }, []);

  const scrollToSection = (elmId) => {
    window.scrollTo({
      behavior: 'smooth',
      top: document.getElementById(elmId).offsetTop,
    });
  };

  return (
    <ScheduleContainer className="page-container" key="wnba-schedule-container">
      <HeaderText titleContent={<h1>WNBA SCHEDULE {year} SEASON</h1>} />
      <TagsRow
        tags={tags.map(({ name, id }, i) => (
          <span
            className="anchor"
            key={`tag-${i}`}
            onClick={(e) => scrollToSection(id)}
          >
            {name}
          </span>
        ))}
      />
      {/* Schedule generated here 👇 */}
      {pageContent}
    </ScheduleContainer>
  );
};

export default WNBASchedule;
