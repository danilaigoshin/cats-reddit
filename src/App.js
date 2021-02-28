import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import throttle from 'lodash/throttle';
import Posts from './components/Posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [favoritesPosts, setFavoritesPosts] = useState([]);
  const postsLength = useRef(7);

  const fetchData = async () => {
    const res = await axios.get(
      `https://www.reddit.com/r/cats/.json?limit=${postsLength.current}`
    );
    setPosts(res.data.data.children);

    postsLength.current += 4;
  };

  const addToFavoritesPosts = (post) => {
    const existPost = favoritesPosts.find((el) => el.data.id === post.data.id);

    if (!existPost) {
      setFavoritesPosts((prev) => [post, ...prev]);
    }
  };

  const deleteFromFavoritesPosts = (post) => {
    setFavoritesPosts((prev) =>
      prev.filter((el) => el.data.id !== post.data.id)
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadPostsIfBottomPage = throttle((e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <
      e.target.clientHeight + 350
    ) {
      fetchData();
    }
  }, 200);

  const onScroll = useCallback(loadPostsIfBottomPage, [loadPostsIfBottomPage]);

  useEffect(() => {
    document.body.addEventListener('scroll', onScroll);
    return () => {
      document.body.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div className='container'>
      {posts && (
        <Posts
          posts={posts}
          postsHandler={addToFavoritesPosts}
          title='Посты'
          buttonTitle='В избранное'
        />
      )}
      {favoritesPosts && (
        <Posts
          posts={favoritesPosts}
          postsHandler={deleteFromFavoritesPosts}
          title='Избранное'
          buttonTitle='Удалить'
        />
      )}
    </div>
  );
};

export default App;
