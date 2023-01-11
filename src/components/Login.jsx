import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <section className="section-form__auth">
        <form action="" className="form-auth">
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
                        <input type="email" id="email" className="field" placeholder="Email" />
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__field">
                        <input type="password" id="password" className="field" placeholder="Password" />
                    </div>
                </div>
            </div>

            <div className="form__actions">
                <div className="form__btn">
                    <button type="submit" className="btn btn--auth">Login</button>
                </div>

                <p>Don't have an acccount? <Link to="/register">Register</Link></p>
            </div>
        </form>
    </section>
  )
}

export default Login