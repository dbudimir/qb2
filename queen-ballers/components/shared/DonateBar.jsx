import { useState, useEffect, memo } from "react";
import styled from "styled-components";
import Image from "next/image";

// Components
import EmailForm from "./EmailForm";

const DonateBarContainer = styled.form`
  align-items: center;
  background: #393939;
  bottom: 0px;
  color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 12px 18px;
  position: fixed;
  transform: translateY(100px);
  transition: all 0.5s ease;
  width: 100%;
  gap: 14px;

  &.show {
    bottom: 0;
    align-items: center;
    justify-content: center;
    position: fixed;
    transform: translateY(0px);
    width: 100%;
  }

  span {
    display: block;
    text-align: center;
    font-weight: 400;
    letter-spacing: 0.7px;

    @media screen and (max-width: 768px) {
      display: none;
    }

    &.mobile {
      display: none;

      @media screen and (max-width: 768px) {
        display: block;
        padding: 2px 0;
      }
    }
  }

  a {
    background: #ffffff;
    color: #393939;
    padding: 8px 10px 4px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    box-shadow: -4px 4px #0e94d6;
    transition: all 0.25s;
    margin: 0 18px;

    @media screen and (max-width: 320px) {
      margin: 12px 0 6px 0;
    }

    &:hover {
      box-shadow: 0px 0px #0e94d6;
      color: #ffffff;
      background-color: #ffffff !important;
      transform: translate(-2px, 2px);
    }
  }
`;

const DonateBar = ({ progress }) => {
  const [path, setPath] = useState();

  useEffect(() => {
    !path && setPath(window.location.pathname);
  }, [path]);

  return (
    <DonateBarContainer
      id="donate-bar"
      className={progress > 50 && progress < 95 ? "show" : ""}
    >
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <span>Don't miss stories. Sign up today!</span>
      <span className="mobile">Support Queen Ballers </span>

      {/* <a href="https://www.patreon.com/queenballersclub" target="_blank" rel="noreferrer">
         Join Today
      </a> */}

      {/* <a href="https://venmo.com/megsterr" target="_blank" rel="noreferrer">
        <Image src="/static/images/venmo.svg" alt="Venmo logo" height={16} width={84} />
      </a> */}

      {path && <EmailForm type="footer bar" />}
    </DonateBarContainer>
  );
};

export default memo(DonateBar);
