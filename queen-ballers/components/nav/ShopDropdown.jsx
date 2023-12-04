import { memo, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const DropdownContainer = styled.div`
  padding: 6px;
  position: absolute;
  top: calc(100% - 2px);
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  border: 2px solid #393939;
  box-shadow: -4px 4px #393939;
  transform: translateX(-50%);
  display: none;
  width: auto;

  .links {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0 12px;

    a,
    span {
      width: 100%;
      padding: 18px 0 !important;
    }

    .show-teams {
      display: none;

      svg {
        display: block !important;
      }
    }

    hr {
      width: 50%;
    }
  }

  /* .teams {
    width: 75%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background: #f4edfc;

    a {
      width: 50%;
      padding: 24px 0 !important;
      position: relative;
      z-index: 1;
      text-shadow: -2px 2px #ffffff;

      > span {
        position: absolute !important;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        z-index: -1;
      }
    }
  } */

  @media screen and (max-width: 1024px) {
    width: 96%;
    left: 50%;
    transform: translateX(-50%);
  }

  @media screen and (max-width: 768px) {
    position: unset;
    box-shadow: none;
    background: #fefefe;
    transform: unset;
    margin-top: 12px;
    width: unset;
    flex-direction: column;

    &.show {
      display: flex;
      height: max-content;
      overflow: hidden;

      .links {
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;

        hr {
          display: none;
        }

        a,
        span {
          padding: 12px 0 !important;
        }

        a {
          max-width: 50%;
        }

        span {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;

          svg {
            transform: scaleY(-1);
            width: 22px !important;
          }
        }
      }

      .teams {
        position: fixed;
        width: 100%;
        left: 0;
        bottom: -200%;
        padding: 12px;
        border-top: 4px solid #393939;
        transition: all 0.5s ease;

        &.show-on-mobile {
          bottom: 0%;

          span {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 18px !important;

            svg {
              width: 22px;

              display: block !important;
            }
          }
        }

        a {
          padding: 12px !important;
          display: flex;
          align-items: center;

          > div {
            opacity: 0.5;
          }
        }
      }
    }

    a,
    span {
      width: 42%;
      font-size: 14px !important;
      margin: unset !important;

      &:hover {
        color: #b565f3;
      }
    }
  }
`

const links = [
  { text: 'QBC', href: 'http://sleeperbear.com/' },
  { text: 'Shirts', href: '/shop/shirts' },
  { text: 'Shorts', href: '/shop/shorts' },
  { text: 'Hoodies', href: '/shop/hoodies' },
  { text: 'Pants', href: '/shop/pants' },
  { text: 'Shoes', href: '/shop/shoes' },
  { text: 'Basketballs', href: '/shop/basketballs' },
]

const WNBADropdown = ({ show }) => {
  return (
    <DropdownContainer className={`dropdown-window ${show && 'show'}`}>
      <div className="links">
        {links.map((link, i) => (
          <Link key={`$link${i}`} href={link.href}>
            {link.text}
          </Link>
        ))}
      </div>
    </DropdownContainer>
  )
}

export default memo(WNBADropdown)
