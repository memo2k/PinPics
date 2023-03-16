import { deleteUser } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import Footer from '../Footer'
import Header from '../Header'

const RemoveAccount = () => {
    const { userId } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate();

    const [userPosts, setUserPosts] = useState([]);
    const [validCredentials, setValidCredentials] = useState(false);

    useEffect(() => {
        const getUserPosts = async () => {
            const data = await getDocs(collection(db, "posts"));

            setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter(post => { return post.userId.includes(user.uid) }));
        }

        getUserPosts();
    }, [userPosts, userId]);
    
    const handleDelete = async () => {
        setValidCredentials(true);
        userPosts.map(async (post) => {
            await deleteDoc(doc(db, "posts", post.id));
        });

        await deleteDoc(doc(db, "users", user.uid));
        await deleteUser(user);
        navigate('/');
    }

  return (
    <>
        <Header />

        <section className="remove-account">
            <div className="remove-account__inner">
                <div className="remove-account__title">
                    <h2>You are about to delete your account. All of your data will be permanently deleted. Are you sure?</h2>
                </div>

                <div className="remove-account__actions">
                    {!validCredentials ? (
                        <button onClick={handleDelete} className="btn btn--green">Confirm</button>
                    ) : (
                        <button disabled className="btn btn--green" style={{ backgroundColor: "#3d6969" }}>
                                <span className="loader loader--smaller"></span>
                        </button>
                    )}

                    <div className="remove-account__cancel">
                        <Link onClick={() => navigate(-1)}>Back</Link>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </>
  )
}

export default RemoveAccount