import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PageNotFound = () => {
  return (
    <>
        <Header />

        <section className="page-not-found">
            <div className="page-not-found__inner">
                <h1>Error 404</h1>

                <p>Woops. Looks like this page doesn't exist.</p>
                
                <Link to="/">Home</Link>
            </div>
        </section>

        <Footer />
    </>
  )
}

export default PageNotFound