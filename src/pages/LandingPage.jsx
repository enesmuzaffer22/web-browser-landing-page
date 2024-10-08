import React from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className='landing-page'>
        <Header />
        <Search />
        <Footer />
    </div>
  )
}

export default LandingPage