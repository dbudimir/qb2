import Image from 'next/image';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import parse from 'html-react-parser';
import { cleanText } from '/utils/cleanText';

// Components
import Schedule from '/components/Schedule';
import LazyLoader from '/components/LazyLoader';
import QuoteIcon from '/components/icons/QuoteIcon';
import PostCTA from '/components/posts/PostCTA';

const qbParser = ({ nodeList }, depth) => {
  return nodeList
    .filter(({ nodeName }) => nodeName !== '#text')
    .map(
      (
        { id, nodeName, innerHTML, outerHTML, childNodes, classList },
        index
      ) => {
        !depth && (depth = 1);
        const i = index * depth; // real index

        switch (nodeName) {
          case 'P':
            return <p key={`para${i}`}>{parse(cleanText(innerHTML))}</p>;
          case 'H1':
            return <h2 key={`h1${i}`}>{parse(innerHTML)}</h2>;
          case 'H2':
            return <h2 key={`h2${i}`}>{parse(innerHTML)}</h2>;
          case 'H3':
            return <h3 key={`h3${i}`}>{parse(innerHTML)}</h3>;
          case 'H4':
            return <h4 key={`h4${i}`}>{parse(innerHTML)}</h4>;
          case 'BLOCKQUOTE':
            return (
              <blockquote key={`block${i}`}>
                <QuoteIcon />
                {parse(innerHTML)}
              </blockquote>
            );
          case 'UL':
            return <ul key={`ul${i}`}>{parse(innerHTML)}</ul>;
          case 'OL':
            return <ol key={`ol${i}`}>{parse(innerHTML)}</ol>;
          case 'FORM':
            console.log('form here');
            return <PostCTA key={`cta${i}`} />;
          case 'IFRAME':
            return (
              <div
                key={`embed${i}`}
                className={`${outerHTML.includes('anchor') && 'embed-podcast'}`}
              >
                {parse(outerHTML)}
              </div>
            );
          case 'PRE':
            const pinterestEmbed = parse(innerHTML).props.children;

            return (
              <LazyLoader key={`lazy${i}`} index={i} type="pinterest">
                {parse(pinterestEmbed)}
              </LazyLoader>
            );
          case 'FIGURE':
            if (id === 'schedule-content') {
              return <Schedule key="wnba-schedule-outer" />;
            }

            // If image
            if (classList.length > 0 && classList.contains('wp-block-image')) {
              //
              const bodyImage = childNodes[0];
              const bodyImageWidth = bodyImage.style.width.replace(
                /[^0-9]/g,
                ''
              );
              const hasCustomWidth = !!bodyImageWidth;

              const caption = childNodes[1];
              const { src, alt, width, height } = bodyImage;

              return (
                <div
                  className="body-image-container"
                  key={`img-with-caption${i}`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={hasCustomWidth ? bodyImageWidth : width}
                    height={height}
                  />
                  {caption && (
                    <figcaption>{parse(caption.innerHTML)}</figcaption>
                  )}
                </div>
              );
            }
            // If twitter embed
            if (
              classList.length > 0 &&
              classList.contains('is-provider-twitter')
            ) {
              //
              const tweetId = innerHTML.substring(
                innerHTML.lastIndexOf('/status/') + 8,
                innerHTML.lastIndexOf('?ref')
              );

              return (
                <LazyLoader key={`lazy${i}`} index={i}>
                  <TwitterTweetEmbed tweetId={tweetId} />
                </LazyLoader>
              );
            }
            // if Tiktok
            if (
              classList.length > 0 &&
              classList.contains('is-provider-tiktok')
            ) {
              //
              const tikTokElm =
                childNodes[0].getElementsByTagName('blockquote')[0];

              return (
                <LazyLoader key={`lazy${i}`} index={i} type="tiktok">
                  {parse(tikTokElm.outerHTML)}
                </LazyLoader>
              );
            }

            // if other video embed
            if (
              classList.length > 0 &&
              (classList.contains('wp-block-video') ||
                classList.contains('wp-block-embed'))
            ) {
              const classes = Array.from(classList).join(' ');

              return (
                <LazyLoader key={`lazy${i}`} classes={classes} index={i}>
                  {parse(childNodes[0].innerHTML)}
                </LazyLoader>
              );
            }

            return childNodes[0].outerHTML ? (
              <figure key={`figure${i}`}>
                {parse(childNodes[0].outerHTML)}
              </figure>
            ) : (
              <></>
            );
          default:
            // Need to redo this logic
            if (!childNodes.length) {
              if (id && id !== 'season-info') {
                return (
                  <div key={`div${i}`} id={id}>
                    {qbParser({ nodeList: childNodes }, depth + 1)}
                  </div>
                );
              } else {
                return <div key={`div${i}`} id="season-info" />;
              }
            } else {
              const nodes =
                childNodes[0].children &&
                Array.prototype.slice.call(childNodes[0].children);

              return nodes ? (
                <div key={`div${i}`} id={id}>
                  {qbParser({ nodeList: nodes }, depth + 1)}
                </div>
              ) : (
                <></>
              );
            }
        }
      }
    );
};

export default qbParser;
