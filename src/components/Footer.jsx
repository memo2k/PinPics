import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserAuth } from "../context/AuthContext";

const Footer = () => {
    const { user } = UserAuth();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__inner">
          <div className="footer__logo">
            <img src={logo} alt="" width="250px" height="62px" />

            <p>PinPics 2023</p>
          </div>

          <nav className="footer__nav">
            {user ? (
                <ul>
                    <li>
                        <Link to={`/profile/${user.uid}`}>Profile</Link>
                    </li>

                    <li>
                        <Link to="/create">Upload a photo</Link>
                    </li>

                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>

            ) : (
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>

                    <li>
                        <Link to="/register">Register</Link>
                    </li>

                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
