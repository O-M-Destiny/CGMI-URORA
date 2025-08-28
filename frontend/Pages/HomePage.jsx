import React from 'react'
import Navbar from "../Sections/HomepageSections/Navbar"
import Hero from '../Sections/HomepageSections/Hero';
import ServiceTime from '../Sections/HomepageSections/ServiceTime';
import About from '../Sections/HomepageSections/About';
import Ministries from "../Sections/HomepageSections/Ministries"
import EventsSection from "../Sections/HomepageSections/EventsSection"
import ContactSection from "../Sections/HomepageSections/ContactSection"
import Footer from '../Sections/HomepageSections/Footer';

const HomePage = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <ServiceTime/>
      <About/>
      <Ministries/>
      <EventsSection/>
      <ContactSection/>
      <Footer/>
    </>
  );
};

export default HomePage;
