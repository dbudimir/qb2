'use client';

import styled from 'styled-components';
import PostContentContainer from '/components/style/PostContentContainer';

const AdvertisingContainer = styled.div`
  max-width: 720px;

  h1 {
    font-size: 48px;
    margin-top: 0;
  }

  h3 {
    font-size: 32px;
  }

  h4 {
    font-size: 28px;
    margin: 0;
    text-decoration: underline;
  }

  input,
  button,
  textarea {
    padding: 8px;
    font-weight: 600;
    font-size: 16px;
    border: 2px solid #b49bd3;
  }

  input,
  textarea {
    letter-spacing: 0.5px;
    color: #393939;
    width: 100%;
    box-shadow: -4px 4px #b49bd3;
  }

  .send-another {
    cursor: pointer;
    text-decoration: underline;
    color: #b49bd3;
    margin-left: 10px;
  }

  .input-wrapper {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }

  .input-wrapper > input {
    width: 49%;
  }

  button {
    cursor: pointer;
    background: #000000;
    text-transform: uppercase;
    border: 2px solid #000000;
    color: #ffffff;
    box-shadow: -4px 4px #b49bd3;
    margin-top: 10px;
  }

  .content {
    ul {
      /* padding-bottom: 32px; */
      margin-bottom: 32px;

      li {
        margin-bottom: 6px;
      }
    }
  }

  .wp-block-image.size-large {
    margin: 0 auto;
    padding: 12px 0 !important;
    max-width: 100%;

    img {
      max-height: 500px;
      width: 720px;
      max-width: 100%;
      height: auto;
      border: 2px solid #eeeef1;
      border-radius: 12px;
    }
  }
`;

// In case we want to add a contact form to the page
// const WP_ADVERTISE_CONTACT_US_FORM =
//   'https://queenballers.wpcomstaging.com/wp-json/contact-form-7/v1/contact-forms/10073/feedback';

const Advertise = ({ content, title }) => {
  return (
    <AdvertisingContainer className="page-container">
      <h1>{title}</h1>
      <PostContentContainer
        className="content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </AdvertisingContainer>
  );
};

export default Advertise;
