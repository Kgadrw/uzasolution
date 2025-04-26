'use client'
import Hero from '../components/hero';
import AboutUs from '../components/aboutus';
import TrustedCo from '../components/trustedCo';
import Profiles from '../components/Profiles';
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
