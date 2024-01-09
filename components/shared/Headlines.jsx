import styled from 'styled-components'
import parse from 'html-react-parser';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const HeadlinesContainer = styled.div`
  margin-bottom: 32px;
  .headline {
    padding: 4px 0;
    margin-bottom: 12px;
    text-decoration: none;
    color: #b565f3;
    display: block;

    &:hover {
      p :nth-child(2) {
        opacity: 1;
      }
    }

    p {
      margin: unset;
      display: block;
      text-decoration: none;

      &:first-of-type {
        font-weight: 600;
        color: #393939;
        margin-bottom: 6px;
      }

      &:nth-child(2) {
        font-size: 16px;
        color: #000000;
        opacity: 0.6;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        margin-bottom: 4px;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
      }
    }

    .date {
      color: #000000;
      font-size: 14px;
    }
  }
`

const stripLinks = (text) => {
  const re = /<a\s.*?href=[\"\'](.*?)[\"\']*?>(.*?)<\/a>/g
  const str = text
  const subst = '$2'
  const result = str.replace(re, subst)
  return result
}

const Headlines = ({ headlines }) => (
  <HeadlinesContainer>
    {headlines
      .filter((vessel, index) => index < 5)
      .map(({ date, content }, index) => {
        const url = content.rendered.match(/\bhttps?:\/\/\S+/gi)[0]

        return (
          <a
            key={`headline${index}`}
            href={url}
            className="headline"
            target="_blank"
            rel="noreferrer"
          >
            {parse(stripLinks(content.rendered))}
            <span className="date">{dayjs(date).fromNow(true)} ago</span>
          </a>
        )
      })}
  </HeadlinesContainer>
)

export default Headlines
