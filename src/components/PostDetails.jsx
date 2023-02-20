import { collection, getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';
import Header from './Header';
import Post from './Post';
import { Link } from 'react-router-dom';
import LikePost from './LikePost';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = UserAuth();
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const getPost = async () => {
      const data = await getDoc(doc(db, "posts", postId));
      setPost({ ...data.data(), likesCount: data.data().likes.length});
    }

    getPost();
  });

  return (  
    <>
      <Header />

      <section className="post-details">
        <div className="shell shell--smaller">
          <div className="post__inner">
            <div className="post__info">
              <div className="author">
                <div className="author__image">
                  <Link to="/">
                    <img src={post.authorPicture} alt="" />
                  </Link>
                </div>

                <div className="author__name-black">
                  <Link to="/">{post.author}</Link>
                </div>
              </div>

              <div className="post__actions">
                <div className="post__actions-likes"></div>
                {(post.likesCount === 1) ? (
                  <div className="post__actions-likes">
                    {post.likesCount} like
                  </div>
                ) : (
                  <div className="post__actions-likes">
                    {post.likesCount} likes
                  </div>
                )}

                {user && (
                  <LikePost id={postId} likes={post.likes} />
                  )}
              </div>
            </div>

            <div className="post__content">
              <img src={post.imageUrl} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="post-feed">
        <div className="shell">
          <div className="posts__inner">
            <Post />
          </div>
        </div>
      </section>
    </>
  )
}

export default PostDetails