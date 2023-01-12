import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { UserAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
            console.log(err.message);
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
                    <h2>Login</h2>
                </div>

                <p>Welcome back!</p>
            </div>

            <div className="form__body">
                <div className="form__row">
                    <div className="form__field">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="field" placeholder="Email" />
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__field">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="field" placeholder="Password" />
                    </div>
                </div>
            </div>

            <div className="form__actions">
                <div className="form__btn">
                    <button className="btn btn--auth">Login</button>
                </div>

                <p>Don't have an acccount? <Link to="/register">Register</Link></p>
            </div>
        </form>
    </section>
  )
}

export default Login