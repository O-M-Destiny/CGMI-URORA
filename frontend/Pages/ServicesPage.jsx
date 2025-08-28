import React from 'react';
import Navbar from '../Sections/HomepageSections/Navbar';
import PageHeader from '../Sections/ServisesPageSections/PageHeader';
import ServiceTimes from '../Sections/ServisesPageSections/ServiceTimes';
import WhatToExpect from '../Sections/ServisesPageSections/WhatToExpect';
import SpecialServices from '../Sections/ServisesPageSections/SpecialServices';
import CTA from '../Sections/ServisesPageSections/CTA';
import Footer from '../Sections/HomepageSections/Footer';

const ServicesPage = () => {
  return (
    <>
      <Navbar/>
      <PageHeader/>
      <ServiceTimes/>
      <WhatToExpect/>
     <SpecialServices/>
      <CTA/>
      <Footer/>
    </>
  );
};

export default ServicesPage;