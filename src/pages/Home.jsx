import React from 'react';
import Header from '../components/Header';
import Post from '../components/Post';
import heroImage from '../assets/hero.jpg';
import { UserAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Home = () => {
    const { user } = UserAuth();

    return (
        <>
            <Header />

            <div className="home">
                <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${heroImage})` }}>
                    <div className="shell">
                        <div className="hero__inner">
                            <div className="hero__title">
                                <h1>PinPics</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="posts">
                    <div className="shell">
                        <div className="posts__inner">
                            <Post />
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}

export default Home