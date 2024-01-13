import styled from 'styled-components';

// Components
import InstagramIcon from '/components/icons/InstagramIcon';
import YoutubeIcon from '/components/icons/YoutubeIcon';
import TwitterIcon from '/components/icons/TwitterIcon';
import FacebookIcon from '/components/icons/FacebookIcon';
import TikTokIcon from '/components/icons/TikTokIcon';
import PinterestIcon from '/components/icons/PinterestIcon';

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 14px;

  a {
    margin-bottom: unset;
    display: flex;

    svg {
      height: 24px;
    }
  }
`;

const links = [
  {
    alt: 'Instagram',
    href: 'https://www.instagram.com/queenballersclub/',
    icon: <InstagramIcon stroke="#ffffff" wh="22" />,
  },
  {
    alt: 'Twitter',
    href: 'https://twitter.com/queenballers',
    icon: <TwitterIcon stroke="#ffffff" wh="18" />,
  },
  {
    alt: 'Facebook',
    href: 'https://www.facebook.com/Queen-Ballers-Club-102636198355248',
    icon: <FacebookIcon stroke="#ffffff" wh="22" />,
  },
  {
    alt: 'Youtube',
    href: 'https://www.youtube.com/channel/UC3N31Pqt3pZFuUsCZXzK3vA',
    icon: <YoutubeIcon stroke="#ffffff" wh="22" />,
  },
  // {
  //   alt: 'Tiktok',
  //   href: 'https://www.tiktok.com/@queenballersclub',
  //   icon: <TikTokIcon fill="#ffffff" wh="18" />,
  // },
  {
    alt: 'Pinterest',
    href: 'https://www.pinterest.com/thequeenballersclub/',
    icon: <PinterestIcon fill="#ffffff" wh="24" />,
  },
];

const SocialLinks = () => (
  <SocialLinksContainer className="social-links">
    {links.map(({ alt, href, icon }, i) => (
      <a
        key={`link${i}`}
        href={href}
        alt={alt}
        target="_blank"
        rel="noreferrer"
      >
        {icon}
      </a>
    ))}
  </SocialLinksContainer>
);

export default SocialLinks;
