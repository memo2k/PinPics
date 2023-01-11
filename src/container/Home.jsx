import React from 'react';
import Header from '../components/Header';
import heroImage from '../assets/hero.jpg';

const Home = () => {
  return (
    <div>
        <Header />

        <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${heroImage})` }}>
            <div className="shell">
                <div className="hero__inner">
                    <div className="hero__title">
                        <h1>PinPics</h1>
                    </div>

                    <div className="hero__description">
                        <p>PinPics provides high quality and completely free stock photos.
                        All photos are nicely tagged, searchable and also easy to discover through our discover pages.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home