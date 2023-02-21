import { updateProfile } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../firebase';
import Header from '../Header'

const EditProfile = () => {
    const { userId } = useParams();

    // const [value, setValue] = useState({ file: "" });
    const [user, setUser] = useState({});
    const [image, setImage] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [postList, setPostList] = useState([]);

    const navigate = useNavigate();

    // Gets user data
    useEffect(() => {
        const getUser = async () => {
            const docData = doc(db, "users", userId);

            const docRef = await getDoc(docData);
            setUser({ ...docRef.data() });
        }

        const getPostList = async () => {
            const data = await getDocs(collection(db, "posts"));
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUser();
        getPostList();
    });

    // Function for the Browse button to call the hidden input
    const browseFilesHandler = (e) => {
        e.preventDefault();
        document.getElementById("file").click();
    }

    // const handleChange = (name) => (e) => {
    //     e.preventDefault();
    //     setValue({ ...value, [name] : e.target.value })
    // }

    // Previews the selected image
    const handleChangeImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPhotoURL(URL.createObjectURL(file));
        }
    }

    // const { file } = value;

    const handleUpdate = async (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `users/${userId}/profilePicture`);

        await uploadBytes(storageRef, image);
        
        const newImage = await getDownloadURL(storageRef);
        const docRef = doc(db, "users", userId);

        await updateDoc(docRef, { profilePicture: newImage })

        postList.map(async (post) => {
            if (post.userId == userId) {
                await updateDoc(doc(db, "posts", post.id), {
                    authorPicture: newImage
                });
            }
        })

        navigate(`/profile/${userId}`);
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
                                <img src={user.profilePicture} alt="" />
                            )}
                        </div>

                        <div className="form__row-upload">
                            <div className="form__field-button">
                                <button className="btn btn--browse" onClick={browseFilesHandler}>Browse</button>
                            </div>

                            <input type="file" id="file" name="file" onChange={handleChangeImage} hidden />
                        </div>
                    </div>

                    <div className="form__row"></div>

                    <div className="form__row"></div>
                </div>

                <div className="form__actions">
                    <button onClick={handleUpdate} type='submit'>Save</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default EditProfile