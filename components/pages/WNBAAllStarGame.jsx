'use client';

// Components
import HeaderText from '/components/shared/HeaderText';
import LatestPosts from '/components/postgrid/LatestPosts';

// Styles // import order matters
import PostContentContainer from '/components/style/PostContentContainer';
import StandardPageContainer from '/components/style/StandardPageContainer';

const WNBAAllStarGame = ({ title, content, latestPosts }) => {
  return (
    <StandardPageContainer className="page-container">
      <HeaderText titleContent={<h1>{title}</h1>} />
      <div className="content">
        <div className="col-left">
          <h4>WNBA All Star Game Overview</h4>
          <PostContentContainer>{content}</PostContentContainer>
        </div>
        <div className="col-right">
          <h4>Latest Posts</h4>
          <LatestPosts latestPosts={latestPosts} hideHeader />
        </div>
      </div>
    </StandardPageContainer>
  );
};

export default WNBAAllStarGame;
