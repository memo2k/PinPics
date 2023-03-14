import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { db, storage } from "../firebase";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [validCredentials, setValidCredentials] = useState(false);

    const { createUser } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username && !email && !password) {
            return setError("Please fill the fields below.");
        }

        if (!username) {
            return setError("Username field cannot be empty.");
        }

        if (!email) {
            return setError("Email field cannot be empty.");
        }

        if (password.length < 6) {
            return setError("Password should be at least 6 characters long.");
        }

        if (password !== confirmPassword) {
            return setError("Passwords don't match.");
        }

        try {
            setValidCredentials(true);
            const res = await createUser(email, password);
            const storageRef = ref(storage, `users/${res.user.uid}/profilePicture`);

            // Updates user's display name
            await updateProfile(res.user, {
                displayName: username,
                photoURL: "https://firebasestorage.googleapis.com/v0/b/pinpics-firebase.appspot.com/o/users%2Fpfp.png?alt=media&token=465c8b1f-54d7-49d8-bad7-fea2bdec733d"
            });
            
            // Stores the user details(username and email) in the database
            await setDoc(doc(db, 'users', res.user.uid), {
                name: username,
                profilePicture: "https://firebasestorage.googleapis.com/v0/b/pinpics-firebase.appspot.com/o/users%2Fpfp.png?alt=media&token=465c8b1f-54d7-49d8-bad7-fea2bdec733d",
                email: email
            });

            navigate('/');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
        <section className="section-form__auth">
            <form onSubmit={handleSubmit} className="form-auth">
                <div className="form__header">
                    <div className="form__logo">
                        <Link to="/">
                            <img src={logo} alt="logo" width="300" height="75" />
                        </Link>
                    </div>

                    <div className="form__title">
                        <h2>Register</h2>
                    </div>

                    <div className="form__error">
                        {error !== "" ? <div className="error">{error}</div> : null}
                    </div>
                </div>

                <div className="form__body">
                    <div className="form__row">
                        <div className="form__field">
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="field" placeholder="Username" />
                        </div>
                    </div>

                    <div className="form__row">
                        <div className="form__field">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="field" placeholder="Email" />
                        </div>
                    </div>

                    <div className="form__row">
                        <div className="form__field">
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="field" placeholder="Password" />
                        </div>
                    </div>

                    <div className="form__row">
                        <div className="form__field">
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="field" placeholder="Confirm password" />
                        </div>
                    </div>
                </div>

                <div className="form__actions">
                    <div className="form__btn">
                        {!validCredentials ? (
                            <button className="btn btn--auth">Register</button>
                        ) : (
                            <button disabled className="btn btn--auth" style={{ backgroundColor: "rgb(64, 64, 64)" }}>
                                <span className="loader loader--smaller"></span>
                            </button>
                        )}
                    </div>

                    <p>Already have an acccount? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </section>
    )
}

export default Register