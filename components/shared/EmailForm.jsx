'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

// Components
import EnvelopeIcon from '/components/icons/EnvelopeIcon';

const EmailFormContainer = styled.div`
  position: fixed;
  transition: all 0.5s ease;
  right: -300px;
  z-index: -1;
  top: 86px;

  &.show {
    right: 18px;
  }

  &.footer {
    position: relative;
    z-index: 1;
    display: block;
    right: unset;
    top: unset;

    div {
      border: none;
      box-shadow: none;
      width: max-content;
      height: auto;
      padding: 12px 0;
      background: unset;
      color: #ffffff;
      font-size: 18px;
    }

    form {
      position: unset;
      bottom: unset;
      right: unset;
      width: 100%;
      border: none;
      box-shadow: -4px 4px #b49bd3;

      input {
        border: 1px solid #b49bd3;
        box-shadow: -4px 4px #b49bd3;
      }

      button {
        box-shadow: 0px 4px #b49bd3;
        border: 1px solid #b49bd3;
        background: #b49bd3;
      }
    }

    svg {
      display: none;
    }

    &.bar {
      .cta {
        display: none;
      }
    }
  }

  div {
    background-color: #ffffff;
    border: 2px solid #b49bd3;
    padding: 20px 16px 0;
    color: #000000;
    width: 220px;
    font-weight: 400;
    font-size: 19px;
    line-height: 1.5;
    height: 148px;
    box-shadow: -4px 4px #b49bd3;
  }

  svg {
    background: #b49bd3;
    border-radius: 100px;
    border: 5px solid #ffffff;
    left: 50%;
    max-height: 40px;
    max-width: 40px;
    padding: 6px;
    position: absolute;
    top: -18px;
    transform: translateX(-50%);
  }

  form {
    position: absolute;
    bottom: 16px;
    right: 12px;
    display: flex;
    align-items: flex-end;
    width: 240px;

    input,
    button {
      padding: 8px;
      font-weight: 600;
      font-size: 16px;
      border: 2px solid #393939;
      box-shadow: -2px 2px #393939;
    }

    input {
      letter-spacing: 0.5px;
      color: #393939;
      width: 100%;
      margin-right: -2px;
    }

    button {
      background: #393939;
      color: #ffffff;
      text-transform: uppercase;
      min-width: fit-content;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

const EmailForm = ({ progress, type }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');
  const pagePath = usePathname();
  const currentDate = new Date();

  const submitRequest = async (e) => {
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbxaHoLyCBcM-2IOtqBRMHAbtKRKcpRIVIzSsGIiEtarkEX_pWHIXnOU/exec';
    const form = document.forms['short-demo-form'];

    e.preventDefault();

    try {
      const res = await fetch(scriptURL, {
        body: new FormData(form),
        method: 'POST',
      });
      const result = await res.json();
      setShowThankYou(true);
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <EmailFormContainer
      id="email-form"
      className={`${progress > 10 ? 'show' : ''}${type || ''}`}
    >
      <EnvelopeIcon stroke="#ffffff" />
      {showThankYou ? (
        <div>
          Nice! <br /> You&apos;re on the roster.
        </div>
      ) : showError ? (
        <div>Something went wrong, please try again.</div>
      ) : (
        <>
          <div className="cta">Subscribe to get the latest articles first.</div>
          <form
            name="short-demo-form"
            onSubmit={submitRequest}
            key="email-input-form"
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input name="slug" type="hidden" value={pagePath} required />
            <input name="date" type="hidden" value={currentDate} required />
            <button type="submit">Sign Up</button>
          </form>
        </>
      )}
    </EmailFormContainer>
  );
};

export default EmailForm;
