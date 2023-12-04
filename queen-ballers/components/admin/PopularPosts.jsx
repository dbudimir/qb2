import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const PopularPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .inputs {
    display: flex;
    gap: 12px;
  }
`

const PopularPosts = ({ settings, setSettings }) => {
  const posts = ['post1', 'post2', 'post3', 'post4']

  const updatePopularPosts = async () => {
    try {
      await axios.post('/api/admin', settings).then((response) => response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updatePosts = (postNumber, field, value) => {
    setSettings({
      ...settings,
      topPosts: {
        ...settings?.topPosts,
        [postNumber]: { ...settings?.topPosts?.[postNumber], [field]: value },
      },
    })
  }

  return (
    <PopularPostsContainer className="admin-option">
      <span>Popular Reads</span>

      {posts.map((post, index) => (
        <div className="inputs" key={post}>
          <div className="input-col">
            <span>{post} Title</span>
            <input
              type="text"
              name={`${post}Title`}
              value={settings.topPosts?.[post]?.title}
              onChange={(e) => updatePosts(post, 'title', e.target.value)}
            />
          </div>
          <div className="input-col">
            <span>{post} URL</span>
            <input
              type="text"
              name={`${post}Url`}
              value={settings.topPosts?.[post]?.url}
              onChange={(e) => updatePosts(post, 'url', e.target.value)}
            />
          </div>
        </div>
      ))}

      <span className="button" onClick={(e) => updatePopularPosts()}>
        Update Popular Reads
      </span>
    </PopularPostsContainer>
  )
}

export default PopularPosts
