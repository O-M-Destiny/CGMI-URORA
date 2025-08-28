import React from 'react';
import Navbar from '../Sections/HomepageSections/Navbar';
import MinistriesPageHeader from '../Sections/MinistriesSections/MinistriesPageHeader';
import MinistriesSpecialized from '../Sections/MinistriesSections/MinistriesSpecialized';
import MinistriesSupport from '../Sections/MinistriesSections/MinistriesSupport';
import MinistriesCTA from '../Sections/MinistriesSections/MinistriesCTA';
import Footer from '../Sections/HomepageSections/Footer';

const Ministries = () => {
  return (
    <div className="ministries-page">
        <Navbar/>
        <MinistriesPageHeader/>
        <MinistriesSpecialized/>
        <MinistriesSupport/>
        <MinistriesCTA/>
        <Footer/>
    </div>
  );
};

export default Ministries;