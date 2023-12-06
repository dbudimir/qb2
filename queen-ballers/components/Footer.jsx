"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

// Components
import SocialLinks from "./shared/SocialLinks";
import EmailForm from "./shared/EmailForm";

const featuredLogos = [
  {
    logoUrl: "/static/images/featured-logos/deadspin-logo.png",
    altText: "Deadspin",
    link: "https://deadspin.com/brittney-griner-dunked-again-and-it-was-nbd-1847571960",
    height: 65,
    width: 240,
  },
  {
    logoUrl: "/static/images/featured-logos/jsw-logo.png",
    altText: "Just Women's Sports",
    link: "https://justwomenssports.com/podcast-episode/nneka-ogwumike/",
    height: 72,
    width: 150,
  },
  // {
  //   logoUrl: '/static/images/featured-logos/iheart-logo.png',
  //   altText: 'iHeart Radio',
  //   link: 'https://www.iheart.com/podcast/263-black-girls-talk-spo-28264496/episode/25-wnba-facts-you-should-know-84182503/',
  //   height: 50,
  // },
  {
    logoUrl: "/static/images/featured-logos/her-hoop-stats.png",
    altText: "Her Hoop Stats",
    link: "https://herhoopstats.substack.com/p/wnba-playoffs-jewell-loyd",
    height: 72,
    width: 150,
  },
  {
    logoUrl: "/static/images/featured-logos/shadow-league-logo.png",
    altText: "The Shadow League",
    link: "https://theshadowleague.com/wnba-expansion-in-oakland-is-a-real-possibility/",
    height: 70,
    width: 100,
  },
  {
    logoUrl: "/static/images/featured-logos/uproxx-logo.png",
    altText: "Uproxx",
    link: "https://uproxx.com/dimemag/wnba-commissioners-cup-roadmap-in-season-tournaments/",
    height: 45,
    width: 190,
  },
  {
    logoUrl: "/static/images/featured-logos/npr-logo.png",
    altText: "National Public Radio",
    link: "https://www.npr.org/2021/05/12/996274709/stewie-gets-her-own-sneaks-wnba-star-pens-first-deal-in-a-decade",
    height: 50,
    width: 110,
  },
  {
    logoUrl: "/static/images/featured-logos/baseline-logo.png",
    altText: "Baseline Podcast",
    link: "https://podcasts.apple.com/nz/podcast/the-baseline-podcast/id1544276107?i=1000530121586",
    height: 75,
    width: 75,
  },
  {
    logoUrl: "/static/images/featured-logos/the-gist-logo.png",
    altText: "The Gist",
    link: "https://ca.thegistsports.com/guide/8388a1e5-ef77-4684-99fb-d68387c6b755",
    height: 60,
    width: 110,
  },
  {
    logoUrl: "/static/images/featured-logos/sb-nation-logo.png",
    altText: "SB Nation Swish Appeal",
    link: "https://www.swishappeal.com/wnba/2021/6/3/22463151/wnba-las-vegas-aces-liz-cambage-new-york-liberty-sabrina-ionescu-chicago-sky-mercury-fever-sparks",
    height: 75,
    width: 75,
  },
  {
    logoUrl: "/static/images/featured-logos/the-next-logo.png",
    altText: "The Next Hoops",
    link: "https://www.thenexthoops.com/features/sami-whitcomb-liberty-wnba-most-improved/",
    height: 50,
    width: 180,
  },
  {
    logoUrl: "/static/images/featured-logos/together-logo.png",
    altText: "Togethxr",
    link: "https://www.instagram.com/p/Cq3mXljvH01/",
    height: 60,
    width: 60,
  },
  {
    logoUrl: "/static/images/featured-logos/yahoo-logo.png",
    altText: "Yahoo",
    link: "https://www.yahoo.com/entertainment/brittney-griner-mid-wubble-reset-233314645.html",
    height: 50,
    width: 180,
  },
  // {
  //   logoUrl: '/static/images/featured-logos/black-girls-sports-logo.png',
  //   altText: 'Black Girls Talk Sports Podcast',
  //   link: 'https://www.iheart.com/podcast/263-black-girls-talk-spo-28264496/episode/25-wnba-facts-you-should-know-84182503/',
  //   height: 80,
  //   width: 80,
  // },
];

const FeaturedContainer = styled.div`
  background: #eeeef1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 48px calc(50% - 600px);
  gap: 48px 64px;

  h3 {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    margin: unset;
  }

  a img {
    margin: 0 12px;
  }

  img {
    mix-blend-mode: darken;
    filter: grayscale(100%);
    object-fit: contain;
    transition: all 0.25s ease-in-out;

    &:hover {
      filter: grayscale(0%);
      transform: scale(1.025);
    }
  }
`;

const FooterContainer = styled.div`
  align-items: center;
  background-color: #000000;
  box-shadow: rgba(0, 0, 0, 0.04) 0 -4px 12px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 48px 32px;
  z-index: 1000;

  .col-left,
  .copy-right,
  .col-right {
    width: 320px;
  }

  .footer-links {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;

    a {
      margin: 6px 14px 18px 0;
    }
  }

  .social-links {
    width: 100%;
    margin-top: 18px;

    a {
      margin: 6px 24px 6px 0;

      svg {
        margin: unset;
      }
    }
  }

  a {
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    transition: all 0.25s ease;
    cursor: pointer;
    display: flex;
    margin-bottom: 32px;

    &:hover {
      color: #b49bd3;
    }
  }

  .copy-right {
    color: #ffffff;
    font-weight: 200;
    text-align: center;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;

    .col-left,
    .copy-right,
    .col-right {
      max-width: 96%;
      box-sizing: border-box;

      .footer-links,
      .social-links {
        justify-content: center;
      }
    }

    .copy-right {
      margin: 32px auto;
    }

    #email-form {
      div {
        margin: 0 auto;
        max-width: 100%;
        text-align: center;
      }
    }
  }
`;

const links = [
  { text: "Queen Ballers Club", href: "/" },
  { text: "Advertise", href: "/advertise" },
  { text: "Media Kit", href: "/media-kit" },
  { text: "Team Maker", href: "/create-team" },
];

const Footer = ({ link }) => {
  const year = new Date().getFullYear();

  return (
    <>
      <FeaturedContainer>
        <h3>FEATURED IN</h3>
        {featuredLogos.map(({ link, logoUrl, altText, height, width }, i) => (
          <a
            key={`featured-image${i}`}
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            <Image src={logoUrl} alt={altText} height={height} width={width} />
          </a>
        ))}
      </FeaturedContainer>
      <FooterContainer>
        <div className="col-left">
          <div className="footer-links">
            {links.map((url, i) => (
              <Link key={`$link${i}`} href={url.href}>
                {url.text}
              </Link>
            ))}
          </div>
          <SocialLinks />
        </div>

        <span className="copy-right">© {year} Queen Ballers Club</span>

        <div className="col-right">
          <EmailForm type="footer" />
        </div>
      </FooterContainer>
    </>
  );
};

export default Footer;
