'use client';

import InfoPageContainer from '/components/style/InfoPageContainer';

const BasketballAnalysis = ({ content }) => {
  return (
    <InfoPageContainer className="page-container">
      <h1>Welcome</h1>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </InfoPageContainer>
  );
};

export default BasketballAnalysis;
