import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { UserAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="logo" width="250" height="62" />
                    </Link>
                </div>

                <div className="header__search">
                    <form action="" className="form-search">
                        <input type="text" placeholder="Search" className="field" />
            
                        <button type="submit" className="btn btn--search"><i className="fa-solid fa-magnifying-glass fa-lg"></i></button>
                    </form>
                </div>

                <div className="header__nav">
                    <nav className="nav">
                        {!user ? (
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>

                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </ul>
                        ) : (
                            <ul>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>

                                <li>
                                    <Link to="/create">Upload</Link>
                                </li>

                                <li>
                                    <div className="tooltip">
                                        <Link onClick={handleLogout} to="/logout"><i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i></Link>
                                        <div className="tooltip__text">Logout</div>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header