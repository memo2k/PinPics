import { Link, useLocation } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { UserAuth } from '../context/AuthContext';
import { db } from "../firebase";
import React, { useState, useEffect } from 'react';
import { getDocs, collection } from "firebase/firestore";
import LikePost from './LikePost';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Post = () => {
  const [postList, setPostList] = useState([]);
  const { user } = UserAuth();

  const location = useLocation();
  const { search } = location.state || [];

  useEffect(() => {
    const getPostList = async () => {
      const data = await getDocs(collection(db, "posts"));

      if(!search) {
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(post => { return post.title.toLowerCase().includes(search.toLowerCase()) }));
      }
    };

    getPostList();
  });

  const breakpoints = {
      default: 3,
      1100: 2,
      540: 1
  }

  return (
    <>
      {postList.length > 0 ? (
        <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {postList
            .sort((a, b) => a.timeStamp < b.timeStamp ? 1 : -1)
            .map((post, id) => (
              <div className="post" key={id + 100}>
                <Link to={`/details/${post.id}`}>
                  <div className="post__image">
                    <LazyLoadImage src={post.imageUrl}
                    placeholderSrc={post.imageUrl}
                    wrapperProps={{ style: { display: 'block' } }} 
                    effect="blur" id="image" alt='image' />
                  </div>
                </Link>
      
                <div className="post__details">
                  <div className="author">
                    <div className="author__image">
                      <Link to={`/profile/${post.userId}`}>
                        <img src={post.authorPicture} alt="pfp" />
                      </Link>
                    </div>
      
                    <div className="author__name-white">
                      <Link to={`/profile/${post.userId}`}>{post.author}</Link>
                    </div>
                  </div>
      
                  <div className="post__actions">
                    {(post.likes.length === 1) ? (
                      <div className="post__actions-likes">
                        {post.likes.length} like
                      </div>
                    ) : (
                      <div className="post__actions-likes">
                        {post.likes.length} likes
                      </div>
                    )}
      
                    {user && (
                      <LikePost id={post.id} likes={post.likes} />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </Masonry>

      ) : (
        <div className="no-posts">There is nothing here...</div>
      )}
    </>
  )
}

export default Post