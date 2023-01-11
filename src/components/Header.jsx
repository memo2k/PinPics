import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Header = () => {
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
        
                    <button type="submit" className="btn btn--search"><i class="fa-solid fa-magnifying-glass fa-lg"></i></button>
                </form>
            </div>

            <div className="header__nav">
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">About</Link>
                        </li>

                        <li>
                            <Link to="/login">Login</Link>
                        </li>

                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  )
}

export default Header