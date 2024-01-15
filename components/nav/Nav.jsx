'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Components
import NavLogo from './NavLogo';
import NavUpper from './NavUpper';
import SearchBox from '../SearchBox';
import GrabIcon from '../icons/GrabIcon';
import CarrotDownIcon from '../icons/CarrotDownIcon';
import WNBADropdown from './WNBADropdown';
import ShopDropdown from './ShopDropdown';
import EmailForm from '../shared/EmailForm';
import Share from '../shared/Share';
import DonateBar from '../shared/DonateBar';
import ScrollToTop from './ScrollToTop';

import styled from 'styled-components';

// Styles // import order matters
const NavLower = styled.div`
  font-weight: 600;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 100;
  background: #ffffff;
  z-index: 200;
  transition: all 0.25s ease;

  .menu-items {
    padding: 0 6px;
    display: inline-flex;
    height: 60px;

    .nav {
      align-items: center;
      display: flex;
      max-width: max-content;
      width: 100%;
      height: 100%;

      a,
      .dropdown {
        text-decoration: none;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: #000000;
        text-align: center;
        padding: 0 12px;
      }

      a:hover {
        color: #b565f3;
      }

      .dropdown {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 18px 12px;

        svg {
          margin-left: 6px;
        }

        &:hover {
          @media screen and (min-width: 768px) {
            .dropdown-window {
              display: flex;
              animation: downOutList 0.25s ease-in-out;
              transform-origin: top center;

              @keyframes downOutList {
                0% {
                  opacity: 0;
                  transform: translateX(-50%) scale(0);
                }
                100% {
                  opacity: 1;
                  transform: translateX(-50%) scale(1);
                }
              }
            }
          }
        }
      }
    }

    .hamburger-menu-icon {
      display: none;

      @media screen and (max-width: 768px) {
        display: block;
        margin-left: 12px;
      }
    }

    @media screen and (max-width: 768px) {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      position: relative;

      .nav {
        position: absolute;
        top: 50px;
        z-index: 500;
        display: flex;
        flex-direction: column;
        min-width: 100%;
        background: #ffffff;
        right: 0;
        height: max-content !important;
        max-width: 100%;
        justify-content: center;
        border-bottom: 4px solid #000000;
        display: none;

        &.show {
          display: flex;
          z-index: 202;
        }

        a,
        .dropdown {
          font-size: 24px;
          margin: 18px 0;
          flex-wrap: wrap;
          justify-content: center;

          svg {
            display: none;
          }
        }

        .dropdown {
          margin: unset;
        }
      }
    }
  }

  &.sticky {
    height: 60px;
    align-items: center;
    width: 100%;
  }

  #progress-bar {
    background: linear-gradient(90deg, #b49bd3 15%, #b565f3 40%, #46029e 85%);
    bottom: -2px;
    height: 2px;
    left: 0;
    max-width: 100%;
    position: absolute;
  }
`;

const Nav = ({}) => {
  const pathname = usePathname();
  const isBlogPost =
    pathname.includes('/basketball/') && !pathname.includes('/tag/');

  // View settings
  const progressBar = isBlogPost;
  const emailForm = isBlogPost;
  const shareButtons = isBlogPost;
  const donateBar = true;

  //
  const upperNavRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showShopDropDown, setShowShopDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [navLayout, setNavLayout] = useState({ scroll: false, progress: 0 });
  const { scroll, progress } = navLayout;

  useEffect(() => {
    window.addEventListener(
      'scroll',
      () =>
        setNavLayout({
          scroll:
            upperNavRef.current &&
            upperNavRef.current.getBoundingClientRect().top < -Math.abs(60),
          progress:
            (window.scrollY / (document.body.clientHeight - 1000)) * 100,
        }),
      { passive: true },
      ['once']
    );
  }, []);

  useEffect(() => {
    setShowMenu(false);
    setShowDropdown(false);
    setShowShopDropdown(false);
  }, [pathname]);

  useEffect(() => {
    showSearch && setShowMenu(false);
    showMenu && setShowSearch(false);
  }, [showSearch, showMenu]);

  return (
    <>
      <NavLogo scroll={scroll} />
      <NavUpper upperNavRef={upperNavRef} />
      <NavLower
        className={`${scroll && 'sticky'} ${
          (showShopDropDown || showDropdown) && 'show-dropdown'
        }`}
      >
        <div className="menu-items">
          <div className={`nav ${showMenu ? 'show' : ''}`}>
            <Link href="/basketball-analysis">Welcome</Link>
            <div className="dropdown">
              <span onClick={(e) => setShowDropdown(!showDropdown)}>WNBA</span>
              <CarrotDownIcon stroke="#393939" />
              <WNBADropdown show={showDropdown} />
            </div>
            <Link href="/sports-jobs">Sports Jobs</Link>
            <div className="dropdown">
              {/* <a
                href="https://sleeperbear.com/collections/queen-ballers-club"
                target="_blank"
                rel="noreferrer"
              > */}
              <span onClick={(e) => setShowShopDropdown(!showShopDropDown)}>
                Shop
              </span>
              <CarrotDownIcon stroke="#393939" />
              <ShopDropdown show={showShopDropDown} />
              {/* </a> */}
            </div>
          </div>
          <SearchBox
            scroll={scroll}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
          <GrabIcon
            stroke="#000000"
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        </div>

        {!showSearch && (
          <>
            {progressBar && (
              <div id="progress-bar" style={{ width: `${progress}%` }} />
            )}
            {emailForm && <EmailForm progress={progress} />}
            {shareButtons && <Share progress={progress} />}
            {donateBar && <DonateBar progress={progress} />}
            <ScrollToTop progress={progress} />
          </>
        )}
      </NavLower>
    </>
  );
};

export default Nav;
