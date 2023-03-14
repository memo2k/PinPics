import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Masonry from "react-masonry-css";
import { Link, useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import Footer from "../Footer";
import Header from "../Header";
import LikePost from "../LikePost";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [postList, setPostList] = useState([]);
  const [activeBtn, setActiveBtn] = useState("created");
  const [text, setText] = useState("created");
  const { user } = UserAuth();

  useEffect(() => {
    const getUser = async () => {
      const docData = doc(db, "users", userId);
      const docRef = await getDoc(docData);
      setUserData({ ...docRef.data() });
    };

    getUser();
  }, [user, userId]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));

      if (text === "created") {
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(post => { return post.userId.includes(userId) }));
      }
      
      else if (text === "liked") {
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(post => { return post.likes.includes(userId) }));
      }
    }

    getPosts();
  }, [postList, userId]);

  const breakpoints = {
    default: 3,
    1100: 2,
    540: 1
}

  return (
    <>
      <Header />

      <section className="profile">
        <div className="shell">
          <div className="profile__inner">
            <div className="profile__details">
              <div className="profile__picture">
                <img src={userData.profilePicture} alt="" />
              </div>

              <div className="profile__username">
                <h1>{userData.name}</h1>
              </div>

              <div className="profile__edit">
                {user && user.uid === userId && (
                  <Link
                    to={`/edit-profile/${userId}`}
                    className="btn btn--edit"
                  >
                    Edit Profile
                  </Link>
                )}
              </div>
            </div>

            <div className="profile__content">
              <div className="profile__nav">
                <button type="button" onClick={(e) => {
                  setText("created")
                  setActiveBtn("created")
                  }} className={`${activeBtn === 'created' ? 'btn btn--profile-content btn--active' : 'btn btn--profile-content' }`}>Created</button>

                <button type="button" onClick={(e) => {
                  setText("liked")
                  setActiveBtn("liked")
                  }} className={`${activeBtn === 'liked' ? 'btn btn--profile-content btn--active' : 'btn btn--profile-content' }`}>Liked</button>
              </div>

              <div className="profile__posts">
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
                                <Link to={`/profile/${post.userId}`}>
                                  {post.author}
                                </Link>
                              </div>
                            </div>

                            <div className="post__actions">
                              {post.likes.length === 1 ? (
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Profile;
