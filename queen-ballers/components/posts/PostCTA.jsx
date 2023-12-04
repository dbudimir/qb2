import styled from 'styled-components'

const PostCTAContainer = styled.div`
  box-shadow: -4px 4px #393939;
  background: #b49bd3;
  max-width: 720px;
  width: 100%;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .cta-copy {
    span {
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1.5px;
      margin: 0 0 0 0 !important;
      text-transform: uppercase;
    }

    h4 {
      color: #ffffff !important;
      font-size: 28px;
      letter-spacing: 1.25px;
      margin: 0 0 6px 0 !important;
    }
  }

  a {
    background: #ffffff;
    padding: 6px 18px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 600;
    box-shadow: -4px 4px #393939;
    transition: all 0.25s;

    &:hover {
      box-shadow: 0px 0px #393939;
      color: #ffffff !important;
      background-color: #393939 !important;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    .cta-copy {
      span {
        line-height: 1px;
        font-size: 14px;
      }
      h4 {
        font-size: 24px;
        margin: 12px 0 18px !important;
      }
    }

    a {
      margin-bottom: 12px;
    }
  }
`

const PostCTA = () => (
  <PostCTAContainer>
    <div className="cta-copy">
      <span>Access exclusive content</span>
      <h4>Support Queen Ballers on Patreon</h4>
    </div>
    <a href="https://www.patreon.com/queenballersclub" target="_blank" rel="noreferrer">
      Join Today
    </a>
  </PostCTAContainer>
)

export default PostCTA
