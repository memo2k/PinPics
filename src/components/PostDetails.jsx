import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Post from './Post';
import { Link, useNavigate } from 'react-router-dom';
import LikePost from './LikePost';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState(0);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const docData = doc(db, "posts", postId);
  
  useEffect(() => {
    const getPost = async () => {
      const docRef = await getDoc(docData);
      setPost({ ...docRef.data() });

      if (docRef.exists()) {
        const likesLength = docRef.data().likes.length;
        setLikes(likesLength);
      }
    }
    
    getPost();
  });
  
  const handleDelete = async () => {
    await deleteDoc(docData);
    navigate('/');
  }

  
  return (  
    <>
      <Header />

      <section className="post-details">
        <div className="shell shell--smaller">
          <div className="post__inner">
            <div className="post__info">
              <div className="author">
                <div className="author__image">
                  <Link to={`/profile/${post.userId}`}>
                    <img src={post.authorPicture} alt="" />
                  </Link>
                </div>

                <div className="author__name-black">
                  <Link to={`/profile/${post.userId}`}>{post.author}</Link>
                </div>
              </div>

              <div className="post__actions">
                  {user && (
                    (likes === 1) ? (
                      <div className="post__actions-likes">
                        <div>
                          1 like
                        </div>

                        <LikePost id={postId} likes={post.likes} />
                      </div>
                    ) : (
                      <div className="post__actions-likes">
                        <div>
                          {likes} likes
                        </div>
                        
                        <LikePost id={postId} likes={post.likes} />
                      </div>
                    )
                  )}

                  {user && (
                    (user.uid === post.userId) && (
                      <div className="post__actions-delete">
                        <button onClick={handleDelete} className='btn btn--delete'>Delete</button>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="post__content">
              <div className="post__title">
                <h3>{post.title}</h3>
              </div>

              <div className="post__image">
                <img src={post.imageUrl} alt="" />
              </div>
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

      <Footer />
    </>
  )
}

export default PostDetails