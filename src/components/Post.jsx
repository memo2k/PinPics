import Home from '../pages/Home';
import image1 from '../assets/images/1.jpg';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { UserAuth } from '../context/AuthContext';
import { db } from "../firebase";
import React, { useState, useEffect } from 'react';
import { getDocs, collection } from "firebase/firestore";
import LikePost from './LikePost';

const Post = () => {
  const [postList, setPostList] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const getPostList = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPostList();
  });

  const breakpoints = {
      default: 3,
      1100: 2,
      540: 1
  }

  return (
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
              <img src={post.imageUrl} alt="" id="image" />
            </div>
          </Link>

          <div className="post__details">
            <div className="author">
              <div className="author__image">
                <Link to="/">
                  <img src={post.authorPicture} alt="pfp" />
                </Link>
              </div>

              <div className="author__name-white">
                <Link to="/">{post.author}</Link>
              </div>
            </div>

            <div className="post__actions">
              {(post.likes.length == 1) ? (
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
  )
}

export default Post