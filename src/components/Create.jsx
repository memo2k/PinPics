import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { UserAuth } from '../context/AuthContext';
import DropFileInput from './DropFileInput';
import Footer from './Footer';

const Create = () => {
    const { user } = UserAuth();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [validCredentials, setValidCredentials] = useState(false);
    const [error, setError] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();

        if (image == null) {
            return setError("Please select an image.")
        }

        try {
            setValidCredentials(true);
            const imageRef = ref(storage, `images/${image.name + v4()}`);

            await uploadBytes(imageRef, image);
            await addDoc(collection(db, "posts"), {
                title: title,
                author: user.displayName,
                userId: user.uid,
                authorPicture: user.photoURL,
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

                    <div className="form__error">
                        {error !== "" ? <div className="error">{error}</div> : null}
                    </div>
                </div>

                <div className="form__actions">
                    <div className="form__btn">
                        {!validCredentials ? (
                            <button onClick={handleUpload} className="btn btn--upload" type="submit">Upload</button>
                        ) :(
                            <button disabled className="btn btn--upload" type="submit" style={{ backgroundColor: "rgb(64, 64, 64)" }}>
                                <span className="loader loader--small"></span>
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </section>

        <Footer />
    </>
  )
}

export default Create