import { updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';
import { db, storage } from '../../firebase';
import Footer from '../Footer';
import Header from '../Header'

const EditProfile = () => {
    const { userId } = useParams();
    const { user } = UserAuth();

    const [value, setValue] = useState({ name: "", email: "" });
    const [image, setImage] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [postList, setPostList] = useState([]);
    const [validCredentials, setValidCredentials] = useState(false);

    const navigate = useNavigate();

    // Gets user data and posts
    useEffect(() => {
        const getUser = async () => {
            const docData = doc(db, "users", userId);
            const docRef = await getDoc(docData);
            setValue({ ...docRef.data() });
        }

        const getPostList = async () => {
            const data = await getDocs(collection(db, "posts"));
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUser();
        getPostList();
    }, [userId]);
    
    // Sets value from the input
    const handleChange = (name) => (e) => {
        e.preventDefault();
        setValue({ ...value, [name]: e.target.value })
    }

    // Function for the Browse button to call the hidden input
    const browseFilesHandler = (e) => {
        e.preventDefault();
        document.getElementById("file").click();
    }
    
    // Previews the selected image
    const handleChangeImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPhotoURL(URL.createObjectURL(file));
        }
    }

    const { name, email } = value;

    // Updates the given credentials
    const handleUpdate = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "users", userId);
        
        if (image) {
            setValidCredentials(true);
            const storageRef = ref(storage, `users/${userId}/profilePicture`);
            await uploadBytes(storageRef, image);
            const newImage = await getDownloadURL(storageRef);

            await updateDoc(docRef, { 
                profilePicture: newImage,
                name: name,
                email: email
            });
    
            await updateProfile(user, {
                photoURL: newImage,
                displayName: name
            });
    
            postList.map(async (post) => {
                if (post.userId == userId) {
                    await updateDoc(doc(db, "posts", post.id), {
                        authorPicture: newImage,
                        author: name
                    });
                }
            });

            navigate(`/profile/${userId}`);;
        } else {
            setValidCredentials(true);
            await updateDoc(docRef, {
                name: name,
                email: email
            });

            await updateProfile(user, {
                displayName: name
            });

            postList.map(async (post) => {
                if (post.userId == userId) {
                    await updateDoc(doc(db, "posts", post.id), {
                        author: name
                    });
                }
            });

            navigate(`/profile/${userId}`);
        }
    }

  return (
    <>
        <Header />

        <section className="edit-profile">
            <form action="" className="form-edit">
                <div className="form__header">
                    <h2>Profile settings</h2>
                </div>

                <div className="form__body">
                    <div className="form__row">
                        <div className="form__row-image">
                            {image ? (
                                <img src={photoURL} alt="" />
                            ) : (
                                <img src={value.profilePicture} alt="" />
                            )}
                        </div>

                        <div className="form__row-upload">
                            <div className="form__field-button">
                                <button className="btn btn--browse" onClick={browseFilesHandler}>Change image</button>
                            </div>

                            <input type="file" id="file" name="file" onChange={handleChangeImage} hidden />
                        </div>
                    </div>

                    <div className="form__row">
                        <label htmlFor="name" className="form__label">Username</label>
                        
                        <div className="form__field">
                            <input type="text" id="name" name="name" className="field" onChange={handleChange("name")} value={value.name} />
                        </div>
                    </div>

                    <div className="form__row">
                        <label htmlFor="email" className="form__label">Email</label>

                        <div className="form__field">
                            <input type="text" id="email" name="email" className="field" onChange={handleChange("email")} value={value.email} />
                        </div>
                    </div>
                </div>

                <div className="form__actions">
                    {!validCredentials ? (
                        <button onClick={handleUpdate} type='submit' className="btn btn--save">Save</button>
                    ) : (
                        <button disabled className="btn btn--save" style={{ backgroundColor: "#3d6969" }}>
                                <span className="loader loader--smaller"></span>
                        </button>
                    )}
                </div>
            </form>
        </section>

        <Footer />
    </>
  )
}

export default EditProfile