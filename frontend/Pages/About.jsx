import React from 'react';
import Navbar from '../Sections/HomepageSections/Navbar';
import { AboutPageHeader } from '../Sections/AboutSections/AboutPageHeader';
import AboutChurchHistory from '../Sections/AboutSections/AboutChurchHistory';
import AboutLeadershipTeam from '../Sections/AboutSections/AboutLeadershipTeam';
import AboutStatementOfFaith from '../Sections/AboutSections/AboutStatementOfFaith';
import AboutCTA from '../Sections/AboutSections/AboutCTA';
import Footer from '../Sections/HomepageSections/Footer';

const About = () => {
  return (
    <div className="about-page">
        <Navbar/>
      <AboutPageHeader/>
      <AboutChurchHistory/>
      <AboutLeadershipTeam/>
      <AboutStatementOfFaith/>
      <AboutCTA/>
      <Footer/>
    </div>
  );
};

export default About;