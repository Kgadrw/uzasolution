'use client'
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import TrustedCo from '../components/TrustedCo';

import React from 'react';

const page = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Profiles />
      <TrustedCo />
    </div>
  );
};

export default page;
