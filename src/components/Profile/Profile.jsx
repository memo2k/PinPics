import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import Header from '../Header'

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const { user } = UserAuth();

  useEffect(() => {
    const getUser = async () => {
      const docData = doc(db, "users", userId);

      const docRef = await getDoc(docData);
      setUserData({ ...docRef.data() });
    }

    getUser();
  });

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
                <h1>
                  {userData.name}
                </h1>
              </div>

              <div className="profile__edit">
                {user && (
                  (user.uid === userId) && (
                    <Link to={`/edit-profile/${userId}`} className="btn btn--edit">Edit Profile</Link>
                  )
                )}
              </div>
            </div>

            <div className="profile__content">

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile