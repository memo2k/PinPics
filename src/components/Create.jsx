import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { UserAuth } from '../context/AuthContext';
import DropFileInput from './DropFileInput';

const Create = () => {
    const { user } = UserAuth();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();

        if (image == null) return;

        try {
            const imageRef = ref(storage, `images/${image.name + v4()}`);
            const authorImageRef = ref(storage, `users/${user.uid}/profilePicture`);
            
            await uploadBytes(imageRef, image);
            await addDoc(collection(db, "posts"), {
                title: title,
                author: user.displayName,
                userId: user.uid,
                authorPicture: await getDownloadURL(authorImageRef),
                likes: [],
                imageUrl: await getDownloadURL(imageRef),
                timeStamp: serverTimestamp()
            });
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

  return (
    <>
        <Header />

        <section className="section-form__post">
            <form className="form-post">
                <div className="form__body">
                    <DropFileInput image={image} setImage={setImage} />

                    <div className="form__row">
                        <div className="form__field">
                            <input type="text" onChange={(e) => {setTitle(e.target.value)}} className="field" placeholder="Title" />
                        </div>
                    </div>
                </div>

                <div className="form__actions">
                    <div className="form__btn">
                        <button onClick={handleUpload} className="btn btn--upload" type="submit">Upload</button>
                    </div>
                </div>
            </form>
        </section>
    </>
  )
}

export default Create