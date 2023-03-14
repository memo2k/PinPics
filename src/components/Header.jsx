import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { UserAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = UserAuth();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const [hamburger, setHamburger] = useState("hamburger");
    const [ulClass, setUlClass] = useState("");
    const [isMenuClicked, setIsMenuClickied] = useState(false);
    const wrapper = document.getElementById("root")

    const updateMenu = () => {
        if (!isMenuClicked) {
            setHamburger("hamburger active");
            setUlClass("active");
            wrapper.classList.add("position-fixed");
        } else {
            setHamburger("hamburger");
            setUlClass("");
            wrapper.classList.remove("position-fixed");
        }
        setIsMenuClickied(!isMenuClicked);
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (search !== "") {
            navigate(`/?search=${search}`, { state: { search } });
            setSearch("");
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

                <div className="header__home-mobile">
                    <Link to="/">Home</Link>
                </div>

                <div className="header__search">
                    <form onSubmit={handleSearch} className="form-search">
                        <input onChange={(e) => {setSearch(e.target.value)}} value={search} type="text" placeholder="Search" className="field" />
            
                        <button type="submit" className="btn btn--search"><i className="fa-solid fa-magnifying-glass fa-lg"></i></button>
                    </form>
                </div>

                <div className="header__nav">
                    <nav className="nav">
                        {!user ? (
                        <ul className={ulClass}>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>

                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </ul>
                        ) : (
                            <ul className={ulClass}>
                                <li>
                                    <Link to={`/profile/${user.uid}`}>Profile</Link>
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

                <div className={hamburger} onClick={updateMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </header>
    )
}

export default Header