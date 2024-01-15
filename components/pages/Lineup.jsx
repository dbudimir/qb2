'use client';

// Utils
// import { FacebookProvider, Comments } from 'react-facebook';

// Components
import Lineup from '/components/create/lineup/Lineup';

import styled from 'styled-components';

const LineUpContainer = styled.div`
  max-width: 960px;
  margin: 0 auto 0;

  padding: 60px 1em;

  .page-header {
    padding: 0px 12px;

    h1 {
      font-size: 48px;
      font-weight: 800;
      margin: 0 0 18px;
    }

    p {
      margin-bottom: 32px;
      font-size: 24px;
    }
  }

  .lineup {
    margin-bottom: 24px;
  }

  .comment-container {
    border: 4px solid #eeeef1;
    padding: 0px 12px;
    border-radius: 12px;
  }

  @media screen and (max-width: 768px) {
    padding: 32px 4px;

    .page-header {
      h1 {
        font-size: 36px;
      }
      p {
        font-size: 20px;
      }
    }
  }
`;

const ShowLineup = ({ data }) => {
  const { name, description, players, slug, pageUrl, metaDesc } = data;

  return (
    <>
      <LineUpContainer>
        <div className="page-header">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
        <Lineup lineUp={players} slug={slug} metaDesc={metaDesc} />
        {/* <FacebookProvider appId="467485130880445">
          <div className="comment-container">
            <h2>Comments</h2>
            <Comments className="fb-comments" href={pageUrl} width="100%" />
          </div>
        </FacebookProvider> */}
      </LineUpContainer>
    </>
  );
};

export default ShowLineup;
