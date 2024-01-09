'use client';

// Utils
import { useEffect, useState } from 'react';
import parseHtmlString from 'utils/parseHtmlString';

// Components
import HeaderText from '/components/shared/HeaderText';
import TagsRow from '/components/shared/TagsRow';
import LatestPosts from '/components/postgrid/LatestPosts';

// Styles // import order matters
import PostContentContainer from '/components/style/PostContentContainer';
import StandardPageContainer from '/components/style/StandardPageContainer';

const WNBADraft = ({ title, tags, content, latestPosts }) => {
  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    !pageContent && setPageContent(parseHtmlString(content));
  }, []);

  const scrollToSection = (elmId) =>
    window.scrollTo({
      behavior: 'smooth',
      top: document.getElementById(elmId).offsetTop,
    });

  return (
    <StandardPageContainer className="page-container">
      <HeaderText titleContent={<h1>{title}</h1>} />
      <TagsRow
        tags={tags.map(({ name, id }) => (
          <span
            className="anchor"
            key={name}
            onClick={(e) => scrollToSection(id)}
          >
            {name}
          </span>
        ))}
        showMore
      />
      <div className="content">
        <div className="col-left">
          <PostContentContainer>{pageContent}</PostContentContainer>
        </div>
        <div className="col-right">
          <h4>Latest Posts</h4>
          <LatestPosts latestPosts={latestPosts} hideHeader />
        </div>
      </div>
    </StandardPageContainer>
  );
};

export default WNBADraft;
