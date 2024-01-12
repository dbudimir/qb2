import styled from 'styled-components';

const PopularPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .inputs {
    display: flex;
    gap: 12px;
  }
`;

const PopularPosts = ({ settings, setSettings, updateAdminSettings }) => {
  const posts = ['post1', 'post2', 'post3', 'post4'];

  const updatePosts = (postNumber, field, value) => {
    setSettings({
      ...settings,
      topPosts: {
        ...settings?.topPosts,
        [postNumber]: { ...settings?.topPosts?.[postNumber], [field]: value },
      },
    });
  };

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

      <span className="button" onClick={(e) => updateAdminSettings()}>
        Update Popular Reads
      </span>
    </PopularPostsContainer>
  );
};

export default PopularPosts;
