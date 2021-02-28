import Post from './Post';

const Posts = ({ posts, postsHandler, buttonTitle, title }) => {
  return (
    <div className='content__items'>
      <h2>{title}</h2>
      {posts.map((post) => {
        return (
          <Post
            key={post.data.id}
            post={post}
            postsHandler={postsHandler}
            buttonTitle={buttonTitle}
          />
        );
      })}
      {!posts.length && <p>На текущий момент нет постов</p>}
    </div>
  );
};

export default Posts;
