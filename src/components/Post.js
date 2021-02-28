const Post = ({ post, postsHandler, buttonTitle }) => {
  return (
    <>
      {post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default' && (
        <div className='post-block'>
          <h2 className='post-block__title'>{post.data.title}</h2>

          {!post.data.media &&
            post.data.url_overridden_by_dest &&
            (post.data.url_overridden_by_dest.includes('jpg') ||
              post.data.url_overridden_by_dest.includes('png') ||
              post.data.url_overridden_by_dest.includes('gif')) && (
              <div className='post-block__img'>
                <img
                  src={post.data.url_overridden_by_dest}
                  alt={post.data.title}
                />
              </div>
            )}

          {!post.data.media && post.data.gallery_data && (
            <div className='post-block__img'>
              <img src={post.data.thumbnail} alt={post.data.title} />
            </div>
          )}

          {post.data.preview &&
            post.data.preview.reddit_video_preview &&
            post.data.preview.reddit_video_preview.fallback_url && (
              <div className='post-block__video'>
                <video controls width='100%'>
                  <source
                    src={post.data.preview.reddit_video_preview.fallback_url}
                    type='video/mp4'
                  />
                </video>
              </div>
            )}

          {post.data.media && post.data.media.reddit_video && (
            <div className='post-block__video'>
              <video controls width='100%'>
                <source
                  src={post.data.media.reddit_video.fallback_url}
                  type='video/mp4'
                />
              </video>
            </div>
          )}

          <div className='post-block__button'>
            <button onClick={() => postsHandler(post)} className='button'>
              {buttonTitle}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
