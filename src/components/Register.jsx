import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { createUser } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createUser(email, password);
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
                </div>

                <div className="form__body">
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
                            <input type="password" className="field" placeholder="Confirm password" />
                        </div>
                    </div>
                </div>

                <div className="form__actions">
                    <div className="form__btn">
                        <button className="btn btn--auth">Register</button>
                    </div>

                    <p>Already have an acccount? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </section>
    )
}

export default Register